import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SanityImage } from "@/components/ui/SanityImage";
import { ServiceLeadForm } from "@/components/forms/ServiceLeadForm";
import type { Service, Locale as L } from "@/sanity/types";
import { loc } from "@/sanity/types";

type Step = { title: string; text: string };

export function ServiceLayout({
  service,
  locale,
  intro,
  steps,
  highlights,
  formType,
  showBudget,
  showDeadline,
  showOccasion,
}: {
  service: Service;
  locale: L;
  intro: React.ReactNode;
  steps?: Step[];
  highlights?: { label: string; value: string }[];
  formType:
    | "custom-design"
    | "repairs"
    | "engraving"
    | "appraisals"
    | "buy-gold";
  showBudget?: boolean;
  showDeadline?: boolean;
  showOccasion?: boolean;
}) {
  const title = loc(service.title, locale);
  const tagline = loc(service.tagline, locale);

  return (
    <>
      <section className="bg-charcoal text-cream pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
        {service.image && (
          <div className="absolute inset-0 opacity-25">
            <SanityImage
              image={service.image}
              fill
              priority
              sizes="100vw"
              alt={title}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink to-ink/30" />
          </div>
        )}
        <Container className="relative z-10">
          <Eyebrow className="text-gold-light">
            {locale === "en" ? "Service" : "Υπηρεσία"}
          </Eyebrow>
          <h1 className="mt-4 text-cream text-balance">{title}</h1>
          {tagline && (
            <p className="mt-5 text-cream/80 text-base md:text-xl max-w-2xl">
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
                {intro}
              </div>

              {steps && steps.length > 0 && (
                <div className="mt-14">
                  <Eyebrow>
                    {locale === "en" ? "Our process" : "Η διαδικασία"}
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

            <aside className="lg:col-span-5">
              <div className="lg:sticky lg:top-28 bg-cream-2/60 border border-line p-7 md:p-9 rounded-sm">
                <h2 className="display-serif text-2xl mb-2">
                  {locale === "en" ? "Get in touch" : "Επικοινωνήστε μαζί μας"}
                </h2>
                <p className="text-sm text-stone mb-6 leading-relaxed">
                  {locale === "en"
                    ? "Tell us a few details and we'll get back to you within one business day."
                    : "Πείτε μας λίγα στοιχεία και θα επικοινωνήσουμε εντός μίας εργάσιμης ημέρας."}
                </p>
                <ServiceLeadForm
                  formType={formType}
                  serviceTitle={title}
                  showBudget={showBudget}
                  showDeadline={showDeadline}
                  showOccasion={showOccasion}
                />
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {service.gallery && service.gallery.length > 0 && (
        <section className="pb-24 md:pb-32">
          <Container>
            <Eyebrow align="center">
              {locale === "en" ? "Gallery" : "Έργα μας"}
            </Eyebrow>
            <h2 className="display-serif mt-3 text-center mb-12">
              {locale === "en" ? "From our workshop" : "Από το εργαστήριό μας"}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
              {service.gallery.map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-square bg-cream-2 overflow-hidden rounded-sm"
                >
                  <SanityImage
                    image={img}
                    fill
                    sizes="(min-width: 768px) 33vw, 50vw"
                    alt=""
                  />
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
