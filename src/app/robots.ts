import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/sanity/fetch";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSiteSettings();
  const url = settings.siteUrl || "http://localhost:3000";
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/studio/"] },
    ],
    sitemap: `${url}/sitemap.xml`,
    host: url,
  };
}
