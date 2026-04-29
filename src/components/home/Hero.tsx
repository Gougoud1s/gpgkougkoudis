"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, MapPin, Star } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SanityImage } from "@/components/ui/SanityImage";
import { loc, type Homepage, type Locale as L } from "@/sanity/types";
import { SITE } from "@/lib/site";

export function Hero({ homepage }: { homepage: Homepage }) {
  const t = useTranslations("home");
  const locale = useLocale() as L;

  const eyebrow = loc(homepage.heroEyebrow, locale) || t("heroEyebrow");
  const title = loc(homepage.heroTitle, locale) || t("heroTitle");
  const subtitle = loc(homepage.heroSubtitle, locale) || t("heroSubtitle");

  return (
    <section className="relative min-h-[88vh] flex items-end overflow-hidden bg-charcoal text-cream">
      <div className="absolute inset-0">
        <SanityImage
          image={homepage.heroImage}
          fill
          priority
          sizes="100vw"
          alt="GP. ΓΚΟΥΓΚΟΥΔΗΣ"
          className="opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />
      </div>

      <Container className="relative z-10 pb-16 lg:pb-24 pt-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Eyebrow className="text-gold-light">{eyebrow}</Eyebrow>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="display-serif text-cream mt-6 text-balance whitespace-pre-line"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-xl text-cream/80 text-base md:text-lg leading-relaxed"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Link href="/collections">
              <Button variant="gold" size="lg">
                {t("heroCtaPrimary")}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outlineLight" size="lg">
                {t("heroCtaSecondary")}
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-cream/70"
          >
            <span className="inline-flex items-center gap-2">
              <Star className="size-4 fill-gold text-gold" aria-hidden="true" />
              <strong className="text-cream">{SITE.google.rating}</strong>{" "}
              {t("trustGoogleRating")}
            </span>
            <span className="text-cream/30" aria-hidden="true">
              ·
            </span>
            <span>{t("trustReviewCount")}</span>
            <span className="text-cream/30" aria-hidden="true">
              ·
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-gold" aria-hidden="true" />
              {t("trustLocation")}
            </span>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
