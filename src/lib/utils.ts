import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPriceEUR(value: number | null | undefined) {
  if (value == null) return null;
  return new Intl.NumberFormat("el-GR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function whatsappLink(message?: string, phone = "+302105023076") {
  const cleanPhone = phone.replace(/\D/g, "");
  const msg = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${cleanPhone}${msg}`;
}

export function telLink(phone = "+302105023076") {
  return `tel:${phone}`;
}

export function mailtoLink(email: string, subject?: string) {
  const subjectPart = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${email}${subjectPart}`;
}

export function mapsLink(
  query = "Sirrakou 85-87, Petroupoli 131 23, Greece"
) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function mapsDirectionsLink(
  destination = "Sirrakou 85-87, Petroupoli 131 23, Greece"
) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
}
