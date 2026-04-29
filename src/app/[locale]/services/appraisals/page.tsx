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
  const service = await getServiceBySlug("appraisals");
  if (!service) return { title: "Not found" };
  return { title: loc(service.title, locale) };
}

export default async function AppraisalsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const service = await getServiceBySlug("appraisals");
  if (!service) notFound();

  const intro =
    locale === "en" ? (
      <>
        <p>
          Need a formal valuation for insurance, inheritance or sale? Our
          appraisals come with a signed certificate detailing materials,
          weight, stones and current market value. Book a private appointment
          for personal attention.
        </p>
      </>
    ) : (
      <>
        <p>
          Χρειάζεστε επίσημη εκτίμηση για ασφάλεια, κληρονομικά ή πώληση; Οι
          εκτιμήσεις μας συνοδεύονται από υπογεγραμμένο πιστοποιητικό με λεπτομέρειες
          για τα υλικά, το βάρος, τις πέτρες και την τρέχουσα αξία αγοράς. Κλείστε
          ραντεβού για προσωπική εξυπηρέτηση.
        </p>
      </>
    );

  return (
    <ServiceLayout
      service={service}
      locale={locale}
      intro={intro}
      formType="appraisals"
    />
  );
}
