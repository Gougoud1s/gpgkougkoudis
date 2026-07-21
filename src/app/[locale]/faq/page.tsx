import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import { getFaqs } from "@/sanity/fetch";
import { loc } from "@/sanity/types";
import type { Locale } from "@/i18n/routing";
import { localizedMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });
  return localizedMetadata({ locale, path: "faq", title: t("title"), description: t("subtitle") });
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "faq" });
  const faqs = await getFaqs();

  return (
    <>
      <PageHeader eyebrow={t("title")} title={t("title")} subtitle={t("subtitle")} />

      <section className="pb-24 md:pb-32">
        <Container size="narrow">
          <div className="space-y-2">
            {faqs.map((faq) => (
              <details
                key={faq._id}
                className="group border-t border-line py-6 last:border-b"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="display-serif text-xl md:text-2xl text-charcoal pr-6">
                    {loc(faq.question, locale)}
                  </h3>
                  <span className="size-8 shrink-0 inline-flex items-center justify-center text-stone-2 group-open:rotate-45 smooth text-2xl">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-stone leading-relaxed">
                  {loc(faq.answer, locale)}
                </p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <FaqJsonLd
        items={faqs.map((f) => ({
          question: loc(f.question, locale),
          answer: loc(f.answer, locale),
        }))}
      />
    </>
  );
}
