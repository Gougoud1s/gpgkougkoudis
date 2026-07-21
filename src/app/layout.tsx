import type { Metadata } from "next";
import { Cormorant, Montserrat } from "next/font/google";
import "./globals.css";
import { getSiteSettings } from "@/sanity/fetch";
import { loc } from "@/sanity/types";

const cormorant = Cormorant({
  subsets: ["latin", "latin-ext"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Montserrat in `next/font` doesn't expose a "greek" subset typing, so we
// load latin-ext (which covers the diacritics we need for Greek capitals like
// Α, Β, Γ rendered as glyphs from latin-ext) and rely on system font fallback
// for any missing glyphs. This keeps the bundle small without compromising
// Greek readability.
const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const brand = loc(settings.brand, "el");
  return {
    metadataBase: new URL(settings.siteUrl || "http://localhost:3000"),
    title: { default: `${brand} — ${loc(settings.tagline, "el")}`, template: `%s | ${brand}` },
    description: loc(settings.tagline, "el"),
    icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="el"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${montserrat.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-cream text-ink">
        {children}
      </body>
    </html>
  );
}
