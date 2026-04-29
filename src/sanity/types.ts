export type Locale = "el" | "en";

export type LocalizedString = { el?: string; en?: string };
export type LocalizedText = { el?: string; en?: string };

export type SanityImage = {
  _key?: string;
  alt?: string;
  asset?: {
    _ref?: string;
    url?: string;
    metadata?: {
      lqip?: string;
      dimensions?: { width: number; height: number };
    };
  };
};

export type SanitySlug = { current: string };

export type Category = {
  _id: string;
  title: LocalizedString;
  slug: SanitySlug;
  image?: SanityImage;
  description?: LocalizedText;
  icon?: string;
  featured?: boolean;
};

export type Product = {
  _id: string;
  title: LocalizedString;
  slug: SanitySlug;
  sku?: string;
  category?: Category | { _ref: string; title?: LocalizedString; slug?: SanitySlug };
  images: SanityImage[];
  material?: string;
  karat?: string;
  stone?: string;
  occasion?: string[];
  weight?: number;
  dimensions?: string;
  price?: number;
  priceOnRequest?: boolean;
  description?: LocalizedText;
  availableInStore?: boolean;
  featured?: boolean;
  related?: Product[];
};

export type Service = {
  _id: string;
  title: LocalizedString;
  tagline?: LocalizedString;
  slug: SanitySlug;
  icon?: string;
  image?: SanityImage;
  shortDescription?: LocalizedText;
  body?: { el?: unknown[]; en?: unknown[] };
  gallery?: SanityImage[];
  featured?: boolean;
};

export type Testimonial = {
  _id: string;
  author: string;
  rating: number;
  quote?: LocalizedText;
  source?: string;
  publishedAt?: string;
};

export type Faq = {
  _id: string;
  question: LocalizedString;
  answer: LocalizedText;
  category?: string;
};

export type Homepage = {
  heroEyebrow?: LocalizedString;
  heroTitle?: LocalizedString;
  heroSubtitle?: LocalizedText;
  heroImage?: SanityImage;
  featuredCollections?: Category[];
  featuredProducts?: Product[];
  featuredServices?: Service[];
  featuredTestimonials?: Testimonial[];
  storyTitle?: LocalizedString;
  storyText?: LocalizedText;
  storyImage?: SanityImage;
};

export type SiteSettings = {
  brand?: LocalizedString;
  tagline?: LocalizedText;
  phoneDisplay?: string;
  phoneTel?: string;
  whatsapp?: string;
  email?: string;
  address?: LocalizedString;
  social?: {
    facebook?: string;
    instagram?: string;
    google?: string;
  };
  hours?: Record<string, string | undefined>;
  googleRating?: number;
  googleReviewCount?: number;
};

export function loc(value: LocalizedString | LocalizedText | undefined, locale: Locale): string {
  if (!value) return "";
  return value[locale] || value.el || value.en || "";
}
