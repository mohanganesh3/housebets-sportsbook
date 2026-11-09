#!/usr/bin/env node
// check-tokens.mjs — raw-value lint (D0).
//
// Greps src/components + src/routes for raw color/geometry/duration
// literals that bypass the canonical token layer:
//   hex colors · rgb()/rgba()/hsl()/oklch()/oklab()/color-mix() calls ·
//   <n>px · <n>ms · <n>s literals
//
// Whitelist: 0px / 1px hairlines / 0ms — and var() references are the
// sanctioned escape hatch. SVG geometry attributes carry no units so
// they never match. Existing (pre-D0) files are reported as the KNOWN
// legacy list — they fail nothing. Files D0 creates (NEW_FILES below)
// must stay clean: any violation there exits nonzero.

import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const SCAN_DIRS = ["src/components", "src/routes"];
// Files created in D0 — these are the ones the gate enforces.
const NEW_FILES = new Set(["src/routes/design-system.tsx"]);
const FILE_RE = /\.(ts|tsx|js|jsx)$/;

const PATTERNS = [
  { name: "hex color", re: /#[0-9a-fA-F]{3,8}\b/g },
  { name: "rgb()/rgba()", re: /\brgba?\s*\(/gi },
  { name: "hsl()/hsla()", re: /\bhsla?\s*\(/gi },
  { name: "oklch/oklab/color-mix", re: /\b(?:oklch|oklab|color-mix)\s*\(/gi },
  { name: "px literal", re: /\b\d+(?:\.\d+)?px\b/gi },
  { name: "ms literal", re: /\b\d+(?:\.\d+)?ms\b/gi },
  { name: "s duration", re: /\b\d+(?:\.\d+)?s\b/gi },
];
// zero + hairline carve-outs (applied per matched token, not per line)
const ALLOWED_LITERALS = new Set(["0px", "1px", "0ms", "0s"]);

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(join(ROOT, dir), { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const p = `${dir}/${e.name}`;
    if (e.isDirectory()) walk(p, out);
    else if (FILE_RE.test(e.name)) out.push(p);
  }
  return out;
}

const known = []; // { file, line, text, kind, match }
const fresh = [];

for (const dir of SCAN_DIRS) {
  for (const file of walk(dir)) {
    const lines = readFileSync(join(ROOT, file), "utf8").split("\n");
    lines.forEach((text, i) => {
      for (const { name, re } of PATTERNS) {
        re.lastIndex = 0;
        for (const m of text.matchAll(re)) {
          if (ALLOWED_LITERALS.has(m[0].toLowerCase())) continue;
          const hit = {
            file,
            line: i + 1,
            text: text.trim().slice(0, 120),
            kind: name,
            match: m[0],
          };
          (NEW_FILES.has(file) ? fresh : known).push(hit);
        }
      }
    });
  }
}

const rel = (f) => relative(ROOT, join(ROOT, f)) || f;

console.log("\ncheck-tokens — raw literal scan of src/components + src/routes\n");

// ── KNOWN legacy list (pre-D0 code paths — report only) ─────────────
const byFile = new Map();
for (const k of known) {
  byFile.set(k.file, (byFile.get(k.file) ?? []).concat(k));
}
console.log(`KNOWN legacy violations (reported, not gated): ${known.length}`);
for (const [file, hits] of [...byFile].sort()) {
  const kinds = {};
  for (const h of hits) kinds[h.kind] = (kinds[h.kind] ?? 0) + 1;
  console.log(
    `  ${rel(file)} — ${hits.length} hit(s): ` +
      Object.entries(kinds)
        .map(([k, n]) => `${k}×${n}`)
        .join(", "),
  );
}

// ── NEW violations in D0 files (the actual gate) ────────────────────
console.log(`\nNEW violations in D0 files: ${fresh.length}`);
for (const v of fresh) {
  console.log(`  ${rel(v.file)}:${v.line}  [${v.kind}] ${v.match}`);
  console.log(`      ${v.text}`);
}

if (fresh.length) {
  console.error(
    "\nFAIL — D0 files must consume tokens only (var(--c-*) / bg-c-* " +
      "utilities / hb-* type steps). Move literals into tokens.css.",
  );
  process.exit(1);
}
console.log("\nPASS — no raw literals in D0-created files.");
