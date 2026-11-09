import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown, ChevronRight, Star } from "lucide-react";
import { useState } from "react";
import { groupByComp, LeagueSection } from "../components/MatchRow";
import { FollowStar } from "../components/primitives";
import { SportGlyph } from "../components/SportGlyph";
import { COMPS, compShort } from "../lib/seed";
import { isMatchFollowed } from "../lib/selectors";
import { useUI } from "../lib/store/ui";
import { useWorld } from "../lib/store/world";

export const Route = createFileRoute("/football")({ component: Football });

const MARKET_OPTS = [
  { key: "h2h", label: "Match result" },
  { key: "dc", label: "Double chance" },
  { key: "btts", label: "Both teams to score" },
  { key: "tg25", label: "Total goals 2.5" },
] as const;

function Football() {
  const matches = useWorld((s) => s.matches);
  const soccer = matches.filter((m) => m.sport === "soccer");
  const follows = useUI((s) => s.follows);
  const [tab, setTab] = useState<"liveup" | "all" | "favs">("liveup");
  const [marketKey, setMarketKey] = useState<string>("h2h");
  const [compFilter, setCompFilter] = useState<string>("all");

  const liveUp = soccer.filter(
    (m) => m.status === "live" || m.status === "scheduled",
  );
  const liveCount = soccer.filter((m) => m.status === "live").length;

  const base = tab === "liveup" ? liveUp : tab === "favs" ? liveUp : soccer;
  const shown = base
    .filter((m) => (tab === "favs" ? isMatchFollowed(m, follows) : true))
    .filter((m) => compFilter === "all" || m.competitionId === compFilter);

  const soccerComps = Object.values(COMPS).filter((c) => c.sport === "soccer");
  const shownComps = new Set(shown.map((m) => m.competitionId)).size;

  return (
    <div className="mx-auto max-w-[860px] space-y-4 px-3 pt-4 lg:px-4">
      {/* Breadcrumb pills */}
      <nav
        className="flex items-center gap-1.5 text-[12px] font-semibold"
        aria-label="Breadcrumb"
      >
        <Link
          to="/"
          className="rounded-full border border-border-soft bg-surface-primary px-3 py-1.5 text-text-secondary transition-colors hover:text-text-primary"
        >
          Home
        </Link>
        <ChevronRight size={13} className="text-text-disabled" />
        <span className="flex items-center gap-1.5 rounded-full border border-brand-a30 bg-secondary-a20 px-3 py-1.5 text-brand-300">
          <SportGlyph sport="soccer" size={13} /> Football
        </span>
      </nav>

      <div className="flex flex-wrap items-center gap-2">
        <h1 className="flex items-center gap-2 px-1 text-[18px] font-bold">
          Football
        </h1>
        <span className="text-[12px] text-text-tertiary">
          {shownComps} competitions · {liveCount} live
        </span>
        <div className="ml-auto flex items-center gap-2">
          {/* Market selector — rebinds the odds shown on every row */}
          <label className="relative flex items-center gap-1.5 rounded-full border border-border-soft bg-surface-primary px-3 py-1.5 text-[12px] font-semibold text-text-secondary">
            <span className="text-text-tertiary">Market:</span>
            <select
              value={marketKey}
              onChange={(e) => setMarketKey(e.target.value)}
              aria-label="Row market"
              className="appearance-none bg-transparent pr-4 font-semibold text-text-primary outline-none"
            >
              {MARKET_OPTS.map((o) => (
                <option
                  key={o.key}
                  value={o.key}
                  className="bg-surface-primary"
                >
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={13}
              className="pointer-events-none absolute right-2.5 text-text-tertiary"
            />
          </label>
          <label className="relative flex items-center rounded-full border border-border-soft bg-surface-primary px-3 py-1.5 text-[12px] font-semibold">
            <select
              value={compFilter}
              onChange={(e) => setCompFilter(e.target.value)}
              aria-label="Competition filter"
              className="appearance-none bg-transparent pr-4 outline-none"
            >
              <option value="all" className="bg-surface-primary">
                All competitions
              </option>
              {soccerComps.map((c) => (
                <option key={c.id} value={c.id} className="bg-surface-primary">
                  {c.name}
                </option>
              ))}
            </select>
            <ChevronDown
              size={13}
              className="pointer-events-none absolute right-2.5 text-text-tertiary"
            />
          </label>
        </div>
      </div>

      {/* Competitions rail */}
      <nav
        className="no-scrollbar -mx-3 flex snap-x gap-2 overflow-x-auto px-3 lg:mx-0 lg:px-0"
        aria-label="Competitions"
      >
        {soccerComps.map((c) => (
          <div
            key={c.id}
            className={`flex shrink-0 snap-start items-center gap-1 rounded-xl border py-2 pl-3 pr-1.5 transition-colors ${
              compFilter === c.id
                ? "border-brand-a30 bg-secondary-a20"
                : "border-border-soft bg-surface-primary"
            }`}
          >
            <button
              type="button"
              onClick={() => setCompFilter(c.id === compFilter ? "all" : c.id)}
              className="flex items-center gap-2"
            >
              <span className="grid size-6 place-items-center rounded-md bg-secondary-a30 font-odds text-[9px] font-bold uppercase text-brand-300">
                {compShort(c.id)}
              </span>
              <span className="text-[13px] font-medium">{c.name}</span>
            </button>
            <FollowStar id={c.id} size={14} />
          </div>
        ))}
      </nav>

      {/* Segmented control + following */}
      <div
        className="flex items-center gap-2"
        role="tablist"
        aria-label="Fixture filter"
      >
        <div className="flex rounded-full border border-border-soft bg-surface-primary p-0.5">
          {(
            [
              ["liveup", `Live & upcoming ${liveUp.length}`],
              ["all", "All soccer"],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              type="button"
              role="tab"
              aria-selected={tab === k}
              onClick={() => setTab(k)}
              className={`rounded-full px-4 py-1.5 text-[12.5px] font-semibold transition-colors ${
                tab === k
                  ? "bg-secondary-a20 text-brand-300"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "favs"}
          onClick={() => setTab("favs")}
          className={`flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-[12.5px] font-semibold transition-colors ${
            tab === "favs"
              ? "border-gold-500/40 bg-gold-500/10 text-gold-500"
              : "border-border-soft text-text-secondary hover:text-text-primary"
          }`}
        >
          <Star
            size={12}
            className={tab === "favs" ? "fill-gold-500 text-gold-500" : ""}
          />
          Following
        </button>
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
          <LeagueSection
            key={cid}
            compId={cid}
            matches={ms}
            marketKey={marketKey}
          />
        ))}
      </div>
      <p className="pb-6 text-center text-[11px] text-text-tertiary">
        {MARKET_OPTS.find((o) => o.key === marketKey)?.label} odds shown · tap
        +N for all markets
      </p>
    </div>
  );
}
