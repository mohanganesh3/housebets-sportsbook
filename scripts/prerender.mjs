// Post-build: static route folders so deep links return HTTP 200 on GitHub Pages,
// plus the SPA 404.html fallback for everything else.
import { cpSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const index = readFileSync(join(dist, "index.html"), "utf8");

const seed = readFileSync(join(root, "src/lib/seed.ts"), "utf8");
const matchIds = [...seed.matchAll(/\bm\(\s*\n?\s*"([a-z0-9-]+)"/g)].map(
  (m) => m[1],
);

const routes = [
  "live",
  "football",
  "bets",
  "following",
  "design-system", // hidden specimen route (D0) — deep-linkable, not in nav
  ...matchIds.map((id) => `match/${id}`),
];

for (const r of routes) {
  const dir = join(dist, r);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), index);
}

writeFileSync(join(dist, "404.html"), index);
writeFileSync(join(dist, ".nojekyll"), "");
console.log(
  `prerendered ${routes.length} routes + 404.html (${matchIds.length} match ids)`,
);
