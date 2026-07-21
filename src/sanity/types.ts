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
  steps?: Array<{
    _key?: string;
    title?: LocalizedString;
    text?: LocalizedText;
  }>;
  highlights?: Array<{
    _key?: string;
    label?: LocalizedString;
    value?: LocalizedString;
  }>;
  form?: {
    enabled?: boolean;
    title?: LocalizedString;
    description?: LocalizedText;
    showBudget?: boolean;
    showDeadline?: boolean;
    showOccasion?: boolean;
  };
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
  logoTagline?: LocalizedText;
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
  siteUrl?: string;
  footerDescription?: LocalizedText;
  mapEmbedUrl?: string;
  navigation?: Array<{
    _key?: string;
    label?: LocalizedString;
    href?: string;
  }>;
  appointmentTimes?: string[];
  attendeeOptions?: string[];
  budgetOptions?: Array<{ _key?: string; value?: string; label?: LocalizedString }>;
};

export type ContentPageItem = {
  _key?: string;
  title?: LocalizedString;
  text?: LocalizedText;
  icon?: string;
  image?: SanityImage;
};

export type ContentPageSection = {
  _key?: string;
  kind?: "text" | "imageText" | "cards" | "products" | "appointment";
  eyebrow?: LocalizedString;
  title?: LocalizedString;
  text?: LocalizedText;
  image?: SanityImage;
  ctaLabel?: LocalizedString;
  ctaHref?: string;
  items?: ContentPageItem[];
};

export type ContentPage = {
  _id: string;
  route: string;
  eyebrow?: LocalizedString;
  title: LocalizedString;
  subtitle?: LocalizedText;
  heroImage?: SanityImage;
  body?: { el?: unknown[]; en?: unknown[] };
  sections?: ContentPageSection[];
  seoTitle?: LocalizedString;
  seoDescription?: LocalizedText;
  updatedLabel?: string;
};

export type UiTextRecord = {
  key: string;
  value?: LocalizedText;
};

export function loc(value: LocalizedString | LocalizedText | undefined, locale: Locale): string {
  if (!value) return "";
  return value[locale] || value.el || value.en || "";
}
