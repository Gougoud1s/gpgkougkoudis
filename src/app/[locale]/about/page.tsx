import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight, Hammer, Gem, ShieldCheck, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { SanityImage } from "@/components/ui/SanityImage";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title"), description: t("subtitle") };
}

const STORY_IMAGE = {
  asset: { url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600&q=80" },
  alt: "Workshop",
};

const WORKSHOP_IMAGE = {
  asset: { url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1600&q=80" },
  alt: "Goldsmith at work",
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });

  const values =
    locale === "en"
      ? [
          { icon: Hammer, title: "Craftsmanship", text: "Every piece passes through experienced hands in our workshop." },
          { icon: Gem, title: "Materials", text: "Only certified gold, white gold, platinum and reputable stones." },
          { icon: ShieldCheck, title: "Trust", text: "Honest pricing, transparent appraisals, and no pressure to buy." },
          { icon: Users, title: "Family", text: "Three generations of Kougkoudis brothers, neighbours and friends." },
        ]
      : [
          { icon: Hammer, title: "Τέχνη", text: "Κάθε κόσμημα περνά από έμπειρα χέρια στο εργαστήριό μας." },
          { icon: Gem, title: "Υλικά", text: "Μόνο πιστοποιημένος χρυσός, λευκόχρυσος, πλατίνα και αξιόπιστες πέτρες." },
          { icon: ShieldCheck, title: "Εμπιστοσύνη", text: "Έντιμες τιμές, διαφανείς εκτιμήσεις, καμία πίεση για αγορά." },
          { icon: Users, title: "Οικογένεια", text: "Τρεις γενιές αδελφών Γκουγκούδη, γείτονες και φίλοι." },
        ];

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

      <section className="pb-16 md:pb-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative aspect-[4/5]">
              <SanityImage
                image={STORY_IMAGE}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                alt="Story"
              />
            </div>
            <div>
              <Eyebrow>{t("missionTitle")}</Eyebrow>
              <h2 className="display-serif mt-4">{t("missionTitle")}</h2>
              <p className="mt-6 text-stone leading-relaxed text-base md:text-lg">
                {t("missionText")}
              </p>
              <p className="mt-5 text-stone leading-relaxed">
                {locale === "en"
                  ? "From our small workshop on Sirrakou Street, we have crafted wedding bands, christening crosses and one-of-a-kind pieces for thousands of families in Western Athens. We're proud to be the jeweler many of our clients call \"the family one\" — and we don't take that lightly."
                  : "Από το μικρό μας εργαστήριο στην οδό Σιρράκου, έχουμε φτιάξει βέρες, σταυρούς βαπτίσεως και μοναδικά κοσμήματα για χιλιάδες οικογένειες στα δυτικά της Αθήνας. Είμαστε υπερήφανοι που πολλοί πελάτες μας μάς λένε «ο χρυσοχόος της οικογένειας» — και δεν το παίρνουμε αψήφιστα."}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24 bg-cream-2/40">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map(({ icon: Icon, title, text }) => (
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

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1">
              <Eyebrow>{locale === "en" ? "The workshop" : "Το εργαστήριο"}</Eyebrow>
              <h2 className="display-serif mt-4">
                {locale === "en"
                  ? "Where every piece is born"
                  : "Εκεί που γεννιέται κάθε κόσμημα"}
              </h2>
              <p className="mt-6 text-stone leading-relaxed">
                {locale === "en"
                  ? "Behind the showroom is our atelier, where master goldsmiths design, cast, set and finish each piece by hand. Our equipment is modern, but the techniques have been passed down through three generations."
                  : "Πίσω από τη βιτρίνα βρίσκεται το εργαστήριό μας, όπου έμπειροι χρυσοχόοι σχεδιάζουν, χυτεύουν, καρφώνουν και φινίρουν κάθε κόσμημα στο χέρι. Ο εξοπλισμός μας είναι σύγχρονος, αλλά οι τεχνικές περνούν από γενιά σε γενιά εδώ και τρεις δεκαετίες."}
              </p>
              <Link href="/services" className="inline-block mt-7">
                <Button variant="outline" size="md">
                  {locale === "en" ? "Discover services" : "Δείτε τις υπηρεσίες"}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Button>
              </Link>
            </div>
            <div className="order-1 lg:order-2 relative aspect-[4/3]">
              <SanityImage
                image={WORKSHOP_IMAGE}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                alt="Workshop"
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
