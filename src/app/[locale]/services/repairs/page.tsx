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
  const service = await getServiceBySlug("repairs");
  if (!service) return { title: "Not found" };
  return { title: loc(service.title, locale) };
}

export default async function RepairsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const service = await getServiceBySlug("repairs");
  if (!service) notFound();

  const intro =
    locale === "en" ? (
      <>
        <p>
          We repair and restore jewelry of every kind — from a snapped chain to a
          full restoration of an heirloom piece. Bring your jewelry to the store
          for a free, no-obligation assessment.
        </p>
        <p>
          Common repairs include resizing, soldering, prong rebuilding, stone
          replacement, polishing, rhodium plating, clasp replacement and chain
          repair.
        </p>
      </>
    ) : (
      <>
        <p>
          Επισκευάζουμε και αναπαλαιώνουμε κοσμήματα όλων των ειδών — από μια
          σπασμένη αλυσίδα μέχρι την πλήρη αναπαλαίωση οικογενειακών κειμηλίων.
          Φέρτε τα κοσμήματά σας για δωρεάν αξιολόγηση χωρίς υποχρέωση.
        </p>
        <p>
          Οι πιο συχνές επισκευές περιλαμβάνουν αλλαγή μεγέθους, συγκολλήσεις,
          αντικατάσταση ποδιών, επανατοποθέτηση πέτρας, γυάλισμα, επιροδίωση,
          αλλαγή κουμπώματος και επισκευή αλυσίδας.
        </p>
      </>
    );

  const highlights =
    locale === "en"
      ? [
          { label: "Turnaround", value: "2–10 days" },
          { label: "Free assessment", value: "Yes" },
          { label: "Warranty", value: "6 months" },
          { label: "All metals", value: "Au · Ag · Pt" },
        ]
      : [
          { label: "Χρόνος παράδοσης", value: "2–10 ημέρες" },
          { label: "Δωρεάν αξιολόγηση", value: "Ναι" },
          { label: "Εγγύηση", value: "6 μήνες" },
          { label: "Όλα τα μέταλλα", value: "Au · Ag · Pt" },
        ];

  return (
    <ServiceLayout
      service={service}
      locale={locale}
      intro={intro}
      highlights={highlights}
      formType="repairs"
      showDeadline
    />
  );
}
