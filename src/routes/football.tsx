import { createFileRoute } from "@tanstack/react-router";
import { Volleyball } from "lucide-react";
import { useState } from "react";
import { groupByComp, LeagueSection } from "../components/MatchRow";
import { FollowStar } from "../components/primitives";
import { COMPS } from "../lib/seed";
import { isMatchFollowed } from "../lib/selectors";
import { useUI } from "../lib/store/ui";
import { useWorld } from "../lib/store/world";

export const Route = createFileRoute("/football")({ component: Football });

function Football() {
  const matches = useWorld((s) => s.matches);
  const soccer = matches.filter((m) => m.sport === "soccer");
  const follows = useUI((s) => s.follows);
  const [tab, setTab] = useState<"all" | "live" | "upcoming" | "favs">("all");

  const shown =
    tab === "live"
      ? soccer.filter((m) => m.status === "live")
      : tab === "upcoming"
        ? soccer.filter((m) => m.status === "scheduled")
        : tab === "favs"
          ? soccer.filter((m) => isMatchFollowed(m, follows))
          : soccer;

  const soccerComps = Object.values(COMPS).filter((c) => c.sport === "soccer");

  return (
    <div className="mx-auto max-w-[860px] space-y-4 px-3 pt-4 lg:px-4">
      <h1 className="flex items-center gap-2 px-1 text-[18px] font-bold">
        <Volleyball size={19} className="text-brand-400" /> Football
      </h1>

      {/* Competitions rail */}
      <nav
        className="no-scrollbar -mx-3 flex snap-x gap-2 overflow-x-auto px-3 lg:mx-0 lg:px-0"
        aria-label="Competitions"
      >
        {soccerComps.map((c) => (
          <div
            key={c.id}
            className="flex shrink-0 snap-start items-center gap-2 rounded-xl border border-border-soft bg-surface-primary py-2 pl-3 pr-1.5"
          >
            <span className="grid size-6 place-items-center rounded-md bg-secondary-a30 font-odds text-[9px] font-bold uppercase text-brand-300">
              {c.name.slice(0, 2)}
            </span>
            <span className="text-[13px] font-medium">{c.name}</span>
            <FollowStar id={c.id} size={14} />
          </div>
        ))}
      </nav>

      <div className="flex gap-1.5" role="tablist" aria-label="Fixture filter">
        {(["all", "live", "upcoming", "favs"] as const).map((k) => (
          <button
            key={k}
            type="button"
            role="tab"
            aria-selected={tab === k}
            onClick={() => setTab(k)}
            className={`rounded-full border px-4 py-1.5 text-[12.5px] font-semibold capitalize transition-colors ${
              tab === k
                ? "border-brand-a30 bg-secondary-a20 text-brand-300"
                : "border-border-soft text-text-secondary hover:text-text-primary"
            }`}
          >
            {k === "favs" ? "Following" : k === "all" ? "All" : k}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {shown.length === 0 && (
          <p className="rounded-xl border border-dashed border-border-very-strong px-4 py-10 text-center text-[13px] text-text-tertiary">
            {tab === "favs"
              ? "Star a competition or match to pin it here."
              : "Nothing in this view right now."}
          </p>
        )}
        {groupByComp(shown).map(([cid, ms]) => (
          <LeagueSection key={cid} compId={cid} matches={ms} />
        ))}
      </div>
      <p className="pb-6 text-center text-[11px] text-text-tertiary">
        Match result odds shown · tap +N for all markets
      </p>
    </div>
  );
}
