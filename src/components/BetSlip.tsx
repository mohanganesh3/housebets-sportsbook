import {
  Lock,
  Trash2,
  TrendingDown,
  TrendingUp,
  TriangleAlert,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { matchById } from "../lib/seed";
import { useBets } from "../lib/store/bets";
import { useSlip } from "../lib/store/slip";
import { useUI } from "../lib/store/ui";
import { useWorld } from "../lib/store/world";
import { LiveBadge, TeamLogo } from "./primitives";

const QUICK_STAKES = [1, 10, 50, 100];
// exported for the panel-footer session line — one session clock,
// identical line on every surface (DATA-CANON invariant 2)
export const SESSION_START = Date.now();

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

const USDT = (
  <span className="tnum inline-flex items-center gap-1 text-[11px] font-semibold text-usdt">
    <span className="grid size-3.5 place-items-center rounded-full bg-usdt text-[8px] font-bold text-white">
      T
    </span>
    USDT
  </span>
);

function SlipItem({
  sel,
  conflict,
}: {
  sel: import("../lib/types").SlipSelection;
  conflict?: boolean;
}) {
  const { remove, setStake, accept } = useSlip();
  const mt = matchById(sel.matchId);
  const suspReason = useWorld((s) => s.suspReasons[sel.marketId]);
  const changed = sel.status === "changed";
  const susp = sel.status === "suspended";
  const diff = sel.livePrice - sel.priceAtPick;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 40, transition: { duration: 0.18 } }}
      className={`relative overflow-hidden rounded-xl border p-3 transition-colors ${
        susp
          ? "suspend-in border-warning-a40 bg-warning-a15/40"
          : changed
            ? "border-secondary-400/60 bg-secondary-a15"
            : "border-border-soft bg-surface-secondary"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-[12px] text-text-tertiary">
            {mt?.status === "live" && (
              <LiveBadge minute={mt.minute} period={mt.period} />
            )}
            <span className="truncate">{sel.marketName}</span>
          </div>
          <p className="mt-0.5 truncate text-[14px] font-semibold text-text-primary">
            {sel.pick}
          </p>
          <p className="mt-0.5 flex items-center gap-1.5 truncate text-[12px] text-text-secondary">
            {mt && <TeamLogo team={mt.home} size={14} />}
            {mt ? `${mt.home.short} v ${mt.away.short}` : ""}
          </p>
          {conflict && (
            <p className="mt-0.5 text-[10.5px] font-medium text-warning-400">
              Two picks in this market · they compete as singles
            </p>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <span
            className={`font-odds text-[15px] font-bold tnum ${susp ? "text-text-disabled" : changed ? (diff > 0 ? "text-tick-up" : "text-tick-down-text") : "text-brand-400"}`}
          >
            {sel.livePrice.toFixed(2)}
          </span>
          <button
            type="button"
            onClick={() => remove(sel.outcomeId)}
            aria-label="Remove selection"
            className="grid size-6 place-items-center rounded-md text-text-tertiary transition-colors hover:bg-surface-tertiary hover:text-error-300"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {susp && (
        <div className="mt-2 flex items-center gap-2 rounded-lg bg-warning-a15 px-2.5 py-2 text-[12px] font-medium text-warning-400">
          <Lock size={13} /> Selection suspended
          {suspReason ? ` · ${suspReason}` : " · waiting for market to reopen"}
        </div>
      )}
      {changed && !susp && (
        <div className="mt-2 flex items-center justify-between gap-2 rounded-lg bg-secondary-a20 px-2.5 py-2">
          <span className="flex items-center gap-1 text-[12px] text-text-secondary">
            Odds {diff > 0 ? "rose" : "dropped"} from{" "}
            <span className="tnum line-through">
              {sel.priceAtPick.toFixed(2)}
            </span>
            {diff > 0 ? (
              <TrendingUp size={12} className="text-tick-up" aria-hidden />
            ) : (
              <TrendingDown
                size={12}
                className="text-tick-down-text"
                aria-hidden
              />
            )}
          </span>
          <button
            type="button"
            onClick={() => accept(sel.outcomeId)}
            className="btn-primary rounded-md px-2.5 py-1 text-[12px] font-bold"
          >
            Accept {sel.livePrice.toFixed(2)}
          </button>
        </div>
      )}

      <div className="mt-2.5 flex items-center gap-2">
        <div
          className={`flex h-9 flex-1 items-center rounded-lg border px-2.5 transition-colors ${susp ? "border-border-soft opacity-50" : "border-border-very-strong focus-within:border-border-focus"}`}
        >
          <input
            value={sel.stake}
            onChange={(e) =>
              setStake(
                sel.outcomeId,
                e.target.value
                  .replace(/[^0-9.]/g, "")
                  .replace(/(\..*)\./g, "$1"),
              )
            }
            placeholder="0.00"
            inputMode="decimal"
            disabled={susp}
            aria-label={`Stake for ${sel.pick}`}
            className="tnum w-full bg-transparent font-odds text-[14px] font-semibold outline-none placeholder:text-text-disabled"
          />
          {USDT}
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-wide text-text-tertiary">
            Returns
          </div>
          <div
            className="tnum font-odds text-[13px] font-semibold text-text-primary"
            title={`≈ ${(100 / sel.livePrice).toFixed(0)}% implied`}
          >
            {((parseFloat(sel.stake) || 0) * sel.livePrice).toFixed(2)}
          </div>
        </div>
      </div>
      {!susp && (
        <div className="mt-1.5 flex gap-1.5">
          {QUICK_STAKES.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() =>
                setStake(
                  sel.outcomeId,
                  String(+((parseFloat(sel.stake) || 0) + q).toFixed(2)),
                )
              }
              className={`h-7 flex-1 rounded-md font-odds text-[11px] font-semibold transition-colors ${
                parseFloat(sel.stake) === q
                  ? "bg-brand-500/25 text-brand-300 ring-1 ring-brand-500/50"
                  : q === 50
                    ? "bg-secondary-a20 text-text-secondary ring-1 ring-secondary-a30 hover:bg-secondary-a30 hover:text-text-primary"
                    : "bg-secondary-a15 text-text-secondary hover:bg-secondary-a30 hover:text-text-primary"
              }`}
            >
              {q}
            </button>
          ))}
        </div>
      )}
      {changed && (
        <span className="sr-only">Odds changed, requires acceptance</span>
      )}
    </motion.div>
  );
}

export function BetSlipBody() {
  const {
    selections,
    status,
    failReason,
    lastReceipt,
    clear,
    acceptAll,
    place,
    resetStatus,
    placingUntil,
  } = useSlip();
  const toast = useUI((s) => s.toast);
  const oddsPref = useUI((s) => s.oddsPref);
  const balance = useUI((s) => s.balance);
  const netPL = useBets((s) =>
    s.bets.reduce((a, b) => {
      if (b.result === "won" || b.result === "cashedout")
        return a + b.returns - b.stake;
      if (b.result === "lost") return a - b.stake;
      return a;
    }, 0),
  );
  const sessionMins = Math.max(
    1,
    Math.floor((Date.now() - SESSION_START) / 60_000),
  );
  const breakUntil = useUI((s) => s.breakUntil);
  // tick so the button unlocks itself the moment the break expires
  const [, setNowTick] = useState(0);
  useEffect(() => {
    if (breakUntil <= Date.now()) return;
    const iv = setInterval(() => setNowTick((n) => n + 1), 15_000);
    return () => clearInterval(iv);
  }, [breakUntil]);
  const onBreak = breakUntil > Date.now();
  const changed = selections.filter((s) => s.status === "changed");
  const suspended = selections.filter((s) => s.status === "suspended");
  const totalStake = selections.reduce(
    (a, s) => a + (parseFloat(s.stake) || 0),
    0,
  );
  const totalReturn = selections.reduce(
    (a, s) => a + (parseFloat(s.stake) || 0) * s.livePrice,
    0,
  );
  const ready = selections.length > 0 && changed.length === 0 && totalStake > 0;

  if (status === "placed")
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-3 px-4 py-10 text-center"
      >
        <motion.svg viewBox="0 0 52 52" className="size-16">
          <motion.circle
            cx="26"
            cy="26"
            r="24"
            fill="none"
            stroke="#47d496"
            strokeWidth="2.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.45 }}
          />
          <motion.path
            d="M15 27l7 7 15-15"
            fill="none"
            stroke="#47d496"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3, delay: 0.35 }}
          />
        </motion.svg>
        <p className="text-[16px] font-bold">Bet placed</p>
        <p className="text-[13px] text-text-secondary">
          {lastReceipt?.bets.length ?? 0} single
          {(lastReceipt?.bets.length ?? 0) > 1 ? "s" : ""} ·{" "}
          {(lastReceipt?.stake ?? 0).toFixed(2)} USDT staked
        </p>
        {/* receipt: every accepted leg, priced and referenced */}
        <div className="w-full max-w-72 space-y-1.5 rounded-xl border border-border-soft bg-surface-secondary p-2.5 text-left">
          {lastReceipt?.bets.map((b) => (
            <div
              key={b.id}
              className="flex items-baseline justify-between gap-2 text-[11.5px]"
            >
              <span className="truncate text-text-secondary">
                {b.pick}{" "}
                <span className="text-text-tertiary">
                  @{b.odds.toFixed(2)}
                  {b.acceptedFrom && (
                    <s className="ml-1">{b.acceptedFrom.toFixed(2)}</s>
                  )}
                </span>
              </span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(b.id).catch(() => {});
                  toast(`Copied ${b.id}`, "info");
                }}
                title="Copy bet ref"
                className="tnum shrink-0 font-odds text-[10px] text-text-tertiary transition-colors hover:text-brand-300"
              >
                {b.id}
              </button>
            </div>
          ))}
          <p className="border-t border-border-soft pt-1.5 text-[10px] text-text-tertiary">
            Accepted at live odds · payout{" "}
            {(lastReceipt?.payout ?? 0).toFixed(2)} USDT
          </p>
        </div>
        <div className="mt-1 flex gap-2">
          <button
            type="button"
            onClick={() => {
              resetStatus();
              clear();
            }}
            className="rounded-lg bg-secondary-a30 px-4 py-2 text-[13px] font-semibold transition-colors hover:bg-secondary-a30/70"
          >
            Keep betting
          </button>
          <button
            type="button"
            onClick={() => {
              useUI.getState().setPanelTab("bets");
              resetStatus();
              clear();
            }}
            className="btn-primary rounded-lg px-4 py-2 text-[13px] font-bold"
          >
            View my bets
          </button>
        </div>
      </motion.div>
    );

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {selections.length === 0 ? (
        <div className="flex flex-col items-center gap-2.5 px-4 py-10 text-center">
          <HouseGlyph className="text-brand-300/70" size={38} />
          <p className="text-[14px] font-semibold">Your slip is empty</p>
          <p className="max-w-56 text-[12px] leading-relaxed text-text-tertiary">
            The house is patient. Tap any odds cell to add a selection — singles
            only, decimal odds.
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between px-3 pb-1.5">
            <span className="text-[12px] font-medium text-text-secondary">
              {selections.length} selection{selections.length > 1 ? "s" : ""} ·
              Singles
            </span>
            <button
              type="button"
              onClick={clear}
              className="flex items-center gap-1 rounded-md px-2 py-1 text-[12px] text-text-tertiary transition-colors hover:text-error-300"
            >
              <Trash2 size={12} /> Clear
            </button>
          </div>
          <div className="flex items-center gap-1.5 px-3 pb-2">
            <span className="text-[10.5px] text-text-tertiary">
              Odds moves:
            </span>
            <div className="flex rounded-md bg-secondary-a15 p-0.5">
              {(
                [
                  ["ask", "Ask"],
                  ["higher", "Higher only"],
                  ["any", "Any"],
                ] as const
              ).map(([v, label]) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => useUI.getState().setOddsPref(v)}
                  className={`rounded px-1.5 py-0.5 text-[10.5px] font-medium transition-colors ${
                    oddsPref === v
                      ? "bg-brand-500/25 text-brand-300"
                      : "text-text-tertiary hover:text-text-secondary"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          {changed.length > 0 && (
            <button
              type="button"
              onClick={acceptAll}
              className="mx-3 mb-2 flex items-center justify-center gap-2 rounded-lg bg-secondary-a30 px-3 py-2.5 text-[13px] font-semibold text-secondary-25 transition-colors hover:bg-secondary-a30/80"
            >
              <TriangleAlert size={14} className="text-warning-400" />
              Odds changed on {changed.length} selection
              {changed.length > 1 ? "s" : ""} · Accept all
            </button>
          )}
          <div className="min-h-0 flex-1 space-y-2 overflow-y-auto px-3 pb-3">
            <AnimatePresence mode="popLayout">
              {selections.map((s) => (
                <SlipItem
                  key={s.outcomeId}
                  sel={s}
                  conflict={
                    selections.filter((x) => x.marketId === s.marketId).length >
                    1
                  }
                />
              ))}
            </AnimatePresence>
          </div>
          <div className="border-t border-border-soft bg-surface-primary/80 px-3 pb-3 pt-2.5 backdrop-blur">
            <div className="mb-1 flex items-center justify-between text-[13px]">
              <span className="text-text-secondary">
                Total stake{" "}
                <span className="tnum font-odds font-semibold text-text-primary">
                  {totalStake.toFixed(2)}
                </span>
              </span>
              <span className="text-text-secondary">
                Payout{" "}
                <span className="tnum font-odds font-semibold text-brand-400">
                  {totalReturn.toFixed(2)}
                </span>
              </span>
            </div>
            {totalStake > 0 && (
              <div className="mb-2 flex items-center justify-between text-[11px]">
                <span className="text-text-tertiary">
                  Profit if it lands{" "}
                  <span className="tnum text-text-secondary">
                    +{(totalReturn - totalStake).toFixed(2)}
                  </span>
                </span>
                <span className="text-text-tertiary">
                  Balance after bet{" "}
                  <span
                    className={`tnum ${totalStake > balance ? "font-bold text-error-300" : "text-text-secondary"}`}
                  >
                    {(balance - totalStake).toFixed(2)}
                  </span>
                </span>
              </div>
            )}
            {totalStake > balance && (
              <p className="mb-2 flex items-center justify-center gap-1.5 text-[11.5px] font-semibold text-error-300">
                <TriangleAlert size={12} /> Stake exceeds balance · reduce it or
                deposit
              </p>
            )}
            {suspended.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  for (const x of suspended)
                    useSlip.getState().remove(x.outcomeId);
                  toast("Suspended selection removed", "info");
                }}
                className="mb-2 w-full rounded-lg border border-warning-a40 bg-warning-a15/60 py-1.5 text-[12px] font-semibold text-warning-400 transition-colors hover:bg-warning-a15"
              >
                Remove suspended · keep the rest
              </button>
            )}
            <motion.button
              type="button"
              whileTap={ready ? { scale: 0.97 } : undefined}
              onClick={place}
              disabled={
                !ready ||
                suspended.length > 0 ||
                status === "placing" ||
                onBreak
              }
              className={`relative flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-xl text-[14px] font-bold transition-colors ${
                status === "failed"
                  ? "fail-shake bg-error-500 text-white"
                  : onBreak
                    ? "cursor-not-allowed bg-surface-tertiary text-text-disabled"
                    : suspended.length > 0
                      ? "cursor-not-allowed bg-warning-a15 text-warning-400"
                      : ready
                        ? "btn-primary shadow-[0_0_20px_#c4f4f12e]"
                        : "cursor-not-allowed bg-surface-tertiary text-text-disabled"
              }`}
            >
              {status === "placing" && (
                <motion.span
                  className="absolute inset-y-0 left-0 bg-white/15"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: Math.max(
                      0.3,
                      ((placingUntil ?? 0) - Date.now()) / 1000,
                    ),
                    ease: "linear",
                  }}
                  style={{ transformOrigin: "left" }}
                  aria-hidden
                />
              )}
              {status === "placing" ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.8,
                      ease: "linear",
                    }}
                    className="size-4 rounded-full border-2 border-text-inverse/30 border-t-text-inverse"
                  />{" "}
                  Confirming at live odds…
                </>
              ) : status === "failed" ? (
                "Tap to retry"
              ) : onBreak ? (
                `On a break · back ${new Date(breakUntil).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
              ) : suspended.length > 0 ? (
                `${suspended.length} suspended · remove it or wait for markets`
              ) : (
                "Place bet"
              )}
            </motion.button>
            {status === "failed" && (
              <p className="mt-2 flex items-center justify-center gap-1.5 text-[12px] text-error-300">
                <TriangleAlert size={12} />
                {failReason === "suspended"
                  ? "Market suspended while confirming · nothing was placed"
                  : failReason === "odds-moved"
                    ? "Odds moved during confirmation · review and retry"
                    : failReason === "funds"
                      ? "Not enough balance · reduce the stake"
                      : "Placement failed · your balance is unchanged"}
              </p>
            )}
            {changed.length > 0 && oddsPref === "ask" && (
              <p className="mt-2 text-center text-[11px] text-warning-400">
                Accept the new odds before placing
              </p>
            )}
            <p className="mt-2 text-center text-[10.5px] text-text-tertiary">
              Session {sessionMins} min · All-time net {netPL >= 0 ? "+" : "−"}
              {Math.abs(netPL).toFixed(2)} USDT ·{" "}
              <button
                type="button"
                onClick={() =>
                  onBreak
                    ? useUI.getState().endBreak()
                    : useUI.getState().takeBreak(10)
                }
                className="underline decoration-dotted underline-offset-2 hover:text-text-secondary"
              >
                {onBreak ? "End break early" : "Take a break"}
              </button>
            </p>
          </div>
        </>
      )}
    </div>
  );
}
