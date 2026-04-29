import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ProductDetail } from "@/components/product/ProductDetail";
import { BreadcrumbJsonLd, ProductJsonLd } from "@/components/seo/JsonLd";
import { getProductBySlug } from "@/sanity/fetch";
import { loc } from "@/sanity/types";
import { SITE } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; category: string; product: string }>;
}) {
  const { locale, product } = await params;
  const data = await getProductBySlug(product);
  if (!data) return { title: "Not found" };
  return {
    title: loc(data.title, locale),
    description: loc(data.description, locale),
    openGraph: {
      images: [data.images?.[0]?.asset?.url ?? ""].filter(Boolean) as string[],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: Locale; category: string; product: string }>;
}) {
  const { locale, category, product } = await params;
  setRequestLocale(locale);

  const data = await getProductBySlug(product);
  if (!data) notFound();

  const categoryRef = data.category as
    | (import("@/sanity/types").Category & { slug?: { current: string } })
    | undefined;
  const categoryTitle = categoryRef ? loc(categoryRef.title, locale) : "";

  const title = loc(data.title, locale);
  const url = `${SITE.url}/${locale}/collections/${category}/${product}`;

  return (
    <article className="pt-12 md:pt-16 pb-24 md:pb-32">
      <ProductDetail
        product={data}
        categorySlug={category}
        categoryTitle={categoryTitle}
      />

      <ProductJsonLd
        name={title}
        image={data.images?.[0]?.asset?.url ?? ""}
        description={loc(data.description, locale)}
        sku={data.sku}
        price={data.price}
        url={url}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${SITE.url}/${locale}` },
          { name: "Collections", url: `${SITE.url}/${locale}/collections` },
          {
            name: categoryTitle,
            url: `${SITE.url}/${locale}/collections/${category}`,
          },
          { name: title, url },
        ]}
      />
    </article>
  );
}
