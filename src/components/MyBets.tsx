import {
  CheckCircle2,
  CircleDollarSign,
  Lock,
  TrendingDown,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { matchById, useBets } from "../lib/store/bets";
import { useWorld } from "../lib/store/world";
import { TeamLogo } from "./primitives";

function NetLine({ b }: { b: import("../lib/types").Bet }) {
  if (b.result === "open" || b.result === "void") return null;
  const net = +(b.returns - b.stake).toFixed(2);
  if (b.result === "lost")
    return (
      <span className="tnum font-semibold text-text-secondary">
        −{b.stake.toFixed(2)}
      </span>
    );
  return (
    <span
      className={`tnum font-semibold ${net >= 0 ? "text-tick-up" : "text-error-300"}`}
    >
      {net >= 0 ? "+" : "−"}
      {Math.abs(net).toFixed(2)}
    </span>
  );
}

function BetCard({ b }: { b: import("../lib/types").Bet }) {
  const mt = matchById(b.matchId);
  const cashOut = useBets((s) => s.cashOut);
  const suspReason = useWorld((s) => s.suspReasons[b.marketId]);
  const [confirming, setConfirming] = useState(false);
  const open = b.result === "open";
  const co = b.cashout;
  const moved = co && co.value !== co.was;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-border-soft bg-surface-secondary p-3"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-[14px] font-semibold">{b.pick}</p>
          <p className="mt-0.5 text-[12px] text-text-tertiary">
            {b.marketName}
          </p>
          {mt && (
            <p className="mt-1 flex items-center gap-1.5 text-[12px] text-text-secondary">
              <TeamLogo team={mt.home} size={14} />
              {mt.home.short} v {mt.away.short}
              {mt.status === "live" && (
                <span className="tnum font-odds text-error-300">
                  {mt.score.home}-{mt.score.away}
                </span>
              )}
            </p>
          )}
        </div>
        <span className="tnum shrink-0 font-odds text-[15px] font-bold text-brand-400">
          @{b.odds.toFixed(2)}
        </span>
      </div>
      <div className="mt-2.5 flex items-center justify-between border-t border-border-soft pt-2.5 text-[12px]">
        <span className="text-text-secondary">
          Stake{" "}
          <span className="tnum font-semibold text-text-primary">
            {b.stake.toFixed(2)}
          </span>
        </span>
        <span className="text-text-secondary">
          {open
            ? "To return"
            : b.result === "cashedout"
              ? "Cashed out"
              : "Returned"}{" "}
          <span
            className={`tnum font-semibold ${
              b.result === "won"
                ? "text-tick-up"
                : b.result === "lost"
                  ? "text-text-secondary"
                  : "text-text-primary"
            }`}
          >
            {b.result === "lost" ? "0.00" : b.returns.toFixed(2)} USDT
          </span>
          {" · Net "}
          <NetLine b={b} />
        </span>
      </div>
      {open && co && (
        <div className="mt-2.5">
          {co.status === "available" ? (
            confirming ? (
              <div className="flex items-center gap-2">
                <p className="min-w-0 flex-1 text-[11px] leading-tight text-text-secondary">
                  Lock in{" "}
                  <span className="tnum font-odds font-semibold text-text-primary">
                    {co.value.toFixed(2)}
                  </span>{" "}
                  now?
                </p>
                <button
                  type="button"
                  onClick={() => {
                    cashOut(b.id);
                    setConfirming(false);
                  }}
                  className="btn-primary h-8 shrink-0 rounded-lg px-3 text-[12px] font-bold"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  onClick={() => setConfirming(false)}
                  className="h-8 shrink-0 rounded-lg bg-secondary-a20 px-3 text-[12px] font-semibold text-text-secondary transition-colors hover:bg-secondary-a30"
                >
                  Wait
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirming(true)}
                className="w-full rounded-lg bg-secondary-a30 py-2 text-[13px] font-semibold text-secondary-25 transition-colors hover:bg-secondary-a30/80 active:scale-[0.98]"
              >
                <span className="flex items-center justify-center gap-1.5">
                  Cash out ·{" "}
                  <span className="tnum font-odds">
                    {co.value.toFixed(2)} USDT
                  </span>
                  {moved &&
                    (co.value > co.was ? (
                      <TrendingUp
                        size={12}
                        className="text-tick-up"
                        aria-label="Value rose"
                      />
                    ) : (
                      <TrendingDown
                        size={12}
                        className="text-error-300"
                        aria-label="Value dropped"
                      />
                    ))}
                </span>
                {moved && (
                  <span className="mt-0.5 block text-[10px] font-normal text-text-tertiary">
                    was {co.was.toFixed(2)}
                  </span>
                )}
                {co.value < b.stake && (
                  <span className="mt-0.5 block text-[10px] font-normal text-text-tertiary">
                    Below stake {b.stake.toFixed(2)} — settles immediately
                  </span>
                )}
              </button>
            )
          ) : (
            <div className="suspend-in flex items-center justify-center gap-1.5 rounded-lg bg-surface-tertiary py-2 text-[13px] font-medium text-text-disabled">
              <Lock size={12} className="text-warning-400" /> Cash out suspended
              {suspReason ? ` · ${suspReason}` : ""}
            </div>
          )}
        </div>
      )}
      {!open && (
        <div
          className={`mt-2.5 flex items-center gap-1.5 text-[12px] font-medium ${
            b.result === "won"
              ? "text-tick-up"
              : b.result === "cashedout"
                ? "text-text-secondary"
                : "text-error-300"
          }`}
        >
          {b.result === "won" ? (
            <CheckCircle2 size={13} />
          ) : b.result === "cashedout" ? (
            <CircleDollarSign size={13} />
          ) : (
            <XCircle size={13} />
          )}
          {b.settledNote}
        </div>
      )}
    </motion.div>
  );
}

export function MyBetsBody() {
  const bets = useBets((s) => s.bets);
  const open = bets.filter((b) => b.result === "open");
  const settled = bets.filter((b) => b.result !== "open");
  const coAvail = open.filter((b) => b.cashout?.status === "available");
  const [tab, setTab] = useState<"open" | "settled">("open");
  const shown = tab === "open" ? open : settled;
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-3 pb-4">
      <div
        className="sticky top-0 z-10 -mx-3 flex gap-1 bg-surface-primary px-3 pb-2 pt-2"
        role="tablist"
        aria-label="Bet filter"
      >
        {(
          [
            ["open", `Open · ${open.length}`],
            ["settled", `Settled · ${settled.length}`],
          ] as const
        ).map(([k, label]) => (
          <button
            key={k}
            type="button"
            role="tab"
            aria-selected={tab === k}
            onClick={() => setTab(k)}
            className={`h-8 flex-1 rounded-lg text-[12.5px] font-semibold transition-colors ${
              tab === k
                ? "bg-secondary-a20 text-brand-300"
                : "text-text-tertiary hover:text-text-secondary"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="space-y-2 pt-1">
        {shown.length === 0 && (
          <p className="rounded-lg border border-dashed border-border-very-strong px-3 py-5 text-center text-[12px] text-text-tertiary">
            {tab === "open"
              ? "No open bets — placed bets appear here live."
              : "Nothing settled yet — results land here."}
          </p>
        )}
        {shown.map((b) => (
          <BetCard key={b.id} b={b} />
        ))}
      </div>
      {tab === "open" && coAvail.length > 0 && (
        <p className="px-1 pt-3 text-[11px] text-text-tertiary">
          Cash-out values track live odds — they can fall as well as rise.
          Sample data.
        </p>
      )}
    </div>
  );
}
