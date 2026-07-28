import { NextResponse } from "next/server";
import { createOAuthState, getInstagramRedirectUri } from "@/lib/instagram-oauth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const appId = process.env.INSTAGRAM_APP_ID;
  if (!appId) return NextResponse.json({ error: "INSTAGRAM_APP_ID is not configured" }, { status: 503 });

  const state = createOAuthState();
  const authorizeUrl = new URL("https://www.instagram.com/oauth/authorize");
  authorizeUrl.searchParams.set("client_id", appId);
  authorizeUrl.searchParams.set("redirect_uri", getInstagramRedirectUri(request.url));
  authorizeUrl.searchParams.set("response_type", "code");
  authorizeUrl.searchParams.set("scope", "instagram_business_basic");
  authorizeUrl.searchParams.set("state", state);

  const response = NextResponse.redirect(authorizeUrl);
  response.cookies.set("instagram_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/instagram/callback",
    maxAge: 10 * 60,
  });
  return response;
}
