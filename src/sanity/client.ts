import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

/**
 * Lazily-instantiated Sanity client. We avoid creating the client at
 * module-evaluation time because `createClient` throws when `projectId`
 * is empty during setup or tooling.
 */
let _client: SanityClient | null = null;

function getClient(): SanityClient | null {
  if (!projectId) return null;
  if (!_client) {
    _client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      perspective: "published",
    });
  }
  return _client;
}

// Provide a Proxy with a fetch method so existing call sites keep working.
export const client = {
  fetch: async <T>(query: string, params: Record<string, unknown> = {}) => {
    const c = getClient();
    if (!c) return null as T;
    // Editorial changes and deletions should be visible immediately after
    // publishing, so bypass both Sanity's CDN and Next.js route caching.
    return c.fetch<T>(query, params, { cache: "no-store" });
  },
};
