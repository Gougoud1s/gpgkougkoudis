import { defineField } from "sanity";

/**
 * Re-usable bilingual string field group.
 * Stores Greek + English side-by-side on the same document.
 */
export function localizedString(name: string, title: string, opts?: { required?: boolean }) {
  return defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({
        name: "el",
        title: "Ελληνικά",
        type: "string",
        validation: opts?.required ? (Rule) => Rule.required() : undefined,
      }),
      defineField({
        name: "en",
        title: "English",
        type: "string",
      }),
    ],
    options: { columns: 2 },
  });
}

export function localizedText(name: string, title: string, opts?: { required?: boolean }) {
  return defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({
        name: "el",
        title: "Ελληνικά",
        type: "text",
        rows: 4,
        validation: opts?.required ? (Rule) => Rule.required() : undefined,
      }),
      defineField({
        name: "en",
        title: "English",
        type: "text",
        rows: 4,
      }),
    ],
  });
}

export function localizedRichText(name: string, title: string) {
  return defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({
        name: "el",
        title: "Ελληνικά",
        type: "array",
        of: [{ type: "block" }],
      }),
      defineField({
        name: "en",
        title: "English",
        type: "array",
        of: [{ type: "block" }],
      }),
    ],
  });
}
