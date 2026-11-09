#!/usr/bin/env node
// check-contrast.mjs — the D0 measured contrast gate.
//
// Measures every pair in the shared constants file
// (src/lib/design-tokens.ts — the SAME pairs the /design-system page
// renders) with culori's wcagContrast and asserts:
//   money/odds pairs ≥ 7:1 (AAA) · text pairs ≥ 4.5:1 (AA) ·
//   non-text UI/glyphs ≥ 3:1 (1.4.11) · decorative t3 ≥ 3:1 sanity.
// Prints the full table and exits nonzero if any pair fails.
//
// Checklist: qc/crit-boards-v2.md §h2 (①–⑥) + every text/bg pair.

import { wcagContrast } from "culori";
import { HB_PAIRS, blendOver } from "../src/lib/design-tokens.ts";

const rows = HB_PAIRS.map((p) => {
  const fgEff = p.alpha !== undefined ? blendOver(p.fg, p.alpha, p.bg) : p.fg;
  const ratio = wcagContrast(fgEff, p.bg);
  return { ...p, fgEff, ratio, ok: ratio >= p.min };
});

const clsLabel = (r) => `${r.cls}≥${r.min}`;

const nameW = Math.max(...rows.map((r) => r.name.length));
console.log(`\nD0 contrast gate — ${rows.length} pairs (culori wcagContrast)\n`);
for (const r of rows) {
  const mark = r.ok ? "PASS" : "FAIL";
  const alpha = r.alpha !== undefined ? ` @${r.alpha}` : "";
  console.log(
    `${mark}  ${r.name.padEnd(nameW)}  ${r.fg}${alpha} on ${r.bg}  ` +
      `${clsLabel(r).padEnd(13)}  ${r.ratio.toFixed(2).padStart(6)}:1`,
  );
}

const fails = rows.filter((r) => !r.ok);
console.log(`\n${rows.length - fails.length}/${rows.length} pairs pass.`);
if (fails.length) {
  console.error(
    `\n${fails.length} FAILING pair(s): ${fails.map((f) => f.name).join("; ")}`,
  );
  process.exit(1);
}
