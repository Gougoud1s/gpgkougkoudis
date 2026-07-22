"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Check, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ProductGallery } from "./ProductGallery";
import { ProductCtas } from "./ProductCtas";
import { ReservationForm } from "./ReservationForm";
import { ProductCard } from "./ProductCard";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { formatPriceEUR, mapsLink } from "@/lib/utils";
import { loc, type Locale as L, type Product } from "@/sanity/types";

export function ProductDetail({
  product,
  categorySlug,
  categoryTitle,
  phone,
  address,
}: {
  product: Product;
  categorySlug: string;
  categoryTitle: string;
  phone: string;
  address: string;
}) {
  const locale = useLocale() as L;
  const t = useTranslations("product");
  const tc = useTranslations("common");
  const td = useTranslations("dynamic");
  const [showReservation, setShowReservation] = useState(false);

  return (
    <Container>
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <ProductGallery
          images={product.images || []}
          alt={loc(product.title, locale)}
        />

        <div>
          <Eyebrow>{categoryTitle}</Eyebrow>
          <h1 className="display-serif mt-4">{loc(product.title, locale)}</h1>

          <div className="mt-6 flex items-baseline gap-3">
            <p className="display-serif text-3xl text-charcoal">
              {product.priceOnRequest || !product.price
                ? tc("priceOnRequest")
                : formatPriceEUR(product.price)}
            </p>
            {product.sku && (
              <span className="text-xs uppercase tracking-[0.18em] text-stone-2">
                {t("sku")}: {product.sku}
              </span>
            )}
          </div>

          {product.availableInStore && (
            <a
              href={mapsLink(address)}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm bg-gold-soft/40 px-3 py-2 rounded-full text-gold-dark cursor-pointer hover:bg-gold-soft/70 smooth"
            >
              <Check className="size-4" aria-hidden="true" />
              {tc("availableInStore")} · {address}
              <MapPin className="size-3.5 ml-1" aria-hidden="true" />
            </a>
          )}

          {product.description && (
            <p className="mt-6 text-stone leading-relaxed">
              {loc(product.description, locale)}
            </p>
          )}

          {/* Specifications */}
          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-6 text-sm">
            {product.material && (
              <Spec
                label={t("material")}
                value={td(`materials.${product.material}` as never)}
              />
            )}
            {product.karat && (
              <Spec label={t("karat")} value={`${product.karat}K`} />
            )}
            {product.stone && (
              <Spec label={t("stone")} value={td(`stones.${product.stone}` as never)} />
            )}
            {product.weight && (
              <Spec label={t("weight")} value={`${product.weight} g`} />
            )}
            {product.dimensions && (
              <Spec label={t("dimensions")} value={product.dimensions} />
            )}
          </dl>

          <ProductCtas
            onReserveClick={() => setShowReservation(true)}
            phone={phone}
          />

          {showReservation && (
            <div className="mt-10 p-6 bg-cream-2/60 border border-line rounded-sm">
              <h3 className="display-serif text-2xl mb-4">
                {t("reserveForViewing")}
              </h3>
              <ReservationForm
                productTitle={loc(product.title, locale)}
                productSku={product.sku}
              />
            </div>
          )}
        </div>
      </div>

      {product.related && product.related.length > 0 && (
        <section className="mt-24 md:mt-32 pt-12 border-t border-line">
          <Eyebrow align="center">{t("relatedItems")}</Eyebrow>
          <h2 className="display-serif mt-3 text-center mb-12">
            {t("relatedItems")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-12">
            {product.related.map((related) => (
              <ProductCard
                key={related._id}
                product={related}
                categorySlug={categorySlug}
              />
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-[0.18em] text-stone-2 mb-1">
        {label}
      </dt>
      <dd className="text-charcoal">{value}</dd>
    </div>
  );
}
