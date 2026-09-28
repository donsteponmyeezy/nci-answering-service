# NCI Answering Service — design reference v1

Status: **verified-reference** (built and visually checked 2026-09-28 at 1440×900 and 390×844; not yet client-approved).
Reviewer: Caleb Hughes. Approval evidence: none yet; do not mark `user-approved` until NCI or Joe signs off.

This folder is the frozen visual baseline for the Next.js site in the repo root. Production edits change the Next.js app; a deliberate redesign gets a new `v2/` folder and a new baseline. Never delete this folder.

## Brief

Rework https://nciansweringservice.com/ (WordPress + Elementor, 2023) keeping its design language while adding the sections promised in the September 21 proposal: The Human Difference near the top, daytime medical office support with a cost comparison, business & professional services, temporary & on-demand coverage, the Find Your Coverage tool (six questions, ends in a human callback, no chatbot), and an SEO foundation.

Kept from the old site: green utility bar with phone / email / red **Make a Payment**; white nav with the NCI wordmark; Play headings + Roboto body; photo heroes with copy on a white fade; green section headings; slate-headed pricing cards; the exact published prices; the footer NAP.

Changed: real grid and type scale, card language, mobile hero treatment (photo block + copy on white, so no face is cropped), heavier desktop hero wash for legibility, sticky mobile call bar, accessible focus states, `HIPAA-Certified` → `HIPAA-compliant` (no such certification exists), the placeholder WordPress privacy text replaced with a real draft, the in-page ACH bank-details form replaced by a link to NCI's hosted payment portal.

## Route map (5 representative + 3 supporting)

| File | Next.js route | Archetype |
|---|---|---|
| `index.html` | `/` | Home |
| `services.html` | `/services` | Long-form service page with sticky jump nav and the rollover calculator |
| `pricing.html` | `/pricing` | Pricing (per-call + professional cards, FAQ) |
| `find-your-coverage.html` | `/find-your-coverage` | Interactive tool → callback form |
| `contact.html` | `/contact` | Contact form + NAP cards |
| `who-we-serve.html`, `about.html` | `/who-we-serve`, `/about` | Content pages using the services archetype |
| `privacy-policy.html` | `/privacy-policy` | Text page |

## Simulation boundaries

Every form in this reference is a **labeled preview**: submitting shows a "Preview only: nothing was sent" panel. The Next.js app replaces those with `/api/lead` (Resend delivery) and a `/thank-you` route. The calculator and matcher logic are real and were ported 1:1.

## Tokens

See `tailwind.config.js`. Brand green `#038855` (hover `#00784A`), alert red `#DF0000` (Make a Payment only), slate `#353535`, surface `#F7F7F7`, ink `#1E2622`, muted `#5C6660`, border `#E1E7E4`. Container 1200px with 20/32/40px gutters. Fonts self-hosted in `assets/fonts/` (latin subsets pulled from the old site's Elementor font cache): Play 400/700, Roboto variable, Roboto Slab variable.

## Assets and provenance

All photos and the logo were salvaged from the live site on 2026-09-28 (`assets/img/`). They are NCI's licensed stock; the banners are 810×391 with a baked-in white fade on the right. **Ask NCI/Joe for higher-resolution originals** before launch; the 2000×850 home hero is fine, the 810px banners are soft above ~1100px wide.

## Run / rebuild

```bash
npm install          # tailwindcss 3.4.17 only
npm run build        # assembles pages/*.html + partials → *.html, compiles styles/site.css
npm run serve        # python3 -m http.server 4173
```

Edit `pages/*.html` and `partials/*.html`, never the generated top-level `*.html`. Then regenerate `reference-manifest.json` from the repo root: `node scripts/build-reference-manifest.mjs`. `npm run check:reference` (repo root) fails if the tree drifts from the manifest.

## Known limitations

- Screenshots in `screenshots/` are headless Chrome captures (1440×900, 390×844) of the built pages; interaction states were checked live in the browser, not captured.
- Old-site photography only; no new imagery was licensed.
- Copy is the old site's, corrected and extended per the proposal. Claims like "25+ years" and "dispatchers average 8–15 years" are NCI's own published claims, carried forward unverified.
