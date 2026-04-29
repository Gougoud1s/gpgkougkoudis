"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SanityImage } from "@/components/ui/SanityImage";
import { formatPriceEUR } from "@/lib/utils";
import { loc, type Category, type Locale as L, type Product } from "@/sanity/types";

export function ProductCard({
  product,
  categorySlug,
}: {
  product: Product;
  categorySlug?: string;
}) {
  const locale = useLocale() as L;
  const slug =
    categorySlug ||
    (product.category && "slug" in product.category
      ? (product.category as Category).slug?.current
      : "");

  return (
    <Link
      href={`/collections/${slug}/${product.slug.current}`}
      className="group block cursor-pointer"
    >
      <div className="relative aspect-square bg-cream overflow-hidden mb-4">
        <SanityImage
          image={product.images?.[0]}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          alt={loc(product.title, locale)}
          className="smooth group-hover:scale-105"
        />
        {product.images?.[1] && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 smooth">
            <SanityImage
              image={product.images[1]}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              alt=""
            />
          </div>
        )}
      </div>
      <h3 className="display-serif text-xl text-charcoal smooth group-hover:text-gold-dark">
        {loc(product.title, locale)}
      </h3>
      <div className="mt-1 flex items-center gap-2 text-xs text-stone-2 uppercase tracking-[0.14em]">
        {product.material && (
          <span>
            {locale === "en"
              ? materialLabelEn(product.material)
              : materialLabelEl(product.material)}
          </span>
        )}
        {product.karat && (
          <>
            <span aria-hidden="true">·</span>
            <span>{product.karat}K</span>
          </>
        )}
      </div>
      <p className="mt-2 text-sm text-charcoal">
        {product.priceOnRequest || !product.price
          ? locale === "en"
            ? "Price on request"
            : "Τιμή κατόπιν αιτήματος"
          : formatPriceEUR(product.price)}
      </p>
    </Link>
  );
}

function materialLabelEl(m: string) {
  return {
    gold: "Χρυσός",
    "white-gold": "Λευκόχρυσος",
    "rose-gold": "Ροζ Χρυσός",
    silver: "Ασήμι",
    platinum: "Πλατίνα",
  }[m] ?? m;
}
function materialLabelEn(m: string) {
  return {
    gold: "Gold",
    "white-gold": "White Gold",
    "rose-gold": "Rose Gold",
    silver: "Silver",
    platinum: "Platinum",
  }[m] ?? m;
}
