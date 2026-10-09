# October 7 NCI revision — verification

Implemented from Joe DePinho’s October 7 email “NCI - New Logo & Website” and Monica’s attached September 18 brief.

| Request | Result |
|---|---|
| New logo and supplied hero | Source PNGs preserved unchanged; live accessible text over framed hero, responsive photo on mobile; logo in header/footer and updated metadata |
| Next Call In naming; consistent NCI acronym | Visible identity, metadata, schema and site copy updated; legacy domains/contact addresses preserved |
| Emergency Response Answering Service → NCI → Next Call In | Three-step visual history on About; no dates or ownership claims added |
| Woman-Owned Business | About callout from Monica’s brief |
| Seven industries | Home, About and Who We Serve |
| Five core values with icons | About |
| Direct contact-form CTA | Closing “Let’s Talk” band and consultation links to `/contact#contact-form` |
| Hudson Valley/New York references | About, with existing Fishkill address |
| About readability on mobile | Short sections, responsive cards and timeline |
| Actual office/operator/team photography | Pending: none supplied; retained supporting imagery described generically |

Verification: `npm run typecheck`, `npm run lint`, `npm run build`, `npm run check:reference`, and `git diff --check` passed. Browser checks covered eight routes at 1440px and 390px (16 combinations): HTTP 200, all images loaded, no horizontal overflow, current visible naming, required About content, contact-form anchor and mobile menu behavior. Captures here show Home, About, Who We Serve and Contact at both widths, plus the matching Home reference. Home reference and Next.js layouts were visually compared. The original v1 hash manifest still matches all 42 files; v2 has its own manifest.

No form delivery, external notification, push, or deployment was performed. Vercel’s published preview has not been updated by this local work. Source assets: Joe’s email attachments; captures: local production build and retained HTML v2 reference, October 7, 2026 (America/Chicago).
