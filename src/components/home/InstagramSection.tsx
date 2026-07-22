import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SanityImage } from "@/components/ui/SanityImage";
import { InstagramIcon } from "@/components/ui/SocialIcons";
import { getInstagramPosts } from "@/lib/instagram";
import { loc, type Homepage, type Locale, type SiteSettings } from "@/sanity/types";

export async function InstagramSection({
  homepage,
  settings,
  locale,
}: {
  homepage: Homepage;
  settings: SiteSettings;
  locale: Locale;
}) {
  const profileUrl = settings.social?.instagram || "https://www.instagram.com/gp.gougoudis";
  const posts = await getInstagramPosts(homepage, locale, profileUrl);
  if (!posts.length) return null;

  const title = loc(homepage.instagramTitle, locale) || (locale === "el" ? "Ακολουθήστε την καθημερινότητά μας" : "Follow our daily inspiration");
  const text = loc(homepage.instagramText, locale) || (locale === "el" ? "Νέες δημιουργίες, λεπτομέρειες από το εργαστήριο και κοσμήματα που ξεχωρίζουν." : "New creations, workshop details and jewellery made to stand apart.");

  return (
    <section className="border-y border-gold/15 bg-white py-24 md:py-32">
      <Container>
        <div className="mb-12 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>Instagram</Eyebrow>
            <h2 className="display-serif mt-4 text-charcoal">{title}</h2>
            <p className="mt-5 max-w-xl leading-relaxed text-stone">{text}</p>
          </div>
          <a href={profileUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 self-start border-b border-gold pb-2 text-sm uppercase tracking-[0.16em] text-charcoal smooth hover:text-gold-dark md:self-auto">
            <InstagramIcon className="size-4" />
            @gp.gougoudis
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
          {posts.slice(0, 6).map((post) => (
            <a key={post.id} href={post.url} target="_blank" rel="noreferrer" className="group relative aspect-square overflow-hidden bg-cream-2" aria-label={post.caption || "View post on Instagram"}>
              <SanityImage image={post.image} fill sizes="(min-width: 768px) 33vw, 50vw" alt={post.caption} className="smooth group-hover:scale-[1.035]" />
              <span className="absolute inset-0 flex items-center justify-center bg-charcoal/0 text-white opacity-0 smooth group-hover:bg-charcoal/20 group-hover:opacity-100"><InstagramIcon className="size-7" /></span>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
