# Next Call In (NCI) — design reference v2

Runnable HTML reference for Joe’s October 7, 2026 changes. Client approval is pending. The original v1 remains frozen.

Five representative pages: home, About, Services, Who We Serve, and Contact; Pricing, Find Your Coverage, and Privacy Policy are supporting snapshots. HTML sources in `pages/` and shared markup in `partials/` are editable. Interactive tools show their initial state here; use the Next.js app for full behavior. Forms in this reference are preview-only and never deliver messages.

## Run

From this directory, run `node build.mjs` then `../../node_modules/.bin/tailwindcss -c tailwind.config.js -i styles/tailwind.css -o styles/site.css --minify`. Serve with `python3 -m http.server 4332`. From the repository root, refresh its manifest with `node scripts/build-reference-manifest.mjs --version=v2`; verify both versions with `npm run check:reference`.

## Source and assets

Joe DePinho’s October 7 email, “NCI - New Logo & Website,” supplied Monica’s September 18 Word brief, `NCI-Hero.png`, and `NCI Logo.png`. Source PNGs are preserved unchanged under `assets/img/source/` and `public/images/source/`. CSS frames the artwork and overlays accessible live hero text, correcting the typo in the supplied design. Teal/navy colors follow the supplied artwork; the teal button color is darkened for white text contrast.

The brief explicitly supplies the woman-owned callout and name sequence Emergency Response Answering Service → NCI → Next Call In. No dates or ownership transitions were invented. Real office/operator/team photos were not supplied. Existing supporting stock photography remains; do not describe it as actual NCI staff. NCI is absent from RegistryOS, so this work uses the expressly requested repository and supplied brief without creating registry records or changing contact details or pricing.

Desktop/mobile verification captures are in `../parity/2026-10-07/`. This reference is a design snapshot, not a production deployment.

Source: Joe’s October 7, 2026 email and attached Monica brief; derived from the retained v1 layout and current Next.js components.
