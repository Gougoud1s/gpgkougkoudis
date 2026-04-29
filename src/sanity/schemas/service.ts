import { defineField, defineType } from "sanity";
import {
  localizedRichText,
  localizedString,
  localizedText,
} from "./_localized";

export const service = defineType({
  name: "service",
  title: "Υπηρεσία",
  type: "document",
  fields: [
    localizedString("title", "Τίτλος υπηρεσίας", { required: true }),
    localizedString("tagline", "Tagline"),
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
    }),
    defineField({
      name: "image",
      title: "Κεντρική εικόνα",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt text" }),
      ],
    }),
    localizedText("shortDescription", "Σύντομη περιγραφή"),
    localizedRichText("body", "Πλήρες κείμενο"),
    defineField({
      name: "gallery",
      title: "Γκαλερί έργων",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", type: "string", title: "Alt text" }),
          ],
        },
      ],
      options: { layout: "grid" },
    }),
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
  preview: {
    select: { title: "title.el", subtitle: "title.en", media: "image" },
  },
});
