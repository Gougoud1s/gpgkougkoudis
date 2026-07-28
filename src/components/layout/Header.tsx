"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Phone, Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Logo } from "./Logo";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { Button } from "@/components/ui/Button";
import { cn, telLink } from "@/lib/utils";
import { loc, type ContentPageVisibility, type Locale, type SiteSettings } from "@/sanity/types";

const NAV_ITEMS = [
  { href: "/collections", labelKey: "collections" as const },
  { href: "/services", labelKey: "services" as const },
  { href: "/about", labelKey: "about" as const },
  { href: "/contact", labelKey: "contact" as const },
];

const REMOVED_NAV_PATHS = new Set(["/wedding", "/reviews"]);

export function Header({
  settings,
  contentPages = [],
}: {
  settings?: SiteSettings;
  contentPages?: ContentPageVisibility[];
}) {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const phoneTel = settings?.phoneTel || "";
  const pageByRoute = new Map(contentPages.map((page) => [`/${page.route.replace(/^\/+|\/+$/g, "")}`, page]));
  const configuredItems = settings?.navigation?.length
    ? settings.navigation
        .map((item) => ({ href: item.href || "/", label: loc(item.label, locale) }))
        .filter((item) => !REMOVED_NAV_PATHS.has(item.href.replace(/\/+$/, "")))
    : NAV_ITEMS.map((item) => ({ href: item.href, label: t(item.labelKey) }));
  const navItems = configuredItems.filter((item) => {
    const page = pageByRoute.get(item.href.replace(/\/+$/, ""));
    return !page || (page.enabled !== false && page.showInNavigation !== false);
  });

  for (const page of contentPages) {
    const href = `/${page.route.replace(/^\/+|\/+$/g, "")}`;
    if (
      page.enabled !== false &&
      page.showInNavigation === true &&
      !navItems.some((item) => item.href.replace(/\/+$/, "") === href)
    ) {
      navItems.push({ href, label: loc(page.title, locale) });
    }
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full smooth",
          scrolled
            ? "bg-cream/95 backdrop-blur-md border-b border-line"
            : "bg-cream/80 backdrop-blur-sm"
        )}
      >
        <div className="container-page relative flex min-h-24 items-center justify-between py-4 lg:hidden">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="cursor-pointer p-2 -ml-2 text-charcoal smooth"
            aria-label={t("menu")}
            aria-expanded={open}
          >
            <Menu className="size-6" aria-hidden="true" />
          </button>

          <Logo
            settings={settings}
            wordmark
            className="absolute left-1/2 top-1/2 items-center -translate-x-1/2 -translate-y-1/2"
          />

          <div className="flex min-w-10 items-center justify-end gap-2">
            <LocaleSwitcher className="hidden md:flex" />
          </div>
        </div>

        <div className="container-page relative hidden flex-col items-center pb-4 pt-5 lg:flex">
          <div className="relative flex min-h-24 w-full items-center justify-center">
            <Logo
              settings={settings}
              wordmark
              className="items-center"
            />
            <div className="absolute right-0 flex items-center gap-2">
              <LocaleSwitcher className="mr-2" />
              <a href={telLink(phoneTel)} className="inline-flex" data-event="header-call">
                <Button variant="ghost" size="sm" aria-label={t("callUs")}>
                  <Phone className="size-4" aria-hidden="true" />
                  <span className="hidden xl:inline">{t("callUs")}</span>
                </Button>
              </a>
            </div>
          </div>

          <nav aria-label="Primary" className="mt-2 flex items-center gap-7 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-charcoal/80 hover:text-charcoal smooth cursor-pointer relative group whitespace-nowrap"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-gold scale-x-0 group-hover:scale-x-100 origin-left smooth" />
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden smooth",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-ink/70 smooth",
            open ? "opacity-100" : "opacity-0"
          )}
        />
        <div
          className={cn(
            "absolute top-0 right-0 h-full w-full max-w-sm bg-cream shadow-2xl smooth flex flex-col",
            open ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-line">
            <Logo settings={settings} wordmark />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="cursor-pointer p-2 -mr-2 text-charcoal"
              aria-label={t("close")}
            >
              <X className="size-6" aria-hidden="true" />
            </button>
          </div>
          <nav
            aria-label="Mobile"
            className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-1"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="display-serif text-3xl text-charcoal py-3 border-b border-line/60 cursor-pointer smooth hover:text-gold-dark"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="px-5 py-5 border-t border-line space-y-3">
            <div>
              <a
                href={telLink(phoneTel)}
                className="block"
                data-event="mobile-call"
              >
                <Button variant="outline" size="md" className="w-full">
                  <Phone className="size-4" aria-hidden="true" />
                  {t("callUs")}
                </Button>
              </a>
            </div>
            <LocaleSwitcher />
          </div>
        </div>
      </div>
    </>
  );
}
