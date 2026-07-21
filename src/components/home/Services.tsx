"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { ArrowUpRight, Sparkles, Wrench, Coins, Scale, PenTool } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { loc, type Locale as L, type Service } from "@/sanity/types";

const ICONS = {
  sparkles: Sparkles,
  wrench: Wrench,
  coins: Coins,
  scale: Scale,
  "pen-tool": PenTool,
} as const;

function ServiceIcon({ name }: { name?: string }) {
  const Icon = (name && ICONS[name as keyof typeof ICONS]) || Sparkles;
  return <Icon className="size-5 text-gold" aria-hidden="true" />;
}

export function Services({ services }: { services: Service[] }) {
  const t = useTranslations("home");
  const td = useTranslations("dynamic");
  const locale = useLocale() as L;

  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <Eyebrow>{t("servicesEyebrow")}</Eyebrow>
            <h2 className="display-serif mt-4">{t("servicesTitle")}</h2>
            <p className="mt-5 text-stone leading-relaxed">
              {t("servicesSubtitle")}
            </p>
            <Link
              href="/services"
              className="mt-7 inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-charcoal hover:text-gold-dark smooth cursor-pointer"
            >
              {td("allServices")}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-x-8 gap-y-2">
            {services.slice(0, 6).map((service, idx) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <Link
                  href={`/services/${service.slug.current}`}
                  className="group block py-5 border-b border-line cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <span className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-full bg-gold-soft/40">
                        <ServiceIcon name={service.icon} />
                      </span>
                      <div>
                        <h3 className="display-serif text-xl text-charcoal group-hover:text-gold-dark smooth">
                          {loc(service.title, locale)}
                        </h3>
                        <p className="text-sm text-stone-2 mt-1">
                          {loc(service.tagline, locale) ||
                            loc(service.shortDescription, locale)}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight
                      className="size-4 text-stone-2 group-hover:text-gold smooth shrink-0 mt-1"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
