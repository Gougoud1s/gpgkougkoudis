"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Phone, MessageCircle, Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Logo } from "./Logo";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { Button } from "@/components/ui/Button";
import { cn, telLink, whatsappLink } from "@/lib/utils";
import { SITE } from "@/lib/site";

const NAV_ITEMS = [
  { href: "/collections", labelKey: "collections" as const },
  { href: "/services", labelKey: "services" as const },
  { href: "/wedding", labelKey: "wedding" as const },
  { href: "/about", labelKey: "about" as const },
  { href: "/reviews", labelKey: "reviews" as const },
  { href: "/contact", labelKey: "contact" as const },
];

export function Header() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
        <div className="container-page flex items-center justify-between py-4 lg:py-5 gap-6">
          <Logo />

          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center gap-7 text-sm"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-charcoal/80 hover:text-charcoal smooth cursor-pointer relative group whitespace-nowrap"
              >
                {t(item.labelKey)}
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-gold scale-x-0 group-hover:scale-x-100 origin-left smooth" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LocaleSwitcher className="hidden md:flex mr-2" />
            <a
              href={telLink(SITE.phoneTel)}
              className="hidden md:inline-flex"
              data-event="header-call"
            >
              <Button variant="ghost" size="sm" aria-label={t("callUs")}>
                <Phone className="size-4" aria-hidden="true" />
                <span className="hidden xl:inline">{t("callUs")}</span>
              </Button>
            </a>
            <a
              href={whatsappLink(undefined, SITE.whatsappNumber)}
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-flex"
              data-event="header-whatsapp"
            >
              <Button variant="primary" size="sm">
                <MessageCircle className="size-4" aria-hidden="true" />
                <span className="hidden xl:inline">{t("whatsapp")}</span>
              </Button>
            </a>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="lg:hidden cursor-pointer p-2 -mr-2 text-charcoal smooth"
              aria-label={t("menu")}
              aria-expanded={open}
            >
              <Menu className="size-6" aria-hidden="true" />
            </button>
          </div>
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
            <Logo />
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
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="display-serif text-3xl text-charcoal py-3 border-b border-line/60 cursor-pointer smooth hover:text-gold-dark"
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </nav>
          <div className="px-5 py-5 border-t border-line space-y-3">
            <div className="flex gap-2">
              <a
                href={telLink(SITE.phoneTel)}
                className="flex-1"
                data-event="mobile-call"
              >
                <Button variant="outline" size="md" className="w-full">
                  <Phone className="size-4" aria-hidden="true" />
                  {t("callUs")}
                </Button>
              </a>
              <a
                href={whatsappLink(undefined, SITE.whatsappNumber)}
                target="_blank"
                rel="noreferrer"
                className="flex-1"
                data-event="mobile-whatsapp"
              >
                <Button variant="primary" size="md" className="w-full">
                  <MessageCircle className="size-4" aria-hidden="true" />
                  {t("whatsapp")}
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
