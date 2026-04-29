import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ServiceLayout } from "@/components/services/ServiceLayout";
import { getServiceBySlug } from "@/sanity/fetch";
import { loc } from "@/sanity/types";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const service = await getServiceBySlug("engraving");
  if (!service) return { title: "Not found" };
  return { title: loc(service.title, locale) };
}

export default async function EngravingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const service = await getServiceBySlug("engraving");
  if (!service) notFound();

  const intro =
    locale === "en" ? (
      <>
        <p>
          A name, a date, a private message — engraving turns a beautiful piece
          into a personal one. We offer both machine and traditional hand
          engraving on rings, bracelets, pendants and watches.
        </p>
      </>
    ) : (
      <>
        <p>
          Ένα όνομα, μια ημερομηνία, ένα προσωπικό μήνυμα — η χάραξη μετατρέπει
          ένα όμορφο κόσμημα σε κάτι μοναδικά δικό σας. Προσφέρουμε μηχανική και
          παραδοσιακή χειροποίητη χάραξη σε δαχτυλίδια, βραχιόλια, μενταγιόν και
          ρολόγια.
        </p>
      </>
    );

  const highlights =
    locale === "en"
      ? [
          { label: "Turnaround", value: "1–3 days" },
          { label: "Languages", value: "GR · EN · LAT" },
          { label: "Hand or machine", value: "Both" },
        ]
      : [
          { label: "Χρόνος παράδοσης", value: "1–3 ημέρες" },
          { label: "Γλώσσες", value: "EL · EN · LAT" },
          { label: "Χειροποίητη ή μηχανική", value: "Και τα δύο" },
        ];

  return (
    <ServiceLayout
      service={service}
      locale={locale}
      intro={intro}
      highlights={highlights}
      formType="engraving"
    />
  );
}
