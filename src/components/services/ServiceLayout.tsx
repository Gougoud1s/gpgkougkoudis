import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SanityImage } from "@/components/ui/SanityImage";
import { ServiceLeadForm } from "@/components/forms/ServiceLeadForm";
import { PortableText } from "@portabletext/react";
import { getTranslations } from "next-intl/server";
import { getSiteSettings } from "@/sanity/fetch";
import type { Service, Locale as L } from "@/sanity/types";
import { loc } from "@/sanity/types";

type Step = { title: string; text: string };

export async function ServiceLayout({
  service,
  locale,
}: {
  service: Service;
  locale: L;
}) {
  const title = loc(service.title, locale);
  const t = await getTranslations({ locale, namespace: "dynamic" });
  const settings = await getSiteSettings();
  const tagline = loc(service.tagline, locale);
  const body = service.body?.[locale] || service.body?.el || service.body?.en || [];
  const steps: Step[] = (service.steps || []).map((step) => ({
    title: loc(step.title, locale),
    text: loc(step.text, locale),
  }));
  const highlights = (service.highlights || []).map((item) => ({
    label: loc(item.label, locale),
    value: loc(item.value, locale),
  }));
  const formEnabled = service.form?.enabled !== false;

  return (
    <>
      <section className="relative flex min-h-[62svh] items-center overflow-hidden border-b border-gold/15 bg-[#fbf7ef] py-24 md:min-h-[70svh] md:py-32">
        {service.heroVideo?.asset?.url ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={service.heroVideoPoster?.asset?.url || service.image?.asset?.url}
            aria-hidden="true"
          >
            <source
              src={service.heroVideo.asset.url}
              type={service.heroVideo.asset.mimeType || "video/mp4"}
            />
          </video>
        ) : service.image ? (
          <div className="absolute inset-0">
            <SanityImage
              image={service.image}
              fill
              priority
              sizes="100vw"
              alt={title}
              className="object-cover"
            />
          </div>
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-r from-[#fbf7ef]/95 via-[#fbf7ef]/78 to-[#fbf7ef]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fbf7ef]/55 via-transparent to-white/10" />
        <Container className="relative z-10">
          <Eyebrow>
            {t("service")}
          </Eyebrow>
          <h1 className="mt-4 max-w-3xl text-balance text-charcoal">{title}</h1>
          {tagline && (
            <p className="mt-5 text-stone text-base md:text-xl max-w-2xl">
              {tagline}
            </p>
          )}
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-7 prose-content">
              <div className="space-y-6 text-stone leading-relaxed text-base md:text-lg">
                {Array.isArray(body) && body.length > 0 ? (
                  <PortableText value={body as never} />
                ) : (
                  <p>{loc(service.shortDescription, locale)}</p>
                )}
              </div>

              {steps && steps.length > 0 && (
                <div className="mt-14">
                  <Eyebrow>
                    {t("process")}
                  </Eyebrow>
                  <ol className="mt-6 grid gap-4 sm:grid-cols-2">
                    {steps.map((step, idx) => (
                      <li
                        key={idx}
                        className="border-t border-line pt-5"
                      >
                        <p className="text-xs uppercase tracking-[0.18em] text-gold-dark mb-2">
                          {String(idx + 1).padStart(2, "0")}
                        </p>
                        <h3 className="display-serif text-2xl text-charcoal">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-sm text-stone leading-relaxed">
                          {step.text}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {highlights && highlights.length > 0 && (
                <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6">
                  {highlights.map((h) => (
                    <div key={h.label}>
                      <dt className="text-xs uppercase tracking-[0.18em] text-stone-2 mb-1">
                        {h.label}
                      </dt>
                      <dd className="display-serif text-xl text-charcoal">
                        {h.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>

            {formEnabled && <aside className="lg:col-span-5">
              <div className="lg:sticky lg:top-28 bg-cream-2/60 border border-line p-7 md:p-9 rounded-sm">
                <h2 className="display-serif text-2xl mb-2">
                  {loc(service.form?.title, locale) || t("getInTouch")}
                </h2>
                <p className="text-sm text-stone mb-6 leading-relaxed">
                  {loc(service.form?.description, locale) || t("getInTouchDescription")}
                </p>
                <ServiceLeadForm
                  formType={service.slug.current}
                  serviceTitle={title}
                  showBudget={service.form?.showBudget}
                  showDeadline={service.form?.showDeadline}
                  showOccasion={service.form?.showOccasion}
                  budgetOptions={(settings.budgetOptions || []).map((option) => ({ value: option.value || "", label: loc(option.label, locale) }))}
                />
              </div>
            </aside>}
          </div>
        </Container>
      </section>

      {service.gallery && service.gallery.length > 0 && (
        <section className="pb-24 md:pb-32">
          <Container>
            <Eyebrow align="center">
              {t("gallery")}
            </Eyebrow>
            <h2 className="display-serif mt-3 text-center mb-12">
              {t("workshopGallery")}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
              {service.gallery.map((media, idx) => (
                <div
                  key={media._key || `${media._type || "image"}-${idx}`}
                  className="relative aspect-square bg-cream-2 overflow-hidden rounded-sm"
                >
                  {media._type === "file" ? (
                    <video
                      className="absolute inset-0 h-full w-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      poster={media.poster?.asset?.url}
                      aria-label={loc(media.caption, locale) || title}
                    >
                      {media.asset?.url && (
                        <source src={media.asset.url} type={media.asset.mimeType || "video/mp4"} />
                      )}
                    </video>
                  ) : (
                    <SanityImage
                      image={media}
                      fill
                      sizes="(min-width: 768px) 33vw, 50vw"
                      alt={media.alt || title}
                    />
                  )}
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
