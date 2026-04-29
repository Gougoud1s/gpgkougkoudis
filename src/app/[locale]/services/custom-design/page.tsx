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
  const service = await getServiceBySlug("custom-design");
  if (!service) return { title: "Not found" };
  return {
    title: loc(service.title, locale),
    description: loc(service.tagline, locale),
  };
}

export default async function CustomDesignPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const service = await getServiceBySlug("custom-design");
  if (!service) notFound();

  const intro =
    locale === "en" ? (
      <>
        <p>
          Whether you have a clear vision or just a feeling, we&apos;ll work with
          you to design and craft a one-of-a-kind piece — from sketch to final
          stone setting. Each custom commission is created in our own workshop in
          Petroupoli.
        </p>
        <p>
          We work with all karat gold, white gold, rose gold, platinum and a
          wide range of precious and semi-precious stones, including ethically
          sourced diamonds.
        </p>
      </>
    ) : (
      <>
        <p>
          Είτε έχετε μια ξεκάθαρη ιδέα είτε απλώς ένα συναίσθημα, θα συνεργαστούμε
          μαζί σας για να σχεδιάσουμε και να κατασκευάσουμε ένα μοναδικό κόσμημα —
          από το πρώτο σκίτσο μέχρι την τελευταία πέτρα. Κάθε κόσμημα κατά
          παραγγελία γεννιέται στο δικό μας εργαστήριο στην Πετρούπολη.
        </p>
        <p>
          Δουλεύουμε με χρυσό 9, 14, 18 και 21 καρατίων, λευκόχρυσο, ροζ χρυσό,
          πλατίνα και μεγάλη γκάμα πολύτιμων και ημιπολύτιμων πετρών, συμπεριλαμβανομένων
          διαμαντιών με πιστοποίηση.
        </p>
      </>
    );

  const steps =
    locale === "en"
      ? [
          {
            title: "Consultation",
            text:
              "We meet at the store or via video call. You share ideas, references, budget and timing.",
          },
          {
            title: "Design",
            text:
              "We create hand sketches and 3D renders for your approval, refining until it's right.",
          },
          {
            title: "Crafting",
            text:
              "Our master goldsmiths bring the design to life — typically 2 to 6 weeks.",
          },
          {
            title: "Delivery",
            text:
              "Final viewing in store or shipped fully insured. Comes with care instructions and warranty.",
          },
        ]
      : [
          {
            title: "Συνάντηση",
            text:
              "Συναντιόμαστε στο κατάστημα ή με βιντεοκλήση. Μοιράζεστε ιδέες, αναφορές, προϋπολογισμό και χρονοδιάγραμμα.",
          },
          {
            title: "Σχεδιασμός",
            text:
              "Δημιουργούμε σκίτσα και 3D renders για έγκρισή σας, μέχρι να είναι ακριβώς όπως το θέλετε.",
          },
          {
            title: "Κατασκευή",
            text:
              "Οι έμπειροι χρυσοχόοι μας ζωντανεύουν το σχέδιο — συνήθως σε 2 με 6 εβδομάδες.",
          },
          {
            title: "Παράδοση",
            text:
              "Παραλαβή από το κατάστημα ή ασφαλισμένη αποστολή. Με οδηγίες φροντίδας και εγγύηση.",
          },
        ];

  return (
    <ServiceLayout
      service={service}
      locale={locale}
      intro={intro}
      steps={steps}
      formType="custom-design"
      showBudget
      showDeadline
      showOccasion
    />
  );
}
