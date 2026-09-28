# NCI Answering Service — website

Next.js 14 (App Router) + Tailwind 3.4 + TypeScript. Rework of https://nciansweringservice.com/ that keeps NCI's existing design language and adds the sections from the September 2026 proposal.

## Run

```bash
npm install
cp .env.example .env.local   # fill RESEND_API_KEY + LEAD_TO_EMAIL before any form is real
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
npm run typecheck && npm run lint
npm run check:reference      # design-reference/v1 still matches its frozen manifest
```

## What's here

| Path | Purpose |
|---|---|
| `design-reference/v1/` | The frozen HTML/Tailwind design baseline (8 pages, tokens, fonts, screenshots, manifest). Read its README. Never delete. |
| `src/lib/site.ts` | Single source of truth: phone, address, email, payment-portal URL, every price, nav, service list, FAQ. Change facts here only. |
| `src/lib/seo.ts`, `src/components/Schema.tsx` | Metadata factory + one JSON-LD graph per page (Organization, WebSite, WebPage, BreadcrumbList, Service, OfferCatalog, FAQPage). |
| `src/app/api/lead/route.ts` | Contact + callback intake → Resend. Fails loudly (503) when unconfigured. Honeypot + timing + optional Turnstile. |
| `src/app/api/call-click/route.ts` | Call-click attribution ledger: every tap on a `tel:` link is stamped server-side and emailed for matching against the phone log. |
| `src/components/CoverageMatcher.tsx` | Find Your Coverage: six questions → recommendation → callback form. No chatbot. |
| `src/components/RolloverCalculator.tsx` | Daytime rollover estimate from the published $1.35/min rate. |
| `src/lib/analytics.ts`, `src/components/analytics/` | GTM container (only when `NEXT_PUBLIC_GTM_ID` is set), Consent Mode v2 default, closed dataLayer event set. |
| `src/lib/redirects.json` | 301 map from every old WordPress URL. |
| `src/app/sitemap.ts`, `robots.ts`, `llms.txt/route.ts`, `opengraph-image.tsx` | Sitemap, robots, LLM manifest, branded share card. |
| `next.config.mjs` | Security headers, CSP (report-only first; promotion steps in the file), legacy redirects. |

## Routes

`/` · `/services` · `/who-we-serve` · `/pricing` · `/about` · `/contact` · `/find-your-coverage` · `/make-a-payment` · `/privacy-policy` · `/thank-you`

## Before launch

1. Set env vars in the host (see `.env.example`): Resend key + verified sending domain, lead inbox, optional Turnstile keys, optional GTM ID, `NEXT_PUBLIC_SITE_URL`.
2. Send one test through `/contact` and `/find-your-coverage` and confirm both emails arrive.
3. Request higher-resolution originals of the banner photos from NCI (the salvaged banners are 810px wide).
4. Have NCI read `/privacy-policy` (a draft replacing WordPress placeholder text) and confirm the "HIPAA-compliant" wording replacing the old "HIPAA-Certified".
5. Decide on the footer credit in `src/lib/site.ts` (`SITE.credit`, defaults to DePinho Design).
6. Point DNS at the host, then submit `/sitemap.xml` in Google Search Console.

## Design rules

The Next.js app must stay visually identical to `design-reference/v1`. Tokens live in both `design-reference/v1/tailwind.config.js` and `tailwind.config.ts`; change the reference first. A material redesign gets a `design-reference/v2/`.
