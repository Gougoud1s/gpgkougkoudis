import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ProductDetail } from "@/components/product/ProductDetail";
import { BreadcrumbJsonLd, ProductJsonLd } from "@/components/seo/JsonLd";
import { getProductBySlug, getSiteSettings } from "@/sanity/fetch";
import { loc } from "@/sanity/types";
import type { Locale } from "@/i18n/routing";
import { localizedMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; category: string; product: string }>;
}) {
  const { locale, category, product } = await params;
  const data = await getProductBySlug(product);
  if (!data) return { title: "Not found" };
  return localizedMetadata({
    locale,
    path: `collections/${category}/${product}`,
    title: loc(data.title, locale),
    description: loc(data.description, locale),
    images: [data.images?.[0]?.asset?.url ?? ""],
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: Locale; category: string; product: string }>;
}) {
  const { locale, category, product } = await params;
  setRequestLocale(locale);

  const [data, settings] = await Promise.all([getProductBySlug(product), getSiteSettings()]);
  if (!data) notFound();

  const categoryRef = data.category as
    | (import("@/sanity/types").Category & { slug?: { current: string } })
    | undefined;
  const categoryTitle = categoryRef ? loc(categoryRef.title, locale) : "";

  const title = loc(data.title, locale);
  const siteUrl = settings.siteUrl || "http://localhost:3000";
  const url = `${siteUrl}/${locale}/collections/${category}/${product}`;

  return (
    <article className="pt-12 md:pt-16 pb-24 md:pb-32">
      <ProductDetail
        product={data}
        categorySlug={category}
        categoryTitle={categoryTitle}
        phone={settings.phoneTel || ""}
        address={loc(settings.address, locale)}
      />

      <ProductJsonLd
        name={title}
        image={data.images?.[0]?.asset?.url ?? ""}
        description={loc(data.description, locale)}
        sku={data.sku}
        price={data.price}
        url={url}
        brand={loc(settings.brand, locale)}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${siteUrl}/${locale}` },
          { name: "Collections", url: `${siteUrl}/${locale}/collections` },
          {
            name: categoryTitle,
            url: `${siteUrl}/${locale}/collections/${category}`,
          },
          { name: title, url },
        ]}
      />
    </article>
  );
}
