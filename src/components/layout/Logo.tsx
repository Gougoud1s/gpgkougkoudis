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
  const surname =
    brand
      .replace(/^(?:Γ\.?\s*Π\.?|G\.?\s*P\.?)\s*/iu, "")
      .replace(/\s+gioielli$/iu, "") || "ΓΚΟΥΓΚΟΥΔΗΣ";

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
            "inline-flex flex-col items-stretch whitespace-nowrap font-display font-medium leading-none text-charcoal",
            wordmarkClassName
          )}
        >
          <span className="flex items-baseline uppercase tracking-[-0.055em]">
            <span className="mr-[0.12em] text-[1.08em] font-normal italic tracking-[-0.11em] text-gold-dark">
              GP
            </span>
            <span>{surname}</span>
          </span>
          <span className="mr-[0.08em] mt-[0.04em] self-end text-[0.34em] font-normal italic normal-case tracking-[0.26em] text-gold-dark">
            gioielli
          </span>
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
