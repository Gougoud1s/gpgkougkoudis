"use client";

import { useTranslations } from "next-intl";
import { Phone, CalendarHeart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { telLink } from "@/lib/utils";

export function ProductCtas({
  onReserveClick,
  phone,
}: {
  onReserveClick?: () => void;
  phone: string;
}) {
  const t = useTranslations("product");
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-8">
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
