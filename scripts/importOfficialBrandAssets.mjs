import { createClient } from "@sanity/client";
import { createReadStream } from "node:fs";
import { basename, resolve } from "node:path";

const client = createClient({
  projectId: "pghq5w9x",
  dataset: "production",
  apiVersion: "2024-10-01",
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});
const root = process.cwd();

async function upload(relativePath, label) {
  const filename = basename(relativePath);
  console.log(`Checking ${filename}...`);
  const existing = await client.fetch(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]{_id}`,
    { filename }
  );
  const asset = existing || await client.assets.upload(
    "image",
    createReadStream(resolve(root, relativePath)),
    { filename, title: label }
  );
  console.log(`${existing ? "Reused" : "Uploaded"} ${filename}.`);
  return { _type: "image", asset: { _type: "reference", _ref: asset._id }, alt: label };
}

async function main() {
  const logo = await upload("public/brand/gougoudis-logo-transparent.png", "Gougoudis Gioielli logo");
  const images = {};
  for (const number of ["01", "02", "03", "05", "06", "07", "08"]) {
    images[number] = await upload(
      `public/images/heritage/newslide${number}.jpg`,
      `Gougoudis jewellery collection ${number}`
    );
  }

  const [homepage, settings, pages, categories, products] = await Promise.all([
    client.fetch(`*[_type == "homepage"][0]{_id}`),
    client.fetch(`*[_type == "siteSettings"][0]{_id}`),
    client.fetch(`*[_type == "contentPage"]{_id, route}`),
    client.fetch(`*[_type == "category"]{_id, "slug": slug.current, title}`),
    client.fetch(`*[_type == "product"]{_id, title, "category": category->slug.current}`),
  ]);

  const transaction = client.transaction();
  if (settings?._id) transaction.patch(settings._id, (patch) => patch.set({
    logo,
    footerDescription: {
      el: "Χειροποίητο κόσμημα, προσωπική φροντίδα και αυθεντική, προσιτή πολυτέλεια από το 1980.",
      en: "Handcrafted jewellery, personal care and authentic, accessible luxury since 1980.",
    },
    logoTagline: { el: "Αφοί Π. Γκουγκούδη · από το 1980", en: "Kougkoudis Brothers · since 1980" },
  }));
  if (homepage?._id) transaction.patch(homepage._id, (patch) => patch.set({
    heroImage: images["02"],
    storyImage: images["03"],
    storyTitle: { el: "Κόσμημα με ιστορία από το 1980", en: "Jewellery with a story since 1980" },
    storyText: {
      el: "Στο εργαστήριο των Αφών Π. Γκουγκούδη η χειροποίητη δημιουργία συναντά την προσωπική εξυπηρέτηση. Με απευθείας διάθεση από το κατάστημα, προσεγμένα υλικά και συνεργασίες με καταξιωμένους οίκους χρυσοχοΐας, κάθε κόσμημα σχεδιάζεται για να συνοδεύει τις σημαντικές στιγμές της ζωής.",
      en: "At the Kougkoudis Brothers workshop, handcrafted design meets genuinely personal service. With direct-from-workshop value, carefully selected materials and trusted jewellery-house partnerships, every piece is chosen to accompany life’s most meaningful moments.",
    },
  }));

  const about = pages.find((page) => page.route === "about");
  if (about) transaction.patch(about._id, (patch) => patch.set({
    heroImage: images["01"],
    title: { el: "Μια οικογενειακή σχέση εμπιστοσύνης από το 1980", en: "A family tradition of trust since 1980" },
    subtitle: {
      el: "Χειροποίητη αργυροχρυσοχοΐα, προσωπική φροντίδα και ποιότητα χωρίς συμβιβασμούς.",
      en: "Handcrafted goldsmithing, personal attention and quality without compromise.",
    },
  }));
  const wedding = pages.find((page) => page.route === "wedding");
  if (wedding) transaction.patch(wedding._id, (patch) => patch.set({ heroImage: images["03"] }));

  const categoryImages = {
    wedding: images["03"], rings: images["02"], necklaces: images["01"],
    bracelets: images["07"], crosses: images["05"], chains: images["06"],
  };
  for (const category of categories) {
    const image = categoryImages[category.slug];
    if (image) transaction.patch(category._id, (patch) => patch.set({ image }));
  }

  const ringImages = [images["02"], images["03"]];
  const generalImages = [images["01"], images["05"], images["06"], images["07"], images["08"]];
  let ringIndex = 0;
  let generalIndex = 0;
  for (const product of products) {
    const ringLike = ["wedding", "rings"].includes(product.category);
    const image = ringLike ? ringImages[ringIndex++ % ringImages.length] : generalImages[generalIndex++ % generalImages.length];
    transaction.patch(product._id, (patch) => patch.set({ images: [image] }));
  }

  await transaction.commit({ autoGenerateArrayKeys: true });
  console.log(`Imported the official logo and 7 jewellery photographs; updated ${categories.length} categories and ${products.length} products.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
