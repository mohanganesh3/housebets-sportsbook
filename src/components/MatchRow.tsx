import { Link } from "@tanstack/react-router";
import { ChevronRight, Lock } from "lucide-react";
import { useState } from "react";
import { compById, compShort, countryFlag } from "../lib/seed";
import { useWorld } from "../lib/store/world";
import type { Match } from "../lib/types";
import {
  BellButton,
  FollowStar,
  LiveBadge,
  OddsCell,
  TeamLogo,
} from "./primitives";

const fmtKick = (ts: number) =>
  new Date(ts).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
const fmtDay = (ts: number) =>
  new Date(ts).toLocaleDateString([], { weekday: "short" });

export function MatchRow({
  match,
  marketKey = "h2h",
}: {
  match: Match;
  marketKey?: string;
}) {
  const mt = useWorld((s) => s.matches.find((x) => x.id === match.id)) ?? match;
  const goalFlash = useWorld((s) => s.goalFlashes[mt.id]);
  const mkt = mt.markets.find((mk) => mk.key === marketKey);
  const mktSusp = mkt?.status === "suspended";
  const live = mt.status === "live";
  const finished = mt.status === "finished";
  const showScore = live || finished;

  const oddsBlock = mktSusp ? (
    <div className="flex items-center justify-center gap-1.5 rounded-lg border border-warning-400/35 bg-warning-400/15 px-3 py-2">
      <Lock size={12} className="text-warning-400" />
      <span className="text-[11px] font-bold uppercase tracking-wide text-warning-400">
        Suspended
      </span>
    </div>
  ) : (
    mkt && (
      <div
        className={`grid gap-1 sm:gap-1.5 ${mkt.outcomes.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}
      >
        {mkt.outcomes.slice(0, 3).map((o) => (
          <OddsCell key={o.id} outcome={o} market={mkt} compact />
        ))}
      </div>
    )
  );

  return (
    <div
      className={`group rounded-xl px-3 py-2.5 transition-colors hover:bg-surface-secondary/60 ${goalFlash ? "flash-score" : ""}`}
    >
      <div className="grid grid-cols-[1fr_auto] items-center gap-2">
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
                {showScore && (
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
          {/* compact status col on phone — minute/HT/kickoff always visible */}
          <div className="flex w-7 shrink-0 flex-col items-end justify-center leading-tight sm:hidden">
            {live ? (
              <span className="tnum text-[10.5px] font-bold text-error-300">
                {mt.period === "HT" ? "HT" : `${mt.minute ?? ""}′`}
              </span>
            ) : finished ? (
              <span className="text-[10.5px] font-bold text-text-tertiary">
                FT
              </span>
            ) : (
              <>
                {mt.kickoffAt - Date.now() > 86_400_000 && (
                  <span className="text-[9px] text-text-disabled">
                    {fmtDay(mt.kickoffAt)}
                  </span>
                )}
                <span className="tnum text-[10.5px] text-text-tertiary">
                  {fmtKick(mt.kickoffAt)}
                </span>
              </>
            )}
          </div>
          <div className="hidden w-16 justify-end sm:flex">
            {live ? (
              <LiveBadge minute={mt.minute} period={mt.period} />
            ) : finished ? (
              <span className="text-[12px] font-bold text-text-tertiary">
                FT
              </span>
            ) : (
              <span className="flex flex-col items-end leading-tight">
                {mt.kickoffAt - Date.now() > 86_400_000 && (
                  <span className="text-[10px] text-text-disabled">
                    {fmtDay(mt.kickoffAt)}
                  </span>
                )}
                <span className="tnum text-[13px] text-text-tertiary">
                  {fmtKick(mt.kickoffAt)}
                </span>
                {mt.kickoffAt - Date.now() < 3_600_000 &&
                  mt.kickoffAt > Date.now() && (
                    <span className="tnum font-odds text-[10px] font-semibold text-brand-300">
                      in {Math.ceil((mt.kickoffAt - Date.now()) / 60_000)}m
                    </span>
                  )}
              </span>
            )}
          </div>
          <div className="hidden w-[216px] sm:block">{oddsBlock}</div>
          <Link
            to="/match/$matchId"
            params={{ matchId: mt.id }}
            className="hidden items-center gap-1 rounded-lg px-2 py-1.5 font-odds text-[12px] font-semibold text-text-tertiary transition-colors hover:bg-surface-tertiary hover:text-brand-300 lg:flex"
          >
            +{mt.markets.length}
            <ChevronRight size={13} />
          </Link>
          {mt.status === "scheduled" && (
            <span>
              <BellButton id={mt.id} />
            </span>
          )}
          <span>
            <FollowStar id={mt.id} />
          </span>
        </div>
      </div>
      {/* Phone: full-width named odds row under the teams — wireframe card layout */}
      <div className="mt-2 sm:hidden">
        {mktSusp
          ? oddsBlock
          : mkt && (
              <div
                className={`grid gap-1.5 ${mkt.outcomes.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}
              >
                {mkt.outcomes.slice(0, 3).map((o) => (
                  <OddsCell key={o.id} outcome={o} market={mkt} named compact />
                ))}
              </div>
            )}
      </div>
    </div>
  );
}

export function LeagueSection({
  compId,
  matches,
  defaultOpen = true,
  marketKey,
}: {
  compId: string;
  matches: Match[];
  defaultOpen?: boolean;
  marketKey?: string;
}) {
  const comp = compById(compId);
  const [open, setOpen] = useState(defaultOpen);
  if (!comp || matches.length === 0) return null;
  return (
    <section className="overflow-hidden rounded-xl border border-border-soft bg-surface-primary">
      <div className="flex items-center gap-2.5 px-4 py-3">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="flex min-w-0 flex-1 items-center gap-2.5 text-left transition-colors hover:text-brand-200"
        >
          <span aria-hidden className="text-[15px] leading-none">
            {countryFlag(comp.country)}
          </span>
          <span className="grid size-6 shrink-0 place-items-center rounded-md bg-secondary-a30 font-odds text-[10px] font-bold uppercase text-brand-300">
            {compShort(comp.id)}
          </span>
          <span className="hidden text-[12px] text-text-tertiary sm:inline">
            {comp.country}
          </span>
          <span className="truncate text-[14px] font-semibold">
            {comp.name}
          </span>
          <ChevronRight
            size={15}
            className={`shrink-0 text-text-tertiary transition-transform ${open ? "rotate-90" : ""}`}
          />
        </button>
        <Link
          to="/football"
          className="shrink-0 text-[11.5px] font-semibold text-brand-300 transition-colors hover:text-brand-200"
        >
          View all
        </Link>
        <FollowStar id={comp.id} size={15} />
      </div>
      {open && (
        <div className="border-t border-border-soft px-1.5 py-1.5">
          {matches.map((mt) => (
            <MatchRow key={mt.id} match={mt} marketKey={marketKey} />
          ))}
        </div>
      )}
    </section>
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
