import { createFileRoute } from "@tanstack/react-router";
import { Clock, RadioTower } from "lucide-react";
import { useState } from "react";
import { groupByComp, LeagueSection } from "../components/MatchRow";
import { EmptyState } from "../components/primitives";
import { useWorld } from "../lib/store/world";

export const Route = createFileRoute("/live")({ component: Live });

const FILTERS = [
  "All",
  "Soccer",
  "Tennis",
  "Basketball",
  "Baseball",
  "Esports",
] as const;

function Live() {
  const [f, setF] = useState<(typeof FILTERS)[number]>("All");
  const matches = useWorld((s) => s.matches);
  const live = matches.filter((m) => m.status === "live");
  const soon = matches
    .filter((m) => m.status === "scheduled")
    .sort((a, b) => a.kickoffAt - b.kickoffAt)
    .slice(0, 6);
  const filtered =
    f === "All"
      ? live
      : live.filter((m) => m.sport === f.toLowerCase().replace(" ", "-"));

  return (
    <div className="mx-auto max-w-[860px] space-y-4 px-3 pt-4 lg:px-4">
      <div className="flex items-center justify-between px-1">
        <h1 className="flex items-center gap-2 text-[18px] font-bold">
          <RadioTower size={19} className="text-error-400" />
          Live{" "}
          <span className="grid min-w-5 place-items-center rounded-full bg-error-500/15 px-1.5 font-odds text-[11px] font-bold text-error-300">
            {live.length}
          </span>
        </h1>
      </div>
      <div
        className="no-scrollbar -mx-3 flex gap-2 overflow-x-auto px-3 lg:mx-0 lg:px-0"
        role="tablist"
        aria-label="Sport filter"
      >
        {FILTERS.map((k) => (
          <button
            key={k}
            type="button"
            role="tab"
            aria-selected={f === k}
            onClick={() => setF(k)}
            className={`shrink-0 rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors ${
              f === k
                ? "border-brand-a30 bg-secondary-a20 text-brand-300"
                : "border-border-soft bg-surface-primary text-text-secondary hover:text-text-primary"
            }`}
          >
            {k}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title={`No live ${f === "All" ? "matches" : `${f} matches`} right now`}
          hint="New events go in-play continuously. Here's what's teeing up next."
        />
      ) : (
        <div className="space-y-3">
          {groupByComp(filtered).map(([cid, ms]) => (
            <LeagueSection key={cid} compId={cid} matches={ms} />
          ))}
        </div>
      )}

      <section aria-label="Starting soon">
        <h2 className="mb-2 flex items-center gap-2 px-1 text-[14px] font-bold text-text-secondary">
          <Clock size={15} className="text-brand-300" /> Starting soon
        </h2>
        <div className="space-y-3">
          {groupByComp(soon).map(([cid, ms]) => (
            <LeagueSection key={cid} compId={cid} matches={ms} />
          ))}
        </div>
      </section>
      <p className="pb-6 text-center text-[11px] text-text-tertiary">
        Scores and clocks are sample data. Suspended markets lock automatically.
      </p>
    </div>
  );
}
