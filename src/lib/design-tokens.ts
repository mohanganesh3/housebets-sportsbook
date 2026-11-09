// design-tokens.ts — canonical token constants, single source of truth.
//
// Law: design/TOKENS.md (post-crit values), design/DATA-CANON.md (sample numbers),
// qc/crit-boards-v2.md §h2 (the D0 measurement checklist).
//
// Imported by BOTH:
//   - src/routes/design-system.tsx (specimen page — renders tokens + live ratios)
//   - scripts/check-contrast.mjs  (node gate — measures the same pairs with culori)
//
// Erasable-syntax only (tsconfig erasableSyntaxOnly) so node type-stripping can
// import this file directly from the check scripts.

export const HB_COLORS = {
  bg: "#002026", // live CSS (BETBY-era teal) — page background
  surface1: "#08333C", // live CSS — rows, panels
  surface2: "#0B414D", // derived +1 level — cards, inputs, odds cells
  surface3: "#104F5C", // derived — hover/active fills
  neon: "#02F7FD", // logo glyph, live CSS — text/glow/icons, NEVER fills
  cta: "#C4F4F1", // judge's system token — primary fills (D-01: pale-cyan acts)
  ctaFg: "#062B31", // derived on-CTA text
  text: "#F4FBFB", // derived near-white — primary text
  // D0 MEASURED ADJUSTMENT: was #9FB8BC — failed 4.38:1 on surface-3 hover fills.
  // Lightened (documented direction: lighten fg on dark) → 4.77 on s3 / 5.83 on s2.
  text2: "#A5C0C5",
  text3: "#8AA6AB", // decorative/hairline-adjacent only — never meaning-bearing
  up: "#26BA50", // live CSS green — fills/edges/icons (≥3:1 non-text verified)
  // D0 DERIVED: --c-up on s2 = 4.38 <4.5, so tick-up price text gets its own
  // lighter step (same pattern as --c-suspend-fg / --c-live-fg pair tokens).
  upText: "#2DBF54",
  // D0 MEASURED ADJUSTMENT: was #FF6B86 — failed 4.10:1 on surface-2 vs its own
  // ≥4.5 on s-1/2 target. Lightened → 5.01 on s2 / 5.58 on s1.
  down: "#FF8AA2",
  suspend: "#E17823", // suspension amber — chip bg / band edge, never decoration
  suspendFg: "#2A1200", // derived dark fg on amber chip (white-on-amber = 2.90 fail)
  gold: "#FFD205", // live CSS gold — prize/trophy/follow-star accents only
  live: "#FF4D6D", // LIVE badge bg (word+icon chip, never color alone)
  liveFg: "#14060A", // derived dark fg on live badge
  focus: "#02F7FD", // focus-visible ring 2px + offset 2
} as const;

export type HbPairClass = "money" | "text" | "nontext" | "decorative" | "blend";

export interface HbPair {
  name: string;
  fg: string;
  bg: string;
  min: number;
  cls: HbPairClass;
  note: string;
  alpha?: number; // blend rows: fg at this opacity over bg
}

