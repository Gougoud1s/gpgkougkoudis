"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className={cn("flex items-center gap-1 text-xs uppercase tracking-[0.18em]", className)}>
      {routing.locales.map((loc, index) => (
        <span key={loc} className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => router.replace(pathname, { locale: loc })}
            className={cn(
              "cursor-pointer smooth px-1 py-0.5 rounded-sm",
              loc === locale
                ? "text-charcoal font-semibold"
                : "text-stone-2 hover:text-charcoal"
            )}
            aria-current={loc === locale ? "true" : undefined}
            aria-label={`Switch to ${loc.toUpperCase()}`}
          >
            {loc}
          </button>
          {index < routing.locales.length - 1 && (
            <span className="text-stone-2/50" aria-hidden="true">
              /
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
