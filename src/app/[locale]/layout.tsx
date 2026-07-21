import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { Analytics } from "@/components/layout/Analytics";
import { LocalBusinessJsonLd } from "@/components/seo/JsonLd";
import { routing, type Locale } from "@/i18n/routing";
import { getHomepage, getSiteSettings } from "@/sanity/fetch";
import { loc } from "@/sanity/types";

// Published Studio edits are intentionally read on every request.
export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const [settings, homepage] = await Promise.all([getSiteSettings(), getHomepage()]);
  const isEn = locale === "en";
  const url = settings.siteUrl || "http://localhost:3000";
  const brand = loc(settings.brand, locale);
  const description = loc(settings.tagline, locale);
  return {
    title: `${brand} — ${description}`,
    description,
    alternates: {
      canonical: `${url}/${locale}`,
      languages: {
        el: `${url}/el`,
        en: `${url}/en`,
        "x-default": `${url}/el`,
      },
    },
    openGraph: {
      type: "website",
      title: brand,
      description,
      url: `${url}/${locale}`,
      locale: isEn ? "en_GR" : "el_GR",
      siteName: brand,
      images: [homepage.heroImage?.asset?.url || ""].filter(Boolean),
    },
    twitter: {
      card: "summary_large_image",
      title: brand,
      description,
      images: [homepage.heroImage?.asset?.url || ""].filter(Boolean),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const [messages, settings] = await Promise.all([getMessages(), getSiteSettings()]);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header settings={settings} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer settings={settings} />
      <CookieBanner />
      <Analytics />
      <LocalBusinessJsonLd locale={locale} settings={settings} />
    </NextIntlClientProvider>
  );
}
