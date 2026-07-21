import type { MetadataRoute } from "next";

export const dynamic = "force-dynamic";
import { routing } from "@/i18n/routing";
import { getCategories, getServices, getSiteSettings } from "@/sanity/fetch";
import { client } from "@/sanity/client";
import { allProductSlugsQuery } from "@/sanity/queries";

const STATIC_PATHS = [
  "",
  "/collections",
  "/services",
  "/wedding",
  "/about",
  "/reviews",
  "/contact",
  "/faq",
  "/privacy",
  "/cookies",
  "/terms",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  const settings = await getSiteSettings();
  const siteUrl = settings.siteUrl || "http://localhost:3000";
  const now = new Date();

  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${siteUrl}/${locale}${path}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: path === "" ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${siteUrl}/${l}${path}`])
          ),
        },
      });
    }
  }

  // Categories
  const categories = await getCategories();
  for (const locale of routing.locales) {
    for (const cat of categories) {
      entries.push({
        url: `${siteUrl}/${locale}/collections/${cat.slug.current}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  let productSlugs: { slug: string; category?: string }[] = [];
  try { productSlugs = await client.fetch(allProductSlugsQuery); } catch { productSlugs = []; }

  for (const locale of routing.locales) {
    for (const p of productSlugs) {
      if (!p.category) continue;
      entries.push({
        url: `${siteUrl}/${locale}/collections/${p.category}/${p.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  // Services
  const services = await getServices();
  for (const locale of routing.locales) {
    for (const s of services) {
      entries.push({
        url: `${siteUrl}/${locale}/services/${s.slug.current}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
