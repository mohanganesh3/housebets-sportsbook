import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useMemo } from "react";
import {
  BoardHeader,
  BoardMenu,
  BoardSessionLine,
  BreakBanner,
  ContentSearchBar,
  EmptyModule,
  FilterChip,
  MenuOption,
  SectionHead,
  TextLink,
} from "../components/board-ui";
import {
  BoardSkeleton,
  groupByComp,
  LeagueGroup,
  MatchRow,
  RowRegion,
} from "../components/MatchRow";
import { useScrollMemory } from "../lib/scrollMemory";
import { compById } from "../lib/seed";
import { useUI } from "../lib/store/ui";
import { useWorld } from "../lib/store/world";
import type { Match } from "../lib/types";

const SPORT_FILTERS: { key: string; label: string }[] = [
  { key: "all", label: "All" },
  { key: "soccer", label: "Soccer" },
  { key: "tennis", label: "Tennis" },
  { key: "basketball", label: "Basketball" },
  { key: "baseball", label: "Baseball" },
  { key: "american-football", label: "Am. Football" },
  { key: "esports", label: "Esports" },
];

export const Route = createFileRoute("/live")({
  // LV-05 — the filter serializes: sport + comp ride the URL, so back
  // restores them and a pasted link lands on the same board. Optional
  // keys only — undefined params never serialize.
  validateSearch: (s) => {
    const out: { sport?: string; comp?: string } = {};
    if (typeof s.sport === "string") out.sport = s.sport;
    if (typeof s.comp === "string") out.comp = s.comp;
    return out;
  },
  pendingComponent: () => (
    <div className="mx-auto w-full max-w-5xl px-3 py-4 lg:px-5">
      <BoardSkeleton />
    </div>
  ),
  component: LivePage,
});

