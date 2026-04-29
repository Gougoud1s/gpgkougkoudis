"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SanityImage } from "@/components/ui/SanityImage";
import { formatPriceEUR } from "@/lib/utils";
import { loc, type Locale as L, type Product } from "@/sanity/types";

export function FeaturedProducts({ products }: { products: Product[] }) {
  const locale = useLocale() as L;
  if (!products?.length) return null;

  return (
    <section className="py-24 md:py-32 bg-cream-2/40">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Eyebrow align="center">
            {locale === "en" ? "Selected pieces" : "Επιλεγμένα κομμάτια"}
          </Eyebrow>
          <h2 className="display-serif mt-4">
            {locale === "en"
              ? "Curated highlights from our showcase"
              : "Επιλεγμένα από τη βιτρίνα μας"}
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12">
          {products.slice(0, 8).map((product, idx) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.5,
                delay: idx * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={`/collections/${
                  product.category && "slug" in product.category
                    ? product.category.slug?.current ?? ""
                    : ""
                }/${product.slug.current}`}
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
                </div>
                <h3 className="display-serif text-xl md:text-2xl text-charcoal smooth group-hover:text-gold-dark">
                  {loc(product.title, locale)}
                </h3>
                <p className="mt-1 text-sm text-stone-2">
                  {product.priceOnRequest || !product.price
                    ? locale === "en"
                      ? "Price on request"
                      : "Τιμή κατόπιν αιτήματος"
                    : formatPriceEUR(product.price)}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
