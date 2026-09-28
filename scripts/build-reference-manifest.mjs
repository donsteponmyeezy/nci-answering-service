// Writes design-reference/v1/reference-manifest.json: route map + SHA-256 of every
// reference source file, compiled CSS, script, and asset. Re-run after any
// authorized change to the reference (`node scripts/build-reference-manifest.mjs`).
// `npm run check:reference` verifies the tree still matches the manifest.
import { createHash } from "node:crypto";
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "design-reference", "v1");
const check = process.argv.includes("--check");

const ROUTES = [
  { file: "index.html", route: "/", archetype: "home", states: ["desktop hero wash", "mobile stacked hero", "sticky call bar after 120px", "mobile menu open"] },
  { file: "services.html", route: "/services", archetype: "long-form service page with jump nav", states: ["rollover calculator input change", "in-page anchors"] },
  { file: "pricing.html", route: "/pricing", archetype: "pricing", states: ["featured card", "FAQ disclosure open/closed"] },
  { file: "find-your-coverage.html", route: "/find-your-coverage", archetype: "interactive tool", states: ["question 1..6", "validation error", "recommendation", "callback form", "callback preview-done"] },
  { file: "contact.html", route: "/contact", archetype: "contact", states: ["?plan= prefill", "?interest= prefill", "validation error", "preview-done"] },
  { file: "who-we-serve.html", route: "/who-we-serve", archetype: "content page (services archetype)", states: [] },
  { file: "about.html", route: "/about", archetype: "content page (services archetype)", states: [] },
  { file: "privacy-policy.html", route: "/privacy-policy", archetype: "text page", states: [] },
];

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === "screenshots" || name === "reference-manifest.json" || name === "package-lock.json") continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const files = {};
for (const p of walk(root).sort()) {
  files[relative(root, p)] = createHash("sha256").update(readFileSync(p)).digest("hex");
}

const manifestPath = join(root, "reference-manifest.json");
if (check) {
  const prev = JSON.parse(readFileSync(manifestPath, "utf8"));
  const drift = Object.entries(files).filter(([k, v]) => prev.files[k] !== v).map(([k]) => k);
  const missing = Object.keys(prev.files).filter((k) => !(k in files));
  if (drift.length || missing.length) {
    console.error("Reference drift:", { changed: drift, missing });
    process.exit(1);
  }
  console.log(`reference ok — ${Object.keys(files).length} files match ${prev.version} (${prev.frozenAt})`);
} else {
  const manifest = {
    client: "NCI Answering Service",
    version: "v1",
    status: "verified-reference",
    frozenAt: new Date().toISOString().slice(0, 10),
    brief: "Rework nciansweringservice.com keeping its design language (green #038855, Play/Roboto, white utility+nav, photo heroes on a white fade, slate pricing cards) while adding the proposal's new sections: Human Difference, daytime support with cost comparison, business & professional services, temporary coverage, Find Your Coverage tool, SEO foundation.",
    routes: ROUTES,
    tokens: { brand: "#038855", brandHover: "#00784A", alert: "#DF0000", slate: "#353535", surface: "#F7F7F7", ink: "#1E2622", mutedInk: "#5C6660", border: "#E1E7E4", fonts: { display: "Play 400/700", body: "Roboto variable", slab: "Roboto Slab variable" }, container: "1200px, gutters 20/32/40px", breakpoints: "Tailwind 3.4 defaults (sm 640, md 768, lg 1024, xl 1280)" },
    captures: [{ width: 1440, height: 900 }, { width: 390, height: 844 }],
    build: { tailwind: "3.4.17", node: process.version, commands: ["npm install", "npm run build", "npm run serve"] },
    files,
  };
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`manifest written — ${Object.keys(files).length} files`);
}
