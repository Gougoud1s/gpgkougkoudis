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
      title: "Κεντρική εικόνα / Hero fallback",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt text" }),
      ],
    }),
    defineField({
      name: "heroVideo",
      title: "Hero background video",
      description: "MP4 ή WebM. Αναπαράγεται αυτόματα χωρίς ήχο, σε επανάληψη. Αν είναι κενό, χρησιμοποιείται η κεντρική εικόνα.",
      type: "file",
      options: { accept: "video/mp4,video/webm" },
    }),
    defineField({
      name: "heroVideoPoster",
      title: "Hero video poster (προαιρετικό)",
      description: "Εμφανίζεται όσο φορτώνει το βίντεο.",
      type: "image",
      options: { hotspot: true },
    }),
    localizedText("shortDescription", "Σύντομη περιγραφή"),
    localizedRichText("body", "Πλήρες κείμενο"),
    defineField({
      name: "steps",
      title: "Βήματα διαδικασίας",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            localizedString("title", "Τίτλος", { required: true }),
            localizedText("text", "Περιγραφή"),
          ],
          preview: { select: { title: "title.el", subtitle: "text.el" } },
        },
      ],
    }),
    defineField({
      name: "highlights",
      title: "Σημαντικές πληροφορίες",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            localizedString("label", "Ετικέτα", { required: true }),
            localizedString("value", "Τιμή", { required: true }),
          ],
          preview: { select: { title: "label.el", subtitle: "value.el" } },
        },
      ],
    }),
    defineField({
      name: "form",
      title: "Φόρμα ενδιαφέροντος",
      type: "object",
      fields: [
        defineField({ name: "enabled", title: "Εμφάνιση φόρμας", type: "boolean", initialValue: true }),
        localizedString("title", "Τίτλος φόρμας"),
        localizedText("description", "Περιγραφή φόρμας"),
        defineField({ name: "showBudget", title: "Πεδίο προϋπολογισμού", type: "boolean" }),
        defineField({ name: "showDeadline", title: "Πεδίο προθεσμίας", type: "boolean" }),
        defineField({ name: "showOccasion", title: "Πεδίο περίστασης", type: "boolean" }),
      ],
    }),
    defineField({
      name: "gallery",
      title: "Γκαλερί φωτογραφιών & βίντεο",
      description: "Προσθέστε φωτογραφίες ή βίντεο MP4/WebM. Η σειρά εδώ είναι η σειρά εμφάνισης στη σελίδα.",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", type: "string", title: "Alt text" }),
          ],
        },
        {
          type: "file",
          title: "Βίντεο",
          options: { accept: "video/mp4,video/webm" },
          fields: [
            localizedString("caption", "Λεζάντα βίντεο"),
            defineField({
              name: "poster",
              type: "image",
              title: "Εικόνα προεπισκόπησης (προαιρετική)",
              options: { hotspot: true },
            }),
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
