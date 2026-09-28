# Agent notes — NCI Answering Service site

- **Design baseline:** `design-reference/v1/` (status `verified-reference`, frozen 2026-09-28). Manifest: `design-reference/v1/reference-manifest.json`. Verify with `npm run check:reference`. Parity captures for the Next.js port live in `design-reference/parity/`.
- **Facts live in one place:** `src/lib/site.ts`. Phone, address, email, payment portal, prices, nav, FAQ. Never hard-code a phone number or price in a component.
- **Only `tel:` links carry `data-cta="phone"`.** The call-click ledger and the GTM phone_click trigger both key on that attribute.
- **Forms:** `/api/lead` is the only delivery path. It returns 503 when `RESEND_API_KEY`/`LEAD_TO_EMAIL` are missing; never make it "succeed" silently. No patient information is ever accepted or stored.
- **Schema:** one `<Schema nodes=[...]>` per page. `faqNode` only with questions rendered on that page. No `aggregateRating` until NCI confirms a real review count.
- **Claims:** "25+ years", "dispatchers average 8–15 years", "HIPAA-compliant" are NCI's own published claims carried from the old site. Never write "HIPAA certified". Never invent stats, client names, or quotes.
- **Branding:** this site is NCI's, delivered by DePinho Design (`SITE.credit`). No other agency branding anywhere.
- **Redesign rule:** a material visual change = new `design-reference/v2/` + new manifest, not an edit to v1.