// The D0 measurement checklist (crit-boards h2 ①–⑥ + every text/bg pair).
// Floors: money/odds ≥7:1 · text ≥4.5:1 · non-text UI/glyphs ≥3:1 ·
// decorative t3 ≥3:1 (exempt from AA by token law, sanity-gated anyway).
export const HB_PAIRS: HbPair[] = [
  // ── Money / odds carriers — AAA 7:1 floor (C-12, A27.c) ──────────────
  {
    name: "Odds price on cell (t1/s2)",
    fg: HB_COLORS.text,
    bg: HB_COLORS.surface2,
    min: 7,
    cls: "money",
    note: "hb-odds Oxanium on the s2 cell — P1's core pair",
  },
  {
    name: "Session net / numerals (t1/s1)",
    fg: HB_COLORS.text,
    bg: HB_COLORS.surface1,
    min: 7,
    cls: "money",
    note: "session line net value, balance, returns",
  },
  {
    name: "Balance / clock on bg (t1/bg)",
    fg: HB_COLORS.text,
    bg: HB_COLORS.bg,
    min: 7,
    cls: "money",
    note: "top-bar balance ₮ 240.00",
  },
  {
    name: "CTA label + selected-cell price",
    fg: HB_COLORS.ctaFg,
    bg: HB_COLORS.cta,
    min: 7,
    cls: "money",
    note: "Place bet · selected cell flips ALL content to cta-fg",
  },
  {
    name: "Boards neon price (neon/s2)",
    fg: HB_COLORS.neon,
    bg: HB_COLORS.surface2,
    min: 7,
    cls: "money",
    note: "live-board price grammar (E-BRD-01); ~8.4 estimated in crit",
  },
  {
    name: "Suspended last price @60% on s2",
    fg: HB_COLORS.text,
    bg: HB_COLORS.surface2,
    min: 4.5,
    cls: "blend",
    alpha: 0.6,
    note: "AA floor — deliberately below AAA: dim = not actionable, must stay legible (S3)",
  },

  // ── Text — AA 4.5:1 floor ────────────────────────────────────────────
  {
    name: "t1 body on hover fill (t1/s3)",
    fg: HB_COLORS.text,
    bg: HB_COLORS.surface3,
    min: 4.5,
    cls: "text",
    note: "hover state text",
  },
  {
    name: "t2 muted on bg",
    fg: HB_COLORS.text2,
    bg: HB_COLORS.bg,
    min: 4.5,
    cls: "text",
    note: "secondary text page-level",
  },
  {
    name: "t2 muted on s1",
    fg: HB_COLORS.text2,
    bg: HB_COLORS.surface1,
    min: 4.5,
    cls: "text",
    note: "session line words, +N ›, group counts",
  },
  {
    name: "t2 implied-% on cell (t2/s2)",
    fg: HB_COLORS.text2,
    bg: HB_COLORS.surface2,
    min: 4.5,
    cls: "text",
    note: "checklist ① — was t3 ≈2.6, the worst crit defect",
  },
  {
    name: "t2 muted on hover fill (t2/s3)",
    fg: HB_COLORS.text2,
    bg: HB_COLORS.surface3,
    min: 4.5,
    cls: "text",
    note: "hovered cell labels — D0 bumped #9FB8BC→#A5C0C5",
  },
  {
    name: "neon accent text on bg",
    fg: HB_COLORS.neon,
    bg: HB_COLORS.bg,
    min: 4.5,
    cls: "text",
    note: "links, `View match ›`, identity accents",
  },
  {
    name: "neon accent text on s1",
    fg: HB_COLORS.neon,
    bg: HB_COLORS.surface1,
    min: 4.5,
    cls: "text",
    note: "accent on panel surfaces",
  },
  {
    name: "neon accent text on s3",
    fg: HB_COLORS.neon,
    bg: HB_COLORS.surface3,
    min: 4.5,
    cls: "text",
    note: "hovered accent links",
  },
  {
    name: "suspend chip words",
    fg: HB_COLORS.suspendFg,
    bg: HB_COLORS.suspend,
    min: 4.5,
    cls: "text",
    note: "checklist ③ — dark-on-amber pair (amber-on-dark 3.68 & white-on-amber 2.90 both failed)",
  },
  {
    name: "LIVE badge word+count",
    fg: HB_COLORS.liveFg,
    bg: HB_COLORS.live,
    min: 4.5,
    cls: "text",
    note: "checklist ② — #14060A on #FF4D6D",
  },
  {
    name: "tick-up price+glyph (upText/s2)",
    fg: HB_COLORS.upText,
    bg: HB_COLORS.surface2,
    min: 4.5,
    cls: "text",
    note: "derived text step — raw --c-up fails here",
  },
  {
    name: "tick-up price+glyph (upText/s1)",
    fg: HB_COLORS.upText,
    bg: HB_COLORS.surface1,
    min: 4.5,
    cls: "text",
    note: "same step on rows",
  },
  {
    name: "tick-down price+glyph (down/s2)",
    fg: HB_COLORS.down,
    bg: HB_COLORS.surface2,
    min: 4.5,
    cls: "text",
    note: "checklist ④ — TOKENS' own ≥4.5 on s-1/2 target",
  },
  {
    name: "tick-down price+glyph (down/s1)",
    fg: HB_COLORS.down,
    bg: HB_COLORS.surface1,
    min: 4.5,
    cls: "text",
    note: "rows variant",
  },

  // ── Non-text UI — ≥3:1 (WCAG 1.4.11) ─────────────────────────────────
  {
    name: "--c-up glyph/edge on s2",
    fg: HB_COLORS.up,
    bg: HB_COLORS.surface2,
    min: 3,
    cls: "nontext",
    note: "brand green as icon/edge only on cells (text uses upText)",
  },
  {
    name: "LIVE dot on s1",
    fg: HB_COLORS.live,
    bg: HB_COLORS.surface1,
    min: 3,
    cls: "nontext",
    note: "● glyph — never sole carrier (LIVE word rides it)",
  },
  {
    name: "LIVE dot on s2 (pill ●)",
    fg: HB_COLORS.live,
    bg: HB_COLORS.surface2,
    min: 3,
    cls: "nontext",
    note: "slip-pill payload ●",
  },
  {
    name: "suspend band edge on s1",
    fg: HB_COLORS.suspend,
    bg: HB_COLORS.surface1,
    min: 3,
    cls: "nontext",
    note: "1px amber edge — was the ≈4.46 edge case, fine as non-text",
  },
  {
    name: "suspend band edge on s2",
    fg: HB_COLORS.suspend,
    bg: HB_COLORS.surface2,
    min: 3,
    cls: "nontext",
    note: "edge on rows",
  },
  {
    name: "focus ring on s1",
    fg: HB_COLORS.focus,
    bg: HB_COLORS.surface1,
    min: 3,
    cls: "nontext",
    note: "2px + 2px offset",
  },
  {
    name: "focus ring on s2",
    fg: HB_COLORS.focus,
    bg: HB_COLORS.surface2,
    min: 3,
    cls: "nontext",
    note: "on cells",
  },
  {
    name: "gold ★ on s1",
    fg: HB_COLORS.gold,
    bg: HB_COLORS.surface1,
    min: 3,
    cls: "nontext",
    note: "follow star — shape+hue dual-coded",
  },

  // ── Decorative t3 — exempt from AA (post-crit law: decorative only), ≥3 sanity ──
  {
    name: "t3 decorative on bg",
    fg: HB_COLORS.text3,
    bg: HB_COLORS.bg,
    min: 3,
    cls: "decorative",
    note: "never meaning-bearing — AA-exempt by token law",
  },
  {
    name: "t3 decorative on s1",
    fg: HB_COLORS.text3,
    bg: HB_COLORS.surface1,
    min: 3,
    cls: "decorative",
    note: "hairline-adjacent captions only",
  },
  {
    name: "t3 decorative on s2",
    fg: HB_COLORS.text3,
    bg: HB_COLORS.surface2,
    min: 3,
    cls: "decorative",
    note: "the old implied-% assignment that failed — now banned",
  },
  {
    name: "t3 decorative on s3",
    fg: HB_COLORS.text3,
    bg: HB_COLORS.surface3,
    min: 3,
    cls: "decorative",
    note: "weakest pair — stays above non-text floor",
  },
];

