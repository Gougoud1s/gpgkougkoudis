import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        // Apply hardening headers across the whole site.
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
              "img-src 'self' data: blob: https://cdn.sanity.io https://images.unsplash.com https://www.google.com https://maps.gstatic.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.clarity.ms",
              "connect-src 'self' https://cdn.sanity.io https://sanity-cdn.com https://*.api.sanity.io wss://*.api.sanity.io https://www.google-analytics.com https://region1.google-analytics.com https://www.clarity.ms",
              "frame-src 'self' https://www.google.com",
              "object-src 'none'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
        ],
      },
    ];
  },
  async redirects() {
    // Redirects from old site / common typos. Extend as needed at launch.
    return [
      {
        source: "/products/:path*",
        destination: "/el/collections/:path*",
        permanent: true,
      },
      {
        source: "/contact-us",
        destination: "/el/contact",
        permanent: true,
      },
      {
        source: "/sanity",
        destination: "/studio",
        permanent: true,
      },
      {
        source: "/:locale/sanity",
        destination: "/studio",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
