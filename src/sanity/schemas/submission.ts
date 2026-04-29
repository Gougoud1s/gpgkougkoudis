import { defineField, defineType } from "sanity";

export const submission = defineType({
  name: "submission",
  title: "Υποβολή φόρμας",
  type: "document",
  fields: [
    defineField({
      name: "formType",
      title: "Τύπος φόρμας",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subject",
      title: "Θέμα",
      type: "string",
    }),
    defineField({
      name: "name",
      title: "Όνομα",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Τηλέφωνο",
      type: "string",
    }),
    defineField({
      name: "message",
      title: "Μήνυμα",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "metadata",
      title: "Μεταδεδομένα",
      type: "object",
      fields: [
        defineField({ name: "budget", type: "string" }),
        defineField({ name: "deadline", type: "string" }),
        defineField({ name: "occasion", type: "string" }),
        defineField({ name: "preferredDate", type: "string", title: "Preferred date" }),
        defineField({ name: "preferredTime", type: "string", title: "Preferred time" }),
        defineField({ name: "attendees", type: "string" }),
        defineField({ name: "ip", type: "string", title: "IP" }),
        defineField({ name: "userAgent", type: "string", title: "User agent" }),
      ],
    }),
    defineField({
      name: "createdAt",
      title: "Ημερομηνία",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Νεότερες πρώτα",
      name: "createdAtDesc",
      by: [{ field: "createdAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "email",
      formType: "formType",
      createdAt: "createdAt",
    },
    prepare({ title, subtitle, formType, createdAt }) {
      return {
        title: `${title || "Ανώνυμο"} · ${formType || "contact"}`,
        subtitle: `${subtitle || ""} ${createdAt ? `· ${new Date(createdAt).toLocaleString("el-GR")}` : ""}`,
      };
    },
  },
});
