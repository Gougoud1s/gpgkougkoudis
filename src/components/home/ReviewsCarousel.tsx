"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Star, Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { loc, type Locale as L, type Testimonial } from "@/sanity/types";
import { SITE } from "@/lib/site";

export function ReviewsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const t = useTranslations("home");
  const tReviews = useTranslations("reviews");
  const locale = useLocale() as L;

  if (!testimonials?.length) return null;

  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Eyebrow align="center">{t("reviewsEyebrow")}</Eyebrow>
          <h2 className="display-serif mt-4">{t("reviewsTitle")}</h2>
          <div className="mt-4 inline-flex items-center gap-2 text-sm text-stone">
            <span className="inline-flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="size-4 fill-gold text-gold"
                  aria-hidden="true"
                />
              ))}
            </span>
            <span>
              <strong className="text-charcoal">{SITE.google.rating}</strong> ·{" "}
              {SITE.google.reviewCount} reviews on Google
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 6).map((testimonial, idx) => (
            <motion.figure
              key={testimonial._id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              className="bg-cream-2/50 border border-line p-7 rounded-sm relative"
            >
              <Quote
                className="size-7 text-gold/40 absolute top-5 right-5"
                aria-hidden="true"
              />
              <div className="inline-flex">
                {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-3.5 fill-gold text-gold"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="display-serif text-xl md:text-2xl mt-4 text-charcoal leading-snug">
                &ldquo;{loc(testimonial.quote, locale)}&rdquo;
              </blockquote>
              <figcaption className="mt-5 text-sm text-stone-2 uppercase tracking-[0.18em]">
                — {testimonial.author}
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={SITE.social.google}
            target="_blank"
            rel="noreferrer"
            data-event="reviews-leave-google"
          >
            <Button variant="outline" size="md">
              {tReviews("leaveReview")}
            </Button>
          </a>
        </div>
      </Container>
    </section>
  );
}
