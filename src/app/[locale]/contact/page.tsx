import { setRequestLocale, getTranslations } from "next-intl/server";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
  MessageCircle,
} from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/forms/ContactForm";
import { mailtoLink, mapsDirectionsLink, telLink, whatsappLink } from "@/lib/utils";
import { SITE } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <>
      <PageHeader eyebrow={t("title")} title={t("title")} subtitle={t("subtitle")} />

      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Info */}
            <div className="lg:col-span-5 space-y-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <InfoCard icon={MapPin} label={t("addressLabel")}>
                  <p>Σιρράκου 85-87</p>
                  <p>Πετρούπολη 131 23</p>
                </InfoCard>
                <InfoCard icon={Phone} label={t("phoneLabel")}>
                  <a
                    href={telLink(SITE.phoneTel)}
                    className="hover:text-gold-dark smooth"
                    data-event="contact-call"
                  >
                    {SITE.phoneDisplay}
                  </a>
                </InfoCard>
                <InfoCard icon={Mail} label={t("emailLabel")}>
                  <a
                    href={mailtoLink(SITE.email)}
                    className="hover:text-gold-dark smooth break-all"
                  >
                    {SITE.email}
                  </a>
                </InfoCard>
                <InfoCard icon={Clock} label={t("hoursLabel")}>
                  <p className="text-sm">
                    {t("hours.mondayFriday")}<br />
                    09:00–14:00, 17:30–20:30
                  </p>
                  <p className="text-sm mt-1">
                    {t("hours.saturday")} 09:00–15:00
                  </p>
                  <p className="text-sm mt-1 text-stone-2">
                    {t("hours.sunday")}: {t("hours.closed")}
                  </p>
                </InfoCard>
              </div>

              <div className="flex flex-wrap gap-2">
                <a
                  href={whatsappLink(undefined, SITE.whatsappNumber)}
                  target="_blank"
                  rel="noreferrer"
                  data-event="contact-whatsapp"
                >
                  <Button variant="gold" size="md">
                    <MessageCircle className="size-4" aria-hidden="true" />
                    WhatsApp
                  </Button>
                </a>
                <a
                  href={mapsDirectionsLink()}
                  target="_blank"
                  rel="noreferrer"
                  data-event="contact-directions"
                >
                  <Button variant="outline" size="md">
                    <Navigation className="size-4" aria-hidden="true" />
                    {locale === "en" ? "Get directions" : "Οδηγίες"}
                  </Button>
                </a>
              </div>

              <div className="border-t border-line pt-8">
                <p className="text-xs uppercase tracking-[0.2em] text-stone-2 mb-4">
                  Social
                </p>
                <div className="flex gap-3">
                  <a
                    href={SITE.social.facebook}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    className="inline-flex size-11 items-center justify-center rounded-full border border-line text-charcoal hover:bg-charcoal hover:text-cream smooth cursor-pointer"
                  >
                    <FacebookIcon className="size-4" />
                  </a>
                  <a
                    href={SITE.social.instagram}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="inline-flex size-11 items-center justify-center rounded-full border border-line text-charcoal hover:bg-charcoal hover:text-cream smooth cursor-pointer"
                  >
                    <InstagramIcon className="size-4" />
                  </a>
                </div>
              </div>

              <div className="aspect-[4/3] border border-line rounded-sm overflow-hidden bg-cream-2">
                <iframe
                  title="Map"
                  src="https://www.google.com/maps?q=Sirrakou+85-87,+Petroupoli+131+23,+Greece&output=embed"
                  loading="lazy"
                  className="w-full h-full"
                  style={{ border: 0, filter: "grayscale(0.2) contrast(1.05)" }}
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <div className="bg-cream-2/40 border border-line p-7 md:p-10 rounded-sm">
                <h2 className="display-serif text-2xl md:text-3xl mb-2">
                  {locale === "en" ? "Send us a message" : "Στείλτε μας μήνυμα"}
                </h2>
                <p className="text-sm text-stone mb-8">
                  {locale === "en"
                    ? "We typically reply within one business day."
                    : "Συνήθως απαντάμε εντός μίας εργάσιμης ημέρας."}
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function InfoCard({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <span className="inline-flex size-11 items-center justify-center rounded-full bg-gold-soft/40 text-gold-dark mb-4">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <p className="text-xs uppercase tracking-[0.18em] text-stone-2 mb-2">
        {label}
      </p>
      <div className="text-charcoal">{children}</div>
    </div>
  );
}
