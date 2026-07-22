import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["el", "en"],
  defaultLocale: "el",
  localeDetection: false,
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
