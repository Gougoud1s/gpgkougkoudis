import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { SanityImage } from "@/components/ui/SanityImage";
import { getServices } from "@/sanity/fetch";
import { loc } from "@/sanity/types";
import type { Locale } from "@/i18n/routing";
import { localizedMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return localizedMetadata({ locale, path: "services", title: t("title"), description: t("subtitle") });
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "services" });
  const td = await getTranslations({ locale, namespace: "dynamic" });
  const services = await getServices();

  return (
    <>
      <PageHeader eyebrow={t("title")} title={t("title")} subtitle={t("subtitle")} />

      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
            {services.map((service) => (
              <Link
                key={service._id}
                href={`/services/${service.slug.current}`}
                className="group block cursor-pointer relative aspect-[4/5] overflow-hidden bg-cream-2"
              >
                <SanityImage
                  image={service.image}
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  alt={loc(service.title, locale)}
                  className="smooth group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-cream">
                  <h2 className="display-serif text-3xl text-cream">
                    {loc(service.title, locale)}
                  </h2>
                  {service.tagline && (
                    <p className="mt-2 text-cream/80 text-sm md:text-base max-w-md">
                      {loc(service.tagline, locale)}
                    </p>
                  )}
                  <span className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold-light">
                    {td("learnMore")}
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
