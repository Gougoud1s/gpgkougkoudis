import type { StructureResolver } from "sanity/structure";

/**
 * Custom Studio sidebar — friendly Greek names + singletons grouped at top.
 * Owners see a clean list: Αρχική, Ρυθμίσεις, Προϊόντα, Κατηγορίες, Υπηρεσίες, Κριτικές, FAQ, Άρθρα.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Περιεχόμενο")
    .items([
      S.listItem()
        .title("Αρχική σελίδα")
        .id("homepage")
        .child(
          S.document()
            .schemaType("homepage")
            .documentId("homepage")
            .title("Αρχική σελίδα")
        ),
      S.listItem()
        .title("Ρυθμίσεις ιστοσελίδας")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Ρυθμίσεις")
        ),
      S.divider(),
      S.documentTypeListItem("product").title("Προϊόντα"),
      S.documentTypeListItem("category").title("Κατηγορίες"),
      S.documentTypeListItem("service").title("Υπηρεσίες"),
      S.documentTypeListItem("contentPage").title("Σελίδες"),
      S.divider(),
      S.documentTypeListItem("testimonial").title("Κριτικές"),
      S.documentTypeListItem("faq").title("Συχνές ερωτήσεις"),
      S.documentTypeListItem("uiText").title("Κείμενα διεπαφής"),
      S.documentTypeListItem("journalPost").title("Άρθρα / Journal"),
      S.divider(),
      S.documentTypeListItem("submission").title("Υποβολές φόρμας"),
    ]);
