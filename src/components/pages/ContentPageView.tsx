import { PortableText } from "@portabletext/react";
import { CalendarHeart, Gem, Hammer, ShieldCheck, Sparkles, Users } from "lucide-react";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SanityImage } from "@/components/ui/SanityImage";
import { Link } from "@/i18n/navigation";
import { getCategoryBySlug, getSiteSettings } from "@/sanity/fetch";
import { loc, type ContentPage, type Locale } from "@/sanity/types";

const icons = { sparkles: Sparkles, gem: Gem, shield: ShieldCheck, calendar: CalendarHeart, hammer: Hammer, users: Users };

export async function ContentPageView({ page, locale }: { page: ContentPage; locale: Locale }) {
  const settings = await getSiteSettings();
  const body = page.body?.[locale] || page.body?.el || page.body?.en || [];
  const hasHero = Boolean(page.heroImage);

  return (
    <>
      {hasHero ? (
        <section className="overflow-hidden border-b border-gold/15 bg-[#fbf7ef]">
          <div className="grid min-h-[68svh] lg:grid-cols-2">
            <Container className="flex items-center py-20 lg:py-28">
              <div className="max-w-xl"><Eyebrow>{loc(page.eyebrow, locale)}</Eyebrow><h1 className="display-serif mt-6 text-balance text-charcoal">{loc(page.title, locale)}</h1>{page.subtitle && <p className="mt-6 text-base leading-relaxed text-stone md:text-xl">{loc(page.subtitle, locale)}</p>}<span className="gold-rule mt-8" aria-hidden="true" /></div>
            </Container>
            <div className="relative min-h-[46svh] bg-white"><SanityImage image={page.heroImage} fill priority sizes="(min-width:1024px) 50vw, 100vw" alt={loc(page.title, locale)} className="object-contain p-5 md:p-10" /><div className="absolute inset-y-0 left-0 hidden w-20 bg-gradient-to-r from-[#fbf7ef] to-transparent lg:block" /></div>
          </div>
        </section>
      ) : (
        <PageHeader eyebrow={loc(page.eyebrow, locale)} title={loc(page.title, locale)} subtitle={loc(page.subtitle, locale)} />
      )}

      {Array.isArray(body) && body.length > 0 && (
        <section className="pb-20 md:pb-28"><Container size="narrow"><article className="prose-content text-stone leading-relaxed"><PortableText value={body as never} /></article></Container></section>
      )}

      {page.sections?.map(async (section, index) => {
        const key = section._key || `${section.kind}-${index}`;
        const title = loc(section.title, locale);
        const text = loc(section.text, locale);

        if (section.kind === "cards") return (
          <section key={key} className="py-20 md:py-28 bg-cream-2/40"><Container>
            {(title || section.eyebrow) && <div className="text-center mb-12"><Eyebrow align="center">{loc(section.eyebrow, locale)}</Eyebrow><h2 className="display-serif mt-4">{title}</h2></div>}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">{section.items?.map((item, itemIndex) => {
              const Icon = icons[(item.icon || "sparkles") as keyof typeof icons] || Sparkles;
              return <div key={item._key || itemIndex}><span className="inline-flex size-12 items-center justify-center rounded-full bg-gold-soft/40 text-gold-dark mb-4"><Icon className="size-5" aria-hidden="true" /></span><h3 className="display-serif text-2xl">{loc(item.title, locale)}</h3><p className="mt-2 text-sm text-stone leading-relaxed">{loc(item.text, locale)}</p></div>;
            })}</div>
          </Container></section>
        );

        if (section.kind === "imageText") return (
          <section key={key} className="py-20 md:py-28"><Container><div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] bg-cream-2"><SanityImage image={section.image} fill sizes="(min-width:1024px) 50vw, 100vw" alt={title} /></div>
            <div><Eyebrow>{loc(section.eyebrow, locale)}</Eyebrow><h2 className="display-serif mt-4">{title}</h2><p className="mt-6 text-stone leading-relaxed text-lg whitespace-pre-line">{text}</p>{section.ctaHref && <Link href={section.ctaHref}><Button className="mt-7" variant="outline">{loc(section.ctaLabel, locale)}</Button></Link>}</div>
          </div></Container></section>
        );

        if (section.kind === "products") {
          const category = await getCategoryBySlug(section.ctaHref || "wedding");
          return <section key={key} className="py-20 md:py-28 bg-cream-2/40"><Container><div className="text-center mb-12"><Eyebrow align="center">{loc(section.eyebrow, locale)}</Eyebrow><h2 className="display-serif mt-4">{title}</h2></div><div className="grid grid-cols-2 lg:grid-cols-4 gap-6">{category?.products?.slice(0, 4).map((product) => <ProductCard key={product._id} product={product} categorySlug={category.slug.current} />)}</div></Container></section>;
        }

        if (section.kind === "appointment") return (
          <section key={key} id="book" className="border-y border-gold/15 bg-[#fbf7ef] py-20 md:py-28"><Container><div className="grid lg:grid-cols-2 gap-12 lg:gap-20"><div><Eyebrow>{loc(section.eyebrow, locale)}</Eyebrow><h2 className="display-serif text-charcoal mt-4">{title}</h2><p className="mt-6 text-stone leading-relaxed text-lg">{text}</p></div><div className="border border-gold/20 bg-white p-7 shadow-soft md:p-9 text-charcoal"><AppointmentForm times={settings.appointmentTimes || []} attendees={settings.attendeeOptions || []} /></div></div></Container></section>
        );

        return <section key={key} className="py-16 md:py-24"><Container size="narrow"><Eyebrow>{loc(section.eyebrow, locale)}</Eyebrow><h2 className="display-serif mt-4">{title}</h2><p className="mt-6 text-stone leading-relaxed text-lg whitespace-pre-line">{text}</p></Container></section>;
      })}
    </>
  );
}
