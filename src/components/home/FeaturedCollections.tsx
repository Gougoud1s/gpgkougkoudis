"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SanityImage } from "@/components/ui/SanityImage";
import { loc, type Category, type Locale as L } from "@/sanity/types";

export function FeaturedCollections({ categories }: { categories: Category[] }) {
  const t = useTranslations("home");
  const td = useTranslations("dynamic");
  const locale = useLocale() as L;

  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <Eyebrow>{t("featuredCollectionsEyebrow")}</Eyebrow>
            <h2 className="display-serif mt-4">
              {t("featuredCollectionsTitle")}
            </h2>
            <p className="mt-4 text-stone leading-relaxed">
              {t("featuredCollectionsSubtitle")}
            </p>
          </div>
          <Link
            href="/collections"
            className="text-sm uppercase tracking-[0.2em] text-charcoal hover:text-gold-dark inline-flex items-center gap-2 smooth cursor-pointer self-start md:self-end"
          >
            {td("allCollections")}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {categories.slice(0, 4).map((category, idx) => (
            <motion.div
              key={category._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                delay: idx * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={`/collections/${category.slug.current}`}
                className="group block cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-cream-2 rounded-sm">
                  <SanityImage
                    image={category.image}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    alt={loc(category.title, locale)}
                    className="smooth group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-cream">
                    <h3 className="display-serif text-2xl md:text-3xl text-cream">
                      {loc(category.title, locale)}
                    </h3>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs uppercase tracking-[0.18em] opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 smooth">
                      {t("featuredCollectionsEyebrow")}
                      <ArrowUpRight className="size-3" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
