import { NextRequest, NextResponse } from "next/server";
import { safeEqual } from "@/lib/instagram-oauth";

export async function GET(request: NextRequest) {
  const mode = request.nextUrl.searchParams.get("hub.mode");
  const token = request.nextUrl.searchParams.get("hub.verify_token");
  const challenge = request.nextUrl.searchParams.get("hub.challenge");
  const expected = process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN;

  if (mode === "subscribe" && token && expected && safeEqual(token, expected) && challenge) {
    return new NextResponse(challenge, { status: 200 });
  }
  return NextResponse.json({ error: "Webhook verification failed" }, { status: 403 });
}

export async function POST() {
  // The public feed does not need messaging events. Acknowledge subscribed events so Meta does not retry.
  return NextResponse.json({ received: true });
}
