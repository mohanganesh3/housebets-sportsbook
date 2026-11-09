import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { impliedPct, isCashoutEligible } from "../lib/matchBook";
import { matchById } from "../lib/seed";
import { useBets } from "../lib/store/bets";
import { type FailReason, useSlip } from "../lib/store/slip";
import { useUI } from "../lib/store/ui";
import { useWorld } from "../lib/store/world";
import type { SlipSelection } from "../lib/types";
import { CloudOffGlyph, LockGlyph, MorphNumber } from "./odds/OddsCell";

/* ==================================================================
   D3 — BET SLIP internals (STORYBOARDS/slip-page.md, ELEMENTS/slip.md
   E-05..E-19, E-32..E-34). Tokens only: the c-* / hb-* utilities.

   Consent stack order (E-12, one order both sizes):
     totals → delay note → odds-change mode → balance → CTA → RG
   Canon law: displayed = billed; stake checks run on AVAILABLE
   (balance − in-bets), never the 240 total.
   ================================================================== */

const QUICK_STAKES = [1, 10, 50, 100];
const MIN_STAKE = 1;
const MAX_STAKE = 5000;

// DATA-CANON session sample: this demo session is 47 min old at first
// paint, then ticks forward on the real clock (invariant 2).
export const SESSION_START = Date.now() - 47 * 60_000;

