import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Lock,
  Search,
  Star,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import {
  FollowStar,
  LiveBadge,
  OddsCell,
  TeamLogo,
} from "../components/primitives";
import { SportGlyph } from "../components/SportGlyph";
import { type EngineEvent, useEngine } from "../lib/engine";
import { compById, matchById } from "../lib/seed";
import { useUI } from "../lib/store/ui";
import { useWorld } from "../lib/store/world";
import type { Market, MarketGroupKey, Match } from "../lib/types";

export const Route = createFileRoute("/match/$matchId")({
  component: MatchPage,
});

const fmtCountdown = (ms: number) => {
  const mins = Math.max(0, Math.ceil(ms / 60_000));
  if (mins < 60) return `${mins}m`;
  const h = Math.floor(mins / 60);
  return `${h}h ${mins % 60}m`;
};

// wireframe order: groups first, "All markets · N" last; "mine" renders first when pinned markets exist
const GROUPS: { key: MarketGroupKey | "all" | "mine"; label: string }[] = [
  { key: "popular", label: "Popular" },
  { key: "goalscorers", label: "Goalscorers" },
  { key: "goals", label: "Goals" },
  { key: "players", label: "Players" },
  { key: "halves", label: "Halves" },
  { key: "handicaps", label: "Handicaps" },
  { key: "corners", label: "Corners & cards" },
  { key: "minutes", label: "Minutes" },
  { key: "all", label: "All markets" },
];

