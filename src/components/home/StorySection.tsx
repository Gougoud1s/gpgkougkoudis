"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SanityImage } from "@/components/ui/SanityImage";
import { loc, type Homepage, type Locale as L } from "@/sanity/types";

export function StorySection({ homepage }: { homepage: Homepage }) {
  const t = useTranslations("home");
  const locale = useLocale() as L;

  const title = loc(homepage.storyTitle, locale) || t("storyTitle");
  const text = loc(homepage.storyText, locale) || t("storySubtitle");

  return (
    <section className="border-y border-gold/15 bg-[#fbf7ef] py-24 md:py-32">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/3] order-2 overflow-hidden bg-white p-3 shadow-[0_25px_70px_-45px_rgba(120,84,20,0.45)] lg:order-1"
          >
            <SanityImage
              image={homepage.storyImage}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              alt={title}
              className="object-contain p-5"
            />
          </motion.div>

          <div className="order-1 lg:order-2">
            <Eyebrow>
              {t("storyEyebrow")}
            </Eyebrow>
            <h2 className="display-serif mt-4 text-charcoal">{title}</h2>
            <span className="gold-rule mt-6" aria-hidden="true" />
            <p className="mt-6 text-stone leading-relaxed text-base md:text-lg">
              {text}
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-gold hover:text-gold-light smooth cursor-pointer"
            >
              {t("storyCta")}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
