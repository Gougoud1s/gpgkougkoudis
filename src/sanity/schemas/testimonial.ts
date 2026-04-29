import { defineField, defineType } from "sanity";
import { localizedText } from "./_localized";

export const testimonial = defineType({
  name: "testimonial",
  title: "Κριτική",
  type: "document",
  fields: [
    defineField({
      name: "author",
      title: "Όνομα πελάτη",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Αστέρια (1–5)",
      type: "number",
      validation: (Rule) => Rule.min(1).max(5).required(),
      initialValue: 5,
    }),
    localizedText("quote", "Κείμενο κριτικής"),
    defineField({
      name: "source",
      title: "Πηγή",
      type: "string",
      options: {
        list: [
          { title: "Google", value: "google" },
          { title: "Facebook", value: "facebook" },
          { title: "Instagram", value: "instagram" },
          { title: "Στο κατάστημα", value: "in-store" },
        ],
      },
      initialValue: "google",
    }),
    defineField({
      name: "publishedAt",
      title: "Ημερομηνία",
      type: "date",
    }),
    defineField({
      name: "featured",
      title: "Προβολή στην Αρχική;",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "author", subtitle: "quote.el", rating: "rating" },
    prepare({ title, subtitle, rating }) {
      return {
        title,
        subtitle: `${"★".repeat(rating || 0)} — ${subtitle ?? ""}`,
      };
    },
  },
});
