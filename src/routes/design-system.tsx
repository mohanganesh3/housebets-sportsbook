import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  HB_COLORS,
  HB_ELEVATION,
  HB_LAYOUT,
  HB_MOTION,
  HB_PAIRS,
  HB_RADII,
  HB_SAMPLE,
  HB_TYPE,
  type HbPair,
  wcagRatio,
} from "../lib/design-tokens";
import "../styles/design-system.css";

// /design-system — hidden route (not in nav). The P6 system proof:
// every token + every signature element in all its states, rendered
// ONLY through the D0 token layer (src/styles/tokens.css). No legacy
// vars, no raw literals — the check-tokens gate keeps it that way.

export const Route = createFileRoute("/design-system")({
  component: DesignSystem,
});

/* ── Authored glyphs (TOKENS icon law: 1.5 px stroke, 20 px grid,
   currentColor, never emoji) ─────────────────────────────────────── */
function LockGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="5" y="9" width="10" height="7" rx="1.5" />
      <path d="M7 9V7a3 3 0 0 1 6 0v2" />
    </svg>
  );
}
function CloudOffGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M6.2 14h7.6a3.2 3.2 0 0 0 .6-6.3A4.6 4.6 0 0 0 5.4 9 2.8 2.8 0 0 0 6.2 14Z" />
      <path d="M4 3.5 16 16" />
    </svg>
  );
}
function CheckGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="m4.5 10.5 3.5 3.5L15.5 6.5" />
    </svg>
  );
}
function BallGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      className={className}
    >
      <circle cx="10" cy="10" r="7" />
      <path d="M10 7.2 12.8 9.2 11.7 12.6H8.3L7.2 9.2Z" />
    </svg>
  );
}

