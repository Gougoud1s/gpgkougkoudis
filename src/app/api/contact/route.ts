import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { createClient } from "@sanity/client";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().max(40).optional(),
  subject: z.string().max(180).optional(),
  message: z.string().max(5000).optional(),
  budget: z.string().max(80).optional(),
  deadline: z.string().max(80).optional(),
  occasion: z.string().max(80).optional(),
  preferredDate: z.string().max(80).optional(),
  preferredTime: z.string().max(80).optional(),
  attendees: z.string().max(20).optional(),
  consent: z.boolean(),
  formType: z.string().max(80).optional(),
  // honeypot — filled by bots
  website: z.string().max(0).optional(),
});

const RECIPIENT = process.env.CONTACT_EMAIL_TO || "info@gpkougkoudis.gr";
const SENDER = process.env.CONTACT_EMAIL_FROM || "no-reply@gpkougkoudis.gr";
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 8;
const ipRequests = new Map<string, number[]>();
const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const SANITY_WRITE_TOKEN = process.env.SANITY_API_WRITE_TOKEN || "";

function getClientIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const prev = ipRequests.get(ip) || [];
  const recent = prev.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  ipRequests.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Try again shortly." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed" },
      { status: 400 }
    );
  }
  if (!parsed.data.consent) {
    return NextResponse.json(
      { ok: false, error: "Consent required" },
      { status: 400 }
    );
  }
  if (parsed.data.website) {
    // Honeypot tripped — pretend success.
    return NextResponse.json({ ok: true });
  }

  await persistSubmission(parsed.data, req, ip);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Dev / preview mode — just log and succeed.
    console.info("[contact] RESEND_API_KEY missing — would have sent:", parsed.data);
    return NextResponse.json({ ok: true });
  }

  const resend = new Resend(apiKey);
  const subject = parsed.data.subject ||
    `[${parsed.data.formType ?? "contact"}] νέο μήνυμα από ${parsed.data.name}`;

  const lines: string[] = [
    `Form: ${parsed.data.formType ?? "contact"}`,
    `Name: ${parsed.data.name}`,
    `Email: ${parsed.data.email}`,
  ];
  if (parsed.data.phone) lines.push(`Phone: ${parsed.data.phone}`);
  if (parsed.data.budget) lines.push(`Budget: ${parsed.data.budget}`);
  if (parsed.data.occasion) lines.push(`Occasion: ${parsed.data.occasion}`);
  if (parsed.data.deadline) lines.push(`Deadline: ${parsed.data.deadline}`);
  if (parsed.data.preferredDate)
    lines.push(`Preferred date: ${parsed.data.preferredDate}`);
  if (parsed.data.preferredTime)
    lines.push(`Preferred time: ${parsed.data.preferredTime}`);
  if (parsed.data.attendees) lines.push(`Attendees: ${parsed.data.attendees}`);
  if (parsed.data.message) {
    lines.push("");
    lines.push("Message:");
    lines.push(parsed.data.message);
  }

  try {
    await resend.emails.send({
      from: `GP. ΓΚΟΥΓΚΟΥΔΗΣ Website <${SENDER}>`,
      to: [RECIPIENT],
      replyTo: parsed.data.email,
      subject,
      text: lines.join("\n"),
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] Resend error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to send" },
      { status: 500 }
    );
  }
}

async function persistSubmission(
  data: z.infer<typeof schema>,
  req: Request,
  ip: string
) {
  if (!SANITY_PROJECT_ID || !SANITY_WRITE_TOKEN) return;

  try {
    const sanity = createClient({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      token: SANITY_WRITE_TOKEN,
      apiVersion: "2024-10-01",
      useCdn: false,
    });

    await sanity.create({
      _type: "submission",
      formType: data.formType ?? "contact",
      subject: data.subject ?? "",
      name: data.name,
      email: data.email,
      phone: data.phone ?? "",
      message: data.message ?? "",
      metadata: {
        budget: data.budget ?? "",
        deadline: data.deadline ?? "",
        occasion: data.occasion ?? "",
        preferredDate: data.preferredDate ?? "",
        preferredTime: data.preferredTime ?? "",
        attendees: data.attendees ?? "",
        ip,
        userAgent: req.headers.get("user-agent") ?? "",
      },
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    // Never block form/email flow on backoffice persistence failures.
    console.error("[contact] submission persistence failed:", error);
  }
}
