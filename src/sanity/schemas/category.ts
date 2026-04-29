import { defineField, defineType } from "sanity";
import { localizedString, localizedText } from "./_localized";

export const category = defineType({
  name: "category",
  title: "Κατηγορία",
  type: "document",
  fields: [
    localizedString("title", "Όνομα κατηγορίας", { required: true }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      options: { source: "title.el", maxLength: 64 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Εικονίδιο (lucide name)",
      type: "string",
      description:
        'Όνομα εικονιδίου από το lucide.dev (π.χ. "gem", "heart", "circle").',
    }),
    defineField({
      name: "image",
      title: "Φωτογραφία κατηγορίας",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt text" }),
      ],
    }),
    localizedText("description", "Σύντομη περιγραφή"),
    defineField({
      name: "order",
      title: "Σειρά εμφάνισης",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "featured",
      title: "Προβολή στην Αρχική;",
      type: "boolean",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "Σειρά",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title.el", subtitle: "title.en", media: "image" },
  },
});
