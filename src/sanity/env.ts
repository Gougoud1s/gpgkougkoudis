/**
 * Sanity environment configuration.
 *
 * The site is designed to render gracefully without Sanity connected:
 * `src/sanity/fetch.ts` falls back to placeholder content when no project
 * ID is provided. So we never throw here — the studio mount and any GROQ
 * fetch will simply no-op until the env vars are set.
 */
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

export const studioUrl = "/studio";

export const isSanityConfigured = Boolean(projectId);
