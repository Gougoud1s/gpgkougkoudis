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
  subject: z.string().optional(),
  message: z.string().min(5, "Required"),
  consent: z.boolean().refine((v) => v, "Required"),
});

type Values = z.infer<typeof schema>;

export function ContactForm() {
  const t = useTranslations("contact.form");
  const tForms = useTranslations("forms");
  const tCommon = useTranslations("common");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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
        body: JSON.stringify({ ...values, formType: "contact" }),
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-sm bg-gold-soft/50 p-8 text-center">
        <p className="display-serif text-2xl text-charcoal">{tCommon("thankYou")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="contact-name">{t("name")}</Label>
          <Input id="contact-name" {...register("name")} />
          <FieldError>{errors.name?.message}</FieldError>
        </div>
        <div>
          <Label htmlFor="contact-email">{t("email")}</Label>
          <Input id="contact-email" type="email" {...register("email")} />
          <FieldError>{errors.email?.message}</FieldError>
        </div>
        <div>
          <Label htmlFor="contact-phone">{t("phone")}</Label>
          <Input id="contact-phone" type="tel" {...register("phone")} />
        </div>
        <div>
          <Label htmlFor="contact-subject">{t("subject")}</Label>
          <Input id="contact-subject" {...register("subject")} />
        </div>
      </div>
      <div>
        <Label htmlFor="contact-message">{t("message")}</Label>
        <Textarea id="contact-message" rows={5} {...register("message")} />
        <FieldError>{errors.message?.message}</FieldError>
      </div>
      <label className="flex items-start gap-3 text-xs text-stone leading-snug cursor-pointer">
        <input type="checkbox" className="mt-0.5 accent-gold" {...register("consent")} />
        <span>{tForms("consent")}</span>
      </label>
      <FieldError>{errors.consent?.message}</FieldError>

      <Button type="submit" variant="primary" size="lg" disabled={status === "loading"}>
        {status === "loading" ? tCommon("sending") : t("submit")}
      </Button>

      {status === "error" && (
        <p className="text-sm text-red-700">{tCommon("errorMessage")}</p>
      )}
    </form>
  );
}
