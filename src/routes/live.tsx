import { createFileRoute } from "@tanstack/react-router";
import { Clock, RadioTower } from "lucide-react";
import { useState } from "react";
import { groupByComp, LeagueSection } from "../components/MatchRow";
import { EmptyState } from "../components/primitives";
import { useWorld } from "../lib/store/world";

export const Route = createFileRoute("/live")({ component: Live });

const FILTERS = [
  { label: "All", sport: null },
  { label: "Football", sport: "soccer" },
  { label: "Tennis", sport: "tennis" },
  { label: "Basketball", sport: "basketball" },
  { label: "Baseball", sport: "baseball" },
  { label: "Esports", sport: "esports" },
] as const;

function Live() {
  const [f, setF] = useState<(typeof FILTERS)[number]["label"]>("All");
  const matches = useWorld((s) => s.matches);
  const liveEmpty = useWorld((s) => s.liveEmpty);
  const live = liveEmpty ? [] : matches.filter((m) => m.status === "live");
  const soon = matches
    .filter((m) => m.status === "scheduled")
    .sort((a, b) => a.kickoffAt - b.kickoffAt)
    .slice(0, 6);
  const sport = FILTERS.find((x) => x.label === f)?.sport ?? null;
  const filtered = sport ? live.filter((m) => m.sport === sport) : live;

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
        {FILTERS.map(({ label, sport: sp }) => {
          const n = sp
            ? live.filter((m) => m.sport === sp).length
            : live.length;
          return (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={f === label}
              onClick={() => setF(label)}
              className={`shrink-0 rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors ${
                f === label
                  ? "border-brand-a30 bg-secondary-a20 text-brand-300"
                  : "border-border-soft bg-surface-primary text-text-secondary hover:text-text-primary"
              }`}
            >
              {label}
              {n > 0 && (
                <span
                  className={`ml-1.5 font-odds text-[11px] ${f === label ? "text-brand-200" : "text-text-tertiary"}`}
                >
                  {n}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<Clock size={20} />}
          title={
            f === "All" ? "No live matches right now" : `No live ${f} right now`
          }
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
