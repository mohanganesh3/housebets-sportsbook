import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Lock, Volleyball } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import {
  FollowStar,
  LiveBadge,
  OddsCell,
  TeamLogo,
} from "../components/primitives";
import { compById, matchById } from "../lib/seed";
import { useWorld } from "../lib/store/world";
import type { Market, MarketGroupKey } from "../lib/types";

export const Route = createFileRoute("/match/$matchId")({
  component: MatchPage,
});

const GROUPS: { key: MarketGroupKey | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "popular", label: "Popular" },
  { key: "goalscorers", label: "Goalscorers" },
  { key: "goals", label: "Goals" },
  { key: "players", label: "Players" },
  { key: "halves", label: "Halves" },
  { key: "handicaps", label: "Handicaps" },
  { key: "corners", label: "Corners & cards" },
  { key: "minutes", label: "Minutes" },
  { key: "specials", label: "Specials" },
];

function MarketCard({ market }: { market: Market }) {
  const susp = market.status === "suspended";
  const cols = market.outcomes.length > 4 ? 2 : market.outcomes.length;
  return (
    <section
      className={`overflow-hidden rounded-xl border transition-colors ${susp ? "border-warning-a40" : "border-border-soft"} bg-surface-primary`}
    >
      <header
        className={`flex items-center justify-between px-3.5 py-2.5 ${susp ? "bg-warning-a15/50" : "bg-surface-secondary/50"}`}
      >
        <h3 className="text-[13px] font-semibold text-text-primary">
          {market.name}
        </h3>
        {susp && (
          <span className="suspend-in flex items-center gap-1.5 rounded-md bg-warning-a15 px-2 py-1 text-[11px] font-bold text-warning-400">
            <Lock size={11} /> SUSPENDED
          </span>
        )}
      </header>
      <div
        className={`grid gap-1.5 p-2 ${cols === 2 ? "grid-cols-2" : cols === 3 ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-4"}`}
      >
        {market.outcomes.map((o) => (
          <div key={o.id} className="flex min-w-0 flex-col gap-1">
            {market.outcomes.length > 3 && (
              <span
                className="truncate px-1 text-[11px] text-text-tertiary"
                title={o.name}
              >
                {o.name}
              </span>
            )}
            <OddsCell outcome={o} market={market} />
          </div>
        ))}
      </div>
    </section>
  );
}

