import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2024-10-01" });
const pages = await client.fetch(`*[_type == "contentPage"]{_id, route}`);
const transaction = client.transaction();

for (const page of pages) {
  const route = String(page.route || "").replace(/^\/+|\/+$/g, "");
  const removed = route === "wedding" || route === "reviews";
  transaction.patch(page._id, {
    setIfMissing: {
      enabled: !removed,
      showInNavigation: route === "about",
      showInSitemap: !removed,
    },
  });
}

if (pages.length > 0) await transaction.commit();
console.log(`Initialized visibility controls on ${pages.length} content page document(s).`);
