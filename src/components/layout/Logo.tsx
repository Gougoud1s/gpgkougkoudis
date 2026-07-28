import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { loc, type Locale, type SiteSettings } from "@/sanity/types";
import { SanityImage } from "@/components/ui/SanityImage";

export function Logo({
  className,
  imageClassName,
  wordmark,
  wordmarkClassName,
  settings,
}: {
  className?: string;
  imageClassName?: string;
  wordmark?: boolean;
  wordmarkClassName?: string;
  variant?: "dark" | "light";
  settings?: SiteSettings;
}) {
  const t = useTranslations("dynamic");
  const locale = useLocale() as Locale;
  const brand = loc(settings?.brand, locale) || "Γ.Π. ΓΚΟΥΓΚΟΥΔΗΣ";

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex flex-col items-start leading-none cursor-pointer smooth",
        className
      )}
      aria-label={`Gougoudis Gioielli — ${t("backHome")}`}
    >
      {wordmark ? (
        <span
          className={cn(
            "font-display whitespace-nowrap font-medium uppercase leading-none tracking-[-0.055em] text-charcoal",
            wordmarkClassName
          )}
        >
          {brand}
        </span>
      ) : (
        <SanityImage
          image={settings?.logo || { asset: { url: "/brand/gougoudis-logo-transparent.png" } }}
          alt="Gougoudis Gioielli"
          width={600}
          height={315}
          className={cn(
            "h-12 w-auto object-contain md:h-14",
            imageClassName
          )}
        />
      )}
    </Link>
  );
}
