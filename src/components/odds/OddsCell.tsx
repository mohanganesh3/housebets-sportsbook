import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { impliedPct } from "../../lib/matchBook";
import { useOdds } from "../../lib/store/odds";
import { useSlip } from "../../lib/store/slip";
import { useUI } from "../../lib/store/ui";
import { useWorld } from "../../lib/store/world";
import type { Market, Match, Outcome } from "../../lib/types";
import "./odds-cell.css";

/* ==================================================================
   OddsCell — E-M-08, the signature atomic unit of the book.
   One component, every surface (A3.S3): match grids, ticket legs,
   boards. Fixed geometry in EVERY state — the target never shifts
   mid-decision (P51-03).

   States: default / hover / pressed / focused / selected / tick-up /
   tick-down / suspended / reopened-tick / settled-won / settled-lost /
   void / offline-frozen / break-read-only — and the combos
   (selected+ticking, selected+suspended).

   Selected = cyan edge + corner check (post-crit brief — NOT the old
   fill-flip). Suspended = instant padlock + 60% dim, last price legible
   (S3 — the lock itself never animates). Ticks = signed digit roll +
   ▲/▼ caret + directional tint decaying about a second (S1); while a
   stake is pending the board mutes to tint-only (S8).
   ================================================================== */

/* Authored glyphs — hairline stroke on a 20-unit grid, currentColor,
   never emoji (TOKENS icon law). */
