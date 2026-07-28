import { NextResponse } from "next/server";
import { parseSignedRequest } from "@/lib/instagram-oauth";

export async function POST(request: Request) {
  const form = await request.formData();
  const payload = parseSignedRequest(String(form.get("signed_request") || ""));
  if (!payload) return NextResponse.json({ error: "Invalid signed request" }, { status: 400 });
  // No Instagram user data is stored in the application database.
  return NextResponse.json({ success: true });
}
