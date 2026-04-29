import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { SITE } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

export const metadata = { title: "Όροι Χρήσης" };

export default async function TermsPage({
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
        title={locale === "en" ? "Terms of Use" : "Όροι Χρήσης"}
      />

      <section className="pb-24 md:pb-32">
        <Container size="narrow">
          <article className="space-y-6 text-stone leading-relaxed">
            {locale === "en" ? (
              <>
                <p>
                  Welcome to the website of {SITE.brandEn} ({SITE.legalName}). By
                  using this website you agree to these terms.
                </p>
                <h2 className="display-serif text-2xl text-charcoal mt-8">No online sales</h2>
                <p>
                  This website is a showcase. All purchases are made in the
                  store at {SITE.address.streetEn}, {SITE.address.cityEn}.
                </p>
                <h2 className="display-serif text-2xl text-charcoal mt-8">
                  Photographs and prices
                </h2>
                <p>
                  Images are illustrative; actual pieces may vary slightly due
                  to natural variations in stones and finishes. Prices may
                  change with the daily price of gold.
                </p>
                <h2 className="display-serif text-2xl text-charcoal mt-8">
                  Intellectual property
                </h2>
                <p>
                  All content, photography and designs are the property of{" "}
                  {SITE.brandEn} unless otherwise stated.
                </p>
                <h2 className="display-serif text-2xl text-charcoal mt-8">
                  Governing law
                </h2>
                <p>
                  These terms are governed by Greek law. Any disputes are
                  subject to the courts of Athens.
                </p>
              </>
            ) : (
              <>
                <p>
                  Καλωσορίσατε στην ιστοσελίδα του {SITE.brand} ({SITE.legalName}).
                  Με τη χρήση της ιστοσελίδας αποδέχεστε τους παρόντες όρους.
                </p>
                <h2 className="display-serif text-2xl text-charcoal mt-8">
                  Δεν πραγματοποιούνται online αγορές
                </h2>
                <p>
                  Η ιστοσελίδα λειτουργεί ως βιτρίνα. Όλες οι αγορές γίνονται
                  στο κατάστημα στη {SITE.address.street}, {SITE.address.city}.
                </p>
                <h2 className="display-serif text-2xl text-charcoal mt-8">
                  Φωτογραφίες και τιμές
                </h2>
                <p>
                  Οι εικόνες είναι ενδεικτικές· τα πραγματικά κοσμήματα μπορεί
                  να διαφέρουν ελαφρώς λόγω φυσικών διαφοροποιήσεων σε πέτρες
                  και φινίρισμα. Οι τιμές ενδέχεται να αλλάζουν με την ημερήσια
                  τιμή του χρυσού.
                </p>
                <h2 className="display-serif text-2xl text-charcoal mt-8">
                  Πνευματική ιδιοκτησία
                </h2>
                <p>
                  Όλα τα κείμενα, οι φωτογραφίες και τα σχέδια αποτελούν
                  ιδιοκτησία του {SITE.brand}, εκτός αν αναφέρεται διαφορετικά.
                </p>
                <h2 className="display-serif text-2xl text-charcoal mt-8">
                  Εφαρμοστέο δίκαιο
                </h2>
                <p>
                  Οι όροι διέπονται από το ελληνικό δίκαιο. Αρμόδια για
                  οποιαδήποτε διαφορά είναι τα δικαστήρια Αθηνών.
                </p>
              </>
            )}
          </article>
        </Container>
      </section>
    </>
  );
}
