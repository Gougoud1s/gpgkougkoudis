import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductFilters } from "@/components/product/ProductFilters";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getCategoryBySlug, getSiteSettings } from "@/sanity/fetch";
import { loc } from "@/sanity/types";
import type { Locale } from "@/i18n/routing";
import { localizedMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; category: string }>;
}) {
  const { locale, category } = await params;
  const cat = await getCategoryBySlug(category);
  if (!cat) return { title: "Not found" };
  const title = loc(cat.title, locale);
  return localizedMetadata({
    locale,
    path: `collections/${category}`,
    title,
    description: loc(cat.description, locale),
    images: [cat.image?.asset?.url || ""],
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: Locale; category: string }>;
}) {
  const { locale, category } = await params;
  setRequestLocale(locale);

  const [cat, settings] = await Promise.all([getCategoryBySlug(category), getSiteSettings()]);
  if (!cat) notFound();

  const title = loc(cat.title, locale);
  const subtitle = loc(cat.description, locale);
  const td = await getTranslations({ locale, namespace: "dynamic" });
  const siteUrl = settings.siteUrl || "http://localhost:3000";

  return (
    <>
      <PageHeader
        eyebrow={td("collection")}
        title={title}
        subtitle={subtitle}
      />

      <section className="pb-24 md:pb-32">
        <Container>
          {cat.products && cat.products.length > 0 ? (
            <ProductFilters
              products={cat.products}
              categorySlug={category}
            />
          ) : (
            <div className="py-24 text-center text-stone">
              {td("comingSoon")}
            </div>
          )}
        </Container>
      </section>

      <BreadcrumbJsonLd
        items={[
          { name: td("backHome"), url: `${siteUrl}/${locale}` },
          { name: td("allCollections"), url: `${siteUrl}/${locale}/collections` },
          { name: title, url: `${siteUrl}/${locale}/collections/${category}` },
        ]}
      />
    </>
  );
}
