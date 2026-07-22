"use client";

import Script from "next/script";
import { useEffect, useState, useSyncExternalStore } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;
const COOKIE_KEY = "gpkougkoudis-consent";

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener("consent:granted", cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener("consent:granted", cb);
  };
}
function getStoredConsent() {
  return typeof window === "undefined" ? null : localStorage.getItem(COOKIE_KEY);
}

/**
 * Loads GA4 + Microsoft Clarity ONLY after explicit user consent.
 * Tracks call / form / directions clicks via [data-event] attribute.
 */
export function Analytics() {
  const stored = useSyncExternalStore(
    subscribe,
    getStoredConsent,
    () => null
  );
  const [consentEvent, setConsentEvent] = useState(false);
  const consent = stored === "accept" || consentEvent;

  useEffect(() => {
    const onGrant = () => setConsentEvent(true);
    window.addEventListener("consent:granted", onGrant);
    return () => window.removeEventListener("consent:granted", onGrant);
  }, []);

  useEffect(() => {
    if (!consent) return;
    function onClick(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>("[data-event]");
      if (!target) return;
      const event = target.dataset.event;
      if (!event) return;
      // GA4
      if (typeof window !== "undefined" && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
        (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", event, {
          page_path: window.location.pathname,
        });
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [consent]);

  if (!consent) return null;

  return (
    <>
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}
      {CLARITY_ID && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_ID}");
          `}
        </Script>
      )}
    </>
  );
}
