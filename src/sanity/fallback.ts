/**
 * Fallback content used when no Sanity dataset is connected (local dev /
 * preview before content has been authored). The owner can populate the
 * Studio at /studio and these will be replaced automatically.
 */
import type {
  Category,
  Faq,
  Homepage,
  Product,
  Service,
  SiteSettings,
  Testimonial,
} from "./types";

const PLACEHOLDER_IMG =
  "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1600&q=80";

const PLACEHOLDER_RING =
  "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=1200&q=80";
const PLACEHOLDER_NECKLACE =
  "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1200&q=80";
const PLACEHOLDER_EARRINGS =
  "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&q=80";
const PLACEHOLDER_BRACELET =
  "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1200&q=80";
const PLACEHOLDER_WEDDING =
  "https://images.unsplash.com/photo-1521334884684-d80222895322?w=1200&q=80";
const PLACEHOLDER_DETAIL =
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=80";

export const fallbackCategories: Category[] = [
  {
    _id: "cat-rings",
    title: { el: "Δαχτυλίδια", en: "Rings" },
    slug: { current: "rings" },
    icon: "circle",
    image: { asset: { url: PLACEHOLDER_RING }, alt: "Δαχτυλίδι από χρυσό" },
    description: {
      el: "Από διαχρονικά μονόπετρα έως μοντέρνα σχέδια.",
      en: "From timeless solitaires to modern designs.",
    },
    featured: true,
  },
  {
    _id: "cat-wedding",
    title: { el: "Γάμος & Αρραβώνας", en: "Wedding & Engagement" },
    slug: { current: "wedding" },
    icon: "heart",
    image: { asset: { url: PLACEHOLDER_WEDDING }, alt: "Βέρες γάμου" },
    description: {
      el: "Βέρες, μονόπετρα και κοσμήματα για τη μεγάλη ημέρα.",
      en: "Wedding bands, engagement rings and pieces for the big day.",
    },
    featured: true,
  },
  {
    _id: "cat-necklaces",
    title: { el: "Κολιέ", en: "Necklaces" },
    slug: { current: "necklaces" },
    icon: "gem",
    image: { asset: { url: PLACEHOLDER_NECKLACE }, alt: "Χρυσό κολιέ" },
    description: { el: "Από καθημερινά έως statement.", en: "From everyday to statement." },
    featured: true,
  },
  {
    _id: "cat-earrings",
    title: { el: "Σκουλαρίκια", en: "Earrings" },
    slug: { current: "earrings" },
    icon: "sparkles",
    image: { asset: { url: PLACEHOLDER_EARRINGS }, alt: "Σκουλαρίκια" },
    description: { el: "Καρφωτά, κρεμαστά και ενώτια.", en: "Studs, drops and hoops." },
    featured: true,
  },
  {
    _id: "cat-bracelets",
    title: { el: "Βραχιόλια", en: "Bracelets" },
    slug: { current: "bracelets" },
    icon: "link",
    image: { asset: { url: PLACEHOLDER_BRACELET }, alt: "Βραχιόλι" },
    description: { el: "Αλυσίδες και βραχιόλια όλων των τύπων.", en: "Chains and cuffs in many styles." },
    featured: false,
  },
  {
    _id: "cat-religious",
    title: { el: "Σταυροί & Θρησκευτικά", en: "Crosses & Religious" },
    slug: { current: "religious" },
    icon: "cross",
    image: { asset: { url: PLACEHOLDER_DETAIL }, alt: "Σταυρός" },
    description: { el: "Σταυροί βαπτίσεως και θρησκευτικά κοσμήματα.", en: "Christening crosses and religious pieces." },
    featured: false,
  },
  {
    _id: "cat-kids",
    title: { el: "Παιδικά", en: "Children" },
    slug: { current: "kids" },
    icon: "baby",
    image: { asset: { url: PLACEHOLDER_DETAIL }, alt: "Παιδικό κόσμημα" },
    description: { el: "Φυλαχτά, σκουλαρίκια και αλυσίδες για παιδιά.", en: "Charms, earrings and chains for children." },
    featured: false,
  },
];

