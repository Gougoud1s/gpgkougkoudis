"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Input, Textarea, Label, FieldError, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const makeSchema = (required: string, invalidEmail: string, messageTooShort: string) => z.object({
  name: z.string().min(2, required),
  email: z.string().email(invalidEmail),
  phone: z.string().optional(),
  message: z.string().min(10, messageTooShort),
  budget: z.string().optional(),
  deadline: z.string().optional(),
  occasion: z.string().optional(),
  consent: z.boolean().refine((v) => v === true, required),
});

type Values = z.infer<ReturnType<typeof makeSchema>>;

type Props = {
  formType: string;
  serviceTitle: string;
  showBudget?: boolean;
  showDeadline?: boolean;
  showOccasion?: boolean;
  budgetOptions?: Array<{ value: string; label: string }>;
};

export function ServiceLeadForm({
  formType,
  serviceTitle,
  showBudget = false,
  showDeadline = false,
  showOccasion = false,
  budgetOptions = [],
}: Props) {
  const t = useTranslations("forms");
  const tCommon = useTranslations("common");
  const schema = makeSchema(t("required"), t("invalidEmail"), t("messageTooShort"));
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
        body: JSON.stringify({
          ...values,
          subject: t("serviceRequestSubject", { service: serviceTitle }),
          formType,
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor={`${formType}-name`}>{t("name")}</Label>
          <Input id={`${formType}-name`} {...register("name")} />
          <FieldError>{errors.name?.message}</FieldError>
        </div>
        <div>
          <Label htmlFor={`${formType}-email`}>{t("email")}</Label>
          <Input id={`${formType}-email`} type="email" {...register("email")} />
          <FieldError>{errors.email?.message}</FieldError>
        </div>
        <div>
          <Label htmlFor={`${formType}-phone`}>{t("phone")}</Label>
          <Input id={`${formType}-phone`} type="tel" {...register("phone")} />
        </div>
        {showBudget && (
          <div>
            <Label htmlFor={`${formType}-budget`}>{t("budget")} (€)</Label>
            <Select id={`${formType}-budget`} {...register("budget")}>
              <option value="">—</option>
              {budgetOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </Select>
          </div>
        )}
        {showDeadline && (
          <div>
            <Label htmlFor={`${formType}-deadline`}>{t("deadline")}</Label>
            <Input
              id={`${formType}-deadline`}
              type="date"
              {...register("deadline")}
            />
          </div>
        )}
        {showOccasion && (
          <div>
            <Label htmlFor={`${formType}-occasion`}>{t("occasion")}</Label>
            <Select id={`${formType}-occasion`} {...register("occasion")}>
              <option value="">—</option>
              <option value="wedding">{t("occasions.wedding")}</option>
              <option value="engagement">{t("occasions.engagement")}</option>
              <option value="anniversary">{t("occasions.anniversary")}</option>
              <option value="birthday">{t("occasions.birthday")}</option>
              <option value="christening">{t("occasions.christening")}</option>
              <option value="gift">{t("occasions.gift")}</option>
              <option value="other">{t("occasions.other")}</option>
            </Select>
          </div>
        )}
      </div>

      <div>
        <Label htmlFor={`${formType}-message`}>{t("message")}</Label>
        <Textarea
          id={`${formType}-message`}
          rows={5}
          {...register("message")}
        />
        <FieldError>{errors.message?.message}</FieldError>
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
        disabled={status === "loading"}
      >
        {status === "loading" ? tCommon("sending") : tCommon("send")}
      </Button>

      {status === "error" && (
        <p className="text-sm text-red-700">{tCommon("errorMessage")}</p>
      )}
    </form>
  );
}
