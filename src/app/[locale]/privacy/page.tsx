import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { SITE } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

export const metadata = { title: "Πολιτική Απορρήτου" };

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHeader
        eyebrow={locale === "en" ? "Legal" : "Νομικά"}
        title={locale === "en" ? "Privacy Policy" : "Πολιτική Απορρήτου"}
      />

      <section className="pb-24 md:pb-32">
        <Container size="narrow">
          <article className="prose prose-stone max-w-none space-y-6 text-stone leading-relaxed">
            {locale === "en" ? <En /> : <El />}
            <p className="text-xs text-stone-2 mt-12 pt-6 border-t border-line">
              {locale === "en" ? "Last updated" : "Τελευταία ενημέρωση"}:{" "}
              {new Date().toLocaleDateString(locale === "en" ? "en-GB" : "el-GR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </article>
        </Container>
      </section>
    </>
  );
}

function El() {
  return (
    <>
      <p>
        Η εταιρεία {SITE.legalName} ({SITE.brand}), με έδρα τη διεύθυνση{" "}
        {SITE.address.street}, {SITE.address.city} {SITE.address.postalCode},
        σέβεται την ιδιωτικότητά σας και δεσμεύεται να προστατεύει τα προσωπικά σας δεδομένα σύμφωνα με
        τον Γενικό Κανονισμό Προστασίας Δεδομένων (ΕΕ 2016/679) και τον N.4624/2019.
      </p>
      <h2 className="display-serif text-2xl text-charcoal mt-10">
        Τι δεδομένα συλλέγουμε
      </h2>
      <p>
        Συλλέγουμε μόνο τα δεδομένα που μας παρέχετε εθελοντικά μέσω των φορμών
        επικοινωνίας και ραντεβού (όνομα, email, τηλέφωνο, μήνυμα). Επιπλέον,
        ανώνυμα στοιχεία επισκεψιμότητας μέσω cookies (αν τα αποδεχτείτε).
      </p>
      <h2 className="display-serif text-2xl text-charcoal mt-10">
        Πώς χρησιμοποιούμε τα δεδομένα σας
      </h2>
      <p>
        Αποκλειστικά για να σας απαντήσουμε στο αίτημά σας, να σας
        εξυπηρετήσουμε και, αν συμφωνείτε, να σας ενημερώνουμε για νέες
        συλλογές. Δεν πωλούμε ποτέ τα δεδομένα σας σε τρίτους.
      </p>
      <h2 className="display-serif text-2xl text-charcoal mt-10">Τα δικαιώματά σας</h2>
      <p>
        Έχετε δικαίωμα πρόσβασης, διόρθωσης, διαγραφής, περιορισμού,
        φορητότητας και αντίρρησης. Για οποιοδήποτε αίτημα επικοινωνήστε στο{" "}
        <a href={`mailto:${SITE.email}`} className="underline">
          {SITE.email}
        </a>
        .
      </p>
      <h2 className="display-serif text-2xl text-charcoal mt-10">Cookies</h2>
      <p>
        Δείτε αναλυτικά την Πολιτική Cookies. Μπορείτε να αλλάξετε τις
        προτιμήσεις σας ανά πάσα στιγμή.
      </p>
    </>
  );
}

function En() {
  return (
    <>
      <p>
        {SITE.legalName} ({SITE.brandEn}), based at {SITE.address.streetEn},{" "}
        {SITE.address.cityEn} {SITE.address.postalCode}, respects your privacy
        and is committed to protecting your personal data in accordance with the
        EU General Data Protection Regulation (2016/679) and Greek Law 4624/2019.
      </p>
      <h2 className="display-serif text-2xl text-charcoal mt-10">Data we collect</h2>
      <p>
        We only collect data you voluntarily provide via our contact and
        appointment forms (name, email, phone, message). We also collect
        anonymous traffic data via cookies, if you accept them.
      </p>
      <h2 className="display-serif text-2xl text-charcoal mt-10">How we use your data</h2>
      <p>
        Solely to respond to your request, serve you, and (if you opt-in)
        notify you about new collections. We never sell your data.
      </p>
      <h2 className="display-serif text-2xl text-charcoal mt-10">Your rights</h2>
      <p>
        You have the right to access, rectify, delete, restrict, port and
        object. To exercise any of these, please email{" "}
        <a href={`mailto:${SITE.email}`} className="underline">
          {SITE.email}
        </a>
        .
      </p>
      <h2 className="display-serif text-2xl text-charcoal mt-10">Cookies</h2>
      <p>See the detailed Cookies Policy. You can change preferences at any time.</p>
    </>
  );
}