export const fallbackProducts: Product[] = [
  {
    _id: "p-1",
    title: { el: "Μονόπετρο Aurora", en: "Aurora Solitaire" },
    slug: { current: "monopetro-aurora" },
    sku: "RNG-001",
    category: fallbackCategories[1],
    images: [{ asset: { url: PLACEHOLDER_RING }, alt: "Aurora solitaire" }],
    material: "white-gold",
    karat: "18",
    stone: "diamond",
    occasion: ["engagement"],
    price: 1850,
    description: {
      el: "Μονόπετρο από λευκόχρυσο 18Κ με κεντρικό διαμάντι 0.30ct.",
      en: "18K white gold solitaire with a 0.30ct centre diamond.",
    },
    availableInStore: true,
    featured: true,
  },
  {
    _id: "p-2",
    title: { el: "Βέρες Eternity", en: "Eternity Bands" },
    slug: { current: "veres-eternity" },
    sku: "WED-014",
    category: fallbackCategories[1],
    images: [{ asset: { url: PLACEHOLDER_WEDDING }, alt: "Eternity bands" }],
    material: "gold",
    karat: "14",
    occasion: ["wedding"],
    priceOnRequest: true,
    description: {
      el: "Κλασσικές βέρες από χρυσό 14Κ, με ματ ή γυαλιστερό φινίρισμα.",
      en: "Classic 14K gold wedding bands, in matte or polished finish.",
    },
    availableInStore: true,
    featured: true,
  },
  {
    _id: "p-3",
    title: { el: "Κολιέ Lumière", en: "Lumière Necklace" },
    slug: { current: "kolie-lumiere" },
    sku: "NCK-022",
    category: fallbackCategories[2],
    images: [{ asset: { url: PLACEHOLDER_NECKLACE }, alt: "Lumière necklace" }],
    material: "gold",
    karat: "14",
    occasion: ["everyday", "gift"],
    price: 480,
    description: {
      el: "Λεπτή αλυσίδα από χρυσό 14Κ με delicate παντατίφ.",
      en: "Slim 14K gold chain with delicate pendant.",
    },
    availableInStore: true,
    featured: true,
  },
  {
    _id: "p-4",
    title: { el: "Σκουλαρίκια Étoile", en: "Étoile Earrings" },
    slug: { current: "skoularikia-etoile" },
    sku: "EAR-045",
    category: fallbackCategories[3],
    images: [{ asset: { url: PLACEHOLDER_EARRINGS }, alt: "Étoile earrings" }],
    material: "white-gold",
    karat: "18",
    stone: "diamond",
    occasion: ["everyday", "gift"],
    price: 920,
    description: {
      el: "Καρφωτά σκουλαρίκια από λευκόχρυσο 18Κ με μικρά διαμάντια.",
      en: "18K white gold stud earrings with small diamonds.",
    },
    availableInStore: true,
    featured: true,
  },
  {
    _id: "p-5",
    title: { el: "Βραχιόλι Cleo", en: "Cleo Bracelet" },
    slug: { current: "vraxioli-cleo" },
    sku: "BRC-031",
    category: fallbackCategories[4],
    images: [{ asset: { url: PLACEHOLDER_BRACELET }, alt: "Cleo bracelet" }],
    material: "rose-gold",
    karat: "14",
    occasion: ["everyday"],
    price: 380,
    description: {
      el: "Βραχιόλι αλυσίδα ροζ χρυσού 14Κ με ασφαλιστικό κούμπωμα.",
      en: "14K rose gold chain bracelet with secure clasp.",
    },
    availableInStore: true,
    featured: false,
  },
  {
    _id: "p-6",
    title: { el: "Σταυρός Επωνύμου", en: "Initial Cross Pendant" },
    slug: { current: "stavros-eponymou" },
    sku: "RLG-009",
    category: fallbackCategories[5],
    images: [{ asset: { url: PLACEHOLDER_DETAIL }, alt: "Cross pendant" }],
    material: "gold",
    karat: "14",
    occasion: ["christening", "gift"],
    price: 290,
    description: {
      el: "Χρυσός σταυρός βαπτίσεως 14Κ, με δυνατότητα χάραξης.",
      en: "14K gold christening cross, customisable with engraving.",
    },
    availableInStore: true,
    featured: false,
  },
];

