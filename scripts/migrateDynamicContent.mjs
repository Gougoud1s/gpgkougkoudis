import { getCliClient } from "sanity/cli";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";

const client = getCliClient({ apiVersion: "2024-10-01" });

function block(text, key) {
  return text
    ? [{ _type: "block", _key: key, style: "normal", markDefs: [], children: [{ _type: "span", _key: `${key}-span`, marks: [], text }] }]
    : [];
}

function rich(entries, prefix) {
  return entries.map(([style, text], index) => ({
    _type: "block", _key: `${prefix}-${index}`, style, markDefs: [],
    children: [{ _type: "span", _key: `${prefix}-${index}-span`, marks: [], text }],
  }));
}

function flatten(object, prefix = "", output = {}) {
  for (const [key, value] of Object.entries(object)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "string") output[path] = value;
    else if (value && typeof value === "object") flatten(value, path, output);
  }
  return output;
}

async function main() {
  const settingsPatch = client.patch("siteSettings").set({
    siteUrl: "https://gpgkougkoudis.vercel.app",
  }).setIfMissing({
    footerDescription: {
      el: "Κοσμηματοπωλείο στην καρδιά της Πετρούπολης από το 1985. Χρυσά και λευκόχρυσα κοσμήματα, βέρες, μονόπετρα, επισκευές και αγορά χρυσού.",
      en: "A family jewelry store in the heart of Petroupoli since 1985, offering fine jewelry, wedding pieces, repairs and gold buying.",
    },
    logoTagline: { el: "Αφοί Π. Γκουγκούδη · από το 1985", en: "Kougkoudis Brothers · since 1985" },
    mapEmbedUrl: "https://www.google.com/maps?q=Sirrakou+85-87,+Petroupoli+131+23,+Greece&output=embed",
    navigation: [
      { _key: "collections", label: { el: "Συλλογές", en: "Collections" }, href: "/collections" },
      { _key: "services", label: { el: "Υπηρεσίες", en: "Services" }, href: "/services" },
      { _key: "wedding", label: { el: "Γάμος", en: "Wedding" }, href: "/wedding" },
      { _key: "about", label: { el: "Σχετικά", en: "About" }, href: "/about" },
      { _key: "reviews", label: { el: "Κριτικές", en: "Reviews" }, href: "/reviews" },
      { _key: "contact", label: { el: "Επικοινωνία", en: "Contact" }, href: "/contact" },
    ],
    appointmentTimes: ["10:00", "11:00", "12:00", "13:00", "18:00", "19:00"],
    attendeeOptions: ["1", "2", "3", "4+"],
    budgetOptions: [
      { _key: "under-500", value: "under-500", label: { el: "Κάτω από 500€", en: "Under €500" } },
      { _key: "500-1500", value: "500-1500", label: { el: "500€ – 1500€", en: "€500 – €1500" } },
      { _key: "1500-3000", value: "1500-3000", label: { el: "1500€ – 3000€", en: "€1500 – €3000" } },
      { _key: "over-3000", value: "over-3000", label: { el: "Πάνω από 3000€", en: "Over €3000" } },
    ],
  });

  const services = await client.fetch(`*[_type == "service"]{_id, slug, shortDescription, body, form}`);
  const media = await client.fetch(`{
    "story": *[_type == "service" && slug.current == "custom-design"][0].image,
    "workshop": *[_type == "service" && slug.current == "repairs"][0].image,
    "wedding": *[_type == "category" && slug.current == "wedding"][0].image
  }`);
  const transaction = client.transaction().patch(settingsPatch);

  for (const service of services) {
    const slug = service.slug?.current || service._id;
    transaction.patch(
      client.patch(service._id).setIfMissing({
        body: {
          el: block(service.shortDescription?.el, `${slug}-el`),
          en: block(service.shortDescription?.en, `${slug}-en`),
        },
        form: {
          enabled: true,
          showBudget: slug === "custom-design",
          showDeadline: ["custom-design", "repairs", "engraving"].includes(slug),
          showOccasion: slug === "custom-design",
        },
      })
    );
  }

  const pages = [
    {
      _id: "page-about", _type: "contentPage", route: "about",
      eyebrow: { el: "Η ιστορία μας", en: "Our story" },
      title: { el: "Τρεις γενιές χρυσοχοΐας", en: "Three generations of goldsmithing" },
      subtitle: { el: "Οικογενειακή τέχνη, προσωπική εξυπηρέτηση και εμπιστοσύνη στην Πετρούπολη.", en: "Family craftsmanship, personal service and trust in Petroupoli." },
      heroImage: media.story,
      sections: [
        { _key: "values", kind: "cards", eyebrow: { el: "Οι αξίες μας", en: "Our values" }, title: { el: "Τι μας καθοδηγεί", en: "What guides us" }, items: [
          { _key: "craft", icon: "hammer", title: { el: "Τέχνη", en: "Craftsmanship" }, text: { el: "Κάθε κόσμημα περνά από έμπειρα χέρια στο εργαστήριό μας.", en: "Every piece passes through experienced hands in our workshop." } },
          { _key: "materials", icon: "gem", title: { el: "Υλικά", en: "Materials" }, text: { el: "Μόνο πιστοποιημένος χρυσός, πλατίνα και αξιόπιστες πέτρες.", en: "Only certified gold, platinum and reputable stones." } },
          { _key: "trust", icon: "shield", title: { el: "Εμπιστοσύνη", en: "Trust" }, text: { el: "Έντιμες τιμές και διαφανείς εκτιμήσεις.", en: "Honest pricing and transparent appraisals." } },
          { _key: "family", icon: "users", title: { el: "Οικογένεια", en: "Family" }, text: { el: "Τρεις γενιές αδελφών Γκουγκούδη, γείτονες και φίλοι.", en: "Three generations of Kougkoudis brothers, neighbours and friends." } },
        ] },
        { _key: "workshop", kind: "imageText", eyebrow: { el: "Το εργαστήριο", en: "The workshop" }, title: { el: "Εκεί που γεννιέται κάθε κόσμημα", en: "Where every piece is born" }, text: { el: "Πίσω από τη βιτρίνα βρίσκεται το εργαστήριό μας, όπου σχεδιάζουμε, χυτεύουμε, καρφώνουμε και φινίρουμε κάθε κόσμημα στο χέρι.", en: "Behind the showroom is our atelier, where we design, cast, set and finish each piece by hand." }, image: media.workshop, ctaLabel: { el: "Δείτε τις υπηρεσίες", en: "Discover services" }, ctaHref: "/services" },
      ],
      seoTitle: { el: "Σχετικά με εμάς", en: "About us" },
    },
    {
      _id: "page-wedding", _type: "contentPage", route: "wedding",
      eyebrow: { el: "Γάμος & Αρραβώνας", en: "Wedding & Engagement" },
      title: { el: "Για τη στιγμή που μένει για πάντα", en: "For the moment that lasts forever" },
      subtitle: { el: "Βέρες και μονόπετρα φτιαγμένα για τη δική σας ιστορία.", en: "Wedding bands and engagement rings made for your story." },
      heroImage: media.wedding,
      sections: [
        { _key: "benefits", kind: "cards", items: [
          { _key: "craft", icon: "sparkles", title: { el: "Διαχρονική τέχνη", en: "Timeless craftsmanship" }, text: { el: "Κάθε βέρα δουλεύεται στο δικό μας εργαστήριο.", en: "Each ring is made by master goldsmiths in our atelier." } },
          { _key: "diamonds", icon: "gem", title: { el: "Πιστοποιημένα διαμάντια", en: "Certified diamonds" }, text: { el: "Με πιστοποιήσεις GIA / IGI κατόπιν αιτήματος.", en: "With full GIA / IGI certification on request." } },
          { _key: "care", icon: "shield", title: { el: "Διά βίου φροντίδα", en: "Lifetime care" }, text: { el: "Φροντίδα του κοσμήματος για όλη του τη ζωή.", en: "Ongoing care for the lifetime of the ring." } },
          { _key: "viewing", icon: "calendar", title: { el: "Ιδιωτικές παρουσιάσεις", en: "Private viewings" }, text: { el: "Ήρεμα ραντεβού στο κατάστημα.", en: "Quiet, no-rush appointments at our store." } },
        ] },
        { _key: "products", kind: "products", eyebrow: { el: "Επιλεγμένα", en: "Featured" }, title: { el: "Βέρες & μονόπετρα", en: "Wedding bands & engagement rings" }, ctaHref: "wedding" },
        { _key: "appointment", kind: "appointment", eyebrow: { el: "Ιδιωτική παρουσίαση", en: "Private viewing" }, title: { el: "Κλείστε ραντεβού", en: "Book a private viewing" }, text: { el: "Κλείστε ένα ήρεμο ραντεβού στο κατάστημά μας. Θα ετοιμάσουμε μια παρουσίαση προσαρμοσμένη στο γούστο, τον προϋπολογισμό και τον χρόνο σας.", en: "Book a quiet appointment at our store. We will prepare a private viewing tailored to your taste, budget and timeline." } },
      ],
    },
    {
      _id: "page-privacy", _type: "contentPage", route: "privacy", eyebrow: { el: "Νομικά", en: "Legal" }, title: { el: "Πολιτική Απορρήτου", en: "Privacy Policy" }, subtitle: { el: "Πώς συλλέγουμε, χρησιμοποιούμε και προστατεύουμε τα προσωπικά σας δεδομένα.", en: "How we collect, use and protect your personal data." },
      body: {
        el: rich([["normal", "Σεβόμαστε την ιδιωτικότητά σας και προστατεύουμε τα προσωπικά σας δεδομένα σύμφωνα με τον GDPR και την ελληνική νομοθεσία."], ["h2", "Τι δεδομένα συλλέγουμε"], ["normal", "Συλλέγουμε μόνο τα δεδομένα που παρέχετε μέσω των φορμών επικοινωνίας και ραντεβού, καθώς και ανώνυμα στοιχεία επισκεψιμότητας όταν συναινείτε."], ["h2", "Πώς τα χρησιμοποιούμε"], ["normal", "Χρησιμοποιούμε τα δεδομένα αποκλειστικά για να απαντήσουμε και να σας εξυπηρετήσουμε. Δεν πωλούμε δεδομένα σε τρίτους."], ["h2", "Τα δικαιώματά σας"], ["normal", "Μπορείτε να ζητήσετε πρόσβαση, διόρθωση, διαγραφή, περιορισμό ή φορητότητα επικοινωνώντας μαζί μας."], ["h2", "Cookies"], ["normal", "Μπορείτε να αλλάξετε τις προτιμήσεις cookies ανά πάσα στιγμή."]], "privacy-el"),
        en: rich([["normal", "We respect your privacy and protect your personal data in accordance with the GDPR and Greek law."], ["h2", "Data we collect"], ["normal", "We only collect information supplied through contact and appointment forms, plus anonymous traffic data when you consent."], ["h2", "How we use it"], ["normal", "We use data solely to respond and serve you. We never sell personal data."], ["h2", "Your rights"], ["normal", "You may request access, correction, deletion, restriction or portability by contacting us."], ["h2", "Cookies"], ["normal", "You can change cookie preferences at any time."]], "privacy-en"),
      }, updatedLabel: "2026-07-21",
    },
    {
      _id: "page-cookies", _type: "contentPage", route: "cookies", eyebrow: { el: "Νομικά", en: "Legal" }, title: { el: "Πολιτική Cookies", en: "Cookie Policy" }, subtitle: { el: "Πληροφορίες για τα απαραίτητα και προαιρετικά cookies της ιστοσελίδας.", en: "Information about the essential and optional cookies used by this website." },
      body: {
        el: rich([["normal", "Χρησιμοποιούμε απαραίτητα cookies για τη λειτουργία της ιστοσελίδας και προαιρετικά cookies αναλυτικών στοιχείων μόνο με τη συγκατάθεσή σας."], ["h2", "Απαραίτητα cookies"], ["normal", "Αποθηκεύουν τις επιλογές συναίνεσης και είναι απαραίτητα για βασικές λειτουργίες."], ["h2", "Αναλυτικά στοιχεία"], ["normal", "Τα Google Analytics και Microsoft Clarity ενεργοποιούνται μόνο μετά την αποδοχή."], ["h2", "Διαχείριση"], ["normal", "Μπορείτε να αλλάξετε ή να ανακαλέσετε τη συγκατάθεσή σας οποιαδήποτε στιγμή."]], "cookies-el"),
        en: rich([["normal", "We use essential cookies for site operation and optional analytics cookies only with your consent."], ["h2", "Essential cookies"], ["normal", "These store consent preferences and support basic functionality."], ["h2", "Analytics"], ["normal", "Google Analytics and Microsoft Clarity activate only after acceptance."], ["h2", "Managing cookies"], ["normal", "You can change or withdraw consent at any time."]], "cookies-en"),
      }, updatedLabel: "2026-07-21",
    },
    {
      _id: "page-terms", _type: "contentPage", route: "terms", eyebrow: { el: "Νομικά", en: "Legal" }, title: { el: "Όροι Χρήσης", en: "Terms of Use" }, subtitle: { el: "Οι όροι που διέπουν τη χρήση της ιστοσελίδας και του περιεχομένου της.", en: "The terms governing use of this website and its content." },
      body: {
        el: rich([["normal", "Η ιστοσελίδα λειτουργεί ως ψηφιακή βιτρίνα. Οι αγορές ολοκληρώνονται στο κατάστημα."], ["h2", "Φωτογραφίες και τιμές"], ["normal", "Οι εικόνες είναι ενδεικτικές και οι τιμές μπορεί να μεταβάλλονται με την τιμή του χρυσού."], ["h2", "Πνευματική ιδιοκτησία"], ["normal", "Τα κείμενα, οι φωτογραφίες και τα σχέδια προστατεύονται από τη νομοθεσία."], ["h2", "Εφαρμοστέο δίκαιο"], ["normal", "Οι όροι διέπονται από το ελληνικό δίκαιο."]], "terms-el"),
        en: rich([["normal", "This website is a digital showcase. Purchases are completed in store."], ["h2", "Photography and pricing"], ["normal", "Images are illustrative and prices may change with the gold market."], ["h2", "Intellectual property"], ["normal", "Texts, photographs and designs are protected by law."], ["h2", "Governing law"], ["normal", "These terms are governed by Greek law."]], "terms-en"),
      }, updatedLabel: "2026-07-21",
    },
  ];

  for (const page of pages) transaction.createOrReplace(page);

  const el = flatten(JSON.parse(readFileSync(new URL("../src/messages/el.json", import.meta.url), "utf8")));
  const en = flatten(JSON.parse(readFileSync(new URL("../src/messages/en.json", import.meta.url), "utf8")));
  for (const key of new Set([...Object.keys(el), ...Object.keys(en)])) {
    const id = `uiText-${createHash("sha1").update(key).digest("hex")}`;
    transaction.createOrReplace({ _id: id, _type: "uiText", key, value: { el: el[key] || en[key], en: en[key] || el[key] } });
  }

  await transaction.commit({ autoGenerateArrayKeys: true });
  console.log(`Updated settings, ${services.length} services, ${pages.length} pages and ${Object.keys(el).length} UI strings.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
