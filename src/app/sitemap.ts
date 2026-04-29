import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getCategories, getServices } from "@/sanity/fetch";
import { fallbackProducts } from "@/sanity/fallback";
import { client } from "@/sanity/client";
import { allProductSlugsQuery } from "@/sanity/queries";
import { SITE } from "@/lib/site";

const STATIC_PATHS = [
  "",
  "/collections",
  "/services",
  "/services/custom-design",
  "/services/repairs",
  "/services/engraving",
  "/services/appraisals",
  "/services/buy-gold",
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
  const now = new Date();

  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${SITE.url}/${locale}${path}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: path === "" ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${SITE.url}/${l}${path}`])
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
        url: `${SITE.url}/${locale}/collections/${cat.slug.current}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  // Products — try Sanity first, fall back to placeholders.
  const HAS_SANITY = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
  let productSlugs: { slug: string; category?: string }[] = [];
  if (HAS_SANITY) {
    try {
      productSlugs = await client.fetch(allProductSlugsQuery);
    } catch {
      productSlugs = [];
    }
  }
  if (!productSlugs.length) {
    productSlugs = fallbackProducts.map((p) => ({
      slug: p.slug.current,
      category:
        "slug" in (p.category ?? {})
          ? (p.category as { slug: { current: string } }).slug?.current
          : undefined,
    }));
  }

  for (const locale of routing.locales) {
    for (const p of productSlugs) {
      if (!p.category) continue;
      entries.push({
        url: `${SITE.url}/${locale}/collections/${p.category}/${p.slug}`,
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
        url: `${SITE.url}/${locale}/services/${s.slug.current}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
