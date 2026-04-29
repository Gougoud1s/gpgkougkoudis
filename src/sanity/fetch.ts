import { client } from "./client";
import {
  fallbackCategories,
  fallbackFaqs,
  fallbackHomepage,
  fallbackProducts,
  fallbackServices,
  fallbackSiteSettings,
  fallbackTestimonials,
} from "./fallback";
import {
  allCategoriesQuery,
  allFaqsQuery,
  allServicesQuery,
  allTestimonialsQuery,
  categoryBySlugQuery,
  homepageQuery,
  productBySlugQuery,
  serviceBySlugQuery,
  siteSettingsQuery,
} from "./queries";
import type {
  Category,
  Faq,
  Homepage,
  Product,
  Service,
  SiteSettings,
  Testimonial,
} from "./types";

const HAS_SANITY = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);

async function safeFetch<T>(query: string, params?: Record<string, unknown>): Promise<T | null> {
  if (!HAS_SANITY) return null;
  try {
    return await client.fetch<T>(query, params || {});
  } catch (error) {
    console.warn("[sanity] fetch failed, using fallback:", error);
    return null;
  }
}

export async function getHomepage(): Promise<Homepage> {
  const data = await safeFetch<Homepage>(homepageQuery);
  return data ?? fallbackHomepage;
}

export async function getCategories(): Promise<Category[]> {
  const data = await safeFetch<Category[]>(allCategoriesQuery);
  return data && data.length ? data : fallbackCategories;
}

export async function getCategoryBySlug(
  slug: string
): Promise<(Category & { products?: Product[] }) | null> {
  const data = await safeFetch<Category & { products?: Product[] }>(
    categoryBySlugQuery,
    { slug }
  );
  if (data) return data;

  const fallback = fallbackCategories.find((c) => c.slug.current === slug);
  if (!fallback) return null;
  return {
    ...fallback,
    products: fallbackProducts.filter(
      (p) => "slug" in (p.category ?? {}) && (p.category as Category)?.slug?.current === slug
    ),
  };
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const data = await safeFetch<Product>(productBySlugQuery, { slug });
  if (data) return data;

  const fallback = fallbackProducts.find((p) => p.slug.current === slug);
  if (!fallback) return null;
  const categorySlug =
    "slug" in (fallback.category ?? {}) ? (fallback.category as Category)?.slug?.current : undefined;
  return {
    ...fallback,
    related: fallbackProducts
      .filter(
        (p) =>
          p._id !== fallback._id &&
          "slug" in (p.category ?? {}) &&
          (p.category as Category)?.slug?.current === categorySlug
      )
      .slice(0, 4),
  };
}

export async function getServices(): Promise<Service[]> {
  const data = await safeFetch<Service[]>(allServicesQuery);
  return data && data.length ? data : fallbackServices;
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const data = await safeFetch<Service>(serviceBySlugQuery, { slug });
  if (data) return data;
  return fallbackServices.find((s) => s.slug.current === slug) ?? null;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const data = await safeFetch<Testimonial[]>(allTestimonialsQuery);
  return data && data.length ? data : fallbackTestimonials;
}

export async function getFaqs(): Promise<Faq[]> {
  const data = await safeFetch<Faq[]>(allFaqsQuery);
  return data && data.length ? data : fallbackFaqs;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await safeFetch<SiteSettings>(siteSettingsQuery);
  return data ?? fallbackSiteSettings;
}
