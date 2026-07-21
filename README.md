# GP. ΓΚΟΥΓΚΟΥΔΗΣ — gpkougkoudis.gr

Bilingual (EL / EN) luxury showcase website for the **Αφοί Π. Γκουγκούδη**
jewelry store in Petroupoli, Athens. No online checkout — every page funnels
visitors to **call**, **WhatsApp**, **visit the store** or **book an
appointment**.

The owners run the entire site from a Greek-language Sanity Studio mounted at
`/studio`.

## Stack

| Layer       | Tech                                                              |
| ----------- | ----------------------------------------------------------------- |
| Framework   | Next.js (App Router) + React + TypeScript                         |
| Styling     | Tailwind CSS v4 (custom design tokens, no extra config file)      |
| i18n        | `next-intl` with locale-prefixed routes (`/el/*`, `/en/*`)        |
| CMS         | Sanity v3 Studio mounted at `/studio`                             |
| Animations  | Framer Motion (subtle, 400–600 ms)                                |
| Forms       | React Hook Form + Zod + Resend (Email API)                        |
| Analytics   | GA4 + Microsoft Clarity (loaded only after cookie consent)        |
| Hosting     | Vercel                                                            |

## Local development

```bash
npm install
cp .env.example .env.local        # fill in optional Sanity / Resend keys
npm run dev
```

Visit `http://localhost:3000` — you will be redirected to `/el`.

The site requires the connected Sanity dataset. Set
`NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` locally.

## Sanity Studio

```
/studio
```

Schemas live in `src/sanity/schemas/*`. Studio configuration is in
`sanity.config.ts`. Owners log in with their Google account once the
developer adds them as **Editor** members of the Sanity project.

To deploy the schema changes to a fresh Sanity project:

```bash
npx sanity@latest init       # only once, to create the project
npx sanity deploy            # if you want to host the studio at gpkougkoudis.sanity.studio as well
```

## Project structure

```
src/
  app/                       # App Router
    [locale]/                # all public pages (el | en)
      page.tsx               # Home
      collections/           # Hub + dynamic [category] / [product]
      services/              # Hub + 5 sub-pages
      wedding/               # Wedding & Engagement landing
      about/  reviews/  contact/  faq/  privacy/  cookies/  terms/
    studio/[[...tool]]/      # Sanity Studio at /studio
    api/contact/route.ts     # Resend-powered email endpoint
    sitemap.ts               # XML sitemap (incl. EL/EN alternates)
    robots.ts
  components/
    layout/                  # Header, Footer, CookieBanner, Analytics
    home/                    # Hero, FeaturedCollections, etc.
    product/                 # ProductCard, ProductFilters, ProductGallery, ...
    services/                # ServiceLayout
    forms/                   # ContactForm, ServiceLeadForm, AppointmentForm
    seo/                     # JsonLd helpers
    ui/                      # Button, Container, Input, Eyebrow, SanityImage
  i18n/                      # next-intl routing + navigation
  messages/                  # el.json / en.json
  sanity/
    schemas/                 # All schemas (with localized helpers)
    queries.ts               # GROQ queries
    fetch.ts                 # Server-side Sanity data access
    structure.ts             # Friendly Greek sidebar for the Studio
  lib/                       # utils, site constants
docs/
  OWNER_GUIDE_GR.md          # Greek owner cheat sheet
  LAUNCH_CHECKLIST.md        # Pre / post launch checklist
```

## Conversion goals (per page)

| Page        | Macro goal                            |
| ----------- | ------------------------------------- |
| Home        | Visit / call / WhatsApp                |
| Catalog     | Open a product                         |
| Product     | WhatsApp / reservation / call          |
| Services    | Lead form / call                       |
| Wedding     | Book appointment                       |
| About       | Trust → push to catalog/contact        |
| Reviews     | Trust → contact                        |
| Contact     | Call / WhatsApp / directions / form    |

All these are tracked via `data-event="..."` attributes that the
`Analytics.tsx` component forwards to GA4 (after consent).

## Build & deploy

```bash
npm run build
npm run start
```

Recommended host: **Vercel** (one-click deploy, free for this scale).

See [`docs/LAUNCH_CHECKLIST.md`](docs/LAUNCH_CHECKLIST.md) for the full
go-live checklist.

## License

All rights reserved — © {year} Αφοί Π. Γκουγκούδη.
