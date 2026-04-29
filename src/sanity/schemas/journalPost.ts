import { defineField, defineType } from "sanity";
import {
  localizedRichText,
  localizedString,
  localizedText,
} from "./_localized";

export const journalPost = defineType({
  name: "journalPost",
  title: "Άρθρο",
  type: "document",
  fields: [
    localizedString("title", "Τίτλος", { required: true }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      options: { source: "title.el", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    localizedText("excerpt", "Σύντομη περίληψη"),
    defineField({
      name: "coverImage",
      title: "Εικόνα εξωφύλλου",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt text" }),
      ],
    }),
    localizedRichText("body", "Κείμενο"),
    defineField({
      name: "publishedAt",
      title: "Ημερομηνία δημοσίευσης",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: { select: { title: "title.el", media: "coverImage" } },
});
