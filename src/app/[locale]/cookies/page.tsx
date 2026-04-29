import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import type { Locale } from "@/i18n/routing";

export const metadata = { title: "Πολιτική Cookies" };

export default async function CookiesPage({
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
        title={locale === "en" ? "Cookies Policy" : "Πολιτική Cookies"}
      />

      <section className="pb-24 md:pb-32">
        <Container size="narrow">
          <article className="space-y-6 text-stone leading-relaxed">
            {locale === "en" ? (
              <>
                <p>
                  We use a small number of cookies to deliver the site and
                  understand traffic anonymously. Cookies are not loaded until
                  you click <strong>Accept</strong>.
                </p>
                <h2 className="display-serif text-2xl text-charcoal mt-8">Strictly necessary</h2>
                <p>
                  Required for navigation and core functionality. These cannot
                  be disabled.
                </p>
                <h2 className="display-serif text-2xl text-charcoal mt-8">Analytics (optional)</h2>
                <p>
                  Google Analytics 4 and Microsoft Clarity, used only with your
                  consent. They store anonymous identifiers and are kept for
                  up to 14 months.
                </p>
                <h2 className="display-serif text-2xl text-charcoal mt-8">Manage preferences</h2>
                <p>
                  Clear your browser&apos;s site data or click below to change
                  your choice.
                </p>
              </>
            ) : (
              <>
                <p>
                  Χρησιμοποιούμε λίγα cookies για να λειτουργεί η ιστοσελίδα και
                  για ανώνυμα στατιστικά επισκεψιμότητας. Τα cookies δεν φορτώνουν
                  πριν πατήσετε <strong>Αποδοχή</strong>.
                </p>
                <h2 className="display-serif text-2xl text-charcoal mt-8">
                  Απολύτως απαραίτητα
                </h2>
                <p>
                  Χρειάζονται για την πλοήγηση και τη βασική λειτουργία. Δεν
                  απενεργοποιούνται.
                </p>
                <h2 className="display-serif text-2xl text-charcoal mt-8">
                  Στατιστικά (προαιρετικά)
                </h2>
                <p>
                  Google Analytics 4 και Microsoft Clarity, χρησιμοποιούνται μόνο
                  με τη συγκατάθεσή σας. Αποθηκεύουν ανώνυμα αναγνωριστικά για
                  έως 14 μήνες.
                </p>
                <h2 className="display-serif text-2xl text-charcoal mt-8">
                  Διαχείριση προτιμήσεων
                </h2>
                <p>
                  Καθαρίστε τα δεδομένα του site από τον browser σας ή αλλάξτε
                  την επιλογή σας από το banner που εμφανίζεται.
                </p>
              </>
            )}
          </article>
        </Container>
      </section>
    </>
  );
}
