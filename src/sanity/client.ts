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
      useCdn: process.env.NODE_ENV === "production",
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
    // Editorial content should be visible immediately after publishing in
    // Studio. Sanity's CDN can still serve the upstream response in
    // production, while Next.js must not freeze it in the route cache.
    return c.fetch<T>(query, params, { cache: "no-store" });
  },
};
