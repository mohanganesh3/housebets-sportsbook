import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { compById } from "../lib/seed";
import { useWorld } from "../lib/store/world";
import type { Match } from "../lib/types";
import { FollowStar, LiveBadge, OddsCell, TeamLogo } from "./primitives";

const fmtKick = (ts: number) =>
  new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export function MatchRow({ match }: { match: Match }) {
  const mt = useWorld((s) => s.matches.find((x) => x.id === match.id)) ?? match;
  const goalFlash = useWorld((s) => s.goalFlashes[mt.id]);
  const h2h = mt.markets.find((mk) => mk.key === "h2h");
  const live = mt.status === "live";

  return (
    <div
      className={`group grid grid-cols-[1fr_auto] items-center gap-2 rounded-xl px-3 py-2.5 transition-colors hover:bg-surface-secondary/60 ${goalFlash ? "flash-score" : ""}`}
    >
      <Link
        to="/match/$matchId"
        params={{ matchId: mt.id }}
        className="flex min-w-0 items-center gap-3"
      >
        <div className="flex min-w-0 flex-col gap-1.5">
          {[mt.home, mt.away].map((t, i) => (
            <div key={t.id} className="flex items-center gap-2.5">
              <TeamLogo team={t} size={22} />
              <span
                className={`min-w-0 flex-1 truncate text-[14px] ${i === 0 ? "font-medium text-text-primary" : "text-text-primary/90"}`}
              >
                {t.name}
              </span>
              {live && (
                <span
                  key={goalFlash}
                  className={`tnum ml-auto pl-3 font-odds text-[14px] font-semibold ${goalFlash ? "ticker-in text-warning-400" : "text-text-primary"}`}
                >
                  {i === 0 ? mt.score.home : mt.score.away}
                </span>
              )}
            </div>
          ))}
        </div>
      </Link>
      <div className="flex items-center gap-2">
        <div className="hidden w-14 justify-end sm:flex">
          {live ? (
            <LiveBadge minute={mt.minute} period={mt.period} />
          ) : (
            <span className="tnum text-[13px] text-text-tertiary">
              {fmtKick(mt.kickoffAt)}
            </span>
          )}
        </div>
        {h2h && (
          <div className="grid w-[168px] grid-cols-3 gap-1 sm:w-[216px] sm:gap-1.5">
            {h2h.outcomes.map((o) => (
              <OddsCell key={o.id} outcome={o} market={h2h} compact />
            ))}
          </div>
        )}
        <Link
          to="/match/$matchId"
          params={{ matchId: mt.id }}
          className="hidden items-center gap-1 rounded-lg px-2 py-1.5 font-odds text-[12px] font-semibold text-text-tertiary transition-colors hover:bg-surface-tertiary hover:text-brand-300 lg:flex"
        >
          +{mt.markets.length}
          <ChevronRight size={13} />
        </Link>
        <span className="hidden sm:block">
          <FollowStar id={mt.id} />
        </span>
      </div>
    </div>
  );
}

export function LeagueSection({
  compId,
  matches,
  defaultOpen = true,
}: {
  compId: string;
  matches: Match[];
  defaultOpen?: boolean;
}) {
  const comp = compById(compId);
  if (!comp || matches.length === 0) return null;
  return (
    <details
      open={defaultOpen}
      className="group/sec overflow-hidden rounded-xl border border-border-soft bg-surface-primary"
    >
      <summary className="flex cursor-pointer list-none items-center gap-2.5 px-4 py-3 transition-colors hover:bg-surface-secondary/50 [&::-webkit-details-marker]:hidden">
        <span className="grid size-6 place-items-center rounded-md bg-secondary-a30 font-odds text-[10px] font-bold uppercase text-brand-300">
          {comp.flag === "eu" ? "EU" : comp.name.slice(0, 2)}
        </span>
        <span className="text-[12px] text-text-tertiary">{comp.country}</span>
        <span className="text-[14px] font-semibold">{comp.name}</span>
        <span className="ml-auto flex items-center gap-1">
          <FollowStar id={comp.id} size={15} />
          <ChevronRight
            size={15}
            className="text-text-tertiary transition-transform group-open/sec:rotate-90"
          />
        </span>
      </summary>
      <div className="border-t border-border-soft px-1.5 py-1.5">
        {matches.map((mt) => (
          <MatchRow key={mt.id} match={mt} />
        ))}
      </div>
    </details>
  );
}

export function groupByComp(matches: Match[]) {
  const map = new Map<string, Match[]>();
  for (const mt of matches) {
    const arr = map.get(mt.competitionId) ?? [];
    arr.push(mt);
    map.set(mt.competitionId, arr);
  }
  return [...map.entries()];
}
