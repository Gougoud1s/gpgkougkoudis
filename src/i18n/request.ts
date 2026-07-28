import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { getUiText } from "@/sanity/fetch";
import { loc } from "@/sanity/types";

const RETIRED_UI_TEXT_KEYS = new Set([
  "common.availableInStore",
  "common.priceOnRequest",
  "collections.filterPrice",
  "dynamic.priceAll",
  "dynamic.productSku",
  "product.sku",
]);

function setNested(target: Record<string, unknown>, path: string, value: string) {
  const parts = path.split(".");
  let cursor = target;
  for (const part of parts.slice(0, -1)) {
    const current = cursor[part];
    cursor = current && typeof current === "object"
      ? current as Record<string, unknown>
      : (cursor[part] = {}) as Record<string, unknown>;
  }
  cursor[parts[parts.length - 1]] = value;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messages = structuredClone((await import(`../messages/${locale}.json`)).default) as Record<string, unknown>;
  const records = await getUiText();
  for (const record of records) {
    if (RETIRED_UI_TEXT_KEYS.has(record.key)) continue;
    const value = loc(record.value, locale);
    if (value) setNested(messages, record.key, value);
  }

  return {
    locale,
    messages,
  };
});
