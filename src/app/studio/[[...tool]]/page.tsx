/**
 * Sanity Studio mounted at /studio.
 * Owners log in with an email/Google account and can edit everything from here.
 */
"use client";

import Link from "next/link";
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-static";

export default function StudioPage() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  // Without a projectId, Sanity Studio cannot initialize. Show setup instructions
  // instead of crashing the page.
  if (!projectId) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "2rem",
          background: "#FAFAF9",
          color: "#0C0A09",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <section style={{ maxWidth: 720, width: "100%", background: "#fff", border: "1px solid #E7E5E4", padding: "1.5rem" }}>
          <h1 style={{ marginTop: 0 }}>Sanity Studio is not configured yet</h1>
          <p>
            Please add <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> (and dataset) in
            <code> .env.local</code> or your deployment environment, then restart the dev server.
          </p>
          <pre style={{ background: "#F5F5F4", padding: "0.75rem", overflowX: "auto" }}>
{`NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01`}
          </pre>
          <p style={{ marginBottom: 0 }}>
            <Link href="/el" style={{ color: "#A16207" }}>
              Return to website
            </Link>
          </p>
        </section>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
