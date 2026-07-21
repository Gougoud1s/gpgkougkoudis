import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { loc, type Locale, type SiteSettings } from "@/sanity/types";

export function Logo({
  className,
  variant = "dark",
  settings,
}: {
  className?: string;
  variant?: "dark" | "light";
  settings?: SiteSettings;
}) {
  const locale = useLocale() as Locale;
  const t = useTranslations("dynamic");
  const brand = loc(settings?.brand, locale);
  const tagline = loc(settings?.logoTagline, locale) || loc(settings?.tagline, locale);
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex flex-col items-start leading-none cursor-pointer smooth",
        className
      )}
      aria-label={`${brand} — ${t("backHome")}`}
    >
      <span
        className={cn(
          "display-serif text-xl md:text-2xl",
          variant === "dark" ? "text-charcoal" : "text-cream"
        )}
        style={{ letterSpacing: "0.04em" }}
      >
        {brand}
      </span>
      <span
        className={cn(
          "mt-0.5 text-[0.6rem] uppercase tracking-[0.32em]",
          variant === "dark" ? "text-stone-2" : "text-cream/70"
        )}
      >
        {tagline}
      </span>
    </Link>
  );
}