export function CheckGlyph({ className }: { className?: string }) {
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
export function LockGlyph({ className }: { className?: string }) {
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
export function CloudOffGlyph({ className }: { className?: string }) {
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

/* S1 digit morph — @number-flow/react is not in the dep tree, so the
   roll is Motion: trend=0 vertical roll, --dur-enter --ease-out-expo,
   transform/opacity only inside a tabular-numeral (fixed-width) run.
   Direction is SIGNED: a rising price slides up, a falling one down. */
export function MorphNumber({
  value,
  dir,
  className,
}: {
  value: string;
  dir?: "up" | "down" | null;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <span className="relative inline-flex overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={
            reduce
              ? { opacity: 1, y: 0 }
              : { opacity: 0.35, y: dir === "down" ? "-45%" : "45%" }
          }
          animate={{ opacity: 1, y: 0 }}
          exit={
            reduce
              ? { opacity: 0, transition: { duration: 0 } }
              : { opacity: 0.35, y: dir === "down" ? "45%" : "-45%" }
          }
          transition={{ duration: reduce ? 0 : 0.25, ease: [0.23, 1, 0.32, 1] }}
          className={className}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export interface OddsCellProps {
  outcome: Outcome;
  market: Market;
  match: Match;
  /** `CO` pre-bet eligibility marker (E-M-08 owns it, fact not control) */
  cashoutEligible?: boolean;
  /** FT grading — undefined = live state, never settled */
  settleMark?: "won" | "lost" | "void";
  /** SR verb — "to win" for result picks, omitted for totals/scorers */
  verb?: string;
  /** fired on an explicit add — the page plays the S2 flight from it */
  onAdd?: (el: HTMLElement) => void;
}

export function OddsCell({
  outcome,
  market,
  match,
  cashoutEligible,
  settleMark,
  verb,
  onAdd,
}: OddsCellProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const override = useOdds((s) => s.overrides[outcome.id]);
  const flash = useOdds((s) => s.flashes[outcome.id]);
  const selected = useSlip((s) =>
    s.selections.some((x) => x.outcomeId === outcome.id),
  );
  const toggle = useSlip((s) => s.toggle);
  const reason = useWorld((s) => s.suspReasons[market.id]);
  const offline = useUI((s) => s.offline);
  const breakUntil = useUI((s) => s.breakUntil);
  // S8 calm-live: a pending stake mutes board motion to tint-only —
  // glyph and colour pop drop out, the tint overlay still plays.
  const calm = useSlip(
    (s) =>
      s.status === "placing" ||
      s.selections.some((x) => (parseFloat(x.stake) || 0) > 0),
  );

  const price = override ?? outcome.price;
  const pct = impliedPct(price);
  const settled = settleMark !== undefined;
  const suspended =
    !settled &&
    (market.status === "suspended" || outcome.status === "suspended");
  const finished = match.status === "finished";
  const onBreak = breakUntil > Date.now();
  const blocked = suspended || finished || offline || onBreak || settled;

  // `was →` trail: remember the last price so the move is auditable
  const prevRef = useRef(price);
  useEffect(() => {
    if (prevRef.current !== price) prevRef.current = price;
  }, [price]);
  const moved =
    prevRef.current !== price
      ? `was ${prevRef.current.toFixed(2)} → ${price.toFixed(2)}`
      : undefined;

  const baseName = verb ? `${outcome.name} ${verb}` : outcome.name;
  let aria = `${baseName}, ${price.toFixed(2)}, implied ${pct}%`;
  if (settleMark === "won") aria += ", settled, won";
  if (settleMark === "lost") aria += ", settled, lost";
  if (settleMark === "void") aria += ", void";
  if (selected) aria += ", selected";
  if (suspended) aria += `, suspended${reason ? `, ${reason}` : ""}`;
  if (offline) aria += ", betting paused, you're offline";
  if (onBreak) aria += ", on a break, prices are read-only";
  if (cashoutEligible) aria += ", cash out offered";
  if (moved && !settled) aria += `, ${moved}`;

  const onKeyNav = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const grid = ref.current?.closest("[data-cellgrid]");
    if (!grid) return;
    const cells = [...grid.querySelectorAll<HTMLElement>("[data-cell]")];
    const i = cells.indexOf(ref.current!);
    if (i < 0) return;
    const cols =
      getComputedStyle(grid).gridTemplateColumns.split(" ").length || 1;
    let j = -1;
    if (e.key === "ArrowRight") j = i + 1;
    if (e.key === "ArrowLeft") j = i - 1;
    if (e.key === "ArrowDown") j = i + cols;
    if (e.key === "ArrowUp") j = i - cols;
    if (j >= 0 && j < cells.length) {
      e.preventDefault();
      cells[j].focus();
    }
  };

  const won = settleMark === "won";
  const lost = settleMark === "lost";
  const voided = settleMark === "void";

  return (
    <motion.button
      ref={ref}
      type="button"
      data-cell
      whileTap={blocked ? undefined : { scale: 0.98 }}
      onClick={(e) => {
        if (blocked) return;
        if (!selected) onAdd?.(e.currentTarget);
        toggle(outcome.id);
      }}
      onKeyDown={onKeyNav}
      aria-pressed={!settled && selected}
      aria-disabled={blocked || undefined}
      aria-label={aria}
      title={moved}
      style={{ touchAction: "manipulation" }}
      className={[
        "relative flex w-full min-w-0 items-stretch overflow-hidden rounded-hb-md border px-3",
        "min-h-11 py-1.5 lg:min-h-9 lg:py-1",
        "text-left [transition:background-color_0ms,border-color_var(--dur-feedback)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-c-focus",
        selected && !settled ? "border-c-cta" : "border-c-hairline",
        "bg-c-surface-2",
        blocked ? "" : "hover:bg-c-surface-3 motion-safe:active:scale-[0.98]",
        won ? "hb-cell--won" : "",
      ].join(" ")}
    >
      {/* tick/settle tint — rides an overlay, never the border (S1) */}
      {flash && !suspended && !settled && (
        <span
          key={flash.key}
          aria-hidden="true"
          className={`hb-cell-tint ${flash.dir === "up" ? "hb-cell-tint--up" : "hb-cell-tint--down"}`}
        />
      )}
      {won && (
        <span
          aria-hidden="true"
          className="hb-cell-tint hb-cell-tint--settle"
        />
      )}

      {/* CO eligibility — a fact, not a control (E-M-08/F7) */}
      {cashoutEligible && !settled && (
        <span
          aria-hidden="true"
          className="absolute left-1.5 top-1 inline-flex h-4 items-center rounded-hb-sm bg-c-surface-3 px-1 font-hb-ui text-hb-micro font-semibold uppercase text-c-text-2"
        >
          CO
        </span>
      )}

      {/* cell content — suspended dims to 60%, last price stays legible */}
      <span
        className={[
          "flex min-w-0 flex-1 flex-col justify-center gap-0.5",
          "lg:flex-row lg:items-center lg:justify-between lg:gap-2",
          suspended ? "opacity-60" : "",
          lost || voided ? "font-medium" : "",
        ].join(" ")}
      >
        <span
          className={`flex min-w-0 items-center gap-1.5 ${cashoutEligible && !settled ? "pl-7 lg:pl-8" : ""}`}
        >
          <span
            className={`truncate font-hb-ui text-hb-body-sec lg:text-hb-body ${
              selected && !settled
                ? "text-c-text"
                : lost || voided
                  ? "text-c-text-2"
                  : "text-c-text-2"
            }`}
          >
            {outcome.name}
          </span>
        </span>
        {voided ? (
          <span className="font-hb-ui text-hb-micro font-semibold uppercase text-c-text-2">
            Void
          </span>
        ) : (
          <span className="flex items-baseline gap-1 lg:flex-col lg:items-end lg:gap-0">
            <span className="flex items-baseline gap-1">
              <span
                key={flash?.key ?? "flat"}
                aria-hidden="true"
                data-live={flash && !calm ? "true" : undefined}
                className={`hb-cell-caret w-3 text-center text-hb-micro ${
                  flash?.dir === "up"
                    ? "text-c-up-text"
                    : flash?.dir === "down"
                      ? "text-c-down"
                      : ""
                }`}
              >
                {flash?.dir === "down" ? "▼" : "▲"}
              </span>
              <MorphNumber
                value={price.toFixed(2)}
                dir={flash?.dir}
                className={`font-hb-num text-hb-odds font-semibold tabular-nums ${
                  lost ? "text-c-text-2" : "text-c-text"
                }`}
              />
            </span>
            <span
              className={`font-hb-ui text-hb-micro tabular-nums ${
                lost ? "text-c-text-2" : "text-c-text-2"
              }`}
            >
              · {pct}%
            </span>
          </span>
        )}
      </span>

      {/* corner cluster — ✓ owns top-right; lock/cloud share the slot */}
      <span className="absolute right-1.5 top-1.5 flex items-center gap-1">
        {selected && !settled && <CheckGlyph className="size-4 text-c-cta" />}
        {won && <CheckGlyph className="size-4 text-c-up" />}
        {suspended && <LockGlyph className="size-3.5 text-c-text-2" />}
        {offline && !suspended && (
          <CloudOffGlyph className="size-3.5 text-c-text-2" />
        )}
      </span>
    </motion.button>
  );
}
