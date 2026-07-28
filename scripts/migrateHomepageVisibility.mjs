import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2024-10-01" });
const visibilityDefaults = {
  showTrustBar: true,
  showFeaturedCollections: true,
  showFeaturedProducts: true,
  showFeaturedServices: true,
  showInstagram: true,
  showStory: true,
  showReviews: true,
  showVisit: true,
};

const documents = await client.fetch(`*[_type == "homepage"]{_id}`);
const transaction = client.transaction();

for (const document of documents) {
  transaction.patch(document._id, { setIfMissing: visibilityDefaults });
}

if (documents.length > 0) await transaction.commit();
console.log(`Initialized homepage visibility controls on ${documents.length} document(s).`);
