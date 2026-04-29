import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductFilters } from "@/components/product/ProductFilters";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getCategoryBySlug } from "@/sanity/fetch";
import { loc } from "@/sanity/types";
import { SITE } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; category: string }>;
}) {
  const { locale, category } = await params;
  const cat = await getCategoryBySlug(category);
  if (!cat) return { title: "Not found" };
  const title = loc(cat.title, locale);
  return {
    title,
    description: loc(cat.description, locale),
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: Locale; category: string }>;
}) {
  const { locale, category } = await params;
  setRequestLocale(locale);

  const cat = await getCategoryBySlug(category);
  if (!cat) notFound();

  const title = loc(cat.title, locale);
  const subtitle = loc(cat.description, locale);

  return (
    <>
      <PageHeader
        eyebrow={locale === "en" ? "Collection" : "Συλλογή"}
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
              {locale === "en"
                ? "Coming soon. Please contact us to enquire about this collection."
                : "Σύντομα κοντά σας. Επικοινωνήστε μαζί μας για περισσότερες πληροφορίες."}
            </div>
          )}
        </Container>
      </section>

      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${SITE.url}/${locale}` },
          { name: "Collections", url: `${SITE.url}/${locale}/collections` },
          { name: title, url: `${SITE.url}/${locale}/collections/${category}` },
        ]}
      />
    </>
  );
}