// the house glyph — roofline h, echoes the brand mark
export function HouseGlyph({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M4 11.5 L12 4.5 L20 11.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 10.5 V19 H17.5 V10.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 19 V14.5 H14 V19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const money = (v: number) => v.toFixed(2);
const fmtClock = (ts: number) =>
  new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
const fmtStamp = (ts: number) =>
  new Date(ts).toLocaleTimeString([], { hour12: false });

/** Available = balance − stakes already riding (canon 240−60 = 180). */
const useAvailable = () => {
  const balance = useUI((s) => s.balance);
  const inBets = useBets((s) =>
    s.bets.filter((b) => b.result === "open").reduce((a, b) => a + b.stake, 0),
  );
  return { balance, inBets, available: Math.max(0, balance - inBets) };
};

// Stake input law (E-10): strip to digits+one dot, reject >2dp at input
// — the field can never hold a number the bet won't be billed at.
const sanitize = (raw: string): { v: string; clipped: boolean } => {
  const clean = raw.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
  const dp = clean.split(".")[1];
  if (dp && dp.length > 2)
    return { v: `${clean.split(".")[0]}.${dp.slice(0, 2)}`, clipped: true };
  return { v: clean, clipped: false };
};

function SuspChip({ reason }: { reason: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-hb-sm bg-c-suspend px-2 py-0.5 font-hb-ui text-hb-label font-semibold text-c-suspend-fg">
      <LockGlyph className="size-3.5" />
      Suspended — {reason}
    </span>
  );
}

function LiveBadge({ min, score }: { min: number | null; score: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-hb-sm bg-c-live px-1.5 py-px font-hb-ui text-hb-micro font-semibold text-c-live-fg">
      LIVE {score} {min != null ? `${min}′` : ""}
    </span>
  );
}

/* ── E-05..E-08 · the selection leg ───────────────────────────────── */
function LegCard({ sel }: { sel: SlipSelection }) {
  const remove = useSlip((s) => s.remove);
  const accept = useSlip((s) => s.accept);
  const setStake = useSlip((s) => s.setStake);
  const place = useSlip((s) => s.place);
  const offline = useUI((s) => s.offline);
  const breakUntil = useUI((s) => s.breakUntil);
  const mt = useWorld((s) => s.matches.find((m) => m.id === sel.matchId));
  const market = matchById(sel.matchId)?.markets.find(
    (m) => m.id === sel.marketId,
  );
  const suspReason = useWorld(
    (s) => s.suspReasons[sel.marketId] ?? "betting paused",
  );
  const { available } = useAvailable();
  const [decErr, setDecErr] = useState(false);

  const susp = sel.status === "suspended";
  const changed = sel.status === "changed";
  const onBreak = breakUntil > Date.now();
  const locked = susp || offline || onBreak;
  const coEligible = market ? isCashoutEligible(market) : false;
  const live = mt?.status === "live";

  const stake = parseFloat(sel.stake) || 0;
  const ret = stake * sel.livePrice;
  const pct = impliedPct(sel.livePrice);
  const err =
    decErr && sel.stake.includes(".")
      ? "Two decimals max"
      : sel.stake !== "" && stake <= 0
        ? `Enter a stake — min ${MIN_STAKE.toFixed(2)} USDT`
        : stake > MAX_STAKE
          ? `Max ${MAX_STAKE.toLocaleString()} USDT`
          : stake > available
            ? `More than your balance (${money(available)} USDT)`
            : null;

  const ariaLabel =
    `${sel.pick} at ${sel.livePrice.toFixed(2)}` +
    (stake > 0 ? `, stake ${money(stake)} USDT` : "") +
    (susp ? `, suspended — ${suspReason}` : "") +
    (changed ? ", odds moved, needs your answer" : "") +
    (coEligible ? ", cash out offered" : "") +
    (locked && !susp ? ", read-only" : "");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 40, transition: { duration: 0.16 } }}
      role="group"
      aria-label={ariaLabel}
      className={`relative overflow-hidden rounded-hb-md border bg-c-surface-2 ${
        changed
          ? "border-c-hairline border-s-2 border-s-c-suspend"
          : "border-c-hairline"
      }`}
    >
      {/* E-06 worse-accepted: 1s amber edge flash that decays — the move
          is announced even though consent was pre-given (P2/crit #5) */}
      {sel.moved?.kind === "worse" && !susp && (
        <motion.span
          key={`${sel.moved.from}-${sel.moved.to}`}
          aria-hidden
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1, ease: "linear" }}
          className="absolute inset-y-0 start-0 w-0.5 bg-c-suspend"
        />
      )}
      <div className={`p-3 ${susp ? "opacity-60" : ""}`}>
        {/* pick + price row (E-05 anatomy) */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate font-hb-ui text-hb-h1 font-semibold text-c-text">
              {sel.pick}
            </p>
            <p className="mt-0.5 flex items-center gap-2 font-hb-num text-hb-odds-sm text-c-text-2">
              {pct}% implied
              {coEligible && (
                <span
                  title="Cash out settles this bet early at the live quote"
                  className="rounded-hb-sm bg-c-surface-3 px-1 font-hb-ui text-hb-micro font-semibold uppercase text-c-text-2"
                >
                  CO
                </span>
              )}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            {offline && !susp && (
              <CloudOffGlyph className="size-3.5 text-c-text-2" />
            )}
            <span className="font-hb-num text-hb-odds font-bold text-c-text">
              {changed ? (
                <>
                  <s className="me-1 font-normal text-c-text-2">
                    {sel.priceAtPick.toFixed(2)}
                  </s>
                  {sel.livePrice.toFixed(2)}
                </>
              ) : (
                sel.livePrice.toFixed(2)
              )}
            </span>
            <button
              type="button"
              onClick={() => remove(sel.outcomeId)}
              aria-label={`Remove ${sel.pick}`}
              className="grid size-8 place-items-center rounded-hb-md text-c-text-2 transition-colors duration-(--dur-feedback) hover:bg-c-surface-3 hover:text-c-down"
            >
              ✕
            </button>
          </div>
        </div>
        {/* market + fixture + live context sub-line */}
        <p className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 font-hb-ui text-hb-body-sec text-c-text-2">
          {sel.marketName} · {mt ? `${mt.home.name} v ${mt.away.name}` : ""}
          {live && mt && (
            <LiveBadge
              min={mt.minute}
              score={`${mt.score.home}–${mt.score.away}`}
            />
          )}
        </p>

        {/* E-06 auto-accepted fact line — announced, never silent */}
        {sel.moved && !susp && !changed && (
          <p
            className={`mt-1.5 flex items-center gap-1 font-hb-ui text-hb-body-sec ${
              sel.moved.kind === "better" ? "text-c-up-text" : "text-c-down"
            }`}
            role="status"
          >
            <span aria-hidden>{sel.moved.kind === "better" ? "▲" : "▼"}</span>
            <span className="text-c-text-2">
              Moved {sel.moved.from.toFixed(2)} → {sel.moved.to.toFixed(2)} ·{" "}
              {sel.moved.kind} — accepted
            </span>
          </p>
        )}

        {/* E-07 same-frame ask — consent where the price lives */}
        {changed && (
          <div className="mt-2" role="alert">
            <p className="font-hb-ui text-hb-body-sec font-semibold text-c-text">
              ⚠ Odds moved {sel.priceAtPick.toFixed(2)} →{" "}
              {sel.livePrice.toFixed(2)} while you were deciding
            </p>
            <div className="mt-2 flex items-center gap-2">
              <button
                type="button"
                data-on-cta
                onClick={() => accept(sel.outcomeId)}
                className="h-10 min-w-28 rounded-hb-md bg-c-cta px-3 font-hb-ui text-hb-label font-semibold text-c-cta-fg transition-colors duration-(--dur-feedback) hover:bg-c-cta-hi active:bg-c-cta-lo"
              >
                Accept {sel.livePrice.toFixed(2)}
              </button>
              <button
                type="button"
                onClick={() => remove(sel.outcomeId)}
                className="h-10 rounded-hb-md px-3 font-hb-ui text-hb-label font-semibold text-c-text-2 transition-colors duration-(--dur-feedback) hover:bg-c-surface-3 hover:text-c-text"
              >
                Remove
              </button>
            </div>
          </div>
        )}

        {/* stake row — field left, returns right (E-10/W5-08) */}
        <div className="mt-2.5 flex items-end gap-3">
          <div className="min-w-0 flex-1">
            <div
              className={`flex h-11 items-center rounded-hb-sm border px-3 transition-colors duration-(--dur-feedback) ${
                err
                  ? "border-c-down"
                  : "border-c-hairline focus-within:border-c-focus"
              } ${locked ? "bg-c-surface-1" : "bg-c-surface-3"}`}
            >
              <input
                value={sel.stake}
                onChange={(e) => {
                  const { v, clipped } = sanitize(e.target.value);
                  setDecErr(clipped);
                  setStake(sel.outcomeId, v);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") place();
                }}
                placeholder="0.00"
                inputMode="decimal"
                disabled={locked}
                aria-label={`Stake for ${sel.pick} in USDT`}
                aria-describedby={`stk-minmax-${sel.outcomeId}`}
                className="w-full bg-transparent font-hb-num text-hb-h1 font-semibold text-c-text outline-none placeholder:text-c-text-3 disabled:cursor-not-allowed"
              />
              <span className="shrink-0 font-hb-ui text-hb-micro font-semibold text-c-text-2">
                USDT
              </span>
            </div>
            <p
              id={`stk-minmax-${sel.outcomeId}`}
              className="mt-1 font-hb-ui text-hb-micro text-c-text-2"
            >
              Min {MIN_STAKE.toFixed(2)} · max{" "}
              {MAX_STAKE.toLocaleString("en-US")} USDT
            </p>
          </div>
          <div className="shrink-0 pb-5 text-end">
            <div className="font-hb-ui text-hb-micro uppercase text-c-text-2">
              Returns
            </div>
            <div className="font-hb-num text-hb-odds-sm font-semibold text-c-text">
              <MorphNumber value={ret.toFixed(2)} />
            </div>
          </div>
        </div>
        {err && (
          <p
            role="alert"
            className="mt-1 font-hb-ui text-hb-body-sec font-semibold text-c-down"
          >
            ⚠ {err}{" "}
            {stake > available && (
              <button
                type="button"
                onClick={() => useUI.getState().setDepositOpen(true)}
                className="font-normal text-c-text underline decoration-dotted underline-offset-2"
              >
                Add funds (demo)
              </button>
            )}
          </p>
        )}
        {/* stake chips — Housebets' own denominations; SET not ADD,
            nothing pre-highlighted (BIT: a default stake is an operator
            bet). Chips that would exceed available are disabled. */}
        {!locked && (
          <div className="mt-2 flex gap-1.5">
            {QUICK_STAKES.map((q) => (
              <button
                key={q}
                type="button"
                disabled={q > available}
                aria-label={`Set stake to ${q} USDT`}
                onClick={() => {
                  setDecErr(false);
                  setStake(sel.outcomeId, String(q));
                }}
                className="h-9 flex-1 rounded-hb-md bg-c-surface-3 font-hb-num text-hb-odds-sm font-semibold text-c-text transition-colors duration-(--dur-feedback) hover:bg-c-surface-2 active:bg-c-surface-1 disabled:cursor-not-allowed disabled:opacity-40 motion-safe:active:scale-[0.98]"
              >
                {q}
              </button>
            ))}
            <button
              type="button"
              disabled={available <= 0}
              aria-label={`Set stake to available balance ${money(available)} USDT`}
              onClick={() => {
                setDecErr(false);
                setStake(sel.outcomeId, available.toFixed(2));
              }}
              className="h-9 flex-1 rounded-hb-md bg-c-surface-3 font-hb-ui text-hb-odds-sm font-semibold text-c-text transition-colors duration-(--dur-feedback) hover:bg-c-surface-2 active:bg-c-surface-1 disabled:cursor-not-allowed disabled:opacity-40 motion-safe:active:scale-[0.98]"
            >
              Max
            </button>
          </div>
        )}
      </div>

      {/* E-08 suspended: 0ms same-frame — chip + 60% dim + last price,
          never a dead end (S3, integrity has no animation) */}
      {susp && (
        <div className="border-t border-c-hairline px-3 py-2">
          <SuspChip reason={suspReason} />
          <div className="mt-2 flex items-center justify-between gap-2">
            <p className="font-hb-ui text-hb-body-sec text-c-text-2">
              This pick is suspended — {suspReason}
            </p>
            <button
              type="button"
              onClick={() => remove(sel.outcomeId)}
              className="h-9 shrink-0 rounded-hb-md px-3 font-hb-ui text-hb-label font-semibold text-c-text-2 transition-colors duration-(--dur-feedback) hover:bg-c-surface-3 hover:text-c-text"
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}

/* ── E-16 · ticket offline banner (pins under tabs, both postures) ── */
export function TicketOfflineBar({ myBets }: { myBets?: boolean }) {
  const offline = useUI((s) => s.offline);
  if (!offline) return null;
  return (
    <div
      role="status"
      className="hb-band-in mx-3 mb-2 border-s-2 border-s-c-suspend bg-c-surface-2 px-3 py-2"
    >
      <p className="flex items-center gap-2 font-hb-ui text-hb-body-sec font-semibold text-c-text">
        <CloudOffGlyph className="size-4 shrink-0 text-c-text-2" />
        You&apos;re offline — prices are frozen, not live
      </p>
      {myBets && (
        <p className="mt-0.5 ps-6 font-hb-ui text-hb-micro text-c-text-2">
          Showing last known prices
        </p>
      )}
    </div>
  );
}

/* ── E-17 · break lock strip — replaces the CTA zone; My bets stays
   readable, cash-out still works (money-out never blocked) ────────── */
function BreakStrip() {
  const breakUntil = useUI((s) => s.breakUntil);
  const endBreak = useUI((s) => s.endBreak);
  const [confirm, setConfirm] = useState(false);
  return (
    <div role="status" className="rounded-hb-md bg-c-surface-2 px-3 py-2.5">
      <p className="font-hb-ui text-hb-body font-semibold text-c-text">
        On a break · back{" "}
        <span dir="ltr" className="font-hb-num tabular-nums">
          {fmtClock(breakUntil)}
        </span>
      </p>
      <p className="mt-0.5 font-hb-ui text-hb-body-sec text-c-text-2">
        Betting is off until then. Prices are read-only. Cash out still works.
      </p>
      {confirm ? (
        <div className="mt-2" role="alert">
          <p className="font-hb-ui text-hb-body-sec font-semibold text-c-text">
            End break now?
          </p>
          <div className="mt-1.5 flex gap-2">
            <button
              type="button"
              onClick={() => {
                endBreak();
                setConfirm(false);
              }}
              className="h-10 rounded-hb-md border border-c-hairline bg-c-surface-3 px-3 font-hb-ui text-hb-label font-semibold text-c-text"
            >
              End break
            </button>
            <button
              type="button"
              onClick={() => setConfirm(false)}
              className="h-10 rounded-hb-md px-3 font-hb-ui text-hb-label font-semibold text-c-text-2 hover:bg-c-surface-3 hover:text-c-text"
            >
              Stay on break
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setConfirm(true)}
          className="mt-2 h-10 rounded-hb-md border border-c-hairline bg-c-surface-3 px-3 font-hb-ui text-hb-label font-semibold text-c-text hover:bg-c-surface-2"
        >
          End break
        </button>
      )}
    </div>
  );
}

/* ── E-09 · odds-change mode — one placement, both sizes, above CTA ── */
const MODES = [
  { key: "higher", label: "Better prices only" },
  { key: "any", label: "Any change" },
  { key: "ask", label: "Ask every time" },
] as const;
function OddsModeLine() {
  const pref = useUI((s) => s.oddsPref);
  const setPref = useUI((s) => s.setOddsPref);
  const [open, setOpen] = useState(false);
  const active = MODES.find((m) => m.key === pref) ?? MODES[0];
  return (
    <div className="mt-1">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-full items-center justify-between rounded-hb-md px-1 font-hb-ui text-hb-body-sec text-c-text-2 transition-colors duration-(--dur-feedback) hover:text-c-text"
      >
        <span>
          Odds changes: <span className="text-c-text">{active.label}</span>
        </span>
        <span aria-hidden>{open ? "▴" : "▾"}</span>
      </button>
      {open && (
        <div className="flex gap-1 pb-1">
          {MODES.map((m) => (
            <button
              key={m.key}
              type="button"
              aria-pressed={pref === m.key}
              onClick={() => {
                setPref(m.key);
                setOpen(false);
              }}
              className={`h-10 flex-1 rounded-hb-md font-hb-ui text-hb-label font-semibold transition-colors duration-(--dur-feedback) ${
                pref === m.key
                  ? "bg-c-surface-3 text-c-text"
                  : "text-c-text-2 hover:bg-c-surface-2 hover:text-c-text"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── E-14 · the receipt — S5 stamp, truth not confetti ────────────── */
function Receipt() {
  const r = useSlip((s) => s.lastReceipt);
  const resetStatus = useSlip((s) => s.resetStatus);
  if (!r) return null;
  const many = r.bets.length > 1;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
      role="status"
      className="m-3 rounded-hb-md border border-c-hairline bg-c-surface-2 p-4"
    >
      <p className="flex items-center gap-2 font-hb-ui text-hb-h1 font-semibold text-c-text">
        <span aria-hidden className="text-c-up-text">
          ✓
        </span>
        {many ? `${r.bets.length} bets placed` : "Bet placed"}
      </p>
      <p className="mt-1 font-hb-num text-hb-odds-sm text-c-text-2">
        ref {r.bets.map((b) => b.id).join(" · ")} ·{" "}
        {r.bets
          .map((b) => `${b.odds.toFixed(2)} accepted`)
          .join(" · ")
          .slice(0, 40)}{" "}
        · {fmtStamp(r.placedAt)}
      </p>
      <div className="mt-3 space-y-1 border-t border-c-hairline pt-2.5">
        {r.bets.map((b) => (
          <div
            key={b.id}
            className="flex items-baseline justify-between gap-2 font-hb-ui text-hb-body-sec"
          >
            <span className="truncate text-c-text">
              {b.pick}
              {b.acceptedFrom && (
                <s className="ms-1 text-c-text-2">
                  {b.acceptedFrom.toFixed(2)}
                </s>
              )}
            </span>
            <span className="shrink-0 font-hb-num text-c-text-2">
              {b.odds.toFixed(2)} · {b.id}
            </span>
          </div>
        ))}
        <p className="flex items-baseline justify-between pt-1 font-hb-ui text-hb-body-sec text-c-text-2">
          <span>Stake {money(r.stake)} USDT</span>
          <span className="font-hb-num text-c-text">
            Returns {money(r.payout)}
          </span>
        </p>
      </div>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          data-on-cta
          onClick={() => {
            useUI.getState().setPanelTab("bets");
            resetStatus();
          }}
          className="h-11 flex-1 rounded-hb-md bg-c-cta font-hb-ui text-hb-label font-semibold text-c-cta-fg transition-colors duration-(--dur-feedback) hover:bg-c-cta-hi active:bg-c-cta-lo"
        >
          View in My bets
        </button>
        <button
          type="button"
          onClick={resetStatus}
          className="h-11 flex-1 rounded-hb-md border border-c-hairline bg-c-surface-3 font-hb-ui text-hb-label font-semibold text-c-text transition-colors duration-(--dur-feedback) hover:bg-c-surface-2"
        >
          Done
        </button>
      </div>
    </motion.div>
  );
}

const FAIL_COPY: Record<FailReason, string> = {
  suspended: "market suspended",
  "odds-moved": "price moved",
  funds: "balance too low for this stake",
};

/* ── E-15 · Clear all — in-place confirm + 5s undo, never a dialog ── */
function ClearAll() {
  const clear = useSlip((s) => s.clear);
  const cleared = useSlip((s) => s.cleared);
  const undo = useSlip((s) => s.undoClear);
  const drop = useSlip((s) => s.dropUndo);
  const [confirming, setConfirming] = useState(false);
  useEffect(() => {
    if (!cleared?.length) return;
    const t = setTimeout(drop, 5000);
    return () => clearTimeout(t);
  }, [cleared, drop]);
  if (cleared?.length)
    return (
      <span
        role="status"
        className="flex items-center gap-2 font-hb-ui text-hb-body-sec text-c-text-2"
      >
        Ticket cleared ·{" "}
        <button
          type="button"
          onClick={undo}
          className="font-semibold text-c-text underline decoration-dotted underline-offset-2"
        >
          Undo
        </button>
      </span>
    );
  if (confirming)
    return (
      <span className="flex items-center gap-1.5 font-hb-ui text-hb-body-sec text-c-text-2">
        Clear all?
        <button
          type="button"
          onClick={() => {
            clear();
            setConfirming(false);
          }}
          className="h-8 rounded-hb-md bg-c-surface-3 px-2 font-semibold text-c-text"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          onKeyDown={(e) => e.key === "Escape" && setConfirming(false)}
          className="h-8 rounded-hb-md px-2 font-semibold text-c-text-2 hover:text-c-text"
        >
          Keep
        </button>
      </span>
    );
  return (
    <button
      type="button"
      aria-label="Clear all selections"
      onClick={() => setConfirming(true)}
      className="h-8 rounded-hb-md px-2 font-hb-ui text-hb-body-sec text-c-text-2 transition-colors duration-(--dur-feedback) hover:text-c-text"
    >
      Clear all
    </button>
  );
}

export function BetSlipBody() {
  const selections = useSlip((s) => s.selections);
  const status = useSlip((s) => s.status);
  const failReason = useSlip((s) => s.failReason);
  const reconciled = useSlip((s) => s.reconciled);
  const place = useSlip((s) => s.place);
  const resetStatus = useSlip((s) => s.resetStatus);
  const remove = useSlip((s) => s.remove);
  const suspReasonMap = useWorld((s) => s.suspReasons);
  const offline = useUI((s) => s.offline);
  const breakUntil = useUI((s) => s.breakUntil);
  const { balance, inBets, available } = useAvailable();
  const [, setNowTick] = useState(0);
  useEffect(() => {
    if (breakUntil <= Date.now()) return;
    const iv = setInterval(() => setNowTick((n) => n + 1), 15_000);
    return () => clearInterval(iv);
  }, [breakUntil]);
  const onBreak = breakUntil > Date.now();

  const susp = selections.filter((x) => x.status === "suspended");
  const changed = selections.filter((x) => x.status === "changed");
  // suspended legs park in the ticket, excluded from totals (frame 5)
  const legs = selections.filter((x) => x.status !== "suspended");
  const totalStake = legs.reduce((a, x) => a + (parseFloat(x.stake) || 0), 0);
  const totalReturn = legs.reduce(
    (a, x) => a + (parseFloat(x.stake) || 0) * x.livePrice,
    0,
  );
  const implied =
    totalReturn > 0 ? Math.round((100 * totalStake) / totalReturn) : null;
  const anyLive = legs.some((x) => {
    const mt = matchById(x.matchId);
    return mt?.status === "live";
  });
  const anyZero = legs.some((x) => (parseFloat(x.stake) || 0) <= 0);

  // disabled-CTA reason (E-13d — the button explains itself, in order)
  const disabledReason = offline
    ? "Offline — can't place"
    : legs.length === 0
      ? susp.length > 0
        ? `Pick suspended — ${suspReasonMap[susp[0]?.marketId ?? ""] ?? "betting paused"}`
        : null
      : changed.length > 0
        ? "Odds changed — answer above"
        : anyZero || totalStake <= 0
          ? `Enter a stake — min ${MIN_STAKE.toFixed(2)} USDT`
          : totalStake > available
            ? `More than your balance (${money(available)} USDT)`
            : null;
  const armed =
    !onBreak &&
    !offline &&
    legs.length > 0 &&
    changed.length === 0 &&
    totalStake > 0 &&
    totalStake <= available;

  /* coalesced live-region: announce transitions once, never per tick */
  const [note, setNote] = useState("");
  const lastSig = useRef("");
  useEffect(() => {
    const sig = `${status}:${changed.length}`;
    if (sig === lastSig.current) return;
    lastSig.current = sig;
    if (status === "placed")
      setNote("Bet placed — reference and accepted odds shown on the receipt");
    else if (status === "failed")
      setNote(`Not placed — ${failReason ? FAIL_COPY[failReason] : ""}`);
    else if (status === "unconfirmed")
      setNote("Can't confirm the placement — check My bets");
    else if (changed.length > 0)
      setNote(
        `Odds moved on ${changed.length} selection${changed.length > 1 ? "s" : ""} — accept or remove on the card`,
      );
  }, [status, changed.length, failReason]);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <span role="status" aria-live="polite" className="sr-only">
        {note}
      </span>
      <TicketOfflineBar />
      {status === "placed" ? (
        <Receipt />
      ) : selections.length === 0 ? (
        <div className="px-4 py-10">
          <p className="font-hb-ui text-hb-body font-semibold text-c-text">
            Your ticket is empty — tap a price to start
          </p>
          <p className="mt-1 font-hb-ui text-hb-body-sec text-c-text-2">
            Singles only · decimal odds · prices tick live.
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between px-3 pb-2">
            <span className="font-hb-ui text-hb-body-sec font-semibold text-c-text">
              Singles · {selections.length} selection
              {selections.length > 1 ? "s" : ""}
            </span>
            <ClearAll />
          </div>
          <div className="min-h-0 flex-1 space-y-2 overflow-y-auto px-3 pb-3">
            <AnimatePresence mode="popLayout">
              {selections.map((sel) => (
                <LegCard key={sel.outcomeId} sel={sel} />
              ))}
            </AnimatePresence>
          </div>

          {/* consent stack: totals → delay → mode → balance → CTA */}
          <div className="border-t border-c-hairline px-3 pb-3 pt-2">
            <div className="space-y-0.5 font-hb-ui text-hb-body-sec">
              <p className="flex justify-between text-c-text-2">
                Total stake
                <span className="font-hb-num font-semibold text-c-text">
                  {money(totalStake)} USDT
                </span>
              </p>
              <p className="flex justify-between text-c-text-2">
                Returns
                <span className="font-hb-num font-semibold text-c-text">
                  {totalReturn > 0 ? `${money(totalReturn)}` : "—"}
                  {implied != null ? ` · implied ${implied}%` : ""}
                </span>
              </p>
              <p className="flex justify-between text-c-text-2">
                If it loses:
                <span className="font-hb-num text-c-text-2">
                  −{money(totalStake)} USDT
                </span>
              </p>
              {anyLive && (
                <p className="font-hb-ui text-hb-micro text-c-text-2">
                  In-play delay applies
                </p>
              )}
            </div>
            <OddsModeLine />
            <p className="mt-0.5 font-hb-ui text-hb-micro text-c-text-2">
              Balance {money(balance)} · {money(available)} available ·{" "}
              {money(inBets)} in bets USDT
            </p>

            {onBreak ? (
              <div className="mt-2">
                <BreakStrip />
              </div>
            ) : status === "unconfirmed" ? (
              /* D-19 lost response — never "untouched", never blind retry */
              <div className="mt-2 rounded-hb-md border border-c-hairline bg-c-surface-2 p-3">
                <p
                  role="alert"
                  className="font-hb-ui text-hb-body-sec font-semibold text-c-text"
                >
                  ⚠ Can&apos;t confirm — check My bets
                </p>
                <p className="mt-0.5 font-hb-ui text-hb-micro text-c-text-2">
                  {reconciled
                    ? "Not found in My bets — safe to place again."
                    : "Checking the ledger before any retry…"}
                </p>
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => useUI.getState().setPanelTab("bets")}
                    className="h-10 flex-1 rounded-hb-md bg-c-surface-3 font-hb-ui text-hb-label font-semibold text-c-text hover:bg-c-surface-2"
                  >
                    Check My bets
                  </button>
                  <button
                    type="button"
                    disabled={!reconciled || offline}
                    onClick={() => {
                      useSlip.getState().resetStatus();
                      useSlip.getState().acceptAll();
                      place();
                    }}
                    className="h-10 flex-1 rounded-hb-md bg-c-cta font-hb-ui text-hb-label font-semibold text-c-cta-fg transition-colors duration-(--dur-feedback) enabled:hover:bg-c-cta-hi disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Place at{" "}
                    {legs[0] ? legs[0].livePrice.toFixed(2) : "live odds"}
                  </button>
                </div>
              </div>
            ) : status === "failed" ? (
              /* E-13c — reason block replaces CTA, one ≤4px settle */
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: [0, -4, 3, -1, 0] }}
                transition={{ duration: 0.15 }}
                className="mt-2 rounded-hb-md border border-c-hairline bg-c-surface-2 p-3"
                role="alert"
              >
                <p className="font-hb-ui text-hb-body-sec font-semibold text-c-down">
                  ⚠ Not placed — {failReason ? FAIL_COPY[failReason] : ""}. Your
                  balance is untouched.
                </p>
                <div className="mt-2 flex gap-2">
                  {failReason === "odds-moved" && (
                    <button
                      type="button"
                      data-on-cta
                      onClick={() => {
                        useSlip.getState().resetStatus();
                        useSlip.getState().acceptAll();
                        place();
                      }}
                      className="h-10 flex-1 rounded-hb-md bg-c-cta font-hb-ui text-hb-label font-semibold text-c-cta-fg hover:bg-c-cta-hi"
                    >
                      Place at{" "}
                      {legs[0] ? legs[0].livePrice.toFixed(2) : "live odds"}
                    </button>
                  )}
                  {failReason === "suspended" && (
                    <button
                      type="button"
                      onClick={() => {
                        for (const x of susp) remove(x.outcomeId);
                        resetStatus();
                      }}
                      className="h-10 flex-1 rounded-hb-md bg-c-surface-3 font-hb-ui text-hb-label font-semibold text-c-text hover:bg-c-surface-2"
                    >
                      Remove suspended
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={resetStatus}
                    className="h-10 flex-1 rounded-hb-md border border-c-hairline font-hb-ui text-hb-label font-semibold text-c-text-2 hover:bg-c-surface-3 hover:text-c-text"
                  >
                    {failReason === "funds" ? "Edit stake" : "Back"}
                  </button>
                </div>
              </motion.div>
            ) : (
              <>
                <button
                  type="button"
                  data-on-cta={armed || undefined}
                  onClick={place}
                  disabled={!armed || status === "placing"}
                  aria-disabled={!armed}
                  aria-describedby={disabledReason ? "cta-reason" : undefined}
                  aria-label={
                    armed
                      ? `Place bet, ${money(totalStake)} USDT, returns ${money(totalReturn)} USDT`
                      : `Place bet — ${disabledReason ?? "not ready"}`
                  }
                  className={`mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-hb-md font-hb-ui text-hb-body font-semibold transition-colors duration-(--dur-feedback) ${
                    armed
                      ? "bg-c-cta text-c-cta-fg hover:bg-c-cta-hi active:bg-c-cta-lo motion-safe:active:scale-[0.98]"
                      : "cursor-not-allowed bg-c-surface-3 text-c-text-2"
                  }`}
                >
                  {status === "placing" && (
                    <motion.span
                      aria-hidden
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 0.8,
                        ease: "linear",
                      }}
                      className="size-4 rounded-full border-2 border-c-cta-fg/30 border-t-c-cta-fg"
                    />
                  )}
                  {/* E-13b: indeterminate honest pending — the ≤3s
                      bounded wait carries the honesty, never a fake bar */}
                  {status === "placing"
                    ? "Confirming…"
                    : totalStake > 0
                      ? `Place bet · ${money(totalStake)} USDT`
                      : "Place bet"}
                </button>
                {disabledReason && status !== "placing" && (
                  <p
                    id="cta-reason"
                    className="mt-1.5 text-center font-hb-ui text-hb-micro text-c-text-2"
                  >
                    {disabledReason}
                  </p>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
