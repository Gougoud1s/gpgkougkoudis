import { setRequestLocale, getTranslations } from "next-intl/server";
import { CalendarHeart, Sparkles, Gem, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { SanityImage } from "@/components/ui/SanityImage";
import { ProductCard } from "@/components/product/ProductCard";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { Link } from "@/i18n/navigation";
import { fallbackProducts } from "@/sanity/fallback";
import { getCategoryBySlug } from "@/sanity/fetch";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "wedding" });
  return { title: t("title"), description: t("heroSubtitle") };
}

const HERO_IMAGE = {
  asset: {
    url: "https://images.unsplash.com/photo-1521334884684-d80222895322?w=2000&q=80",
  },
  alt: "Wedding rings",
};

export default async function WeddingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "wedding" });

  const weddingCategory = await getCategoryBySlug("wedding");
  const featured =
    weddingCategory?.products?.length
      ? weddingCategory.products
      : fallbackProducts.filter(
          (p) =>
            p.occasion?.includes("wedding") || p.occasion?.includes("engagement")
        );

  const benefits =
    locale === "en"
      ? [
          { icon: Sparkles, title: "Timeless craftsmanship", text: "Each ring made by master goldsmiths in our own atelier." },
          { icon: Gem, title: "Certified diamonds", text: "Ethically sourced, with full GIA / IGI certification on request." },
          { icon: ShieldCheck, title: "Lifetime care", text: "Free polishing and rhodium plating for the lifetime of the ring." },
          { icon: CalendarHeart, title: "Private viewings", text: "Quiet, no-rush appointments at the Petroupoli store." },
        ]
      : [
          { icon: Sparkles, title: "Διαχρονική τέχνη", text: "Κάθε βέρα και μονόπετρο δουλεύεται στο δικό μας εργαστήριο." },
          { icon: Gem, title: "Πιστοποιημένα διαμάντια", text: "Με πιστοποιήσεις GIA / IGI κατόπιν αιτήματος." },
          { icon: ShieldCheck, title: "Διά βίου φροντίδα", text: "Δωρεάν γυάλισμα και επιροδίωση για όλη τη ζωή του κοσμήματος." },
          { icon: CalendarHeart, title: "Ιδιωτικές παρουσιάσεις", text: "Ήρεμα ραντεβού στο κατάστημα στην Πετρούπολη." },
        ];

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-end overflow-hidden bg-charcoal text-cream">
        <div className="absolute inset-0">
          <SanityImage image={HERO_IMAGE} fill priority sizes="100vw" alt="Wedding rings" className="opacity-65" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
        </div>
        <Container className="relative z-10 pb-20 lg:pb-28 pt-32">
          <div className="max-w-3xl">
            <Eyebrow className="text-gold-light">{t("eyebrow")}</Eyebrow>
            <h1 className="display-serif text-cream mt-6 text-balance">{t("title")}</h1>
            <p className="mt-6 text-cream/80 text-base md:text-xl leading-relaxed max-w-xl">
              {t("heroSubtitle")}
            </p>
            <div className="mt-10">
              <a href="#book">
                <Button variant="gold" size="lg">
                  <CalendarHeart className="size-4" aria-hidden="true" />
                  {t("ctaBookViewing")}
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {benefits.map(({ icon: Icon, title, text }) => (
              <div key={title}>
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-gold-soft/40 text-gold-dark mb-4">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="display-serif text-2xl text-charcoal">{title}</h3>
                <p className="mt-2 text-sm text-stone leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured rings */}
      <section className="py-24 md:py-32 bg-cream-2/40">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow align="center">
              {locale === "en" ? "Featured" : "Επιλεγμένα"}
            </Eyebrow>
            <h2 className="display-serif mt-4">
              {locale === "en"
                ? "Wedding bands & engagement rings"
                : "Βέρες & μονόπετρα"}
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-12">
            {featured.slice(0, 4).map((p) => (
              <ProductCard key={p._id} product={p} categorySlug="wedding" />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/collections/wedding">
              <Button variant="outline" size="md">
                {locale === "en" ? "View collection" : "Δείτε όλη τη συλλογή"}
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Booking */}
      <section id="book" className="py-24 md:py-32 bg-charcoal text-cream">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <Eyebrow className="text-gold-light">
                {locale === "en" ? "Private viewing" : "Ιδιωτική παρουσίαση"}
              </Eyebrow>
              <h2 className="display-serif text-cream mt-4">{t("ctaBookViewing")}</h2>
              <p className="mt-6 text-cream/80 leading-relaxed text-base md:text-lg">
                {locale === "en"
                  ? "Book a quiet, unhurried appointment at our Petroupoli store. We'll prepare a private viewing tailored to your taste, budget and timeline. No obligation."
                  : "Κλείστε ένα ήρεμο ραντεβού στο κατάστημά μας στην Πετρούπολη. Θα ετοιμάσουμε μια ιδιωτική παρουσίαση προσαρμοσμένη στο γούστο, τον προϋπολογισμό και τον χρόνο σας. Χωρίς υποχρέωση."}
              </p>
            </div>
            <div className="bg-cream rounded-sm p-7 md:p-9 text-charcoal">
              <AppointmentForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
