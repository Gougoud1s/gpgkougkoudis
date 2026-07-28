import { createHash } from "node:crypto";
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2024-10-01" });
const fields = [
  "featuredCollections",
  "featuredProducts",
  "featuredServices",
  "featuredTestimonials",
];

function keyFor(documentId, field, item, index) {
  return createHash("sha1")
    .update(`${documentId}:${field}:${item?._ref || item?._type || "item"}:${index}`)
    .digest("hex")
    .slice(0, 16);
}

const documents = await client.fetch(
  `*[_type == "homepage"]{_id, featuredCollections, featuredProducts, featuredServices, featuredTestimonials}`
);

const transaction = client.transaction();
let repairedItems = 0;

for (const document of documents) {
  const patch = {};

  for (const field of fields) {
    if (!Array.isArray(document[field])) continue;

    const usedKeys = new Set(document[field].map((item) => item?._key).filter(Boolean));
    let changed = false;
    const items = document[field].map((item, index) => {
      if (item?._key) return item;

      let key = keyFor(document._id, field, item, index);
      let suffix = 1;
      while (usedKeys.has(key)) key = `${keyFor(document._id, field, item, index)}-${suffix++}`;
      usedKeys.add(key);
      changed = true;
      repairedItems += 1;
      return { ...item, _key: key };
    });

    if (changed) patch[field] = items;
  }

  if (Object.keys(patch).length > 0) transaction.patch(document._id, { set: patch });
}

if (repairedItems === 0) {
  console.log("Homepage arrays already have valid keys.");
} else {
  await transaction.commit();
  console.log(`Repaired ${repairedItems} homepage array item keys across ${documents.length} document(s).`);
}