function MatchPage() {
  const { matchId } = Route.useParams();
  const mt = useWorld((s) => s.matches.find((x) => x.id === matchId));
  const goalFlash = useWorld((s) => s.goalFlashes[matchId]);
  const [group, setGroup] = useState<(typeof GROUPS)[number]["key"]>("all");
  const allMatches = useWorld((s) => s.matches);
  const match = mt ?? matchById(matchId);
  const comp = match ? compById(match.competitionId) : null;
  const related = useMemo(
    () =>
      allMatches
        .filter(
          (x) => x.id !== matchId && x.competitionId === match?.competitionId,
        )
        .slice(0, 3),
    [allMatches, matchId, match?.competitionId],
  );

  const markets = useMemo(() => {
    if (!match) return [];
    const list =
      group === "all"
        ? match.markets
        : match.markets.filter((m) => m.group === group);
    return [...list].sort((a, b) =>
      a.popular === b.popular ? 0 : a.popular ? -1 : 1,
    );
  }, [match, group]);

  if (!match || !comp) {
    return (
      <div className="mx-auto max-w-[860px] px-4 py-20 text-center">
        <p className="text-[16px] font-semibold">Match not found</p>
        <Link
          to="/"
          className="mt-3 inline-block rounded-lg bg-secondary-a30 px-4 py-2 text-[13px] font-semibold"
        >
          Back to sports
        </Link>
      </div>
    );
  }

  const live = match.status === "live";

  return (
    <div className="mx-auto max-w-[860px] px-3 pt-3 lg:px-4">
      {/* Breadcrumb */}
      <nav
        className="mb-3 flex items-center gap-1.5 px-1 text-[12px] text-text-tertiary"
        aria-label="Breadcrumb"
      >
        <Link
          to="/"
          className="flex items-center gap-1 rounded-md py-0.5 pr-1 hover:text-text-primary"
        >
          <ChevronLeft size={14} /> Sports
        </Link>
        <ChevronRight size={12} />
        <Link to="/football" className="hover:text-text-primary">
          {comp.country}
        </Link>
        <ChevronRight size={12} />
        <span className="text-text-secondary">{comp.name}</span>
      </nav>

      {/* Scoreboard header */}
      <motion.header
        layout
        className={`relative overflow-hidden rounded-2xl border border-border-soft bg-gradient-to-b from-surface-secondary to-surface-primary ${goalFlash ? "flash-score" : ""}`}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent" />
        <div className="flex items-center justify-between px-4 pt-3.5">
          <span className="text-[12px] font-medium text-text-tertiary">
            {comp.name} · {comp.country}
          </span>
          <FollowStar id={match.id} />
        </div>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 pb-4 pt-3 sm:gap-6 sm:px-8">
          <div className="flex flex-col items-center gap-2 text-center">
            <TeamLogo team={match.home} size={52} />
            <span className="text-[13px] font-semibold leading-tight sm:text-[14px]">
              {match.home.name}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1">
            {live ? (
              <>
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={`${match.score.home}-${match.score.away}`}
                    initial={{ scale: 1.25, color: "#e17823" }}
                    animate={{ scale: 1, color: "#f9f9fb" }}
                    transition={{ duration: 0.5 }}
                    className="tnum font-odds text-[34px] font-bold leading-none sm:text-[40px]"
                  >
                    {match.score.home}
                    <span className="mx-1.5 text-text-tertiary">-</span>
                    {match.score.away}
                  </motion.span>
                </AnimatePresence>
                <LiveBadge minute={match.minute} period={match.period} />
                <span className="text-[11px] text-text-tertiary">
                  {match.period}
                </span>
              </>
            ) : (
              <>
                <span className="tnum font-odds text-[15px] font-bold text-text-secondary">
                  {new Date(match.kickoffAt).toLocaleDateString([], {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })}
                </span>
                <span className="tnum font-odds text-[22px] font-bold">
                  {new Date(match.kickoffAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <span className="rounded-md bg-secondary-a20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-300">
                  Pre-match
                </span>
              </>
            )}
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <TeamLogo team={match.away} size={52} />
            <span className="text-[13px] font-semibold leading-tight sm:text-[14px]">
              {match.away.name}
            </span>
          </div>
        </div>
        {live && (
          <div className="flex items-center justify-center gap-1.5 border-t border-border-soft py-2 text-[11px] text-text-tertiary">
            <span className="live-dot size-1.5 rounded-full bg-error-400" />
            Live pricing — markets may suspend during dangerous attacks
          </div>
        )}
      </motion.header>

      {/* Market group tabs — sticky */}
      <div
        className="no-scrollbar sticky top-[var(--shell-header-h)] z-20 -mx-3 mt-3 flex gap-1.5 overflow-x-auto border-b border-border-soft bg-bg-primary/95 px-3 py-2.5 backdrop-blur-md lg:-mx-4 lg:px-4"
        role="tablist"
        aria-label="Market groups"
      >
        {GROUPS.map((g) => {
          const n =
            g.key === "all"
              ? match.markets.length
              : match.markets.filter((m) => m.group === g.key).length;
          if (n === 0) return null;
          return (
            <button
              key={g.key}
              type="button"
              role="tab"
              aria-selected={group === g.key}
              onClick={() => setGroup(g.key)}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors ${
                group === g.key
                  ? "border-brand-a30 bg-secondary-a20 text-brand-300"
                  : "border-border-soft text-text-secondary hover:text-text-primary"
              }`}
            >
              {g.label}{" "}
              <span className="tnum text-[10.5px] opacity-60">{n}</span>
            </button>
          );
        })}
      </div>

      {/* Markets */}
      <div className="mt-3 space-y-3 pb-8">
        <AnimatePresence mode="popLayout">
          {markets.map((mk) => (
            <motion.div
              key={mk.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <MarketCard market={mk} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-border-soft py-4">
          <h2 className="mb-2 flex items-center gap-2 px-1 text-[14px] font-bold text-text-secondary">
            <Volleyball size={15} /> Also in {comp.name}
          </h2>
          <div className="space-y-1">
            {related.map((r) => (
              <Link
                key={r.id}
                to="/match/$matchId"
                params={{ matchId: r.id }}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] transition-colors hover:bg-surface-secondary"
              >
                <TeamLogo team={r.home} size={18} />
                <TeamLogo team={r.away} size={18} />
                <span className="truncate">
                  {r.home.short} v {r.away.short}
                </span>
                <span className="ml-auto text-[11px] text-text-tertiary">
                  {r.status === "live" ? (
                    <span className="text-error-300">LIVE</span>
                  ) : (
                    new Date(r.kickoffAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  )}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