export const fallbackServices: Service[] = [
  {
    _id: "s-1",
    title: { el: "Σχεδιασμός κατά παραγγελία", en: "Custom design" },
    tagline: { el: "Το κόσμημα των ονείρων σας.", en: "The jewel of your dreams." },
    slug: { current: "custom-design" },
    icon: "sparkles",
    image: { asset: { url: PLACEHOLDER_DETAIL }, alt: "Custom design" },
    shortDescription: {
      el: "Σχεδιάζουμε και κατασκευάζουμε μοναδικά κοσμήματα από τις δικές σας ιδέες.",
      en: "We design and craft unique jewelry from your ideas.",
    },
  },
  {
    _id: "s-2",
    title: { el: "Επισκευές & Αναπαλαίωση", en: "Repairs & Restoration" },
    tagline: { el: "Νέα ζωή στα αγαπημένα σας.", en: "New life for cherished pieces." },
    slug: { current: "repairs" },
    icon: "wrench",
    image: { asset: { url: PLACEHOLDER_RING }, alt: "Repairs" },
    shortDescription: {
      el: "Από συγκολλήσεις και αλλαγές μεγέθους έως πλήρη αναπαλαίωση.",
      en: "From soldering and resizing to full restoration.",
    },
  },
  {
    _id: "s-3",
    title: { el: "Χάραξη", en: "Engraving" },
    tagline: { el: "Κάντε το πιο προσωπικό.", en: "Make it personal." },
    slug: { current: "engraving" },
    icon: "pen-tool",
    image: { asset: { url: PLACEHOLDER_BRACELET }, alt: "Engraving" },
    shortDescription: {
      el: "Μηχανική και χειροποίητη χάραξη ονομάτων, ημερομηνιών και συμβόλων.",
      en: "Machine and hand engraving of names, dates and symbols.",
    },
  },
  {
    _id: "s-4",
    title: { el: "Εκτιμήσεις", en: "Appraisals" },
    tagline: { el: "Επίσημες εκτιμήσεις με πιστοποιητικό.", en: "Official appraisals with certificate." },
    slug: { current: "appraisals" },
    icon: "scale",
    image: { asset: { url: PLACEHOLDER_DETAIL }, alt: "Appraisals" },
    shortDescription: {
      el: "Επαγγελματικές εκτιμήσεις από έμπειρους χρυσοχόους.",
      en: "Professional appraisals by experienced goldsmiths.",
    },
  },
  {
    _id: "s-5",
    title: { el: "Αγορά Χρυσού", en: "Buy Gold" },
    tagline: { el: "Άμεση και διαφανής αξιολόγηση.", en: "Instant transparent valuation." },
    slug: { current: "buy-gold" },
    icon: "coins",
    image: { asset: { url: PLACEHOLDER_DETAIL }, alt: "Buy gold" },
    shortDescription: {
      el: "Αγοράζουμε χρυσά κοσμήματα και νομίσματα με σύγχρονη ζύγιση.",
      en: "We buy gold jewelry and coins with modern weighing.",
    },
  },
];

export const fallbackTestimonials: Testimonial[] = [
  {
    _id: "t-1",
    author: "Giannis Fok",
    rating: 5,
    quote: {
      el: "Τα 5 αστέρια είναι λίγα — η βοήθεια που μου πρόσφεραν τα παιδιά από την πρώτη στιγμή ήταν εξαιρετικά σημαντική. Απίστευτα εξυπηρετικοί και υπομονετικοί.",
      en: "5 stars feel too few. The team helped me from the very first moment, with incredible patience and care.",
    },
    source: "google",
    publishedAt: "2025-11-12",
  },
  {
    _id: "t-2",
    author: "Γιάννης Λιακόπουλος",
    rating: 5,
    quote: {
      el: "Πολύ καλή δουλειά και καλές τιμές!",
      en: "Excellent craftsmanship and great prices!",
    },
    source: "google",
    publishedAt: "2025-09-04",
  },
  {
    _id: "t-3",
    author: "Ντίνα Δαμασκοπούλου",
    rating: 5,
    quote: {
      el: "Ξεχωρίζει για την ποιότητα και την ποικιλία των κοσμημάτων του, αλλά και για την άψογη εξυπηρέτηση. Ευγενικό και υπομονετικό προσωπικό.",
      en: "It stands out for the quality and variety of its jewelry, but also for the impeccable service. The staff are kind and patient.",
    },
    source: "google",
    publishedAt: "2025-04-22",
  },
];

