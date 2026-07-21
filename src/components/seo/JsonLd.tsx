import { loc, type Locale, type SiteSettings } from "@/sanity/types";

/**
 * JSON-LD for JewelryStore + LocalBusiness — used on all pages.
 */
export function LocalBusinessJsonLd({ locale = "el", settings }: { locale?: Locale; settings: SiteSettings }) {
  const url = settings.siteUrl || "http://localhost:3000";
  const brand = loc(settings.brand, locale);
  const address = loc(settings.address, locale);
  const data = {
    "@context": "https://schema.org",
    "@type": ["JewelryStore", "LocalBusiness"],
    "@id": `${url}/#business`,
    name: brand,
    url,
    telephone: settings.phoneTel,
    email: settings.email,
    priceRange: "€€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      addressCountry: "GR",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: settings.googleRating,
      reviewCount: settings.googleReviewCount,
    },
    sameAs: [
      settings.social?.facebook,
      settings.social?.instagram,
      settings.social?.google,
    ].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ProductJsonLd({
  name,
  image,
  description,
  sku,
  price,
  url,
  brand,
}: {
  name: string;
  image: string;
  description: string;
  sku?: string;
  price?: number;
  url: string;
  brand: string;
}) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    image,
    description,
    sku,
    brand: { "@type": "Brand", name: brand },
    url,
  };
  if (price) {
    data.offers = {
      "@type": "Offer",
      priceCurrency: "EUR",
      price,
      availability: "https://schema.org/InStoreOnly",
      seller: { "@type": "Organization", name: brand },
    };
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FaqJsonLd({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: { "@type": "Answer", text: it.answer },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
