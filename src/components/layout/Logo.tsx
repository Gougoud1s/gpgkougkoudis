import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import type { SiteSettings } from "@/sanity/types";
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
          <span className="flex items-baseline tracking-[-0.055em]">
            <span className="font-script mr-[0.12em] text-[1.08em] font-normal normal-case tracking-[-0.06em] text-gold-dark">
              GP
            </span>
            <span>Gougoudis</span>
          </span>
          <span className="font-script mr-[0.08em] mt-[0.04em] self-end text-[0.42em] font-normal normal-case tracking-[0.08em] text-gold-dark">
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
