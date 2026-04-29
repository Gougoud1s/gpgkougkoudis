import { SITE } from "@/lib/site";

/**
 * JSON-LD for JewelryStore + LocalBusiness — used on all pages.
 */
export function LocalBusinessJsonLd({ locale = "el" }: { locale?: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": ["JewelryStore", "LocalBusiness"],
    "@id": `${SITE.url}/#business`,
    name: locale === "en" ? SITE.brandEn : SITE.brand,
    alternateName: SITE.legalName,
    url: SITE.url,
    telephone: SITE.phoneTel,
    email: SITE.email,
    image: `${SITE.url}/og-default.jpg`,
    priceRange: "€€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: locale === "en" ? SITE.address.streetEn : SITE.address.street,
      addressLocality: locale === "en" ? SITE.address.cityEn : SITE.address.city,
      addressRegion: locale === "en" ? SITE.address.regionEn : SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "20:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Saturday"],
        opens: "09:00",
        closes: "15:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: SITE.google.rating,
      reviewCount: SITE.google.reviewCount,
    },
    sameAs: [
      SITE.social.facebook,
      SITE.social.instagram,
      SITE.social.google,
    ],
    foundingDate: String(SITE.founded),
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
}: {
  name: string;
  image: string;
  description: string;
  sku?: string;
  price?: number;
  url: string;
}) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    image,
    description,
    sku,
    brand: { "@type": "Brand", name: SITE.brand },
    url,
  };
  if (price) {
    data.offers = {
      "@type": "Offer",
      priceCurrency: "EUR",
      price,
      availability: "https://schema.org/InStoreOnly",
      seller: { "@type": "Organization", name: SITE.brand },
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
