import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SanityImage } from "@/components/ui/SanityImage";
import { InstagramIcon } from "@/components/ui/SocialIcons";
import { getInstagramPosts, getInstagramProfile } from "@/lib/instagram";
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
  const [posts, profile] = await Promise.all([
    getInstagramPosts(homepage, locale, profileUrl),
    getInstagramProfile(),
  ]);
  if (!posts.length) return null;

  const title = loc(homepage.instagramTitle, locale) || (locale === "el" ? "Ακολουθήστε την καθημερινότητά μας" : "Follow our daily inspiration");
  const text = loc(homepage.instagramText, locale) || (locale === "el" ? "Νέες δημιουργίες, λεπτομέρειες από το εργαστήριο και κοσμήματα που ξεχωρίζουν." : "New creations, workshop details and jewellery made to stand apart.");
  const cmsProfile = homepage.instagramProfile;
  const displayName = cmsProfile?.displayName || profile.name || "GP GOUGOUDIS";
  const username = cmsProfile?.username || profile.username || "gp.gougoudis";

  return (
    <section className="border-y border-gold/15 bg-white py-24 md:py-32">
      <Container>
        <div className="mb-10 max-w-2xl">
          <Eyebrow>Instagram</Eyebrow>
          <h2 className="display-serif mt-4 text-charcoal">{title}</h2>
          <p className="mt-5 max-w-xl leading-relaxed text-stone">{text}</p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_24px_70px_-48px_rgba(28,25,23,0.45)]">
          <div className="flex flex-col gap-6 px-5 py-6 sm:flex-row sm:items-center sm:px-8 md:px-10">
            <div className="flex min-w-0 items-center gap-4">
              <div className="rounded-full bg-gradient-to-tr from-amber-400 via-fuchsia-500 to-violet-600 p-[3px]">
                <div className="relative size-16 overflow-hidden rounded-full bg-white p-2 sm:size-[4.5rem]">
                  <SanityImage
                    image={profile.imageUrl ? { asset: { url: profile.imageUrl } } : cmsProfile?.profileImage || settings.logo}
                    fill
                    sizes="72px"
                    alt={displayName}
                    className="object-contain p-2"
                  />
                </div>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="truncate font-sans text-base font-semibold tracking-tight text-charcoal sm:text-lg">{displayName}</h3>
                  <InstagramIcon className="size-4 shrink-0 text-[#0095f6]" aria-label="Instagram profile" />
                </div>
                <p className="text-sm text-stone-2">@{username}</p>
              </div>
            </div>

            <div className="grid flex-1 grid-cols-3 gap-4 text-center sm:ml-auto sm:max-w-sm">
              <Metric value={formatMetric(profile.mediaCount ?? cmsProfile?.postCount ?? posts.length)} label={locale === "el" ? "Δημοσιεύσεις" : "Posts"} />
              <Metric value={formatMetric(profile.followersCount ?? cmsProfile?.followersCount)} label={locale === "el" ? "Ακόλουθοι" : "Followers"} />
              <Metric value={formatMetric(profile.followingCount ?? cmsProfile?.followingCount)} label={locale === "el" ? "Ακολουθεί" : "Following"} />
            </div>

            <a href={profileUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#0095f6] px-5 text-sm font-semibold text-white smooth hover:bg-[#1877f2]">
              <InstagramIcon className="size-4" />
              {locale === "el" ? "Ακολουθήστε" : "Follow"}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-px bg-line md:grid-cols-3">
            {posts.slice(0, 6).map((post) => (
              <a key={post.id} href={post.url} target="_blank" rel="noreferrer" className="group relative aspect-square overflow-hidden bg-white" aria-label={post.caption || "View post on Instagram"}>
                <SanityImage image={post.image} fill sizes="(min-width: 768px) 33vw, 50vw" alt={post.caption} className="smooth group-hover:scale-[1.035]" />
                <span className="absolute inset-0 flex items-center justify-center bg-charcoal/0 text-white opacity-0 smooth group-hover:bg-charcoal/20 group-hover:opacity-100"><InstagramIcon className="size-7" /></span>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return <div><span className="block text-sm font-semibold text-charcoal sm:text-base">{value}</span><span className="mt-0.5 block text-[0.65rem] text-stone-2 sm:text-xs">{label}</span></div>;
}

function formatMetric(value?: number) {
  if (value == null) return "—";
  return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(value);
}
