"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Input, Textarea, Label, FieldError, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const schema = z.object({
  name: z.string().min(2, "Required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(8, "Required"),
  preferredDate: z.string().min(1, "Required"),
  preferredTime: z.string().min(1, "Required"),
  attendees: z.string().optional(),
  message: z.string().optional(),
  consent: z.boolean().refine((v) => v, "Required"),
});

type Values = z.infer<typeof schema>;

export function AppointmentForm() {
  const t = useTranslations("forms");
  const tCommon = useTranslations("common");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { consent: false, attendees: "2", preferredTime: "11:00" },
  });

  async function onSubmit(values: Values) {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          subject: `Ραντεβού — Γάμος & Αρραβώνας (${values.preferredDate} ${values.preferredTime})`,
          formType: "appointment",
          message: `Άτομα: ${values.attendees || 2}\n\n${values.message || ""}`,
        }),
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
        <p className="display-serif text-2xl text-charcoal">
          {tCommon("thankYou")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="apt-name">{t("name")}</Label>
          <Input id="apt-name" {...register("name")} />
          <FieldError>{errors.name?.message}</FieldError>
        </div>
        <div>
          <Label htmlFor="apt-email">{t("email")}</Label>
          <Input id="apt-email" type="email" {...register("email")} />
          <FieldError>{errors.email?.message}</FieldError>
        </div>
        <div>
          <Label htmlFor="apt-phone">{t("phone")}</Label>
          <Input id="apt-phone" type="tel" {...register("phone")} />
          <FieldError>{errors.phone?.message}</FieldError>
        </div>
        <div>
          <Label htmlFor="apt-attendees">Άτομα</Label>
          <Select id="apt-attendees" {...register("attendees")}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4+</option>
          </Select>
        </div>
        <div>
          <Label htmlFor="apt-date">Ημερομηνία</Label>
          <Input id="apt-date" type="date" {...register("preferredDate")} />
          <FieldError>{errors.preferredDate?.message}</FieldError>
        </div>
        <div>
          <Label htmlFor="apt-time">Ώρα</Label>
          <Select id="apt-time" {...register("preferredTime")}>
            <option value="10:00">10:00</option>
            <option value="11:00">11:00</option>
            <option value="12:00">12:00</option>
            <option value="13:00">13:00</option>
            <option value="18:00">18:00</option>
            <option value="19:00">19:00</option>
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="apt-message">Σημείωση (προαιρετικό)</Label>
        <Textarea id="apt-message" rows={3} {...register("message")} />
      </div>
      <label className="flex items-start gap-3 text-xs text-stone leading-snug cursor-pointer">
        <input type="checkbox" className="mt-0.5 accent-gold" {...register("consent")} />
        <span>{t("consent")}</span>
      </label>
      <FieldError>{errors.consent?.message}</FieldError>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={status === "loading"}
      >
        {status === "loading" ? tCommon("sending") : "Κλείσιμο ραντεβού"}
      </Button>

      {status === "error" && (
        <p className="text-sm text-red-700 text-center">
          {tCommon("errorMessage")}
        </p>
      )}
    </form>
  );
}
