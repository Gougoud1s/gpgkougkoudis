import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ContentPageView } from "./ContentPageView";
import { getContentPage } from "@/sanity/fetch";
import { loc, type Locale } from "@/sanity/types";
import { localizedMetadata } from "@/lib/seo";

export async function contentPageMetadata(route: string, locale: Locale) {
  const page = await getContentPage(route);
  if (!page) return { title: "Not found" };
  return localizedMetadata({
    locale,
    path: route,
    title: loc(page.seoTitle, locale) || loc(page.title, locale),
    description: loc(page.seoDescription, locale) || loc(page.subtitle, locale),
    images: [page.heroImage?.asset?.url || ""],
  });
}

export async function renderContentPage(route: string, locale: Locale) {
  setRequestLocale(locale);
  const page = await getContentPage(route);
  if (!page) notFound();
  return <ContentPageView page={page} locale={locale} />;
}
