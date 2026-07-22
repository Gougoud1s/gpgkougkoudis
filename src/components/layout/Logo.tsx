import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import type { SiteSettings } from "@/sanity/types";
import { SanityImage } from "@/components/ui/SanityImage";

export function Logo({
  className,
  variant = "dark",
  settings,
}: {
  className?: string;
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
      <SanityImage
        image={settings?.logo || { asset: { url: "/brand/gougoudis-logo.jpg" } }}
        alt="Gougoudis Gioielli"
        width={600}
        height={315}
        className={cn(
          "h-12 w-auto object-contain md:h-14",
          variant === "light" && "mix-blend-multiply"
        )}
      />
    </Link>
  );
}