// ── Type scale (TOKENS.md hb-* measured set) ─────────────────────────
export interface HbTypeStep {
  token: string;
  px: number;
  lh: number;
  family: "ui" | "num" | "display";
  weight: number;
  use: string;
}
export const HB_TYPE: HbTypeStep[] = [
  {
    token: "hb-display",
    px: 28,
    lh: 32,
    family: "display",
    weight: 700,
    use: "Red Hat Display — hero/display only",
  },
  {
    token: "hb-score",
    px: 22,
    lh: 26,
    family: "num",
    weight: 700,
    use: "Oxanium — scores",
  },
  {
    token: "hb-title",
    px: 20,
    lh: 24,
    family: "ui",
    weight: 700,
    use: "Figtree — page/section titles",
  },
  {
    token: "hb-h1",
    px: 16,
    lh: 20,
    family: "ui",
    weight: 600,
    use: "Figtree — group headers",
  },
  {
    token: "hb-odds",
    px: 15,
    lh: 20,
    family: "num",
    weight: 600,
    use: "Oxanium — prices (the money step)",
  },
  {
    token: "hb-body",
    px: 14,
    lh: 20,
    family: "ui",
    weight: 400,
    use: "Figtree — names, rows",
  },
  {
    token: "hb-odds-sm",
    px: 13,
    lh: 16,
    family: "num",
    weight: 600,
    use: "Oxanium — compact prices, stake chips",
  },
  {
    token: "hb-body-sec",
    px: 13,
    lh: 18,
    family: "ui",
    weight: 400,
    use: "Figtree — cell labels, secondary lines",
  },
  {
    token: "hb-label",
    px: 12,
    lh: 16,
    family: "ui",
    weight: 600,
    use: "Figtree — pills, controls, +N ›",
  },
  {
    token: "hb-clock",
    px: 12,
    lh: 14,
    family: "num",
    weight: 600,
    use: "Oxanium — match clocks 52′",
  },
  {
    token: "hb-micro",
    px: 11,
    lh: 14,
    family: "ui",
    weight: 500,
    use: "Figtree — implied-%, session line (11px floor)",
  },
];

