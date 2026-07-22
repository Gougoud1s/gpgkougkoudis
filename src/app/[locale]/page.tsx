import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Services } from "@/components/home/Services";
import { StorySection } from "@/components/home/StorySection";
import { ReviewsCarousel } from "@/components/home/ReviewsCarousel";
import { VisitUs } from "@/components/home/VisitUs";
import { InstagramSection } from "@/components/home/InstagramSection";
import { getCategories, getHomepage, getServices, getSiteSettings, getTestimonials } from "@/sanity/fetch";
import type { Locale } from "@/i18n/routing";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [homepage, categories, services, testimonials, settings] = await Promise.all([
    getHomepage(),
    getCategories(),
    getServices(),
    getTestimonials(),
    getSiteSettings(),
  ]);

  const featuredCategories =
    homepage.featuredCollections?.length
      ? homepage.featuredCollections
      : categories.filter((c) => c.featured).slice(0, 4);

  const featuredProducts = homepage.featuredProducts ?? [];

  const featuredServices =
    homepage.featuredServices?.length ? homepage.featuredServices : services.slice(0, 6);

  const featuredTestimonials =
    homepage.featuredTestimonials?.length
      ? homepage.featuredTestimonials
      : testimonials.slice(0, 6);

  return (
    <>
      <Hero homepage={homepage} settings={settings} />
      <FeaturedCollections categories={featuredCategories} />
      {featuredProducts.length > 0 && <FeaturedProducts products={featuredProducts} />}
      <InstagramSection homepage={homepage} settings={settings} locale={locale} />
      <Services services={featuredServices} />
      <StorySection homepage={homepage} />
      <ReviewsCarousel testimonials={featuredTestimonials} settings={settings} />
      <VisitUs settings={settings} />
    </>
  );
}
