import { client } from "./client";
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
  contentPageByRouteQuery,
  allUiTextQuery,
} from "./queries";
import type {
  Category,
  Faq,
  Homepage,
  Product,
  Service,
  SiteSettings,
  Testimonial,
  ContentPage,
  UiTextRecord,
} from "./types";

const HAS_SANITY = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);

async function safeFetch<T>(query: string, params?: Record<string, unknown>): Promise<T | null> {
  if (!HAS_SANITY) return null;
  try {
    return await client.fetch<T>(query, params || {});
  } catch (error) {
    console.warn("[sanity] fetch failed:", error);
    return null;
  }
}

export async function getHomepage(): Promise<Homepage> {
  const data = await safeFetch<Homepage>(homepageQuery);
  if (!data) throw new Error("Sanity homepage document is missing");
  return data;
}

export async function getCategories(): Promise<Category[]> {
  const data = await safeFetch<Category[]>(allCategoriesQuery);
  return data || [];
}

export async function getCategoryBySlug(
  slug: string
): Promise<(Category & { products?: Product[] }) | null> {
  const data = await safeFetch<Category & { products?: Product[] }>(
    categoryBySlugQuery,
    { slug }
  );
  if (data) return data;

  return null;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const data = await safeFetch<Product>(productBySlugQuery, { slug });
  if (data) return data;

  return null;
}

export async function getServices(): Promise<Service[]> {
  const data = await safeFetch<Service[]>(allServicesQuery);
  return data || [];
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const data = await safeFetch<Service>(serviceBySlugQuery, { slug });
  if (data) return data;
  return null;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const data = await safeFetch<Testimonial[]>(allTestimonialsQuery);
  return data || [];
}

export async function getFaqs(): Promise<Faq[]> {
  const data = await safeFetch<Faq[]>(allFaqsQuery);
  return data || [];
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await safeFetch<SiteSettings>(siteSettingsQuery);
  if (!data) throw new Error("Sanity siteSettings document is missing");
  return data;
}

export async function getContentPage(route: string): Promise<ContentPage | null> {
  return safeFetch<ContentPage>(contentPageByRouteQuery, { route });
}

export async function getUiText(): Promise<UiTextRecord[]> {
  return (await safeFetch<UiTextRecord[]>(allUiTextQuery)) || [];
}