// ── Space / radius / elevation ───────────────────────────────────────
export const HB_SPACE = [4, 8, 12, 16, 20, 24, 32, 48, 64] as const;
export const HB_RADII = [
  { token: "r-sm", px: 4, use: "CO chip, small chips" },
  { token: "r-md", px: 8, use: "DOMINANT — cells, cards (158× on live site)" },
  { token: "r-lg", px: 12, use: "sheets only" },
  { token: "r-pill", px: 999, use: "pills, badges, suspend chip" },
] as const;
export const HB_ELEVATION =
  "hairlines (1px, surface-tinted) over shadows · ONE 8px-y 24px-blur shadow owned by sheets";

// ── Motion (MOTION.md token law) ─────────────────────────────────────
export const HB_MOTION = {
  eases: [
    {
      token: "--ease-out-expo",
      value: "cubic-bezier(0.23,1,0.32,1)",
      use: "enters, appears",
    },
    {
      token: "--ease-standard",
      value: "cubic-bezier(0.77,0,0.175,1)",
      use: "on-screen movement",
    },
    {
      token: "--ease-spring-sheet",
      value: "spring stiffness 380 / damping 32",
      use: "sheets, drag settle",
    },
  ],
  durations: [
    {
      token: "--dur-feedback",
      ms: 150,
      range: "120–150",
      use: "press, toggle, tick tint",
    },
    {
      token: "--dur-enter",
      ms: 240,
      range: "200–260",
      use: "appears, overlays (≤300 user-started)",
    },
    {
      token: "--dur-move",
      ms: 280,
      range: "250–300",
      use: "container transforms, routes",
    },
    {
      token: "--dur-close",
      ms: 160,
      range: "120–180",
      use: "exits — faster than opens",
    },
  ],
  rules:
    "transform/opacity only on money paths · newest-state-wins · RM twin = opacity cross-fade",
} as const;

// ── Layout ───────────────────────────────────────────────────────────
export const HB_LAYOUT = {
  breakpoints: [360, 390, 430, 768, 1024, 1440] as const,
  metrics: [
    { token: "--layout-rail", px: 72, use: "desktop icon rail" },
    {
      token: "--layout-max",
      px: 1312,
      use: "12-col content max, 24px gutters",
    },
    { token: "--layout-panel", px: 360, use: "desktop side panel" },
    {
      token: "--layout-bottombar",
      px: 67,
      use: "phone bottom bar (+ floating slip pill)",
    },
    { token: "--layout-gutter", px: 24, use: "desktop grid gutter" },
    {
      token: "--target-min",
      px: 44,
      use: "touch target floor (pseudo-element when visual smaller)",
    },
  ],
} as const;

// ── Canon strings (DATA-CANON.md — single spelling everywhere) ───────
export const HB_SAMPLE = {
  session: "Session 47 min · net −12.00 USDT",
  balance: "₮ 240.00",
  balanceSplit: "Available 180.00 · In open bets 60.00",
  pillPick: "●1 Arsenal @1.30",
  pillOpenBet: "●1 Arsenal · 1–0 · 52' · CO 22.40",
  suspendedReason: "Suspended — dangerous attack",
  offline: "You're offline — prices are frozen, not live",
  breakChip: "On a break · back 22:40",
  flagship: "Arsenal v Brighton — 1–0, 52' LIVE",
  overround: "1.30 / 4.80 / 11.00 = 106.85%",
} as const;

// ── WCAG contrast (same formula culori measures in the gate) ─────────
function srgbChannel(v255: number): number {
  const s = v255 / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

export function hexToRgb(hex: string): [number, number, number] {
  const n = Number.parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function rgbToHex(r: number, g: number, b: number): string {
  const c = (v: number) => Math.round(Math.min(255, Math.max(0, v)));
  return `#${((c(r) << 16) | (c(g) << 8) | c(b)).toString(16).padStart(6, "0").toUpperCase()}`;
}

/** Alpha-composite fg over bg in sRGB space (CSS opacity blend). */
export function blendOver(fg: string, alpha: number, bg: string): string {
  const [fr, fg2, fb] = hexToRgb(fg);
  const [br, bg2, bb] = hexToRgb(bg);
  return rgbToHex(
    fr * alpha + br * (1 - alpha),
    fg2 * alpha + bg2 * (1 - alpha),
    fb * alpha + bb * (1 - alpha),
  );
}

export function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex);
  return (
    0.2126 * srgbChannel(r) + 0.7152 * srgbChannel(g) + 0.0722 * srgbChannel(b)
  );
}

/** WCAG 2.x contrast ratio for a pair (respects pair.alpha blends). */
export function wcagRatio(fg: string, bg: string, alpha?: number): number {
  const effFg = alpha !== undefined ? blendOver(fg, alpha, bg) : fg;
  const l1 = relativeLuminance(effFg);
  const l2 = relativeLuminance(bg);
  const [hi, lo] = l1 >= l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}
