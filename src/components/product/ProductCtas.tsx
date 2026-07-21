"use client";

import { useTranslations } from "next-intl";
import { MessageCircle, Phone, CalendarHeart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { telLink, whatsappLink } from "@/lib/utils";

export function ProductCtas({
  productTitle,
  productSku,
  onReserveClick,
  phone,
  whatsapp,
}: {
  productTitle: string;
  productSku?: string;
  onReserveClick?: () => void;
  phone: string;
  whatsapp: string;
}) {
  const t = useTranslations("product");
  const td = useTranslations("dynamic");

  const message = td("productInterest", {
    product: `"${productTitle}"`,
    sku: productSku ? td("productSku", { sku: productSku }) : "",
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-8">
      <a
        href={whatsappLink(message, whatsapp)}
        target="_blank"
        rel="noreferrer"
        data-event="product-whatsapp"
        className="contents"
      >
        <Button variant="gold" size="md" className="w-full">
          <MessageCircle className="size-4" aria-hidden="true" />
          {t("askOnWhatsapp")}
        </Button>
      </a>

      <Button
        variant="primary"
        size="md"
        className="w-full"
        type="button"
        onClick={onReserveClick}
        data-event="product-reserve"
      >
        <CalendarHeart className="size-4" aria-hidden="true" />
        {t("reserveForViewing")}
      </Button>

      <a
        href={telLink(phone)}
        data-event="product-call"
        className="contents"
      >
        <Button variant="outline" size="md" className="w-full">
          <Phone className="size-4" aria-hidden="true" />
          {t("callUs")}
        </Button>
      </a>
    </div>
  );
}
