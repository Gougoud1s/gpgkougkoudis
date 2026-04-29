/**
 * Hard-coded business constants used across the site.
 * Most of these are also overridable via Sanity `siteSettings`,
 * but kept here as fallbacks and for static generation.
 */
export const SITE = {
  legalName: "Αφοί Π. Γκουγκούδη",
  brand: "GP. ΓΚΟΥΓΚΟΥΔΗΣ",
  brandEn: "GP. KOUGKOUDIS",
  url: "https://www.gpkougkoudis.gr",
  address: {
    street: "Σιρράκου 85-87",
    streetEn: "Sirrakou 85-87",
    city: "Πετρούπολη",
    cityEn: "Petroupoli",
    region: "Αττική",
    regionEn: "Attica",
    postalCode: "131 23",
    country: "GR",
  },
  phoneDisplay: "210 502 3076",
  phoneTel: "+302105023076",
  whatsappNumber: "+302105023076",
  email: "info@gpkougkoudis.gr",
  geo: {
    latitude: 38.0428,
    longitude: 23.6814,
  },
  hours: {
    monday: { open: "09:00", close: "20:00", lunch: { open: "14:00", close: "17:30" } },
    tuesday: { open: "09:00", close: "15:00" },
    wednesday: { open: "09:00", close: "20:00", lunch: { open: "14:00", close: "17:30" } },
    thursday: { open: "09:00", close: "20:00", lunch: { open: "14:00", close: "17:30" } },
    friday: { open: "09:00", close: "20:00", lunch: { open: "14:00", close: "17:30" } },
    saturday: { open: "09:00", close: "15:00" },
    sunday: null,
  },
  social: {
    facebook: "https://www.facebook.com/gpgkougkoudis",
    instagram: "https://www.instagram.com/gp_kougkoudis",
    google: "https://g.page/gpgkougkoudis",
  },
  founded: 1985,
  google: {
    rating: 4.9,
    reviewCount: 123,
  },
} as const;
