import { defineField, defineType } from "sanity";
import { localizedString, localizedText } from "./_localized";

export const faq = defineType({
  name: "faq",
  title: "Συχνή ερώτηση",
  type: "document",
  fields: [
    localizedString("question", "Ερώτηση", { required: true }),
    localizedText("answer", "Απάντηση", { required: true }),
    defineField({
      name: "category",
      title: "Κατηγορία ερώτησης",
      type: "string",
      options: {
        list: [
          { title: "Γενικά", value: "general" },
          { title: "Επισκευές", value: "repairs" },
          { title: "Σχεδιασμός", value: "custom" },
          { title: "Πληρωμές", value: "payments" },
          { title: "Επιστροφές", value: "returns" },
        ],
      },
      initialValue: "general",
    }),
    defineField({
      name: "order",
      title: "Σειρά",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: { select: { title: "question.el", subtitle: "category" } },
});
