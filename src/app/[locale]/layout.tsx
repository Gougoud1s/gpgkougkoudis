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
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  return {
    title: isEn
      ? "GP. KOUGKOUDIS — Jewelry store in Petroupoli, Athens"
      : "GP. ΓΚΟΥΓΚΟΥΔΗΣ — Κοσμηματοπωλείο στην Πετρούπολη, Αθήνα",
    description: isEn
      ? "Curated 9, 14 and 18 karat gold jewelry, repairs, custom design, and gold buying in Petroupoli, Athens."
      : "Χρυσά και λευκόχρυσα κοσμήματα 9, 14, 18 καρατίων, επισκευές, σχεδιασμός κατά παραγγελία και αγορά χρυσού στην Πετρούπολη Αθήνας.",
    alternates: {
      canonical: `${SITE.url}/${locale}`,
      languages: {
        el: `${SITE.url}/el`,
        en: `${SITE.url}/en`,
        "x-default": `${SITE.url}/el`,
      },
    },
    openGraph: {
      type: "website",
      title: SITE.brand,
      url: `${SITE.url}/${locale}`,
      locale: isEn ? "en_GR" : "el_GR",
      siteName: SITE.brand,
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
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <CookieBanner />
      <Analytics />
      <LocalBusinessJsonLd locale={locale} />
    </NextIntlClientProvider>
  );
}
