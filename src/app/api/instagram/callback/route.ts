import { NextRequest, NextResponse } from "next/server";
import { getInstagramRedirectUri, instagramApiBase, safeEqual } from "@/lib/instagram-oauth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function resultPage(title: string, body: string, status = 200) {
  return new NextResponse(`<!doctype html><html><head><meta name="robots" content="noindex,nofollow"><meta charset="utf-8"><title>${title}</title></head><body style="font-family:system-ui;max-width:760px;margin:64px auto;padding:24px;line-height:1.6"><h1>${title}</h1>${body}</body></html>`, {
    status,
    headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" },
  });
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const savedState = request.cookies.get("instagram_oauth_state")?.value;
  const appId = process.env.INSTAGRAM_APP_ID;
  const appSecret = process.env.INSTAGRAM_APP_SECRET;

  if (!code || !state || !savedState || !safeEqual(state, savedState)) {
    return resultPage("Instagram connection failed", "<p>The authorization state is invalid or expired. Start the connection again.</p>", 400);
  }
  if (!appId || !appSecret) {
    return resultPage("Instagram connection failed", "<p>The Instagram app credentials are not configured.</p>", 503);
  }

  try {
    const shortTokenResponse = await fetch("https://api.instagram.com/oauth/access_token", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: appId,
        client_secret: appSecret,
        grant_type: "authorization_code",
        redirect_uri: getInstagramRedirectUri(request.url),
        code,
      }),
      cache: "no-store",
    });
    const shortToken = await shortTokenResponse.json() as { access_token?: string; user_id?: string; error_message?: string };
    if (!shortTokenResponse.ok || !shortToken.access_token) throw new Error(shortToken.error_message || "Token exchange failed");

    const longTokenUrl = new URL(`${instagramApiBase}/access_token`);
    longTokenUrl.searchParams.set("grant_type", "ig_exchange_token");
    longTokenUrl.searchParams.set("client_secret", appSecret);
    longTokenUrl.searchParams.set("access_token", shortToken.access_token);
    const longTokenResponse = await fetch(longTokenUrl, { cache: "no-store" });
    const longToken = await longTokenResponse.json() as { access_token?: string; expires_in?: number; error?: { message?: string } };
    if (!longTokenResponse.ok || !longToken.access_token) throw new Error(longToken.error?.message || "Long-lived token exchange failed");

    const profileUrl = new URL(`${instagramApiBase}/me`);
    profileUrl.searchParams.set("fields", "id,username");
    profileUrl.searchParams.set("access_token", longToken.access_token);
    const profile = await fetch(profileUrl, { cache: "no-store" }).then((response) => response.json()) as { id?: string; username?: string };
    const token = longToken.access_token.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const userId = (profile.id || shortToken.user_id || "").replace(/[^0-9]/g, "");

    const response = resultPage("Instagram connected", `<p>Account: <strong>@${profile.username || "Instagram account"}</strong></p><p>Add these values to the Vercel Production environment, then redeploy:</p><label><strong>INSTAGRAM_USER_ID</strong></label><pre style="white-space:pre-wrap;word-break:break-all;background:#f5f5f5;padding:16px">${userId}</pre><label><strong>INSTAGRAM_ACCESS_TOKEN</strong></label><pre style="white-space:pre-wrap;word-break:break-all;background:#f5f5f5;padding:16px">${token}</pre><p>This page is not cached. Close it after copying the values. Token lifetime: approximately ${Math.round((longToken.expires_in || 0) / 86400)} days.</p>`);
    response.cookies.delete("instagram_oauth_state");
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Instagram API error";
    return resultPage("Instagram connection failed", `<p>${message.replace(/[<>&]/g, "")}</p>`, 502);
  }
}
