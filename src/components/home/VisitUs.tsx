"use client";

import { useTranslations } from "next-intl";
import { MapPin, Phone, MessageCircle, Clock, Navigation } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { mapsDirectionsLink, telLink, whatsappLink } from "@/lib/utils";
import { loc, type Locale, type SiteSettings } from "@/sanity/types";
import { useLocale } from "next-intl";

export function VisitUs({ settings }: { settings?: SiteSettings }) {
  const t = useTranslations("home");
  const tContact = useTranslations("contact");
  const td = useTranslations("dynamic");
  const locale = useLocale() as Locale;
  const address = loc(settings?.address, locale);
  const phoneDisplay = settings?.phoneDisplay || "";
  const phoneTel = settings?.phoneTel || "";
  const whatsapp = settings?.whatsapp || "";

  return (
    <section className="py-24 md:py-32 bg-cream-2/40">
      <Container>
        <div className="grid lg:grid-cols-2 gap-10 items-stretch">
          <div className="flex flex-col justify-center">
            <Eyebrow>{t("visitEyebrow")}</Eyebrow>
            <h2 className="display-serif mt-4">{t("visitTitle")}</h2>
            <p className="mt-5 text-stone leading-relaxed max-w-md">
              {t("visitDescription")}
            </p>

            <dl className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gold-soft/40 text-gold-dark">
                  <MapPin className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-stone-2">
                    {tContact("addressLabel")}
                  </dt>
                  <dd className="text-charcoal mt-1">
                    {address.split("\n").map((line, index) => <span key={index}>{line}{index < address.split("\n").length - 1 && <br />}</span>)}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gold-soft/40 text-gold-dark">
                  <Clock className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-stone-2">
                    {tContact("hoursLabel")}
                  </dt>
                  <dd className="text-charcoal mt-1 text-sm">
                    {tContact("hours.mondayFriday")}: 09:00–14:00, 17:30–20:30
                    <br />
                    {tContact("hours.saturday")}: 09:00–15:00
                    <br />
                    {tContact("hours.sunday")}: {tContact("hours.closed")}
                  </dd>
                </div>
              </div>
            </dl>

            <div className="mt-10 flex flex-wrap gap-3">
              <a href={telLink(phoneTel)} data-event="visit-call">
                <Button variant="primary" size="md">
                  <Phone className="size-4" aria-hidden="true" />
                  {phoneDisplay}
                </Button>
              </a>
              <a
                href={whatsappLink(undefined, whatsapp)}
                target="_blank"
                rel="noreferrer"
                data-event="visit-whatsapp"
              >
                <Button variant="gold" size="md">
                  <MessageCircle className="size-4" aria-hidden="true" />
                  WhatsApp
                </Button>
              </a>
              <a
                href={mapsDirectionsLink(address.replace(/\n/g, ", "))}
                target="_blank"
                rel="noreferrer"
                data-event="visit-directions"
              >
                <Button variant="outline" size="md">
                  <Navigation className="size-4" aria-hidden="true" />
                  {td("directions")}
                </Button>
              </a>
            </div>
          </div>

          <div className="aspect-[4/5] lg:aspect-auto min-h-80 rounded-sm overflow-hidden border border-line bg-cream-2">
            <iframe
              title={td("mapTitle")}
              src={settings?.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
              style={{ border: 0, filter: "grayscale(0.2) contrast(1.05)" }}
              allowFullScreen
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
