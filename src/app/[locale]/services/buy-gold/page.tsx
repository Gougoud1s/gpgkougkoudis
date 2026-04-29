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
  const service = await getServiceBySlug("buy-gold");
  if (!service) return { title: "Not found" };
  return { title: loc(service.title, locale) };
}

export default async function BuyGoldPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const service = await getServiceBySlug("buy-gold");
  if (!service) notFound();

  const intro =
    locale === "en" ? (
      <>
        <p>
          We buy gold jewelry, coins and ingots at fair, transparent prices
          based on the daily international price. Bring valid ID and your items
          to the store — testing and weighing happens in front of you with
          modern equipment, with no obligation to sell.
        </p>
      </>
    ) : (
      <>
        <p>
          Αγοράζουμε χρυσά κοσμήματα, νομίσματα και ράβδους σε δίκαιες, διαφανείς
          τιμές βασισμένες στην τρέχουσα διεθνή τιμή του χρυσού. Φέρτε ταυτότητα
          και τα κοσμήματά σας — ο έλεγχος και η ζύγιση γίνονται μπροστά σας με
          σύγχρονο εξοπλισμό, χωρίς υποχρέωση πώλησης.
        </p>
      </>
    );

  const highlights =
    locale === "en"
      ? [
          { label: "Daily pricing", value: "Live" },
          { label: "Required", value: "Valid ID" },
          { label: "Payment", value: "Cash or bank" },
          { label: "Free valuation", value: "Yes" },
        ]
      : [
          { label: "Τιμή", value: "Ημερήσια διεθνής" },
          { label: "Απαιτούμενα", value: "Ταυτότητα" },
          { label: "Πληρωμή", value: "Μετρητά ή τράπεζα" },
          { label: "Δωρεάν εκτίμηση", value: "Ναι" },
        ];

  return (
    <ServiceLayout
      service={service}
      locale={locale}
      intro={intro}
      highlights={highlights}
      formType="buy-gold"
    />
  );
}
