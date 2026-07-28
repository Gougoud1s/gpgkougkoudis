import { NextRequest, NextResponse } from "next/server";
import { deletionCode, parseSignedRequest } from "@/lib/instagram-oauth";

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const payload = parseSignedRequest(String(form.get("signed_request") || ""));
  if (!payload?.user_id) return NextResponse.json({ error: "Invalid signed request" }, { status: 400 });

  const code = deletionCode(payload.user_id);
  return NextResponse.json({
    url: new URL(`/api/instagram/data-deletion?code=${code}`, request.url).toString(),
    confirmation_code: code,
  });
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) return NextResponse.json({ error: "Missing confirmation code" }, { status: 400 });
  return NextResponse.json({ status: "complete", confirmation_code: code });
}