function MarketCard({ market, match }: { market: Market; match: Match }) {
  const susp = market.status === "suspended";
  const reason = useWorld((s) => s.suspReasons[market.id]);
  const pinned = useUI((s) => s.favMarkets.has(market.key));
  const togglePin = useUI((s) => s.toggleFavMarket);
  const cols = market.outcomes.length > 4 ? 2 : market.outcomes.length;
  // compact pick labels inside ≤3-outcome cells: team names → shorts
  const tagFor = (nm: string) => {
    const s = nm
      .replaceAll(match.home.name, match.home.short)
      .replaceAll(match.away.name, match.away.short);
    return s.length <= 12 ? s : undefined;
  };
  return (
    <section
      className={`overflow-hidden rounded-xl border transition-colors ${susp ? "border-warning-a40" : "border-border-soft"} bg-surface-primary`}
    >
      <header
        className={`flex items-center justify-between px-3.5 py-2.5 ${susp ? "bg-warning-a15/50" : "bg-surface-secondary/50"}`}
      >
        <h3
          className="flex items-center gap-1 text-[13px] font-semibold text-text-primary"
          title={
            market.key === "h2h" ? "Settled on 90 mins + stoppage" : undefined
          }
        >
          {market.name}
          <button
            type="button"
            onClick={() => togglePin(market.key)}
            aria-label={
              pinned
                ? `Unpin ${market.name}`
                : `Pin ${market.name} to My markets`
            }
            aria-pressed={pinned}
            title={pinned ? "Pinned to My markets" : "Pin to My markets"}
            className="grid size-6 place-items-center rounded-md text-text-disabled transition-colors hover:text-gold-500"
          >
            <Star
              size={12}
              className={pinned ? "fill-gold-500 text-gold-500" : ""}
            />
          </button>
        </h3>
        {susp && (
          <span className="suspend-in flex items-center gap-1.5 rounded-md bg-warning-a15 px-2 py-1 text-[11px] font-bold text-warning-400">
            <Lock size={11} /> SUSPENDED{reason ? ` · ${reason}` : ""}
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
            <OddsCell
              outcome={o}
              market={market}
              named={market.outcomes.length <= 3}
              tag={market.outcomes.length <= 3 ? tagFor(o.name) : undefined}
            />
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
  const goalEvent = useEngine((s) =>
    [...s.feed]
      .reverse()
      .find((e) => e.kind === "goal" && e.matchId === matchId),
  );
  const [goalBanner, setGoalBanner] = useState<EngineEvent | null>(null);
  useEffect(() => {
    if (!goalEvent) return;
    setGoalBanner(goalEvent);
    const t = setTimeout(() => setGoalBanner(null), 7000);
    return () => clearTimeout(t);
  }, [goalEvent]);
  const [group, setGroup] = useState<(typeof GROUPS)[number]["key"]>("all");
  const [mq, setMq] = useState("");
  const favMarkets = useUI((s) => s.favMarkets);
  const follows = useUI((s) => s.follows);
  const navigate = useNavigate();
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
    const q = mq.trim().toLowerCase();
    const list = (
      q || group === "all"
        ? match.markets
        : group === "mine"
          ? match.markets.filter((m) => favMarkets.has(m.key))
          : match.markets.filter((m) => m.group === group)
    ).filter(
      (m) =>
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.outcomes.some((o) => o.name.toLowerCase().includes(q)),
    );
    return [...list].sort((a, b) =>
      a.popular === b.popular ? 0 : a.popular ? -1 : 1,
    );
  }, [match, group, favMarkets, mq]);

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
      {/* Breadcrumb pills — wireframe: Sport ▾ / Comp ▾ / Match ▾ */}
      <nav
        className="mb-3 flex flex-wrap items-center gap-1.5 px-1 text-[12px] font-semibold"
        aria-label="Breadcrumb"
      >
        <Link
          to="/"
          className="flex items-center gap-1 rounded-full border border-border-soft bg-surface-primary px-3 py-1.5 text-text-secondary transition-colors hover:text-text-primary"
        >
          <ChevronLeft size={13} /> Sports
        </Link>
        <ChevronRight size={12} className="text-text-disabled" />
        {comp.country && (
          <>
            <span className="rounded-full border border-border-soft bg-surface-primary px-3 py-1.5 text-text-secondary">
              {comp.country}
            </span>
            <ChevronRight size={12} className="text-text-disabled" />
          </>
        )}
        <Link
          to="/football"
          className="rounded-full border border-border-soft bg-surface-primary px-3 py-1.5 text-text-secondary transition-colors hover:text-text-primary"
        >
          {comp.name}
        </Link>
        <ChevronRight size={12} className="text-text-disabled" />
        <label className="relative flex items-center gap-1 rounded-full border border-brand-a30 bg-secondary-a20 py-1.5 pl-3 pr-2 text-brand-300">
          <select
            value={match.id}
            onChange={(e) =>
              navigate({
                to: "/match/$matchId",
                params: { matchId: e.target.value },
              })
            }
            aria-label="Switch match"
            className="appearance-none bg-transparent pr-4 font-semibold outline-none"
          >
            {[match, ...related].map((r) => (
              <option
                key={r.id}
                value={r.id}
                className="bg-surface-primary text-text-primary"
              >
                {r.home.short} – {r.away.short}
              </option>
            ))}
          </select>
          <ChevronDown
            size={13}
            className="pointer-events-none absolute right-2.5"
          />
        </label>
      </nav>

      {/* Scoreboard header */}
      <motion.header
        layout
        className={`relative overflow-hidden rounded-2xl border border-border-soft bg-gradient-to-b from-surface-secondary to-surface-primary ${goalFlash ? "flash-score" : ""}`}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent" />
        <div className="relative flex items-center justify-center px-4 pt-3.5">
          <span className="text-[11px] font-medium uppercase tracking-[0.09em] text-text-tertiary">
            {comp.name}
          </span>
          <span className="absolute right-4 top-3">
            <FollowStar id={match.id} />
          </span>
        </div>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 pb-4 pt-3 sm:gap-6 sm:px-8">
          <div className="flex flex-col items-center gap-1.5 text-center">
            <TeamLogo team={match.home} size={52} />
            <span className="flex items-center gap-1 text-[13px] font-semibold leading-tight sm:text-[14px]">
              {match.home.name}
              <FollowStar id={match.home.id} size={13} />
            </span>
            {follows.has(match.home.id) && (
              <span className="flex items-center gap-1 rounded-full border border-gold-500/40 bg-warning-a15 px-2 py-0.5 text-[10px] font-bold text-gold-500">
                <Star size={9} className="fill-gold-500" /> Following
              </span>
            )}
          </div>
          <div className="flex flex-col items-center gap-1.5">
            {live ? (
              <>
                {/* score lives in dark boxes — wireframe signature */}
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={`${match.score.home}-${match.score.away}`}
                    initial={{ scale: 1.12 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.45 }}
                    className="flex items-center gap-1.5 tnum font-odds text-[26px] font-bold leading-none sm:text-[30px]"
                  >
                    <span className="grid min-w-11 place-items-center rounded-lg border border-border-strong bg-bg-primary/80 px-2.5 py-2 shadow-inner">
                      {match.score.home}
                    </span>
                    <span className="text-text-tertiary">-</span>
                    <span className="grid min-w-11 place-items-center rounded-lg border border-border-strong bg-bg-primary/80 px-2.5 py-2 shadow-inner">
                      {match.score.away}
                    </span>
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
                  {match.kickoffAt - Date.now() < 86_400_000
                    ? `Starts in ${fmtCountdown(match.kickoffAt - Date.now())}`
                    : "Pre-match"}
                </span>
              </>
            )}
          </div>
          <div className="flex flex-col items-center gap-1.5 text-center">
            <TeamLogo team={match.away} size={52} />
            <span className="flex items-center gap-1 text-[13px] font-semibold leading-tight sm:text-[14px]">
              {match.away.name}
              <FollowStar id={match.away.id} size={13} />
            </span>
            {follows.has(match.away.id) && (
              <span className="flex items-center gap-1 rounded-full border border-gold-500/40 bg-warning-a15 px-2 py-0.5 text-[10px] font-bold text-gold-500">
                <Star size={9} className="fill-gold-500" /> Following
              </span>
            )}
          </div>
        </div>
        {/* GOAL banner — transient, names the scorer */}
        <AnimatePresence>
          {goalBanner && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-warning-a30 bg-warning-a15/40"
            >
              <p className="flex items-center justify-center gap-2 py-2 font-odds text-[12px] font-bold text-warning-400">
                <SportGlyph sport="soccer" size={13} />
                GOAL · {goalBanner.scorer} {match.minute}′
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        {live && (
          <div className="flex items-center justify-center gap-1.5 border-t border-border-soft py-2 text-[11px] text-text-tertiary">
            <span className="live-dot size-1.5 rounded-full bg-error-400" />
            Live scores may be delayed · markets can suspend at any time
          </div>
        )}
      </motion.header>

      {/* Market search — wireframe: "Search markets or players" */}
      <div className="relative mt-3">
        <Search
          size={15}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-tertiary"
        />
        <input
          value={mq}
          onChange={(e) => setMq(e.target.value)}
          placeholder="Search markets or players"
          aria-label="Search markets or players"
          className="h-11 w-full rounded-xl border border-border-soft bg-surface-primary pl-10 pr-9 text-[13.5px] text-text-primary outline-none transition-colors placeholder:text-text-tertiary focus:border-brand-a30"
        />
        {mq && (
          <button
            type="button"
            onClick={() => setMq("")}
            aria-label="Clear market search"
            className="absolute right-2.5 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-md text-text-tertiary hover:bg-surface-secondary hover:text-text-primary"
          >
            <X size={14} />
          </button>
        )}
      </div>
      {mq && (
        <p className="mt-1.5 px-1 text-[11px] text-text-tertiary">
          {markets.length} market{markets.length === 1 ? "" : "s"} match "
          {mq.trim()}" across all groups
        </p>
      )}

      {/* Market group tabs — sticky */}
      <div
        className="no-scrollbar sticky top-[var(--shell-header-h)] z-20 -mx-3 mt-3 flex gap-1.5 overflow-x-auto border-b border-border-soft bg-bg-primary/95 px-3 py-2.5 backdrop-blur-md lg:-mx-4 lg:px-4"
        role="tablist"
        aria-label="Market groups"
      >
        {favMarkets.size > 0 && (
          <button
            type="button"
            role="tab"
            aria-selected={group === "mine"}
            onClick={() => setGroup("mine")}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors ${
              group === "mine"
                ? "border-gold-500/40 bg-gold-500/10 text-gold-500"
                : "border-border-soft text-text-secondary hover:text-text-primary"
            }`}
          >
            ★ My markets{" "}
            <span className="tnum text-[10.5px] opacity-60">
              {match.markets.filter((m) => favMarkets.has(m.key)).length}
            </span>
          </button>
        )}
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
              <MarketCard market={mk} match={match} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-border-soft py-4">
          <h2 className="mb-2 flex items-center gap-2 px-1 text-[14px] font-bold text-text-secondary">
            <SportGlyph sport="soccer" size={15} /> Also in {comp.name}
          </h2>
          <div className="no-scrollbar -mx-3 flex snap-x gap-2.5 overflow-x-auto px-3 pb-1 lg:mx-0 lg:px-0">
            {related.map((r) => {
              const rh = r.markets.find((mk) => mk.key === "h2h");
              return (
                <Link
                  key={r.id}
                  to="/match/$matchId"
                  params={{ matchId: r.id }}
                  className="flex w-[220px] shrink-0 snap-start flex-col gap-2 rounded-xl border border-border-soft bg-surface-primary p-3 transition-colors hover:border-border-very-strong"
                >
                  <span className="flex items-center justify-between text-[10.5px] text-text-tertiary">
                    {r.status === "live" ? (
                      <span className="flex items-center gap-1 font-bold text-error-300">
                        <span className="live-dot size-1.5 rounded-full bg-error-400" />
                        {r.minute}′
                      </span>
                    ) : (
                      new Date(r.kickoffAt).toLocaleTimeString([], {
                        weekday: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    )}
                    <span className="tnum font-odds font-semibold">
                      {r.status === "live"
                        ? `${r.score.home}–${r.score.away}`
                        : `+${r.markets.length}`}
                    </span>
                  </span>
                  {[r.home, r.away].map((t) => (
                    <span key={t.id} className="flex items-center gap-2">
                      <TeamLogo team={t} size={18} />
                      <span className="truncate text-[12.5px] font-medium">
                        {t.name}
                      </span>
                    </span>
                  ))}
                  {rh && r.status !== "live" && (
                    <span className="mt-1 grid grid-cols-3 gap-1">
                      {rh.outcomes.map((o) => (
                        <span
                          key={o.id}
                          className="tnum rounded-md bg-surface-secondary py-1 text-center font-odds text-[11px] font-semibold text-brand-300"
                        >
                          {o.price.toFixed(2)}
                        </span>
                      ))}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
