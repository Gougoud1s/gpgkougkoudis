# Launch Checklist — gpkougkoudis.gr

Run through this list before flipping DNS to the new site.

## Pre-launch (1 week before)

- [ ] **Sanity project provisioned** at sanity.io. Capture project ID.
- [ ] `.env.production` populated on Vercel:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET=production`
  - `RESEND_API_KEY`
  - `CONTACT_EMAIL_TO=info@gpkougkoudis.gr`
  - `CONTACT_EMAIL_FROM=no-reply@gpkougkoudis.gr` (verified Resend sender)
  - `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_CLARITY_ID` (after consent has been granted in Google Analytics + Clarity)
- [ ] Owner has logged into `/studio`, all initial categories + at least 5 products per top category have been published.
- [ ] Homepage hero, story, featured collections, services and testimonials have been curated in Studio.
- [ ] Site Settings (hours, phone, email, address, social) verified.
- [ ] At least 6 testimonials curated (incl. the 3 originals from the Google business profile).
- [ ] All forms tested end-to-end: Contact, Reservation, Custom design, Repairs, Engraving, Appraisals, Buy gold, Wedding appointment.
- [ ] Resend domain verified (DKIM + SPF) — emails arrive in inbox, not spam.
- [ ] WhatsApp Business number verified and working (`wa.me/302105023076`).
- [ ] Google Maps embed loads correctly with the correct address.

## SEO & redirects

- [ ] 301 redirects added in `next.config.ts` for the most important old URLs (already includes `/products/*` → `/el/collections/*` and `/contact-us`).
- [ ] hreflang validated with [Merkle hreflang tester](https://technicalseo.com/tools/hreflang/).
- [ ] `sitemap.xml` reachable: `https://www.gpkougkoudis.gr/sitemap.xml`.
- [ ] `robots.txt` reachable.
- [ ] JSON-LD validated via [Rich Results Test](https://search.google.com/test/rich-results) — JewelryStore + Product + Breadcrumbs + FAQ.
- [ ] Open Graph image (`/og-default.jpg`, 1200×630) uploaded to `/public`.
- [ ] Favicon + Apple touch icon uploaded to `/public`.

## Performance & a11y

- [ ] Lighthouse on home + product page ≥ 95 in all categories.
- [ ] Manual keyboard nav: tab through home, product, form — focus rings visible.
- [ ] Mobile test on iPhone SE width (375px) — no horizontal scroll.
- [ ] `prefers-reduced-motion` honored — confirmed in Safari with the option enabled.

## DNS & deployment

- [ ] Vercel project created, custom domain `gpkougkoudis.gr` and `www.gpkougkoudis.gr` added.
- [ ] DNS A / CNAME records pointed to Vercel. TTL lowered to 300s 24h before cutover.
- [ ] HTTPS certificate auto-provisioned by Vercel (verify the green padlock).
- [ ] `www` → apex (or apex → www) redirect configured.
- [ ] Old hosting account billed monthly, kept warm for 7 days post-launch.

## Google ecosystem

- [ ] Google Business Profile claimed/verified at the Sirrakou 85-87 address.
  - Hours match the site Site Settings
  - Profile photo, cover, interior shots uploaded
  - Website link updated to https://www.gpkougkoudis.gr
- [ ] Google Search Console — both `https://www.gpkougkoudis.gr` (URL prefix) and the `gpkougkoudis.gr` (domain) properties verified.
  - Submit sitemap.
- [ ] Google Analytics 4 property created, measurement ID added to `NEXT_PUBLIC_GA_ID`.
- [ ] Microsoft Clarity project created, ID added to `NEXT_PUBLIC_CLARITY_ID`.
- [ ] In GA4: configured **conversions** for events `header-call`, `header-whatsapp`, `product-whatsapp`, `product-call`, `product-reserve`, `visit-directions`, `contact-whatsapp`, `appointment` (form submissions).

## Post-launch (first 48 hours)

- [ ] Submit URL to Google Search Console for indexing.
- [ ] Share the new site on Facebook + Instagram with a launch post.
- [ ] Update the bio link in Instagram and the website field in Facebook.
- [ ] Test contact form from external network (mobile data) and verify owner inbox.
- [ ] Monitor Vercel logs for any 5xx errors.

## Post-launch (first 2 weeks)

- [ ] Send a discreet email to the existing customer list announcing the new site.
- [ ] Ask 3 happy in-store customers to leave a Google review.
- [ ] Monitor GA4 conversions; confirm WhatsApp / call / form events are firing.
- [ ] Gather any usability feedback from owners and adjust copy / sections in Sanity.
