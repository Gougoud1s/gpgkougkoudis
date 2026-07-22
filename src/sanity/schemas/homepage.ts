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
    localizedString("instagramTitle", "Instagram — τίτλος"),
    localizedText("instagramText", "Instagram — κείμενο"),
    defineField({
      name: "instagramProfile",
      title: "Instagram — προφίλ & μετρήσεις",
      type: "object",
      fields: [
        defineField({ name: "displayName", type: "string", title: "Όνομα προφίλ" }),
        defineField({ name: "username", type: "string", title: "Username (χωρίς @)" }),
        defineField({ name: "profileImage", type: "image", title: "Εικόνα προφίλ", options: { hotspot: true } }),
        defineField({ name: "postCount", type: "number", title: "Δημοσιεύσεις", validation: (Rule) => Rule.min(0).integer() }),
        defineField({ name: "followersCount", type: "number", title: "Ακόλουθοι", validation: (Rule) => Rule.min(0).integer() }),
        defineField({ name: "followingCount", type: "number", title: "Ακολουθεί", validation: (Rule) => Rule.min(0).integer() }),
      ],
    }),
    defineField({
      name: "instagramPosts",
      title: "Instagram — εφεδρικές φωτογραφίες",
      description: "Εμφανίζονται όταν δεν είναι συνδεδεμένο Instagram access token.",
      type: "array",
      validation: (Rule) => Rule.max(6),
      of: [{
        type: "object",
        fields: [
          defineField({ name: "image", type: "image", title: "Εικόνα", options: { hotspot: true }, validation: (Rule) => Rule.required() }),
          defineField({ name: "url", type: "url", title: "Σύνδεσμος Instagram" }),
          localizedText("caption", "Λεζάντα"),
        ],
        preview: { select: { title: "caption.el", media: "image" } },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: "Αρχική σελίδα" }) },
});
