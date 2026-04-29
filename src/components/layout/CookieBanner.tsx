"use client";

import { useState, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";

const COOKIE_KEY = "gpkougkoudis-consent";

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
}
function getStoredConsent() {
  return typeof window === "undefined" ? null : localStorage.getItem(COOKIE_KEY);
}

export function CookieBanner() {
  const t = useTranslations("cookies");
  const tFooter = useTranslations("footer");
  const stored = useSyncExternalStore(
    subscribe,
    getStoredConsent,
    () => null
  );
  const [dismissed, setDismissed] = useState(false);

  const visible = !stored && !dismissed;

  function set(value: "accept" | "decline") {
    localStorage.setItem(COOKIE_KEY, value);
    setDismissed(true);
    if (value === "accept") {
      window.dispatchEvent(new CustomEvent("consent:granted"));
    }
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-50 bg-charcoal text-cream rounded-lg shadow-2xl p-5 border border-cream/10 animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <h2 className="text-cream display-serif text-xl mb-2">{t("title")}</h2>
      <p className="text-sm text-cream/75 leading-relaxed">
        {t("message")}{" "}
        <Link href="/cookies" className="underline hover:text-gold">
          {tFooter("cookies")}
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant="gold" size="sm" onClick={() => set("accept")}>
          {t("accept")}
        </Button>
        <Button variant="outlineLight" size="sm" onClick={() => set("decline")}>
          {t("decline")}
        </Button>
      </div>
    </div>
  );
}
