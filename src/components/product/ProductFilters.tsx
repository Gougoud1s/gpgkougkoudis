"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/utils";
import type { Product } from "@/sanity/types";

type FilterState = {
  material: string[];
  karat: string[];
  stone: string[];
  occasion: string[];
  price: "all" | "under500" | "500-1500" | "over1500";
};

const initial: FilterState = {
  material: [],
  karat: [],
  stone: [],
  occasion: [],
  price: "all",
};

export function ProductFilters({
  products,
  categorySlug,
}: {
  products: Product[];
  categorySlug: string;
}) {
  const t = useTranslations("collections");
  const tCommon = useTranslations("common");
  const td = useTranslations("dynamic");
  const [filters, setFilters] = useState<FilterState>(initial);
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (filters.material.length && !filters.material.includes(p.material ?? "")) return false;
      if (filters.karat.length && !filters.karat.includes(p.karat ?? "")) return false;
      if (filters.stone.length && !filters.stone.includes(p.stone ?? "")) return false;
      if (filters.occasion.length) {
        const overlap = (p.occasion ?? []).some((o) => filters.occasion.includes(o));
        if (!overlap) return false;
      }
      if (filters.price !== "all") {
        const price = p.price ?? null;
        if (filters.price === "under500" && (price == null || price >= 500)) return false;
        if (
          filters.price === "500-1500" &&
          (price == null || price < 500 || price > 1500)
        )
          return false;
        if (filters.price === "over1500" && (price == null || price <= 1500)) return false;
      }
      return true;
    });
  }, [products, filters]);

  const counts = useMemo(() => {
    const result = {
      material: countBy(products, "material"),
      karat: countBy(products, "karat"),
      stone: countBy(products, "stone"),
      occasion: countByArray(products, "occasion"),
    };
    return result;
  }, [products]);

  function toggle(group: keyof Omit<FilterState, "price">, value: string) {
    setFilters((f) => {
      const arr = f[group];
      return {
        ...f,
        [group]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  }

  const activeCount =
    filters.material.length +
    filters.karat.length +
    filters.stone.length +
    filters.occasion.length +
    (filters.price !== "all" ? 1 : 0);

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      <aside
        className={cn(
          "lg:col-span-3",
          "lg:block",
          open ? "fixed inset-0 z-50 bg-cream overflow-y-auto p-6 lg:relative lg:bg-transparent lg:p-0 lg:inset-auto" : "hidden lg:block"
        )}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xs uppercase tracking-[0.22em] text-charcoal">
            {tCommon("filters")}
          </h2>
          <div className="flex items-center gap-3">
            {activeCount > 0 && (
              <button
                type="button"
                onClick={() => setFilters(initial)}
                className="text-xs underline text-stone hover:text-charcoal cursor-pointer"
              >
                {tCommon("clearFilters")}
              </button>
            )}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="lg:hidden cursor-pointer"
              aria-label="Close"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <FilterGroup label={t("filterMaterial")}>
          {Object.entries(counts.material).map(([value, count]) => (
            <CheckboxRow
              key={value}
              label={td(`materials.${value}` as never)}
              count={count}
              checked={filters.material.includes(value)}
              onChange={() => toggle("material", value)}
            />
          ))}
        </FilterGroup>

        <FilterGroup label={t("filterKarat")}>
          {Object.entries(counts.karat).map(([value, count]) => (
            <CheckboxRow
              key={value}
              label={`${value}K`}
              count={count}
              checked={filters.karat.includes(value)}
              onChange={() => toggle("karat", value)}
            />
          ))}
        </FilterGroup>

        <FilterGroup label={t("filterStone")}>
          {Object.entries(counts.stone).map(([value, count]) => (
            <CheckboxRow
              key={value}
              label={td(`stones.${value}` as never)}
              count={count}
              checked={filters.stone.includes(value)}
              onChange={() => toggle("stone", value)}
            />
          ))}
        </FilterGroup>

        <FilterGroup label={t("filterPrice")}>
          {[
            { v: "all", l: td("priceAll") },
            { v: "under500", l: "< 500€" },
            { v: "500-1500", l: "500€ – 1500€" },
            { v: "over1500", l: "> 1500€" },
          ].map(({ v, l }) => (
            <label
              key={v}
              className="flex items-center gap-3 py-2 text-sm cursor-pointer"
            >
              <input
                type="radio"
                name="price"
                checked={filters.price === v}
                onChange={() => setFilters((f) => ({ ...f, price: v as FilterState["price"] }))}
                className="accent-gold"
              />
              <span>{l}</span>
            </label>
          ))}
        </FilterGroup>

        {Object.keys(counts.occasion).length > 0 && (
          <FilterGroup label={t("filterOccasion")}>
            {Object.entries(counts.occasion).map(([value, count]) => (
              <CheckboxRow
                key={value}
                label={td(`occasionLabels.${value}` as never)}
                count={count}
                checked={filters.occasion.includes(value)}
                onChange={() => toggle("occasion", value)}
              />
            ))}
          </FilterGroup>
        )}

        {open && (
          <div className="mt-6 lg:hidden">
            <Button onClick={() => setOpen(false)} variant="primary" className="w-full">
              {td("results", { count: filtered.length })}
            </Button>
          </div>
        )}
      </aside>

      <div className="lg:col-span-9">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-stone">
            {td("results", { count: filtered.length })}
          </p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 text-sm text-charcoal cursor-pointer"
          >
            <SlidersHorizontal className="size-4" aria-hidden="true" />
            {tCommon("filters")}
            {activeCount > 0 && (
              <span className="ml-1 size-5 rounded-full bg-gold text-cream text-xs flex items-center justify-center">
                {activeCount}
              </span>
            )}
          </button>
        </div>

        {filtered.length === 0 ? (
          <div className="py-24 text-center text-stone">
            {tCommon("noResults")}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 md:gap-x-6 gap-y-12">
            {filtered.map((p) => (
              <ProductCard key={p._id} product={p} categorySlug={categorySlug} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <details open className="border-t border-line py-4 group">
      <summary className="flex items-center justify-between cursor-pointer list-none">
        <span className="text-xs uppercase tracking-[0.18em] text-charcoal">{label}</span>
        <span className="text-stone-2 group-open:rotate-45 smooth">+</span>
      </summary>
      <div className="mt-3">{children}</div>
    </details>
  );
}

function CheckboxRow({
  label,
  count,
  checked,
  onChange,
}: {
  label: string;
  count: number;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-3 py-1.5 text-sm cursor-pointer hover:text-charcoal">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="accent-gold"
      />
      <span className="flex-1">{label}</span>
      <span className="text-xs text-stone-2">({count})</span>
    </label>
  );
}

function countBy(products: Product[], key: keyof Product) {
  const counts: Record<string, number> = {};
  for (const p of products) {
    const v = p[key] as string | undefined;
    if (!v) continue;
    counts[v] = (counts[v] || 0) + 1;
  }
  return counts;
}

function countByArray(products: Product[], key: keyof Product) {
  const counts: Record<string, number> = {};
  for (const p of products) {
    const arr = p[key] as string[] | undefined;
    if (!Array.isArray(arr)) continue;
    for (const v of arr) {
      counts[v] = (counts[v] || 0) + 1;
    }
  }
  return counts;
}
