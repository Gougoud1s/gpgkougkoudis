import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ServiceLayout } from "@/components/services/ServiceLayout";
import { getServiceBySlug } from "@/sanity/fetch";
import { loc } from "@/sanity/types";
import type { Locale } from "@/i18n/routing";
import { localizedMetadata } from "@/lib/seo";

type Params = Promise<{ locale: Locale; service: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { locale, service: slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "Not found" };
  return localizedMetadata({
    locale,
    path: `services/${slug}`,
    title: loc(service.title, locale),
    description: loc(service.shortDescription, locale) || loc(service.tagline, locale),
    images: [service.image?.asset?.url || ""],
  });
}

export default async function ServicePage({ params }: { params: Params }) {
  const { locale, service: slug } = await params;
  setRequestLocale(locale);
  const service = await getServiceBySlug(slug);
  if (!service) notFound();
  return <ServiceLayout service={service} locale={locale} />;
}
