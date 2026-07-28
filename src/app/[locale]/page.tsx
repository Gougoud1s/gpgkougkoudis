import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Services } from "@/components/home/Services";
import { StorySection } from "@/components/home/StorySection";
import { ReviewsCarousel } from "@/components/home/ReviewsCarousel";
import { VisitUs } from "@/components/home/VisitUs";
import { InstagramSection } from "@/components/home/InstagramSection";
import { getHomepage, getSiteSettings } from "@/sanity/fetch";
import type { Locale } from "@/i18n/routing";
import { loc } from "@/sanity/types";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [homepage, settings] = await Promise.all([
    getHomepage(),
    getSiteSettings(),
  ]);

  const featuredCategories = homepage.featuredCollections ?? [];
  const featuredProducts = homepage.featuredProducts ?? [];
  const featuredServices = homepage.featuredServices ?? [];
  const featuredTestimonials = homepage.featuredTestimonials ?? [];
  const hasRating = settings.googleRating != null && settings.googleReviewCount != null;
  const hasStory = Boolean(
    loc(homepage.storyTitle, locale) && loc(homepage.storyText, locale)
  );
  const hasVisitDetails = Boolean(loc(settings.address, locale) && settings.phoneDisplay);

  return (
    <>
      <Hero homepage={homepage} settings={settings} showTrustBar={homepage.showTrustBar !== false && hasRating} />
      {homepage.showFeaturedCollections !== false && featuredCategories.length > 0 && <FeaturedCollections categories={featuredCategories} />}
      {homepage.showFeaturedProducts !== false && featuredProducts.length > 0 && <FeaturedProducts products={featuredProducts} />}
      {homepage.showInstagram !== false && <InstagramSection homepage={homepage} settings={settings} locale={locale} />}
      {homepage.showFeaturedServices !== false && featuredServices.length > 0 && <Services services={featuredServices} />}
      {homepage.showStory !== false && hasStory && <StorySection homepage={homepage} />}
      {homepage.showReviews !== false && hasRating && featuredTestimonials.length > 0 && <ReviewsCarousel testimonials={featuredTestimonials} settings={settings} />}
      {homepage.showVisit !== false && hasVisitDetails && <VisitUs settings={settings} />}
    </>
  );
}
