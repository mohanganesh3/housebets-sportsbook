import { Bell, Lock, Star, TrendingDown, TrendingUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useOdds } from "../lib/store/odds";
import { useSlip } from "../lib/store/slip";
import { useUI } from "../lib/store/ui";
import type { Market, Outcome, Team } from "../lib/types";
import { TeamCrest } from "./Crest";
import { Hubie } from "./Hubie";

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
  const clock =
    period === "HT" || period === "FT"
      ? period
      : period === "1st half" && (minute ?? 0) > 45
        ? `45+${(minute ?? 45) - 45}′`
        : period === "2nd half" && (minute ?? 0) > 90
          ? `90+${(minute ?? 90) - 90}′`
          : `${minute ?? ""}′`;
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="live-dot size-1.5 rounded-full bg-error-400 shadow-[0_0_6px_#f41f50]" />
      <span className="tnum font-odds text-[13px] font-semibold text-error-300">
        {clock}
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
        e.preventDefault();
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

export function BellButton({ id, size = 15 }: { id: string; size?: number }) {
  const on = useUI((s) => s.reminds.has(id));
  const toggle = useUI((s) => s.toggleRemind);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        toggle(id);
      }}
      aria-pressed={on}
      aria-label={on ? "Remove kickoff reminder" : "Remind me at kickoff"}
      title={on ? "Reminder set" : "Remind me at kickoff"}
      className="-m-1.5 grid size-10 place-items-center rounded-md text-text-tertiary transition-colors hover:text-brand-300"
    >
      <Bell
        size={size}
        className={on ? "fill-brand-400 text-brand-400" : ""}
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
  tag: tagProp,
  named,
}: {
  outcome: Outcome;
  market: Market;
  compact?: boolean;
  tag?: string;
  // wireframe layout: full pick name left, price right — for ≤3-outcome markets
  named?: boolean;
}) {
  const override = useOdds((s) => s.overrides[outcome.id]);
  const flash = useOdds((s) => s.flashes[outcome.id]);
  // medium display name for cramped named cells: "Brighton & Hove Albion" →
  // "Brighton", applied per "/" segment so DC names stay readable too
  const pickName = outcome.name
    .split("/")
    .map((part) => (part.includes(" & ") ? part.split(" & ")[0] : part))
    .join("/");
  const selected = useSlip((s) =>
    s.selections.some((x) => x.outcomeId === outcome.id),
  );
  const toggle = useSlip((s) => s.toggle);
  const suspended =
    market.status === "suspended" || outcome.status === "suspended";
  const price = override ?? outcome.price;
  // every price carries a name — 1X2/DC use industry labels, others get a
  // shortened pick name computed by the caller
  const tag =
    tagProp ??
    (market.key === "h2h"
      ? (["1", "X", "2"] as const)[market.outcomes.indexOf(outcome)]
      : market.key === "dc"
        ? (["1X", "12", "X2"] as const)[market.outcomes.indexOf(outcome)]
        : undefined);

  return (
    <motion.button
      type="button"
      onClick={() => !suspended && toggle(outcome.id)}
      disabled={suspended}
      whileTap={suspended ? undefined : { scale: 0.94 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      aria-pressed={selected}
      aria-label={
        named
          ? `${pickName} ${fmt(price)}${suspended ? " · suspended" : ""}`
          : `${tag ? `${tag} ` : ""}${fmt(price)} · ${outcome.name}${suspended ? " · suspended" : ""}`
      }
      className={[
        "relative flex h-full min-h-10 items-center gap-1.5 rounded-[10px] font-odds text-[15px] font-semibold tnum transition-colors duration-150",
        named
          ? "min-h-12 flex-col items-start justify-center gap-0.5"
          : "justify-center",
        compact ? "min-w-0 px-1 py-2 sm:px-2.5" : "min-w-0 px-3 py-2.5",
        suspended
          ? "suspend-in cursor-not-allowed bg-surface-secondary text-text-disabled"
          : selected
            ? "bg-interactive-primary text-text-inverse shadow-[0_0_14px_#c4f4f133]"
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
          {named && (
            <span
              className={`min-w-0 max-w-full truncate font-sans text-[11px] font-medium leading-tight ${selected ? "text-text-inverse/75" : "text-text-tertiary"}`}
            >
              {pickName}{" "}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            {!named && tag && (
              <span
                className={`font-sans text-[10px] font-bold ${selected ? "text-text-inverse/60" : "text-text-tertiary"}`}
              >
                {tag}{" "}
              </span>
            )}
            <motion.span
              key={price}
              initial={
                flash ? { y: flash.dir === "up" ? 5 : -5, opacity: 0.3 } : false
              }
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
            >
              {fmt(price)}
            </motion.span>
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
          </span>
        </>
      )}
    </motion.button>
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
      <div className="grid size-14 place-items-center">
        {icon ?? <Hubie size={52} />}
      </div>
      <p className="text-[15px] font-semibold text-text-primary">{title}</p>
      {hint && (
        <p className="max-w-72 text-[13px] text-text-secondary">{hint}</p>
      )}
      {action}
    </div>
  );
}
