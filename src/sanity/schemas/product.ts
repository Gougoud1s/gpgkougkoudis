import { defineField, defineType } from "sanity";
import { localizedString, localizedText } from "./_localized";

export const MATERIAL_OPTIONS = [
  { title: "Χρυσός / Gold", value: "gold" },
  { title: "Λευκόχρυσος / White Gold", value: "white-gold" },
  { title: "Ροζ Χρυσός / Rose Gold", value: "rose-gold" },
  { title: "Ασήμι / Silver", value: "silver" },
  { title: "Πλατίνα / Platinum", value: "platinum" },
];

export const KARAT_OPTIONS = [
  { title: "9k", value: "9" },
  { title: "14k", value: "14" },
  { title: "18k", value: "18" },
  { title: "21k", value: "21" },
  { title: "22k", value: "22" },
];

export const STONE_OPTIONS = [
  { title: "Διαμάντι / Diamond", value: "diamond" },
  { title: "Ζαφείρι / Sapphire", value: "sapphire" },
  { title: "Ρουμπίνι / Ruby", value: "ruby" },
  { title: "Σμαράγδι / Emerald", value: "emerald" },
  { title: "Μαργαριτάρι / Pearl", value: "pearl" },
  { title: "Ζιργκόν / Zircon", value: "zircon" },
  { title: "Άλλο / Other", value: "other" },
  { title: "Χωρίς πέτρα / No stone", value: "none" },
];

export const OCCASION_OPTIONS = [
  { title: "Καθημερινό / Everyday", value: "everyday" },
  { title: "Γάμος / Wedding", value: "wedding" },
  { title: "Αρραβώνας / Engagement", value: "engagement" },
  { title: "Δώρο / Gift", value: "gift" },
  { title: "Επέτειος / Anniversary", value: "anniversary" },
  { title: "Βάπτιση / Christening", value: "christening" },
];

export const product = defineType({
  name: "product",
  title: "Προϊόν",
  type: "document",
  fields: [
    localizedString("title", "Τίτλος προϊόντος", { required: true }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      options: { source: "title.el", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sku",
      title: "Κωδικός (SKU)",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Κατηγορία",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Φωτογραφίες (drag & drop, σύρετε για αναδιάταξη)",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt text", type: "string" }),
          ],
        },
      ],
      options: { layout: "grid" },
      validation: (Rule) => Rule.min(1).error("Τουλάχιστον μία φωτογραφία."),
    }),
    defineField({
      name: "material",
      title: "Υλικό",
      type: "string",
      options: { list: MATERIAL_OPTIONS, layout: "radio" },
    }),
    defineField({
      name: "karat",
      title: "Καράτια",
      type: "string",
      options: { list: KARAT_OPTIONS, layout: "radio" },
    }),
    defineField({
      name: "stone",
      title: "Πέτρα",
      type: "string",
      options: { list: STONE_OPTIONS },
    }),
    defineField({
      name: "occasion",
      title: "Περίσταση",
      type: "array",
      of: [{ type: "string" }],
      options: { list: OCCASION_OPTIONS },
    }),
    defineField({
      name: "weight",
      title: "Βάρος (γρ.)",
      type: "number",
    }),
    defineField({
      name: "dimensions",
      title: "Διαστάσεις",
      type: "string",
      description: 'π.χ. "Πλάτος 4mm"',
    }),
    defineField({
      name: "price",
      title: "Τιμή (€)",
      type: "number",
      description:
        "Αφήστε κενό για να εμφανιστεί 'Τιμή κατόπιν αιτήματος'.",
    }),
    defineField({
      name: "priceOnRequest",
      title: "Τιμή κατόπιν αιτήματος;",
      type: "boolean",
      initialValue: false,
    }),
    localizedText("description", "Περιγραφή"),
    defineField({
      name: "availableInStore",
      title: "Διαθέσιμο στο κατάστημα;",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "featured",
      title: "Προβολή στην Αρχική;",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "publishedAt",
      title: "Ημερομηνία δημοσίευσης",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "title.el",
      subtitle: "sku",
      media: "images.0",
    },
  },
});
