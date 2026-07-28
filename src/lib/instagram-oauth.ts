import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export const instagramApiBase = "https://graph.instagram.com";

export function getInstagramRedirectUri(requestUrl: string) {
  return process.env.INSTAGRAM_REDIRECT_URI || new URL("/api/instagram/callback", requestUrl).toString();
}

export function createOAuthState() {
  return randomBytes(24).toString("hex");
}

export function safeEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function parseSignedRequest(signedRequest: string) {
  const secret = process.env.INSTAGRAM_APP_SECRET;
  if (!secret) return null;

  const [encodedSignature, payload] = signedRequest.split(".");
  if (!encodedSignature || !payload) return null;

  const signature = Buffer.from(encodedSignature.replace(/-/g, "+").replace(/_/g, "/"), "base64");
  const expected = createHmac("sha256", secret).update(payload).digest();
  if (signature.length !== expected.length || !timingSafeEqual(signature, expected)) return null;

  try {
    return JSON.parse(Buffer.from(payload.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8")) as {
      user_id?: string;
    };
  } catch {
    return null;
  }
}

export function deletionCode(userId: string) {
  const secret = process.env.INSTAGRAM_APP_SECRET || "missing-secret";
  return createHmac("sha256", secret).update(`instagram-delete:${userId}`).digest("hex").slice(0, 32);
}
