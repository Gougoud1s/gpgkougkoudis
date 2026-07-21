import { defineField, defineType } from "sanity";
import { localizedRichText, localizedString, localizedText } from "./_localized";

export const contentPage = defineType({
  name: "contentPage",
  title: "Σελίδα",
  type: "document",
  fields: [
    defineField({ name: "route", title: "Διαδρομή", type: "string", validation: (Rule) => Rule.required() }),
    localizedString("eyebrow", "Επάνω τίτλος"),
    localizedString("title", "Τίτλος", { required: true }),
    localizedText("subtitle", "Υπότιτλος"),
    defineField({
      name: "heroImage",
      title: "Κεντρική εικόνα",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    localizedRichText("body", "Κύριο κείμενο"),
    defineField({
      name: "sections",
      title: "Ενότητες",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({
            name: "kind", title: "Τύπος", type: "string", initialValue: "text",
            options: { list: [
              { title: "Κείμενο", value: "text" },
              { title: "Κείμενο με εικόνα", value: "imageText" },
              { title: "Κάρτες", value: "cards" },
              { title: "Προϊόντα γάμου", value: "products" },
              { title: "Φόρμα ραντεβού", value: "appointment" },
            ] },
          }),
          localizedString("eyebrow", "Επάνω τίτλος"),
          localizedString("title", "Τίτλος"),
          localizedText("text", "Κείμενο"),
          defineField({
            name: "image", title: "Εικόνα", type: "image", options: { hotspot: true },
            fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
          }),
          localizedString("ctaLabel", "Κείμενο κουμπιού"),
          defineField({ name: "ctaHref", title: "Σύνδεσμος κουμπιού", type: "string" }),
          defineField({
            name: "items", title: "Στοιχεία", type: "array", of: [{
              type: "object",
              fields: [
                localizedString("title", "Τίτλος"),
                localizedText("text", "Κείμενο"),
                defineField({ name: "icon", title: "Εικονίδιο", type: "string" }),
                defineField({
                  name: "image", title: "Εικόνα", type: "image", options: { hotspot: true },
                  fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
                }),
              ],
              preview: { select: { title: "title.el", subtitle: "text.el", media: "image" } },
            }] }),
        ],
        preview: { select: { title: "title.el", subtitle: "kind", media: "image" } },
      }],
    }),
    localizedString("seoTitle", "SEO τίτλος"),
    localizedText("seoDescription", "SEO περιγραφή"),
    defineField({ name: "updatedLabel", title: "Ημερομηνία ενημέρωσης", type: "date" }),
  ],
  preview: { select: { title: "title.el", subtitle: "route", media: "heroImage" } },
});