function LivePage() {
  useScrollMemory("/live");
  const nav = useNavigate({ from: "/live" });
  const { sport = "all", comp } = Route.useSearch();
  const matches = useWorld((s) => s.matches);
  const liveEmpty = useWorld((s) => s.liveEmpty);
  const follows = useUI((s) => s.follows);

  const live = useMemo(
    () => (liveEmpty ? [] : matches.filter((m) => m.status === "live")),
    [matches, liveEmpty],
  );
  const bySport = useMemo(
    () => (sport === "all" ? live : live.filter((m) => m.sport === sport)),
    [live, sport],
  );
  const filtered = useMemo(
    () => (comp ? bySport.filter((m) => m.competitionId === comp) : bySport),
    [bySport, comp],
  );
  const groups = useMemo(
    () => groupByComp(filtered, follows),
    [filtered, follows],
  );

  // competitions present in the sport-filtered live set — comp dropdown
  // narrows WITHIN the sport filter, single select (LV-01)
  const compOptions = useMemo(() => {
    const ids = [...new Set(bySport.map((m) => m.competitionId))];
    return ids.map((cid) => ({
      cid,
      comp: compById(cid),
      n: bySport.filter((m) => m.competitionId === cid).length,
    }));
  }, [bySport]);

  // starting-soon tail — the LV-03 module's second half; filtered by the
  // active sport so the promise below stays honest
  const startingSoon = useMemo(() => {
    const pool = matches
      .filter(
        (m) =>
          m.status === "scheduled" &&
          (sport === "all" || m.sport === sport) &&
          (!comp || m.competitionId === comp),
      )
      .sort((a, b) => a.kickoffAt - b.kickoffAt);
    return (
      pool.length
        ? pool
        : matches
            .filter((m) => m.status === "scheduled")
            .sort((a, b) => a.kickoffAt - b.kickoffAt)
    ).slice(0, 3);
  }, [matches, sport, comp]);

  const setSearch = (next: { sport?: string; comp?: string }) =>
    nav({
      search: {
        sport: next.sport === "all" ? undefined : next.sport,
        comp: next.comp,
      },
      replace: true,
    });

  const activeComp = comp ? compById(comp) : undefined;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-3 py-4 lg:px-5">
      <BoardHeader
        title={
          <>
            <span
              aria-hidden="true"
              className="hb-live-pulse size-2 shrink-0 rounded-full bg-c-live"
            />
            Live now
            <span className="font-hb-num font-normal text-c-text-2">
              · {filtered.length} in play
            </span>
          </>
        }
        meta="Scores may be delayed ~seconds"
      >
        <BoardSessionLine className="hidden sm:block" />
      </BoardHeader>
      <ContentSearchBar />
      <BreakBanner />

      {/* filter row — chips keep a true count each, zeros never hide */}
      <div className="flex flex-col gap-2">
        <fieldset
          aria-label="Sport filter"
          className="hb-edge-fade m-0 flex min-w-0 items-center gap-2 overflow-x-auto border-0 p-0 pb-0.5"
        >
          <legend className="sr-only">Sport filter</legend>
          {SPORT_FILTERS.map((f) => {
            const n =
              f.key === "all"
                ? live.length
                : live.filter((m) => m.sport === f.key).length;
            return (
              <FilterChip
                key={f.key}
                label={f.label}
                count={n}
                active={sport === f.key}
                disabled={n === 0}
                onClick={() => setSearch({ sport: f.key, comp: undefined })}
              />
            );
          })}
          <BoardMenu
            label="Filter by competition"
            disabled={!compOptions.length}
            button={activeComp ? activeComp.name : "All competitions"}
          >
            {(close) => (
              <>
                <MenuOption
                  active={!comp}
                  onClick={() => {
                    setSearch({ sport, comp: undefined });
                    close();
                  }}
                >
                  All competitions
                </MenuOption>
                {compOptions.map((o) => (
                  <MenuOption
                    key={o.cid}
                    active={comp === o.cid}
                    count={o.n}
                    onClick={() => {
                      setSearch({ sport, comp: o.cid });
                      close();
                    }}
                  >
                    {o.comp.name}
                  </MenuOption>
                ))}
              </>
            )}
          </BoardMenu>
        </fieldset>

        {/* LV-05 breadcrumb when a competition is composed on top */}
        {activeComp && (
          <p className="flex items-center gap-1 px-1 font-hb-ui text-hb-label text-c-text-2">
            Live
            <span aria-hidden="true" className="text-c-text-3">
              ›
            </span>
            {SPORT_FILTERS.find((f) => f.key === sport)?.label ?? "All"}
            <span aria-hidden="true" className="text-c-text-3">
              ›
            </span>
            <span className="font-semibold text-c-text">{activeComp.name}</span>
            <span className="font-hb-num tabular-nums">
              · {filtered.length}
            </span>
            <button
              type="button"
              aria-label={`Clear ${activeComp.name} filter`}
              onClick={() => setSearch({ sport, comp: undefined })}
              className="ms-1 grid size-6 place-items-center rounded-full text-c-text-2 transition-colors hover:bg-c-surface-2 hover:text-c-text"
            >
              <X size={12} aria-hidden="true" />
            </button>
          </p>
        )}
      </div>

      {/* groups — live first by comp order, PL then followed then rest */}
      {groups.length > 0 ? (
        <div className="flex flex-col gap-4">
          {groups.map(([cid, ms]) => (
            <LeagueGroup key={cid} compId={cid} matches={ms} />
          ))}
        </div>
      ) : (
        <>
          {/* LV-03 — the differentiator empty state, verbatim copy */}
          <EmptyModule
            title="Nothing in play right now — starting soon below"
            line="Live prices land here the moment a match kicks off."
            action={<TextLink to="/football">View all starting soon</TextLink>}
          />
          {startingSoon.length > 0 && (
            <section aria-label="Starting soon" className="flex flex-col gap-2">
              <SectionHead title="Starting soon" />
              <RowRegion>
                {startingSoon.map((m: Match) => (
                  <MatchRow key={m.id} match={m} />
                ))}
              </RowRegion>
            </section>
          )}
        </>
      )}
    </div>
  );
}
