// Assembles pages/*.html (front-matter + body) with the shared header/footer partials
// into runnable top-level HTML files. Run `npm run build` (also compiles Tailwind).
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const header = readFileSync(join(root, "partials/header.html"), "utf8");
const footer = readFileSync(join(root, "partials/footer.html"), "utf8");

const parse = (src) => {
  const m = src.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const meta = {};
  if (m) m[1].split("\n").forEach((l) => { const i = l.indexOf(":"); meta[l.slice(0, i).trim()] = l.slice(i + 1).trim(); });
  return { meta, body: m ? m[2] : src };
};

for (const file of readdirSync(join(root, "pages")).filter((f) => f.endsWith(".html"))) {
  const { meta, body } = parse(readFileSync(join(root, "pages", file), "utf8"));
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${meta.title}</title>
<meta name="description" content="${meta.description}" />
<meta name="robots" content="noindex" />
<link rel="icon" href="assets/img/nci-favicon.jpg" />
<link rel="stylesheet" href="styles/site.css" />
</head>
<body data-nav="${meta.nav || ""}">
${header}
<main id="main">
${body}
</main>
${footer}
<script src="scripts/site.js" defer></script>
</body>
</html>
`;
  writeFileSync(join(root, file), html);
  console.log("built", file);
}
