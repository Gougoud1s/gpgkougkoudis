import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2024-10-01" });

const IMG = {
  hero: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1600&q=80",
  ring: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=1200&q=80",
  necklace: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1200&q=80",
  earrings: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&q=80",
  bracelet: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1200&q=80",
  wedding: "https://images.unsplash.com/photo-1521334884684-d80222895322?w=1200&q=80",
  detail: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=80",
  detail2: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1200&q=80",
  detail3: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1400&q=80",
};

async function uploadImage(url, filename, alt) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch image ${url}`);
  const ab = await res.arrayBuffer();
  const buffer = Buffer.from(ab);
  const asset = await client.assets.upload("image", buffer, { filename });
  return {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
    alt,
  };
}

function ref(_id) {
  return { _type: "reference", _ref: _id };
}

async function main() {
  console.log("Seeding bilingual fallback content into Sanity...");

  const images = {
    hero: await uploadImage(IMG.hero, "hero.jpg", "Hero"),
    ring: await uploadImage(IMG.ring, "ring.jpg", "Δαχτυλίδι από χρυσό"),
    wedding: await uploadImage(IMG.wedding, "wedding.jpg", "Βέρες γάμου"),
    necklace: await uploadImage(IMG.necklace, "necklace.jpg", "Χρυσό κολιέ"),
    earrings: await uploadImage(IMG.earrings, "earrings.jpg", "Σκουλαρίκια"),
    bracelet: await uploadImage(IMG.bracelet, "bracelet.jpg", "Βραχιόλι"),
    detail: await uploadImage(IMG.detail, "detail.jpg", "Κόσμημα"),
    detail2: await uploadImage(IMG.detail2, "detail2.jpg", "Κόσμημα λεπτομέρεια"),
    detail3: await uploadImage(IMG.detail3, "detail3.jpg", "Κόσμημα κοντινό"),
  };

  const categories = [
    {
      _id: "cat-rings",
      _type: "category",
      title: { el: "Δαχτυλίδια", en: "Rings" },
      slug: { _type: "slug", current: "rings" },
      icon: "circle",
      image: images.ring,
      description: {
        el: "Από διαχρονικά μονόπετρα έως μοντέρνα σχέδια.",
        en: "From timeless solitaires to modern designs.",
      },
      featured: true,
      order: 1,
    },
    {
      _id: "cat-wedding",
      _type: "category",
      title: { el: "Γάμος & Αρραβώνας", en: "Wedding & Engagement" },
      slug: { _type: "slug", current: "wedding" },
      icon: "heart",
      image: images.wedding,
      description: {
        el: "Βέρες, μονόπετρα και κοσμήματα για τη μεγάλη ημέρα.",
        en: "Wedding bands, engagement rings and pieces for the big day.",
      },
      featured: true,
      order: 2,
    },
    {
      _id: "cat-necklaces",
      _type: "category",
      title: { el: "Κολιέ", en: "Necklaces" },
      slug: { _type: "slug", current: "necklaces" },
      icon: "gem",
      image: images.necklace,
      description: { el: "Από καθημερινά έως statement.", en: "From everyday to statement." },
      featured: true,
      order: 3,
    },
    {
      _id: "cat-earrings",
      _type: "category",
      title: { el: "Σκουλαρίκια", en: "Earrings" },
      slug: { _type: "slug", current: "earrings" },
      icon: "sparkles",
      image: images.earrings,
      description: { el: "Καρφωτά, κρεμαστά και ενώτια.", en: "Studs, drops and hoops." },
      featured: true,
      order: 4,
    },
    {
      _id: "cat-bracelets",
      _type: "category",
      title: { el: "Βραχιόλια", en: "Bracelets" },
      slug: { _type: "slug", current: "bracelets" },
      icon: "link",
      image: images.bracelet,
      description: { el: "Αλυσίδες και βραχιόλια όλων των τύπων.", en: "Chains and cuffs in many styles." },
      featured: false,
      order: 5,
    },
    {
      _id: "cat-religious",
      _type: "category",
      title: { el: "Σταυροί & Θρησκευτικά", en: "Crosses & Religious" },
      slug: { _type: "slug", current: "religious" },
      icon: "cross",
      image: images.detail,
      description: { el: "Σταυροί βαπτίσεως και θρησκευτικά κοσμήματα.", en: "Christening crosses and religious pieces." },
      featured: false,
      order: 6,
    },
    {
      _id: "cat-kids",
      _type: "category",
      title: { el: "Παιδικά", en: "Children" },
      slug: { _type: "slug", current: "kids" },
      icon: "baby",
      image: images.detail,
      description: { el: "Φυλαχτά, σκουλαρίκια και αλυσίδες για παιδιά.", en: "Charms, earrings and chains for children." },
      featured: false,
      order: 7,
    },
  ];

  const services = [
    {
      _id: "s-1",
      _type: "service",
      title: { el: "Σχεδιασμός κατά παραγγελία", en: "Custom design" },
      tagline: { el: "Το κόσμημα των ονείρων σας.", en: "The jewel of your dreams." },
      slug: { _type: "slug", current: "custom-design" },
      icon: "sparkles",
      image: images.detail,
      shortDescription: {
        el: "Σχεδιάζουμε και κατασκευάζουμε μοναδικά κοσμήματα από τις δικές σας ιδέες.",
        en: "We design and craft unique jewelry from your ideas.",
      },
      gallery: [images.detail, images.ring, images.detail2],
      order: 1,
      featured: true,
    },
    {
      _id: "s-2",
      _type: "service",
      title: { el: "Επισκευές & Αναπαλαίωση", en: "Repairs & Restoration" },
      tagline: { el: "Νέα ζωή στα αγαπημένα σας.", en: "New life for cherished pieces." },
      slug: { _type: "slug", current: "repairs" },
      icon: "wrench",
      image: images.ring,
      shortDescription: {
        el: "Από συγκολλήσεις και αλλαγές μεγέθους έως πλήρη αναπαλαίωση.",
        en: "From soldering and resizing to full restoration.",
      },
      gallery: [images.ring, images.detail, images.detail3],
      order: 2,
      featured: true,
    },
    {
      _id: "s-3",
      _type: "service",
      title: { el: "Χάραξη", en: "Engraving" },
      tagline: { el: "Κάντε το πιο προσωπικό.", en: "Make it personal." },
      slug: { _type: "slug", current: "engraving" },
      icon: "pen-tool",
      image: images.bracelet,
      shortDescription: {
        el: "Μηχανική και χειροποίητη χάραξη ονομάτων, ημερομηνιών και συμβόλων.",
        en: "Machine and hand engraving of names, dates and symbols.",
      },
      gallery: [images.bracelet, images.detail2, images.detail],
      order: 3,
      featured: true,
    },
    {
      _id: "s-4",
      _type: "service",
      title: { el: "Εκτιμήσεις", en: "Appraisals" },
      tagline: { el: "Επίσημες εκτιμήσεις με πιστοποιητικό.", en: "Official appraisals with certificate." },
      slug: { _type: "slug", current: "appraisals" },
      icon: "scale",
      image: images.detail,
      shortDescription: {
        el: "Επαγγελματικές εκτιμήσεις από έμπειρους χρυσοχόους.",
        en: "Professional appraisals by experienced goldsmiths.",
      },
      gallery: [images.detail, images.detail3, images.ring],
      order: 4,
      featured: false,
    },
    {
      _id: "s-5",
      _type: "service",
      title: { el: "Αγορά Χρυσού", en: "Buy Gold" },
      tagline: { el: "Άμεση και διαφανής αξιολόγηση.", en: "Instant transparent valuation." },
      slug: { _type: "slug", current: "buy-gold" },
      icon: "coins",
      image: images.detail,
      shortDescription: {
        el: "Αγοράζουμε χρυσά κοσμήματα και νομίσματα με σύγχρονη ζύγιση.",
        en: "We buy gold jewelry and coins with modern weighing.",
      },
      gallery: [images.detail2, images.detail, images.bracelet],
      order: 5,
      featured: false,
    },
  ];

  const testimonials = [
    {
      _id: "t-1",
      _type: "testimonial",
      author: "Giannis Fok",
      rating: 5,
      quote: {
        el: "Τα 5 αστέρια είναι λίγα — η βοήθεια που μου πρόσφεραν τα παιδιά από την πρώτη στιγμή ήταν εξαιρετικά σημαντική. Απίστευτα εξυπηρετικοί και υπομονετικοί.",
        en: "5 stars feel too few. The team helped me from the very first moment, with incredible patience and care.",
      },
      source: "google",
      publishedAt: "2025-11-12",
      featured: true,
    },
    {
      _id: "t-2",
      _type: "testimonial",
      author: "Γιάννης Λιακόπουλος",
      rating: 5,
      quote: { el: "Πολύ καλή δουλειά και καλές τιμές!", en: "Excellent craftsmanship and great prices!" },
      source: "google",
      publishedAt: "2025-09-04",
      featured: true,
    },
    {
      _id: "t-3",
      _type: "testimonial",
      author: "Ντίνα Δαμασκοπούλου",
      rating: 5,
      quote: {
        el: "Ξεχωρίζει για την ποιότητα και την ποικιλία των κοσμημάτων του, αλλά και για την άψογη εξυπηρέτηση. Ευγενικό και υπομονετικό προσωπικό.",
        en: "It stands out for the quality and variety of its jewelry, but also for the impeccable service. The staff are kind and patient.",
      },
      source: "google",
      publishedAt: "2025-04-22",
      featured: true,
    },
  ];

  const faqs = [
    {
      _id: "f-1",
      _type: "faq",
      question: { el: "Πού βρίσκεστε;", en: "Where are you located?" },
      answer: {
        el: "Στη Σιρράκου 85-87, Πετρούπολη 131 23. Στην καρδιά της αγοράς της Πετρούπολης.",
        en: "At Sirrakou 85-87, Petroupoli 131 23 — in the heart of Petroupoli.",
      },
      category: "general",
      order: 1,
    },
    {
      _id: "f-2",
      _type: "faq",
      question: { el: "Κάνετε επισκευές παλαιών κοσμημάτων;", en: "Do you repair antique jewelry?" },
      answer: {
        el: "Ναι, αναλαμβάνουμε επισκευές και πλήρη αναπαλαίωση παλαιών κοσμημάτων με προσοχή σε κάθε λεπτομέρεια.",
        en: "Yes, we handle repairs and full restoration of antique jewelry with attention to every detail.",
      },
      category: "repairs",
      order: 2,
    },
    {
      _id: "f-3",
      _type: "faq",
      question: { el: "Πόσο διαρκεί ένα κατά παραγγελία κόσμημα;", en: "How long does a custom piece take?" },
      answer: {
        el: "Συνήθως 2 με 6 εβδομάδες, ανάλογα με την πολυπλοκότητα του σχεδίου και τη διαθεσιμότητα των πετρών.",
        en: "Typically 2 to 6 weeks, depending on design complexity and stone availability.",
      },
      category: "custom",
      order: 3,
    },
    {
      _id: "f-4",
      _type: "faq",
      question: { el: "Δέχεστε πιστωτικές κάρτες;", en: "Do you accept credit cards?" },
      answer: {
        el: "Δεχόμαστε μετρητά και όλες τις μεγάλες πιστωτικές/χρεωστικές κάρτες (Visa, Mastercard).",
        en: "We accept cash and all major credit/debit cards (Visa, Mastercard).",
      },
      category: "payments",
      order: 4,
    },
    {
      _id: "f-5",
      _type: "faq",
      question: { el: "Μπορώ να επιστρέψω ένα κόσμημα;", en: "Can I return a piece of jewelry?" },
      answer: {
        el: "Δεχόμαστε αλλαγές εντός 14 ημερών με την προϋπόθεση ότι το κόσμημα είναι αμεταχείριστο και έχετε την απόδειξη. Τα κοσμήματα κατά παραγγελία δεν επιστρέφονται.",
        en: "Exchanges are accepted within 14 days, provided the piece is unworn and accompanied by the receipt. Custom-made pieces are non-returnable.",
      },
      category: "returns",
      order: 5,
    },
  ];

  const products = [
    {
      _id: "p-1",
      _type: "product",
      title: { el: "Μονόπετρο Aurora", en: "Aurora Solitaire" },
      slug: { _type: "slug", current: "monopetro-aurora" },
      sku: "RNG-001",
      category: ref("cat-wedding"),
      images: [images.ring, images.detail, images.detail2],
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
      publishedAt: new Date().toISOString(),
    },
    {
      _id: "p-2",
      _type: "product",
      title: { el: "Βέρες Eternity", en: "Eternity Bands" },
      slug: { _type: "slug", current: "veres-eternity" },
      sku: "WED-014",
      category: ref("cat-wedding"),
      images: [images.wedding, images.ring, images.detail3],
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
      publishedAt: new Date().toISOString(),
    },
    {
      _id: "p-3",
      _type: "product",
      title: { el: "Κολιέ Lumière", en: "Lumière Necklace" },
      slug: { _type: "slug", current: "kolie-lumiere" },
      sku: "NCK-022",
      category: ref("cat-necklaces"),
      images: [images.necklace, images.detail2, images.detail],
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
      publishedAt: new Date().toISOString(),
    },
    {
      _id: "p-4",
      _type: "product",
      title: { el: "Σκουλαρίκια Étoile", en: "Étoile Earrings" },
      slug: { _type: "slug", current: "skoularikia-etoile" },
      sku: "EAR-045",
      category: ref("cat-earrings"),
      images: [images.earrings, images.detail, images.detail3],
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
      publishedAt: new Date().toISOString(),
    },
    {
      _id: "p-5",
      _type: "product",
      title: { el: "Βραχιόλι Cleo", en: "Cleo Bracelet" },
      slug: { _type: "slug", current: "vraxioli-cleo" },
      sku: "BRC-031",
      category: ref("cat-bracelets"),
      images: [images.bracelet, images.detail2, images.detail],
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
      publishedAt: new Date().toISOString(),
    },
    {
      _id: "p-6",
      _type: "product",
      title: { el: "Σταυρός Επωνύμου", en: "Initial Cross Pendant" },
      slug: { _type: "slug", current: "stavros-eponymou" },
      sku: "RLG-009",
      category: ref("cat-religious"),
      images: [images.detail, images.detail3, images.detail2],
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
      publishedAt: new Date().toISOString(),
    },
  ];

  const siteSettings = {
    _id: "siteSettings",
    _type: "siteSettings",
    brand: { el: "GP. ΓΚΟΥΓΚΟΥΔΗΣ", en: "GP. KOUGKOUDIS" },
    tagline: { el: "Κοσμηματοπωλείο στην Πετρούπολη Αττικής.", en: "Jewelry store in Petroupoli, Athens." },
    phoneDisplay: "210 502 3076",
    phoneTel: "+302105023076",
    email: "info@gpkougkoudis.gr",
    address: { el: "Σιρράκου 85-87, Πετρούπολη 131 23", en: "Sirrakou 85-87, Petroupoli 131 23" },
    social: {
      facebook: "https://www.facebook.com/gpgkougkoudis",
      instagram: "https://www.instagram.com/gp.gougoudis",
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

  const homepage = {
    _id: "homepage",
    _type: "homepage",
    heroEyebrow: { el: "Από το 1985 στην Πετρούπολη", en: "In Petroupoli since 1985" },
    heroTitle: { el: "Χειροποίητη κομψότητα,\nαξεπέραστη ποιότητα.", en: "Handcrafted elegance,\nuncompromising quality." },
    heroSubtitle: {
      el: "Συλλογές κοσμημάτων από χρυσό 9, 14 και 18 καρατίων με πολύτιμες πέτρες, για κάθε σημαντική στιγμή της ζωής σας.",
      en: "Curated 9, 14 and 18 karat gold jewelry collections with precious stones, for every meaningful moment.",
    },
    heroImage: images.hero,
    featuredCollections: [ref("cat-rings"), ref("cat-wedding"), ref("cat-necklaces"), ref("cat-earrings")],
    featuredProducts: [ref("p-1"), ref("p-2"), ref("p-3")],
    featuredServices: [ref("s-1"), ref("s-2"), ref("s-3")],
    featuredTestimonials: [ref("t-1"), ref("t-2"), ref("t-3")],
    storyTitle: { el: "Μια οικογένεια αφιερωμένη στο κόσμημα", en: "A family devoted to fine jewelry" },
    storyText: {
      el: "Οι Αδελφοί Π. Γκουγκούδη συνεχίζουν την οικογενειακή παράδοση στην καρδιά της Πετρούπολης, με την ίδια αγάπη για την τέχνη του κοσμήματος.",
      en: "The Kougkoudis Brothers continue the family tradition in the heart of Petroupoli, with the same love for the craft.",
    },
    storyImage: images.detail,
  };

  // Non-destructive seeding: only create missing docs, never overwrite.
  for (const doc of categories) await client.createIfNotExists(doc);
  for (const doc of services) await client.createIfNotExists(doc);
  for (const doc of testimonials) await client.createIfNotExists(doc);
  for (const doc of faqs) await client.createIfNotExists(doc);
  for (const doc of products) await client.createIfNotExists(doc);
  await client.createIfNotExists(siteSettings);
  await client.createIfNotExists(homepage);

  console.log("Seed complete.");
  console.log(
    `Ensured baseline exists: ${categories.length} categories, ${services.length} services, ${products.length} products, ${testimonials.length} testimonials, ${faqs.length} FAQs, homepage + siteSettings`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
