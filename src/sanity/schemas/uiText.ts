import { defineField, defineType } from "sanity";
import { localizedText } from "./_localized";

export const uiText = defineType({
  name: "uiText",
  title: "Κείμενο διεπαφής",
  type: "document",
  fields: [
    defineField({
      name: "key",
      title: "Κλειδί",
      type: "string",
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    localizedText("value", "Κείμενο", { required: true }),
  ],
  preview: { select: { title: "key", subtitle: "value.el" } },
});