/* ── Building blocks ─────────────────────────────────────────────── */
function Section({
  title,
  lede,
  children,
}: {
  title: string;
  lede?: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-c-hairline pt-8">
      <h2 className="font-hb-ui text-hb-title font-bold text-c-text">
        {title}
      </h2>
      {lede && (
        <p className="mt-2 max-w-3xl text-hb-body-sec text-c-text-2">{lede}</p>
      )}
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Swatch({
  token,
  hex,
  swatchClass,
  note,
}: {
  token: string;
  hex: string;
  swatchClass: string;
  note: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span
        className={`mt-0.5 block size-10 shrink-0 rounded-hb-sm border border-c-hairline ${swatchClass}`}
      />
      <span className="min-w-0">
        <code className="block font-mono text-hb-body-sec font-semibold text-c-text">
          {token}
        </code>
        <span className="block font-mono text-hb-micro text-c-text-2">
          {hex}
        </span>
        <span className="block text-hb-micro text-c-text-2">{note}</span>
      </span>
    </div>
  );
}

function VerdictChip({ ok }: { ok: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-hb-pill px-2 py-0.5 font-hb-ui text-hb-micro font-semibold ${
        ok ? "bg-c-up-a16 text-c-up-text" : "bg-c-down-a16 text-c-down"
      }`}
    >
      {ok ? "PASS" : "FAIL"}
    </span>
  );
}

function PairRow({ pair }: { pair: HbPair }) {
  const ratio = wcagRatio(pair.fg, pair.bg, pair.alpha);
  const ok = ratio >= pair.min;
  return (
    <tr className="border-t border-c-hairline">
      <td className="py-2 pr-3 text-hb-body-sec text-c-text">
        {pair.name}
        <span className="block text-hb-micro text-c-text-2">{pair.note}</span>
      </td>
      <td className="py-2 pr-3">
        <span className="flex items-center gap-1.5 font-mono text-hb-micro text-c-text-2">
          <span
            className="inline-block size-3.5 rounded-hb-sm border border-c-hairline"
            style={{ background: pair.fg }}
          />
          {pair.fg}
        </span>
        {pair.alpha !== undefined && (
          <span className="text-hb-micro text-c-text-3">
            @{pair.alpha} alpha
          </span>
        )}
      </td>
      <td className="py-2 pr-3">
        <span className="flex items-center gap-1.5 font-mono text-hb-micro text-c-text-2">
          <span
            className="inline-block size-3.5 rounded-hb-sm border border-c-hairline"
            style={{ background: pair.bg }}
          />
          {pair.bg}
        </span>
      </td>
      <td className="py-2 pr-3 font-hb-num text-hb-body-sec text-c-text-2 tabular-nums">
        ≥{pair.min}:1
      </td>
      <td className="py-2 pr-3 font-hb-num text-hb-body-sec font-semibold text-c-text tabular-nums">
        {ratio.toFixed(2)}
      </td>
      <td className="py-2">
        <VerdictChip ok={ok} />
      </td>
    </tr>
  );
}

/* ── Odds cell — the signature element (E-M-08 canon) ────────────── */
type CellState =
  | "default"
  | "hover"
  | "pressed"
  | "focused"
  | "selected"
  | "tick-up"
  | "tick-down"
  | "suspended"
  | "locked-selected"
  | "reopened"
  | "settled-won"
  | "settled-lost"
  | "void"
  | "offline"
  | "break"
  | "skeleton";

function CellSpecimen({ state }: { state: CellState }) {
  const base =
    "relative flex h-11 min-w-32 flex-col justify-center overflow-hidden rounded-hb-md border px-3";
  const idle = "border-c-hairline bg-c-surface-2";
  const label = "truncate font-hb-ui text-hb-body-sec leading-none";
  const price = "font-hb-num text-hb-odds font-semibold tabular-nums";
  const implied = "font-hb-ui text-hb-micro tabular-nums";
  const inner = (
    <>
      <span className={`${label} text-c-text-2`}>Arsenal</span>
      <span className="mt-1 flex items-baseline gap-1.5">
        <span className={`${price} text-c-text`}>1.30</span>
        <span className={`${implied} text-c-text-2`}>· 77%</span>
      </span>
    </>
  );

  switch (state) {
    case "default":
      return (
        <button type="button" className={`${base} ${idle}`}>
          {inner}
        </button>
      );
    case "hover":
      return (
        <button
          type="button"
          className={`${base} border-c-hairline bg-c-surface-3`}
        >
          {inner}
        </button>
      );
    case "pressed":
      return (
        <button
          type="button"
          className={`${base} scale-98 border-c-hairline bg-c-surface-3`}
        >
          {inner}
        </button>
      );
    case "focused":
      return (
        <button
          type="button"
          className={`${base} ${idle} ring-2 ring-c-focus ring-offset-2 ring-offset-c-surface-1`}
        >
          {inner}
        </button>
      );
    case "selected":
      return (
        <button
          type="button"
          aria-pressed="true"
          aria-label="Arsenal to win, 1.30, implied 77 percent, selected"
          className={`${base} border-c-cta bg-c-cta`}
        >
          <CheckGlyph className="absolute right-1.5 top-1.5 size-4 text-c-cta-fg" />
          <span className={`${label} text-c-cta-fg`}>Arsenal</span>
          <span className="mt-1 flex items-baseline gap-1.5">
            <span className={`${price} text-c-cta-fg`}>1.30</span>
            <span className={`${implied} text-c-cta-fg`}>· 77%</span>
          </span>
        </button>
      );
    case "tick-up":
      return (
        <button type="button" className={`${base} ${idle} ds-tick ds-tick--up`}>
          <span className={`${label} text-c-text-2`}>Draw</span>
          <span className="mt-1 flex items-baseline gap-1.5">
            <span className="text-c-up-text" aria-hidden="true">
              ▲
            </span>
            <span className={`${price} text-c-up-text`}>4.80</span>
            <span className={`${implied} text-c-text-2`}>· 21%</span>
          </span>
          <span className="absolute bottom-0.5 right-1.5 font-hb-ui text-hb-micro text-c-text-2">
            was 4.60
          </span>
        </button>
      );
    case "tick-down":
      return (
        <button
          type="button"
          className={`${base} ${idle} ds-tick ds-tick--down`}
        >
          <span className={`${label} text-c-text-2`}>Brighton</span>
          <span className="mt-1 flex items-baseline gap-1.5">
            <span className="text-c-down" aria-hidden="true">
              ▼
            </span>
            <span className={`${price} text-c-down`}>10.50</span>
            <span className={`${implied} text-c-text-2`}>· 10%</span>
          </span>
          <span className="absolute bottom-0.5 right-1.5 font-hb-ui text-hb-micro text-c-text-2">
            was 11.00
          </span>
        </button>
      );
    case "suspended":
      return (
        <button
          type="button"
          aria-disabled="true"
          aria-label="Arsenal to win, 1.30 — suspended, dangerous attack"
          className={`${base} ${idle} opacity-60`}
        >
          <LockGlyph className="absolute right-1.5 top-1.5 size-3.5 text-c-text-2" />
          {inner}
        </button>
      );
    case "locked-selected":
      return (
        <button
          type="button"
          aria-pressed="true"
          aria-disabled="true"
          aria-label="Arsenal to win, 1.30 — selected, suspended, dangerous attack"
          className={`${base} border-c-cta bg-c-cta opacity-60`}
        >
          <LockGlyph className="absolute right-1.5 top-1.5 size-3.5 text-c-cta-fg" />
          <span className={`${label} text-c-cta-fg`}>Arsenal</span>
          <span className="mt-1 flex items-baseline gap-1.5">
            <span className={`${price} text-c-cta-fg`}>1.30</span>
            <span className={`${implied} text-c-cta-fg`}>· 77%</span>
          </span>
        </button>
      );
    case "reopened":
      return (
        <button type="button" className={`${base} ${idle}`}>
          <span className={`${label} text-c-text-2`}>Total goals over 2.5</span>
          <span className="mt-1 flex items-baseline gap-1.5">
            <span className="text-c-up-text" aria-hidden="true">
              ▲
            </span>
            <span className={`${price} text-c-up-text`}>2.05</span>
            <span className={`${implied} text-c-text-2`}>· 49%</span>
          </span>
          <span className="absolute bottom-0.5 right-1.5 font-hb-ui text-hb-micro text-c-text-2">
            repriced
          </span>
        </button>
      );
    case "settled-won":
      return (
        <div
          className={`${base} ${idle} border-l-2 border-l-c-up`}
          role="img"
          aria-label="Settled, won 36.00 USDT"
        >
          <CheckGlyph className="absolute right-1.5 top-1.5 size-4 text-c-up" />
          {inner}
        </div>
      );
    case "settled-lost":
      return (
        <div
          className={`${base} ${idle}`}
          role="img"
          aria-label="Settled, lost"
        >
          <span className={`${label} font-medium text-c-text-2`}>Brighton</span>
          <span className="mt-1 flex items-baseline gap-1.5">
            <span className={`${price} font-medium text-c-text-2`}>11.00</span>
            <span className={`${implied} text-c-text-2`}>· 9%</span>
          </span>
        </div>
      );
    case "void":
      return (
        <div
          className={`${base} ${idle}`}
          role="img"
          aria-label="Void — abandoned 63 minutes, 12.00 USDT returned"
        >
          <span className={`${label} text-c-text-2`}>Arsenal</span>
          <span className="mt-1 font-hb-ui text-hb-micro font-semibold uppercase text-c-text-2">
            Void
          </span>
        </div>
      );
    case "offline":
      return (
        <button
          type="button"
          aria-disabled="true"
          aria-label="Arsenal to win, 1.30 — betting paused, you're offline"
          className={`${base} ${idle}`}
        >
          <CloudOffGlyph className="absolute right-1.5 top-1.5 size-3.5 text-c-text-2" />
          {inner}
        </button>
      );
    case "break":
      return (
        <button
          type="button"
          aria-disabled="true"
          aria-label="Arsenal to win, 1.30 — on a break, back 22:40"
          className={`${base} ${idle}`}
        >
          {inner}
        </button>
      );
    case "skeleton":
      return (
        <div
          className={`${base} ${idle} motion-safe:animate-pulse`}
          aria-hidden="true"
        >
          <span className="ds-skel block h-3 w-2/5" />
          <span className="ds-skel mt-2 block h-4 w-3/5" />
        </div>
      );
  }
}

const CELL_STATES: { state: CellState; caption: string }[] = [
  { state: "default", caption: "default — s2 fill + hairline" },
  { state: "hover", caption: "hover — s3 fill, 0ms instant" },
  { state: "pressed", caption: "pressed — scale 0.98 + s3" },
  { state: "focused", caption: "focused — neon ring 2 px + offset 2" },
  { state: "selected", caption: "selected — cta fill + cta-fg + ✓" },
  { state: "tick-up", caption: "tick-up — upText price + ▲ + green tint" },
  { state: "tick-down", caption: "tick-down — down price + ▼ + red tint" },
  {
    state: "suspended",
    caption: "suspended — 60% dim + 🔒, last price legible",
  },
  {
    state: "locked-selected",
    caption: "selected+suspended — both arias coexist",
  },
  { state: "reopened", caption: "reopened-reprice — un-dim + repriced tick" },
  { state: "settled-won", caption: "settled-won — ✓ + quiet up edge" },
  { state: "settled-lost", caption: "settled-lost — t2 at 500 weight" },
  { state: "void", caption: "void — the word, hb-micro" },
  { state: "offline", caption: "offline-frozen — inert, cloud glyph" },
  { state: "break", caption: "break read-only — taps swallowed" },
  { state: "skeleton", caption: "loading — exact geometry, opacity-only" },
];

/* ── Chips / badges ──────────────────────────────────────────────── */
function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-hb-pill bg-c-live px-2 py-0.5 font-hb-ui text-hb-micro font-bold text-c-live-fg">
      <span className="ds-live-dot" aria-hidden="true">
        ●
      </span>
      LIVE 52′
    </span>
  );
}
function SuspendChip({ reason }: { reason: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-hb-pill bg-c-suspend px-2 py-0.5 font-hb-ui text-hb-micro font-semibold text-c-suspend-fg">
      <LockGlyph className="size-3.5" />
      {reason}
    </span>
  );
}
function CoChip() {
  return (
    <span className="inline-flex h-4 items-center rounded-hb-sm bg-c-surface-3 px-1 font-hb-ui text-hb-micro font-semibold uppercase tracking-wide text-c-text-2">
      CO
    </span>
  );
}
function BreakChip() {
  return (
    <span className="inline-flex h-7 items-center rounded-hb-pill border border-c-hairline bg-c-surface-2 px-3 font-hb-ui text-hb-label text-c-text">
      {HB_SAMPLE.breakChip}
    </span>
  );
}

/* ── Page ────────────────────────────────────────────────────────── */
const COLOR_SECTIONS: {
  title: string;
  rows: { token: string; hex: string; cls: string; note: string }[];
}[] = [
  {
    title: "Surfaces",
    rows: [
      {
        token: "--c-bg",
        hex: HB_COLORS.bg,
        cls: "bg-c-bg",
        note: "page background · live CSS",
      },
      {
        token: "--c-surface-1",
        hex: HB_COLORS.surface1,
        cls: "bg-c-surface-1",
        note: "rows, panels · live CSS",
      },
      {
        token: "--c-surface-2",
        hex: HB_COLORS.surface2,
        cls: "bg-c-surface-2",
        note: "cards, cells, inputs · derived",
      },
      {
        token: "--c-surface-3",
        hex: HB_COLORS.surface3,
        cls: "bg-c-surface-3",
        note: "hover/active fills · derived",
      },
      {
        token: "--c-hairline",
        hex: HB_COLORS.surface3,
        cls: "bg-c-hairline",
        note: "1px borders — elevation law",
      },
    ],
  },
  {
    title: "Text",
    rows: [
      {
        token: "--c-text",
        hex: HB_COLORS.text,
        cls: "bg-c-text",
        note: "primary text",
      },
      {
        token: "--c-text-2",
        hex: HB_COLORS.text2,
        cls: "bg-c-text-2",
        note: "ALL meaning-bearing muted (post-D0 bump)",
      },
      {
        token: "--c-text-3",
        hex: HB_COLORS.text3,
        cls: "bg-c-text-3",
        note: "decorative only — never the carrier",
      },
    ],
  },
  {
    title: "Action",
    rows: [
      {
        token: "--c-cta",
        hex: HB_COLORS.cta,
        cls: "bg-c-cta",
        note: "pale-cyan fills ACT (D-01)",
      },
      {
        token: "--c-cta-hi",
        hex: "mix 92% + white",
        cls: "bg-c-cta-hi",
        note: "CTA hover — derived",
      },
      {
        token: "--c-cta-lo",
        hex: "mix 88% + fg",
        cls: "bg-c-cta-lo",
        note: "CTA pressed — derived",
      },
      {
        token: "--c-cta-fg",
        hex: HB_COLORS.ctaFg,
        cls: "bg-c-cta-fg",
        note: "text on pale cyan",
      },
      {
        token: "--c-brand-neon",
        hex: HB_COLORS.neon,
        cls: "bg-c-neon",
        note: "text/glow ONLY — never fills",
      },
      {
        token: "--c-focus",
        hex: HB_COLORS.focus,
        cls: "bg-c-focus",
        note: "ring 2 px + offset 2 px",
      },
    ],
  },
  {
    title: "State + badge pairs",
    rows: [
      {
        token: "--c-up",
        hex: HB_COLORS.up,
        cls: "bg-c-up",
        note: "up / won — fills, edges, icons",
      },
      {
        token: "--c-up-text",
        hex: HB_COLORS.upText,
        cls: "bg-c-up-text",
        note: "tick-up price text (D0 derived)",
      },
      {
        token: "--c-down",
        hex: HB_COLORS.down,
        cls: "bg-c-down",
        note: "down / lost / error (post-D0 bump)",
      },
      {
        token: "--c-suspend",
        hex: HB_COLORS.suspend,
        cls: "bg-c-suspend",
        note: "suspension amber — chip bg, band edge",
      },
      {
        token: "--c-suspend-fg",
        hex: HB_COLORS.suspendFg,
        cls: "bg-c-suspend-fg",
        note: "dark fg on amber chip",
      },
      {
        token: "--c-live",
        hex: HB_COLORS.live,
        cls: "bg-c-live",
        note: "LIVE badge bg",
      },
      {
        token: "--c-live-fg",
        hex: HB_COLORS.liveFg,
        cls: "bg-c-live-fg",
        note: "dark fg on live badge",
      },
      {
        token: "--c-gold",
        hex: HB_COLORS.gold,
        cls: "bg-c-gold",
        note: "prize/trophy/★ only",
      },
    ],
  },
];

const TYPE_CLASS: Record<string, string> = {
  "hb-display": "font-hb-display text-hb-display font-bold",
  "hb-score": "font-hb-num text-hb-score font-bold tabular-nums",
  "hb-title": "font-hb-ui text-hb-title font-bold",
  "hb-h1": "font-hb-ui text-hb-h1 font-semibold",
  "hb-odds": "font-hb-num text-hb-odds font-semibold tabular-nums",
  "hb-body": "font-hb-ui text-hb-body",
  "hb-odds-sm": "font-hb-num text-hb-odds-sm font-semibold tabular-nums",
  "hb-body-sec": "font-hb-ui text-hb-body-sec",
  "hb-label": "font-hb-ui text-hb-label font-semibold",
  "hb-clock": "font-hb-num text-hb-clock font-semibold tabular-nums",
  "hb-micro": "font-hb-ui text-hb-micro font-medium",
};

const SPACE_BARS = [
  { px: 4, cls: "w-1" },
  { px: 8, cls: "w-2" },
  { px: 12, cls: "w-3" },
  { px: 16, cls: "w-4" },
  { px: 20, cls: "w-5" },
  { px: 24, cls: "w-6" },
  { px: 32, cls: "w-8" },
  { px: 48, cls: "w-12" },
  { px: 64, cls: "w-16" },
] as const;

function DesignSystem() {
  return (
    <div className="bg-c-bg pb-16 font-hb-ui text-c-text">
      <div className="mx-auto max-w-5xl space-y-12 px-4 pt-8 lg:px-8">
        {/* ── Header ─────────────────────────────────────────────── */}
        <header className="space-y-3">
          <p className="font-hb-ui text-hb-label font-semibold uppercase tracking-wider text-c-neon">
            Housebets · hidden route — not in nav
          </p>
          <h1 className="font-hb-display text-hb-display font-bold text-c-text">
            Design system — token layer v2
          </h1>
          <p className="max-w-3xl text-hb-body-sec text-c-text-2">
            Every value on this page resolves through{" "}
            <code className="font-mono text-c-text">src/styles/tokens.css</code>{" "}
            — the canonical D0 layer (design/TOKENS.md, post-crit). Same hex
            pairs asserted by{" "}
            <code className="font-mono text-c-text">
              npm run check:contrast
            </code>
            . This page is the judge-legible proof (P6).
          </p>
        </header>

        {/* ── 1 · Color ──────────────────────────────────────────── */}
        <Section
          title="Color tokens"
          lede="Pale-cyan fills act, neon cyan speaks (D-01). Neon is text/glow only — never a fill. Amber = suspended/caution, always 🔒+word. Gold = follows/prizes only."
        >
          <div className="space-y-8">
            {COLOR_SECTIONS.map((g) => (
              <div key={g.title}>
                <h3 className="font-hb-ui text-hb-h1 font-semibold text-c-text">
                  {g.title}
                </h3>
                <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {g.rows.map((r) => (
                    <Swatch
                      key={r.token}
                      token={r.token}
                      hex={r.hex}
                      swatchClass={r.cls}
                      note={r.note}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-hb-body-sec text-c-text-2">
            Neon used as intended:{" "}
            <span className="ds-glow-neon font-hb-num font-semibold tabular-nums">
              1.30 · 77%
            </span>{" "}
            — text + glow accent, zero fill.
          </p>
        </Section>

        {/* ── 2 · Contrast audit (the measured table) ────────────── */}
        <Section
          title="Contrast audit — measured, not assumed"
          lede="Every asserted pair from the D0 checklist (crit-boards h2 ①–⑥ + full text/bg sweep). Floors: money/odds ≥7:1 · text ≥4.5:1 · non-text UI ≥3:1 · decorative t3 ≥3:1. The gate (scripts/check-contrast.mjs) measures the identical pairs with culori."
        >
          <div className="overflow-x-auto rounded-hb-md border border-c-hairline bg-c-surface-1">
            <table className="w-full min-w-160 border-collapse px-3">
              <thead>
                <tr className="text-left font-hb-ui text-hb-micro uppercase tracking-wider text-c-text-2">
                  <th className="py-2 pl-3 pr-3 font-semibold">Pair</th>
                  <th className="py-2 pr-3 font-semibold">fg</th>
                  <th className="py-2 pr-3 font-semibold">bg</th>
                  <th className="py-2 pr-3 font-semibold">floor</th>
                  <th className="py-2 pr-3 font-semibold">ratio</th>
                  <th className="py-2 pr-3 font-semibold">verdict</th>
                </tr>
              </thead>
              <tbody>
                {HB_PAIRS.map((p) => (
                  <PairRow key={p.name} pair={p} />
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ── 3 · Type scale ─────────────────────────────────────── */}
        <Section
          title="Type scale — hb-* measured set"
          lede="Figtree (UI) · Oxanium (betting numerals only, always tabular) · Red Hat Display (display/hero only). 11 px floor; every step carries an explicit line-height."
        >
          <div className="divide-y divide-c-hairline rounded-hb-md border border-c-hairline bg-c-surface-1">
            {HB_TYPE.map((s) => (
              <div
                key={s.token}
                className="flex flex-wrap items-baseline gap-x-6 gap-y-1 px-4 py-3"
              >
                <span className={`${TYPE_CLASS[s.token]} text-c-text`}>
                  The price is the product ·{" "}
                  {s.token === "hb-micro" ||
                  s.token === "hb-odds" ||
                  s.token === "hb-odds-sm" ||
                  s.token === "hb-clock" ||
                  s.token === "hb-score"
                    ? "1.30 · 77% · 52′"
                    : "Arsenal v Brighton"}
                </span>
                <span className="ml-auto font-mono text-hb-micro text-c-text-2">
                  {s.token} · {s.px}/{s.lh} · w{s.weight} · {s.use}
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 4 · Space / radius / elevation ─────────────────────── */}
        <Section
          title="Space, radius, elevation"
          lede={`4 px base — everything is a multiple. Radius: r-md dominates, r-lg is sheets-only. Elevation: ${HB_ELEVATION}.`}
        >
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-2">
              {SPACE_BARS.map((b) => (
                <div key={b.px} className="flex items-center gap-3">
                  <span
                    className={`block h-4 rounded-hb-sm bg-c-surface-3 ${b.cls}`}
                  />
                  <span className="font-mono text-hb-micro text-c-text-2">
                    --s-{b.px / 4} · {b.px}px
                  </span>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <div className="flex flex-wrap items-end gap-6">
                {HB_RADII.map((r) => (
                  <div key={r.token} className="text-center">
                    <span
                      className={`block size-16 border border-c-hairline bg-c-surface-2 ${
                        r.token === "r-sm"
                          ? "rounded-hb-sm"
                          : r.token === "r-md"
                            ? "rounded-hb-md"
                            : r.token === "r-lg"
                              ? "rounded-hb-lg"
                              : "rounded-hb-pill"
                      }`}
                    />
                    <span className="mt-1 block font-mono text-hb-micro text-c-text-2">
                      {r.token} {r.px}px
                    </span>
                    <span className="block max-w-28 text-hb-micro text-c-text-3">
                      {r.use}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <span className="block h-12 w-32 rounded-hb-lg border border-c-hairline bg-c-surface-2 shadow-hb-sheet" />
                <span className="max-w-56 font-mono text-hb-micro text-c-text-2">
                  shadow-hb-sheet — the ONE shadow; owned by sheets
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="relative grid size-11 place-items-center rounded-hb-md border border-c-focus bg-c-surface-2">
                  <span className="size-3 rounded-hb-sm bg-c-neon" />
                  <span className="absolute -inset-1 rounded-hb-md border border-dashed border-c-suspend" />
                </span>
                <span className="max-w-56 font-mono text-hb-micro text-c-text-2">
                  --target-min — 44×44 floor (dashed = hit area)
                </span>
              </div>
            </div>
          </div>
        </Section>

        {/* ── 5 · Motion ─────────────────────────────────────────── */}
        <Section
          title="Motion tokens"
          lede={`Curves + durations as custom props; sheet spring is stiffness/damping for the Motion lib. Rules: ${HB_MOTION.rules}. Hover a track to feel each curve.`}
        >
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-3">
              <h3 className="font-hb-ui text-hb-h1 font-semibold">Curves</h3>
              {HB_MOTION.eases.map((e) => (
                <div
                  key={e.token}
                  className="group rounded-hb-md border border-c-hairline bg-c-surface-1 p-3"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <code className="font-mono text-hb-body-sec font-semibold text-c-text">
                      {e.token}
                    </code>
                    <span className="font-mono text-hb-micro text-c-text-2">
                      {e.value}
                    </span>
                  </div>
                  <p className="text-hb-micro text-c-text-2">
                    {e.use}
                    {e.token === "--ease-spring-sheet" &&
                      " — shown approximated; real curve is a Motion-lib spring"}
                  </p>
                  <div className="ds-motion-track mt-2 h-3 rounded-hb-pill bg-c-surface-2">
                    <span
                      className={`ds-motion-dot block size-3 rounded-hb-pill bg-c-cta duration-(--dur-move) ${
                        e.token === "--ease-out-expo"
                          ? "ease-out-expo"
                          : "ease-standard"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <h3 className="font-hb-ui text-hb-h1 font-semibold">Durations</h3>
              {HB_MOTION.durations.map((d) => (
                <div
                  key={d.token}
                  className="group rounded-hb-md border border-c-hairline bg-c-surface-1 p-3"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <code className="font-mono text-hb-body-sec font-semibold text-c-text">
                      {d.token}
                    </code>
                    <span className="font-mono text-hb-micro text-c-text-2">
                      {d.ms}ms canonical · range {d.range}
                    </span>
                  </div>
                  <p className="text-hb-micro text-c-text-2">{d.use}</p>
                  <div className="ds-motion-track mt-2 h-3 rounded-hb-pill bg-c-surface-2">
                    <span
                      className="ds-motion-dot block size-3 rounded-hb-pill bg-c-neon ease-standard"
                      style={{ transitionDuration: `var(${d.token})` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── 6 · Layout ─────────────────────────────────────────── */}
        <Section
          title="Layout"
          lede="Breakpoints + shell metrics as custom props. Desktop: 72 px rail | fluid 12-col (24 px gutters, max 1312) | 360 px panel. Phone: content + 67 px bar + floating slip pill."
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-hb-md border border-c-hairline bg-c-surface-1 p-4">
              <h3 className="font-hb-ui text-hb-h1 font-semibold">
                Breakpoints
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {HB_LAYOUT.breakpoints.map((bp) => (
                  <span
                    key={bp}
                    className="rounded-hb-pill border border-c-hairline bg-c-surface-2 px-2.5 py-1 font-hb-num text-hb-label font-semibold text-c-text-2 tabular-nums"
                  >
                    {bp}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-hb-md border border-c-hairline bg-c-surface-1 p-4">
              <h3 className="font-hb-ui text-hb-h1 font-semibold">Metrics</h3>
              <ul className="mt-2 space-y-1.5">
                {HB_LAYOUT.metrics.map((m) => (
                  <li
                    key={m.token}
                    className="flex items-baseline gap-3 font-mono text-hb-micro text-c-text-2"
                  >
                    <span className="text-c-text">{m.token}</span>
                    <span className="font-hb-num tabular-nums">{m.px}px</span>
                    <span>{m.use}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* ── 7 · Odds cell state matrix ─────────────────────────── */}
        <Section
          title="Odds cell — the full state matrix"
          lede="The atomic unit of the book (E-M-08 canon, all 14 states + skeleton). Fixed geometry in every state — the target never shifts mid-decision. Price = Oxanium hb-odds; implied-% = hb-micro text-2 (meaning-bearing, never t3)."
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CELL_STATES.map((c) => (
              <figure key={c.state} className="space-y-1.5">
                <CellSpecimen state={c.state} />
                <figcaption className="text-hb-micro text-c-text-2">
                  <span className="font-mono font-semibold text-c-text">
                    {c.state}
                  </span>{" "}
                  {c.caption}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-4 max-w-3xl text-hb-micro text-c-text-2">
            Selected+suspended keeps the pick: aria-pressed + aria-disabled
            coexist. CO chip rides the top-LEFT corner (✓ owns top-right).
            Offline cells stay legible + focusable — inert ≠ dead button.
          </p>
        </Section>

        {/* ── 8 · Buttons ────────────────────────────────────────── */}
        <Section
          title="Buttons"
          lede="One acting fill per view (P3). Pale-cyan = commits money; surface = secondary; destructive = outlined, never filled loud; disabled always carries its reason in text-2."
        >
          <div className="flex max-w-xl flex-col gap-4">
            <div>
              <button
                type="button"
                className="h-11 w-full rounded-hb-md bg-c-cta px-4 font-hb-ui text-hb-label font-semibold text-c-cta-fg transition-colors duration-(--dur-feedback) hover:bg-c-cta-hi active:bg-c-cta-lo"
              >
                Place bet · 20.00 USDT
              </button>
              <p className="mt-1 font-mono text-hb-micro text-c-text-2">
                primary — bg-c-cta / text-c-cta-fg
              </p>
            </div>
            <div>
              <button
                type="button"
                className="h-11 w-full rounded-hb-md border border-c-hairline bg-c-surface-2 px-4 font-hb-ui text-hb-label font-semibold text-c-text transition-colors duration-(--dur-feedback) hover:bg-c-surface-3"
              >
                Add funds (demo)
              </button>
              <p className="mt-1 font-mono text-hb-micro text-c-text-2">
                surface — s2 fill + hairline, s3 hover
              </p>
            </div>
            <div>
              <button
                type="button"
                className="h-11 w-full rounded-hb-md border border-c-down bg-c-surface-2 px-4 font-hb-ui text-hb-label font-semibold text-c-down transition-colors duration-(--dur-feedback) hover:bg-c-down-a16"
              >
                Void — abandoned 63′ · 12.00 USDT returned
              </button>
              <p className="mt-1 font-mono text-hb-micro text-c-text-2">
                destructive — down hairline + down words
              </p>
            </div>
            <div>
              <button
                type="button"
                disabled
                className="h-11 w-full cursor-not-allowed rounded-hb-md border border-c-hairline bg-c-surface-2 px-4 font-hb-ui text-hb-label font-semibold text-c-text-2 opacity-50"
              >
                Place bet
              </button>
              <p className="mt-1 font-mono text-hb-micro text-c-text-2">
                disabled — reason in text-2: "More than your balance (240.00
                USDT)"
              </p>
            </div>
          </div>
        </Section>

        {/* ── 9 · Badges + chips ─────────────────────────────────── */}
        <Section
          title="Badges + chips"
          lede="Badge pairs are measured, not guessed: LIVE = --c-live bg + --c-live-fg fg (6.16:1); suspend chip = --c-suspend bg + --c-suspend-fg fg (5.83:1). Both carry word+icon — never color alone."
        >
          <div className="flex flex-wrap items-center gap-3">
            <LiveBadge />
            <SuspendChip reason={HB_SAMPLE.suspendedReason} />
            <SuspendChip reason="Suspended — betting paused" />
            <CoChip />
            <BreakChip />
            <span className="inline-flex h-9 items-center gap-1.5 rounded-hb-pill bg-c-surface-2 px-3 font-hb-ui text-hb-label text-c-text">
              <BallGlyph className="size-5 text-c-text-2" />
              Soccer
              <span className="rounded-hb-pill bg-c-live px-1.5 font-hb-num text-hb-micro font-semibold text-c-live-fg tabular-nums">
                6
              </span>
            </span>
            <span className="inline-flex h-9 items-center gap-1.5 rounded-hb-pill bg-c-cta px-3 font-hb-ui text-hb-label font-semibold text-c-cta-fg">
              Live
              <span className="font-hb-num text-hb-micro font-semibold tabular-nums">
                13
              </span>
            </span>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="mr-2 font-mono text-hb-micro text-c-text-2">
              quick-stake (E-11 canon: 1 · 10 · 50 · 100 · Max)
            </span>
            {["1", "10", "50", "100", "Max"].map((v) => (
              <button
                key={v}
                type="button"
                className="h-10 min-w-14 rounded-hb-md border border-c-hairline bg-c-surface-2 px-3 font-hb-num text-hb-odds-sm font-semibold text-c-text tabular-nums transition-colors duration-(--dur-feedback) hover:bg-c-surface-3 active:bg-c-cta active:text-c-cta-fg"
              >
                {v}
              </button>
            ))}
          </div>
          <div className="mt-5 flex max-w-xl items-center gap-2 rounded-hb-md border border-l-2 border-c-hairline border-l-c-suspend bg-c-surface-1 px-3 py-2">
            <span className="font-hb-ui text-hb-body-sec text-c-text">
              Odds moved{" "}
              <span className="font-hb-num tabular-nums">1.80 → 2.05</span>{" "}
              while you were deciding
            </span>
            <span className="ml-auto flex gap-2">
              <button
                type="button"
                className="h-8 rounded-hb-sm bg-c-cta px-3 font-hb-ui text-hb-label font-semibold text-c-cta-fg"
              >
                Accept
              </button>
              <button
                type="button"
                className="h-8 rounded-hb-sm border border-c-hairline bg-c-surface-2 px-3 font-hb-ui text-hb-label font-semibold text-c-text"
              >
                Decline
              </button>
            </span>
          </div>
          <p className="mt-2 font-mono text-hb-micro text-c-text-2">
            changed-odds grammar — amber EDGE only; the padlock stays with
            suspension (DATA-CANON one-encoding)
          </p>
        </Section>

        {/* ── 10 · Canon strings — the shared grammar ────────────── */}
        <Section
          title="Canon strings — same spelling on every surface"
          lede="DATA-CANON is the single source (D-17). Session line identical in panel, sheet, and My bets; pill payload never presumes a stake."
        >
          <div className="space-y-5">
            <div>
              <div className="flex h-6 max-w-xl items-center rounded-hb-sm bg-c-surface-1 px-3">
                <span className="font-hb-ui text-hb-micro text-c-text-2">
                  Session 47 min · net{" "}
                  <span className="font-hb-num text-c-text tabular-nums">
                    −12.00 USDT
                  </span>
                </span>
              </div>
              <p className="mt-1 font-mono text-hb-micro text-c-text-2">
                session line — t2 words, t1 numerals, sign always explicit,
                never green/red (C-20/C-21)
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div>
                <span className="inline-flex h-11 items-center gap-1.5 rounded-hb-pill border border-c-hairline bg-c-surface-2 px-4 font-hb-ui text-hb-label text-c-text">
                  <span className="text-c-live" aria-hidden="true">
                    ●
                  </span>
                  <span className="font-hb-num tabular-nums">1</span>
                  Arsenal @
                  <span className="font-hb-num font-semibold tabular-nums">
                    1.30
                  </span>
                  <span aria-hidden="true">⌃</span>
                </span>
                <p className="mt-1 max-w-72 font-mono text-hb-micro text-c-text-2">
                  pill payload w/ picks — never "Pays X" pre-stake
                </p>
              </div>
              <div>
                <span className="inline-flex h-11 items-center gap-1.5 rounded-hb-pill border border-c-hairline bg-c-surface-2 px-4 font-hb-ui text-hb-label text-c-text">
                  <span className="text-c-live" aria-hidden="true">
                    ●
                  </span>
                  <span className="font-hb-num tabular-nums">1</span>
                  Arsenal ·{" "}
                  <span className="font-hb-num tabular-nums">1–0</span> ·{" "}
                  <span className="font-hb-num tabular-nums">52′</span> · CO{" "}
                  <span className="font-hb-num font-semibold tabular-nums">
                    22.40
                  </span>
                  <span aria-hidden="true">⌃</span>
                </span>
                <p className="mt-1 max-w-72 font-mono text-hb-micro text-c-text-2">
                  pill payload w/ open bet — score · minute · CO quote
                </p>
              </div>
            </div>

            <div>
              <div className="flex h-11 max-w-xl items-center gap-2 rounded-hb-md border border-c-suspend bg-c-surface-1 px-3">
                <SuspendChip reason={HB_SAMPLE.suspendedReason} />
                <span className="font-hb-ui text-hb-body-sec text-c-text-2">
                  cells dim 60% · last price stays
                </span>
                <span className="ml-auto font-hb-ui text-hb-label font-semibold text-c-text-2">
                  +78 ›
                </span>
              </div>
              <p className="mt-1 font-mono text-hb-micro text-c-text-2">
                suspended band — 1px amber edge + same chip inset; +N › stays
                navigable
              </p>
            </div>

            <div>
              <div
                role="status"
                className="flex h-12 max-w-xl items-center gap-3 border-y border-c-hairline bg-c-surface-2 px-4"
              >
                <CloudOffGlyph className="size-5 text-c-text-2" />
                <span className="font-hb-ui text-hb-body-sec text-c-text">
                  {HB_SAMPLE.offline}
                </span>
              </div>
              <p className="mt-1 font-mono text-hb-micro text-c-text-2">
                offline banner — neutral s2 band, cloud-slash glyph; a band,
                never the suspended chip; sticky, role=status
              </p>
            </div>
          </div>
        </Section>

        {/* ── Footer ─────────────────────────────────────────────── */}
        <footer className="border-t border-c-hairline pt-6">
          <p className="max-w-3xl text-hb-micro text-c-text-2">
            Gates: <code className="font-mono">npm run check:contrast</code>{" "}
            (culori, this table's pairs) ·{" "}
            <code className="font-mono">npm run check:tokens</code> (raw-value
            lint — this file must stay clean). Flagship book:{" "}
            {HB_SAMPLE.flagship} · 1X2 {HB_SAMPLE.overround} overround. Balance:{" "}
            {HB_SAMPLE.balance} ({HB_SAMPLE.balanceSplit}).
          </p>
        </footer>
      </div>
    </div>
  );
}
