"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Input, Textarea, Label, FieldError } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const schema = z.object({
  name: z.string().min(2, "Required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  message: z.string().optional(),
  consent: z.boolean().refine((v) => v, "Required"),
});

type Values = z.infer<typeof schema>;

export function ReservationForm({
  productTitle,
  productSku,
  onSent,
}: {
  productTitle: string;
  productSku?: string;
  onSent?: () => void;
}) {
  const t = useTranslations("forms");
  const tCommon = useTranslations("common");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { consent: false },
  });

  async function onSubmit(values: Values) {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          subject: `Κράτηση για δοκιμή — ${productTitle}${
            productSku ? ` (${productSku})` : ""
          }`,
          formType: "reservation",
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
      onSent?.();
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-sm bg-gold-soft/50 p-6 text-center">
        <p className="display-serif text-xl text-charcoal">
          {tCommon("thankYou")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <Label htmlFor="name">{t("name")}</Label>
        <Input id="name" {...register("name")} />
        <FieldError>{errors.name?.message}</FieldError>
      </div>
      <div>
        <Label htmlFor="email">{t("email")}</Label>
        <Input id="email" type="email" {...register("email")} />
        <FieldError>{errors.email?.message}</FieldError>
      </div>
      <div>
        <Label htmlFor="phone">{t("phone")}</Label>
        <Input id="phone" type="tel" {...register("phone")} />
      </div>
      <div>
        <Label htmlFor="message">{t("message")}</Label>
        <Textarea id="message" rows={3} {...register("message")} />
      </div>
      <label className="flex items-start gap-3 text-xs text-stone leading-snug cursor-pointer">
        <input
          type="checkbox"
          className="mt-0.5 accent-gold"
          {...register("consent")}
        />
        <span>{t("consent")}</span>
      </label>
      <FieldError>{errors.consent?.message}</FieldError>

      <Button
        type="submit"
        variant="primary"
        size="md"
        className="w-full"
        disabled={status === "loading"}
      >
        {status === "loading" ? tCommon("sending") : tCommon("send")}
      </Button>

      {status === "error" && (
        <p className="text-sm text-red-700 text-center">
          {tCommon("errorMessage")}
        </p>
      )}
    </form>
  );
}
