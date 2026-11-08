import { House, Lock, Star, TrendingDown, TrendingUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useOdds } from "../lib/store/odds";
import { useSlip } from "../lib/store/slip";
import { useUI } from "../lib/store/ui";
import type { Market, Outcome, Team } from "../lib/types";
import { TeamCrest } from "./Crest";

export function TeamLogo({ team, size = 28 }: { team: Team; size?: number }) {
  return <TeamCrest team={team} size={size} />;
}

export function LiveBadge({
  minute,
  period,
}: {
  minute: number | null;
  period: string | null;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="live-dot size-1.5 rounded-full bg-error-400 shadow-[0_0_6px_#f41f50]" />
      <span className="tnum font-odds text-[13px] font-semibold text-error-300">
        {period === "HT" ? "HT" : `${minute ?? ""}′`}
      </span>
    </span>
  );
}

export function FollowStar({ id, size = 16 }: { id: string; size?: number }) {
  const on = useUI((s) => s.follows.has(id));
  const toggle = useUI((s) => s.toggleFollow);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        toggle(id);
      }}
      aria-pressed={on}
      aria-label={on ? "Unfollow" : "Follow"}
      className="-m-1.5 grid size-10 place-items-center rounded-md text-text-tertiary transition-colors hover:text-gold-500"
    >
      <Star
        size={size}
        className={on ? "fill-gold-500 text-gold-500" : ""}
        strokeWidth={on ? 0 : 1.8}
      />
    </button>
  );
}

const fmt = (n: number) => n.toFixed(2);

export function OddsCell({
  outcome,
  market,
  compact,
}: {
  outcome: Outcome;
  market: Market;
  compact?: boolean;
}) {
  const override = useOdds((s) => s.overrides[outcome.id]);
  const flash = useOdds((s) => s.flashes[outcome.id]);
  const selected = useSlip((s) =>
    s.selections.some((x) => x.outcomeId === outcome.id),
  );
  const toggle = useSlip((s) => s.toggle);
  const suspended =
    market.status === "suspended" || outcome.status === "suspended";
  const price = override ?? outcome.price;
  // 1X2 cells carry the industry label so every price has a name
  const tag =
    market.key === "h2h"
      ? (["1", "X", "2"] as const)[market.outcomes.indexOf(outcome)]
      : undefined;

  return (
    <motion.button
      type="button"
      onClick={() => !suspended && toggle(outcome.id)}
      disabled={suspended}
      whileTap={suspended ? undefined : { scale: 0.94 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      aria-pressed={selected}
      aria-label={`${outcome.name} at ${fmt(price)}${suspended ? " — suspended" : ""}`}
      className={[
        "relative flex h-full min-h-10 items-center justify-center gap-1.5 rounded-[10px] font-odds text-[15px] font-semibold tnum transition-colors duration-150",
        compact ? "min-w-0 px-1 py-2 sm:px-2.5" : "min-w-0 px-3 py-2.5",
        suspended
          ? "suspend-in cursor-not-allowed bg-surface-secondary text-text-disabled"
          : selected
            ? "bg-brand-500 text-text-inverse shadow-[0_0_18px_#02f8f844,inset_0_0_0_1px_#02f8f8]"
            : "bg-secondary-a15 text-text-primary hover:bg-secondary-a30 active:bg-secondary-a20",
        flash?.dir === "up" && !selected && !suspended ? "flash-up" : "",
        flash?.dir === "down" && !selected && !suspended ? "flash-down" : "",
      ].join(" ")}
      key={flash?.key}
    >
      {suspended ? (
        <Lock size={15} className="text-warning-400" aria-label="Suspended" />
      ) : (
        <>
          {tag && (
            <span
              className={`font-sans text-[10px] font-bold ${selected ? "text-text-inverse/70" : "text-text-tertiary"}`}
            >
              {tag}
            </span>
          )}
          <span>{fmt(price)}</span>
          <AnimatePresence>
            {flash?.dir === "up" && (
              <motion.span
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <TrendingUp
                  size={13}
                  className={selected ? "text-text-inverse" : "text-tick-up"}
                  aria-hidden
                />
              </motion.span>
            )}
            {flash?.dir === "down" && (
              <motion.span
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <TrendingDown
                  size={13}
                  className={
                    selected ? "text-text-inverse" : "text-tick-down-text"
                  }
                  aria-hidden
                />
              </motion.span>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.button>
  );
}

export function SkeletonRows({ n = 6 }: { n?: number }) {
  return (
    <div className="space-y-2.5" role="status" aria-busy aria-label="Loading">
      {Array.from({ length: n }).map((_, i) => (
        <div
          key={i}
          className="skeleton h-[52px] rounded-xl"
          style={{ animationDelay: `${i * 80}ms` }}
        />
      ))}
    </div>
  );
}

export function EmptyState({
  title,
  hint,
  action,
  icon,
}: {
  title: string;
  hint?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border-very-strong px-6 py-12 text-center">
      <div className="grid size-12 place-items-center rounded-full bg-surface-secondary text-text-tertiary">
        {icon ?? <House size={20} />}
      </div>
      <p className="text-[15px] font-semibold text-text-primary">{title}</p>
      {hint && (
        <p className="max-w-72 text-[13px] text-text-secondary">{hint}</p>
      )}
      {action}
    </div>
  );
}
