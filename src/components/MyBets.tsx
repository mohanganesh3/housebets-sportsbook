import { CheckCircle2, Lock, XCircle } from "lucide-react";
import { motion } from "motion/react";
import { matchById, useBets } from "../lib/store/bets";
import { TeamLogo } from "./primitives";

function BetCard({ b }: { b: import("../lib/types").Bet }) {
  const mt = matchById(b.matchId);
  const cashOut = useBets((s) => s.cashOut);
  const open = b.result === "open";
  const co = b.cashout;
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
          {open ? "To return" : "Returned"}{" "}
          <span
            className={`tnum font-semibold ${b.result === "won" ? "text-tick-up" : "text-text-primary"}`}
          >
            {b.returns.toFixed(2)} USDT
          </span>
        </span>
      </div>
      {open && co && (
        <div className="mt-2.5">
          {co.status === "available" ? (
            <button
              type="button"
              onClick={() => cashOut(b.id)}
              className="w-full rounded-lg bg-secondary-a30 py-2 text-[13px] font-semibold text-secondary-25 transition-colors hover:bg-secondary-a30/80 active:scale-[0.98]"
            >
              Cash out ·{" "}
              <span className="tnum font-odds">{co.value.toFixed(2)} USDT</span>
            </button>
          ) : (
            <div className="suspend-in flex items-center justify-center gap-1.5 rounded-lg bg-surface-tertiary py-2 text-[13px] font-medium text-text-disabled">
              <Lock size={12} className="text-warning-400" /> Cash out suspended
            </div>
          )}
        </div>
      )}
      {!open && (
        <div
          className={`mt-2.5 flex items-center gap-1.5 text-[12px] font-medium ${b.result === "won" ? "text-tick-up" : "text-error-300"}`}
        >
          {b.result === "won" ? (
            <CheckCircle2 size={13} />
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
  return (
    <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-3 pb-4">
      <section>
        <h3 className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-text-tertiary">
          Open · {open.length}
        </h3>
        <div className="space-y-2">
          {open.length === 0 && (
            <p className="rounded-lg border border-dashed border-border-very-strong px-3 py-5 text-center text-[12px] text-text-tertiary">
              No open bets — placed bets appear here live.
            </p>
          )}
          {open.map((b) => (
            <BetCard key={b.id} b={b} />
          ))}
        </div>
      </section>
      {coAvail.length > 0 && (
        <p className="px-1 text-[11px] text-text-tertiary">
          Cash-out values update with live odds. Values are sample data.
        </p>
      )}
      <section>
        <h3 className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-text-tertiary">
          Settled · {settled.length}
        </h3>
        <div className="space-y-2">
          {settled.map((b) => (
            <BetCard key={b.id} b={b} />
          ))}
        </div>
      </section>
    </div>
  );
}
