import { defineField, defineType } from "sanity";
import { localizedString, localizedText } from "./_localized";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Ρυθμίσεις ιστοσελίδας",
  type: "document",
  fields: [
    localizedString("brand", "Όνομα επιχείρησης"),
    localizedText("tagline", "Tagline"),
    defineField({ name: "phoneDisplay", type: "string", title: "Τηλέφωνο (εμφάνιση)" }),
    defineField({ name: "phoneTel", type: "string", title: "Τηλέφωνο (tel: link)" }),
    defineField({ name: "whatsapp", type: "string", title: "WhatsApp" }),
    defineField({ name: "email", type: "string", title: "Email" }),
    localizedString("address", "Διεύθυνση"),
    defineField({
      name: "social",
      title: "Social media",
      type: "object",
      fields: [
        defineField({ name: "facebook", type: "url" }),
        defineField({ name: "instagram", type: "url" }),
        defineField({ name: "google", type: "url" }),
      ],
    }),
    defineField({
      name: "hours",
      title: "Ωράριο",
      type: "object",
      fields: [
        defineField({ name: "monday", type: "string", title: "Δευτέρα" }),
        defineField({ name: "tuesday", type: "string", title: "Τρίτη" }),
        defineField({ name: "wednesday", type: "string", title: "Τετάρτη" }),
        defineField({ name: "thursday", type: "string", title: "Πέμπτη" }),
        defineField({ name: "friday", type: "string", title: "Παρασκευή" }),
        defineField({ name: "saturday", type: "string", title: "Σάββατο" }),
        defineField({ name: "sunday", type: "string", title: "Κυριακή" }),
      ],
    }),
    defineField({
      name: "googleRating",
      type: "number",
      title: "Google rating",
      initialValue: 4.9,
    }),
    defineField({
      name: "googleReviewCount",
      type: "number",
      title: "Google αριθμός κριτικών",
      initialValue: 123,
    }),
  ],
  preview: { prepare: () => ({ title: "Ρυθμίσεις ιστοσελίδας" }) },
});
