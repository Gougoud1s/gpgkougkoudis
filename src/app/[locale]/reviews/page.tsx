import { setRequestLocale, getTranslations } from "next-intl/server";
import { Star, Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { getTestimonials } from "@/sanity/fetch";
import { loc } from "@/sanity/types";
import { SITE } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "reviews" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function ReviewsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "reviews" });
  const testimonials = await getTestimonials();

  return (
    <>
      <PageHeader eyebrow={t("title")} title={t("title")} subtitle={t("subtitle")} />

      <section className="pb-12 -mt-4">
        <Container size="narrow">
          <div className="flex items-center justify-center gap-2 text-sm">
            <span className="inline-flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-5 fill-gold text-gold" aria-hidden="true" />
              ))}
            </span>
            <span className="ml-2 display-serif text-2xl text-charcoal">
              {SITE.google.rating}
            </span>
            <span className="text-stone-2">
              · {SITE.google.reviewCount} reviews on Google
            </span>
          </div>
        </Container>
      </section>

      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial) => (
              <figure
                key={testimonial._id}
                className="border border-line bg-cream-2/30 p-7 md:p-9 rounded-sm relative"
              >
                <Quote
                  className="size-8 text-gold/40 absolute top-6 right-6"
                  aria-hidden="true"
                />
                <div className="inline-flex">
                  {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-gold text-gold" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="display-serif text-xl md:text-2xl mt-4 text-charcoal leading-snug">
                  &ldquo;{loc(testimonial.quote, locale)}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-stone-2">
                  <span>— {testimonial.author}</span>
                  {testimonial.source === "google" && (
                    <span className="text-stone-2/70">Google</span>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-16 text-center">
            <a
              href={SITE.social.google}
              target="_blank"
              rel="noreferrer"
              data-event="reviews-leave-google"
            >
              <Button variant="primary" size="md">
                {t("leaveReview")}
              </Button>
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
