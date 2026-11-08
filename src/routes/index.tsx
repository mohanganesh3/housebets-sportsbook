import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ChevronRight,
  CircleDot,
  Dumbbell,
  Flame,
  Gamepad2,
  Medal,
  RadioTower,
  Trophy,
  Volleyball,
} from "lucide-react";
import { motion } from "motion/react";
import { groupByComp, LeagueSection } from "../components/MatchRow";
import { LiveBadge, OddsCell, TeamLogo } from "../components/primitives";
import { useWorld } from "../lib/store/world";
import type { Match } from "../lib/types";

export const Route = createFileRoute("/")({ component: Home });

const PILLS = [
  { key: "live", label: "Live", icon: RadioTower, to: "/live" },
  { key: "soccer", label: "Soccer", icon: Volleyball, to: "/football" },
  { key: "tennis", label: "Tennis", icon: CircleDot, to: "/football" },
  { key: "basketball", label: "Basketball", icon: Dumbbell, to: "/football" },
  { key: "esports", label: "Esports", icon: Gamepad2, to: "/football" },
  { key: "cricket", label: "Cricket", icon: Trophy, to: "/football" },
  { key: "hockey", label: "Ice hockey", icon: Medal, to: "/football" },
] as const;

function FeaturedCard({ match }: { match: Match }) {
  const mt = useWorld((s) => s.matches.find((x) => x.id === match.id)) ?? match;
  const h2h = mt.markets.find((m) => m.key === "h2h");
  return (
    <div className="group relative flex w-[300px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-border-soft bg-gradient-to-b from-surface-secondary to-surface-primary p-4 transition-colors hover:border-border-very-strong">
      <Link
        to="/match/$matchId"
        params={{ matchId: mt.id }}
        aria-label={`${mt.home.name} v ${mt.away.name}`}
        className="absolute inset-0 z-0 rounded-2xl"
      />
      <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-brand-a05 blur-2xl transition-opacity group-hover:opacity-150" />
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-text-tertiary">
          {mt.competitionId === "epl" ? "Premier League" : "Champions League"}
        </span>
        {mt.status === "live" ? (
          <LiveBadge minute={mt.minute} period={mt.period} />
        ) : (
          <Flame size={13} className="text-warning-400" />
        )}
      </div>
      <div className="mb-3 space-y-2.5">
        {[mt.home, mt.away].map((t, i) => (
          <div key={t.id} className="flex items-center gap-2.5">
            <TeamLogo team={t} size={26} />
            <span className="truncate text-[14px] font-semibold">{t.name}</span>
            {mt.status === "live" && (
              <span className="tnum ml-auto font-odds text-[16px] font-bold">
                {i === 0 ? mt.score.home : mt.score.away}
              </span>
            )}
          </div>
        ))}
      </div>
      {h2h && (
        <div className="pointer-events-none relative z-10 mt-auto grid grid-cols-3 gap-1.5">
          {h2h.outcomes.map((o) => (
            <span key={o.id} className="pointer-events-auto">
              <OddsCell outcome={o} market={h2h} compact />
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function Home() {
  const matches = useWorld((s) => s.matches);
  const live = matches.filter((m) => m.status === "live");
  const featured = matches.filter((m) => m.featured);
  const upcoming = matches.filter((m) => m.status === "scheduled");

  return (
    <div className="mx-auto max-w-[860px] space-y-5 px-3 pt-4 lg:px-4">
      {/* Sport pills */}
      <div
        className="no-scrollbar -mx-3 flex snap-x gap-2 overflow-x-auto px-3 lg:mx-0 lg:px-0"
        role="tablist"
        aria-label="Sports"
      >
        {PILLS.map(({ key, label, icon: Icon, to }, i) => (
          <Link
            key={key}
            to={to as "/"}
            className={`flex shrink-0 snap-start items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors ${
              i === 0
                ? "border-brand-a30 bg-secondary-a20 text-brand-300"
                : "border-border-soft bg-surface-primary text-text-secondary hover:border-border-very-strong hover:text-text-primary"
            }`}
          >
            <Icon size={15} />
            {label}
            {key === "live" && (
              <span className="grid min-w-4.5 place-items-center rounded-full bg-error-500 px-1 font-odds text-[10px] font-bold text-white">
                {live.length}
              </span>
            )}
          </Link>
        ))}
      </div>

      {/* Featured rail */}
      <section aria-label="Featured matches">
        <div className="mb-2.5 flex items-center justify-between px-1">
          <h1 className="flex items-center gap-2 text-[16px] font-bold">
            <RadioTower size={17} className="text-error-400" /> In play now
          </h1>
          <Link
            to="/live"
            className="flex items-center gap-0.5 text-[12px] font-semibold text-brand-300 hover:text-brand-200"
          >
            All live <ChevronRight size={14} />
          </Link>
        </div>
        <div className="no-scrollbar -mx-3 flex snap-x gap-3 overflow-x-auto px-3 pb-1 lg:mx-0 lg:px-0">
          {featured.map((mt) => (
            <FeaturedCard key={mt.id} match={mt} />
          ))}
          {live
            .filter((m) => !m.featured)
            .map((mt) => (
              <FeaturedCard key={mt.id} match={mt} />
            ))}
        </div>
      </section>

      {/* Live sections */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="space-y-3"
        aria-label="Live matches"
      >
        {groupByComp(live.filter((m) => !featured.includes(m))).map(
          ([cid, ms]) => (
            <LeagueSection key={cid} compId={cid} matches={ms} />
          ),
        )}
      </motion.section>

      {/* Upcoming */}
      <section className="space-y-3" aria-label="Upcoming matches">
        <h2 className="px-1 text-[16px] font-bold">Upcoming</h2>
        {groupByComp(upcoming).map(([cid, ms]) => (
          <LeagueSection key={cid} compId={cid} matches={ms} />
        ))}
      </section>

      <p className="px-1 pb-6 text-center text-[11px] text-text-tertiary">
        Prototype · sample data only · no real money · decimal odds · singles
        only
      </p>
    </div>
  );
}
