import { defineField, defineType } from "sanity";
import { localizedString, localizedText } from "./_localized";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Ρυθμίσεις ιστοσελίδας",
  type: "document",
  fields: [
    defineField({ name: "siteUrl", type: "url", title: "Κύριο URL ιστοσελίδας" }),
    localizedString("brand", "Όνομα επιχείρησης"),
    defineField({ name: "logo", type: "image", title: "Λογότυπο", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string", title: "Εναλλακτικό κείμενο" })] }),
    localizedText("tagline", "Tagline"),
    localizedText("logoTagline", "Υπότιτλος λογοτύπου"),
    defineField({ name: "phoneDisplay", type: "string", title: "Τηλέφωνο (εμφάνιση)" }),
    defineField({ name: "phoneTel", type: "string", title: "Τηλέφωνο (tel: link)" }),
    defineField({ name: "email", type: "string", title: "Email" }),
    localizedString("address", "Διεύθυνση"),
    localizedText("footerDescription", "Περιγραφή υποσέλιδου"),
    defineField({ name: "mapEmbedUrl", type: "url", title: "Google Maps embed URL" }),
    defineField({
      name: "navigation",
      title: "Κύριο μενού",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            localizedString("label", "Ετικέτα", { required: true }),
            defineField({ name: "href", title: "Σύνδεσμος", type: "string", validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: "label.el", subtitle: "href" } },
        },
      ],
    }),
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
    defineField({ name: "appointmentTimes", title: "Ώρες ραντεβού", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "attendeeOptions", title: "Επιλογές ατόμων", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "budgetOptions", title: "Επιλογές προϋπολογισμού", type: "array", of: [{
        type: "object",
        fields: [
          defineField({ name: "value", title: "Τιμή", type: "string", validation: (Rule) => Rule.required() }),
          localizedString("label", "Ετικέτα", { required: true }),
        ],
        preview: { select: { title: "label.el", subtitle: "value" } },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: "Ρυθμίσεις ιστοσελίδας" }) },
});
