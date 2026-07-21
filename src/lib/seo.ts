import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { getSiteSettings } from "@/sanity/fetch";
import { loc } from "@/sanity/types";

type LocalizedMetadataOptions = {
  locale: Locale;
  path?: string;
  title: string;
  description?: string;
  images?: string[];
};

export async function localizedMetadata({
  locale,
  path = "",
  title,
  description,
  images = [],
}: LocalizedMetadataOptions): Promise<Metadata> {
  const settings = await getSiteSettings();
  const siteUrl = (settings.siteUrl || "http://localhost:3000").replace(/\/$/, "");
  const cleanPath = path ? `/${path.replace(/^\/+|\/+$/g, "")}` : "";
  const localizedPath = `/${locale}${cleanPath}`;
  const url = `${siteUrl}${localizedPath}`;
  const brand = loc(settings.brand, locale);
  const imageUrls = images.filter(Boolean);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        el: `${siteUrl}/el${cleanPath}`,
        en: `${siteUrl}/en${cleanPath}`,
        "x-default": `${siteUrl}/el${cleanPath}`,
      },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      locale: locale === "en" ? "en_GR" : "el_GR",
      siteName: brand,
      images: imageUrls,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrls,
    },
  };
}
