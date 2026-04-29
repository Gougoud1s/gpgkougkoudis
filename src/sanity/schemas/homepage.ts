import { defineField, defineType } from "sanity";
import { localizedString, localizedText } from "./_localized";

export const homepage = defineType({
  name: "homepage",
  title: "Αρχική σελίδα",
  type: "document",
  fields: [
    localizedString("heroEyebrow", "Hero — eyebrow"),
    localizedString("heroTitle", "Hero — τίτλος"),
    localizedText("heroSubtitle", "Hero — υπότιτλος"),
    defineField({
      name: "heroImage",
      title: "Hero εικόνα",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt text" }),
      ],
    }),
    defineField({
      name: "featuredCollections",
      title: "Επιλεγμένες κατηγορίες (max 4)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: "featuredProducts",
      title: "Επιλεγμένα προϊόντα (max 8)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
      validation: (Rule) => Rule.max(8),
    }),
    defineField({
      name: "featuredServices",
      title: "Επιλεγμένες υπηρεσίες (max 3)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: "featuredTestimonials",
      title: "Επιλεγμένες κριτικές (max 6)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "testimonial" }] }],
      validation: (Rule) => Rule.max(6),
    }),
    localizedString("storyTitle", "Story — τίτλος"),
    localizedText("storyText", "Story — κείμενο"),
    defineField({
      name: "storyImage",
      title: "Story — εικόνα",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: { prepare: () => ({ title: "Αρχική σελίδα" }) },
});
