"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, MapPin, Star } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SanityImage } from "@/components/ui/SanityImage";
import { loc, type Homepage, type Locale as L, type SiteSettings } from "@/sanity/types";

export function Hero({ homepage, settings }: { homepage: Homepage; settings?: SiteSettings }) {
  const t = useTranslations("home");
  const locale = useLocale() as L;

  const eyebrow = loc(homepage.heroEyebrow, locale) || t("heroEyebrow");
  const title = loc(homepage.heroTitle, locale) || t("heroTitle");
  const subtitle = loc(homepage.heroSubtitle, locale) || t("heroSubtitle");

  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="grid min-h-[calc(100svh-80px)] lg:grid-cols-[0.92fr_1.08fr]">
      <Container className="relative z-10 flex items-center py-20 lg:py-28">
        <div className="max-w-2xl">
          <span className="absolute left-5 top-10 h-px w-20 bg-gold/60 md:left-8 lg:top-16" aria-hidden="true" />
          <span className="absolute -left-20 top-1/2 size-64 rounded-full border border-gold/10" aria-hidden="true" />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Eyebrow>{eyebrow}</Eyebrow>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="display-serif mt-6 text-balance whitespace-pre-line text-charcoal"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-xl text-base leading-relaxed text-stone md:text-lg"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Link href="/collections"><Button variant="gold" size="lg">{t("heroCtaPrimary")}<ArrowRight className="size-4" aria-hidden="true" /></Button></Link>
            <Link href="/contact"><Button variant="outline" size="lg">{t("heroCtaSecondary")}</Button></Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-gold/20 pt-6 text-sm text-stone"
          >
            <span className="inline-flex items-center gap-2"><Star className="size-4 fill-gold text-gold" aria-hidden="true" /><strong className="text-charcoal">{settings?.googleRating}</strong> {t("trustGoogleRating")}</span>
            <span>{settings?.googleReviewCount} {t("trustReviewCount")}</span>
            <span className="inline-flex items-center gap-2"><MapPin className="size-4 text-gold" aria-hidden="true" />{t("trustLocation")}</span>
          </motion.div>
        </div>
      </Container>

      <motion.div
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative min-h-[52svh] bg-cream-2 lg:min-h-full"
      >
        <SanityImage
          image={homepage.heroImage}
          fill
          priority
          sizes="100vw"
          alt={title}
          className="object-contain p-5 md:p-10 lg:p-14"
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-cream to-transparent lg:block" />
        <div className="absolute bottom-5 right-5 border border-white/60 bg-cream/90 px-4 py-2 text-[0.65rem] uppercase tracking-[0.24em] text-gold-dark backdrop-blur md:bottom-8 md:right-8">Gougoudis · since 1980</div>
      </motion.div>
      </div>
    </section>
  );
}