export const fallbackFaqs: Faq[] = [
  {
    _id: "f-1",
    question: { el: "Πού βρίσκεστε;", en: "Where are you located?" },
    answer: {
      el: "Στη Σιρράκου 85-87, Πετρούπολη 131 23. Στην καρδιά της αγοράς της Πετρούπολης.",
      en: "At Sirrakou 85-87, Petroupoli 131 23 — in the heart of Petroupoli.",
    },
    category: "general",
  },
  {
    _id: "f-2",
    question: { el: "Κάνετε επισκευές παλαιών κοσμημάτων;", en: "Do you repair antique jewelry?" },
    answer: {
      el: "Ναι, αναλαμβάνουμε επισκευές και πλήρη αναπαλαίωση παλαιών κοσμημάτων με προσοχή σε κάθε λεπτομέρεια.",
      en: "Yes, we handle repairs and full restoration of antique jewelry with attention to every detail.",
    },
    category: "repairs",
  },
  {
    _id: "f-3",
    question: { el: "Πόσο διαρκεί ένα κατά παραγγελία κόσμημα;", en: "How long does a custom piece take?" },
    answer: {
      el: "Συνήθως 2 με 6 εβδομάδες, ανάλογα με την πολυπλοκότητα του σχεδίου και τη διαθεσιμότητα των πετρών.",
      en: "Typically 2 to 6 weeks, depending on design complexity and stone availability.",
    },
    category: "custom",
  },
  {
    _id: "f-4",
    question: { el: "Δέχεστε πιστωτικές κάρτες;", en: "Do you accept credit cards?" },
    answer: {
      el: "Δεχόμαστε μετρητά και όλες τις μεγάλες πιστωτικές/χρεωστικές κάρτες (Visa, Mastercard).",
      en: "We accept cash and all major credit/debit cards (Visa, Mastercard).",
    },
    category: "payments",
  },
  {
    _id: "f-5",
    question: { el: "Μπορώ να επιστρέψω ένα κόσμημα;", en: "Can I return a piece of jewelry?" },
    answer: {
      el: "Δεχόμαστε αλλαγές εντός 14 ημερών με την προϋπόθεση ότι το κόσμημα είναι αμεταχείριστο και έχετε την απόδειξη. Τα κοσμήματα κατά παραγγελία δεν επιστρέφονται.",
      en: "Exchanges are accepted within 14 days, provided the piece is unworn and accompanied by the receipt. Custom-made pieces are non-returnable.",
    },
    category: "returns",
  },
];

export const fallbackHomepage: Homepage = {
  heroEyebrow: { el: "Από το 1985 στην Πετρούπολη", en: "In Petroupoli since 1985" },
  heroTitle: { el: "Χειροποίητη κομψότητα,\nαξεπέραστη ποιότητα.", en: "Handcrafted elegance,\nuncompromising quality." },
  heroSubtitle: {
    el: "Συλλογές κοσμημάτων από χρυσό 9, 14 και 18 καρατίων με πολύτιμες πέτρες, για κάθε σημαντική στιγμή της ζωής σας.",
    en: "Curated 9, 14 and 18 karat gold jewelry collections with precious stones, for every meaningful moment.",
  },
  heroImage: { asset: { url: PLACEHOLDER_IMG }, alt: "Hero" },
  featuredCollections: fallbackCategories.filter((c) => c.featured),
  featuredProducts: fallbackProducts.filter((p) => p.featured),
  featuredServices: fallbackServices.slice(0, 3),
  featuredTestimonials: fallbackTestimonials,
  storyTitle: { el: "Μια οικογένεια αφιερωμένη στο κόσμημα", en: "A family devoted to fine jewelry" },
  storyText: {
    el: "Οι Αδελφοί Π. Γκουγκούδη συνεχίζουν την οικογενειακή παράδοση στην καρδιά της Πετρούπολης, με την ίδια αγάπη για την τέχνη του κοσμήματος.",
    en: "The Kougkoudis Brothers continue the family tradition in the heart of Petroupoli, with the same love for the craft.",
  },
  storyImage: { asset: { url: PLACEHOLDER_DETAIL }, alt: "Workshop" },
};

export const fallbackSiteSettings: SiteSettings = {
  brand: { el: "GP. ΓΚΟΥΓΚΟΥΔΗΣ", en: "GP. KOUGKOUDIS" },
  tagline: {
    el: "Κοσμηματοπωλείο στην Πετρούπολη Αττικής.",
    en: "Jewelry store in Petroupoli, Athens.",
  },
  phoneDisplay: "210 502 3076",
  phoneTel: "+302105023076",
  whatsapp: "+302105023076",
  email: "info@gpkougkoudis.gr",
  address: {
    el: "Σιρράκου 85-87, Πετρούπολη 131 23",
    en: "Sirrakou 85-87, Petroupoli 131 23",
  },
  social: {
    facebook: "https://www.facebook.com/gpgkougkoudis",
    instagram: "https://www.instagram.com/gp_kougkoudis",
    google: "https://g.page/gpgkougkoudis",
  },
  hours: {
    monday: "09:00–14:00, 17:30–20:30",
    tuesday: "09:00–15:00",
    wednesday: "09:00–14:00, 17:30–20:30",
    thursday: "09:00–14:00, 17:30–20:30",
    friday: "09:00–14:00, 17:30–20:30",
    saturday: "09:00–15:00",
    sunday: "Κλειστά",
  },
  googleRating: 4.9,
  googleReviewCount: 123,
};
