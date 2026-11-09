import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";
import { useMemo } from "react";
import {
  BoardHeader,
  BoardMenu,
  BoardSessionLine,
  BreakBanner,
  CheckOption,
  ContentSearchBar,
  EmptyModule,
  MenuOption,
  SegmentedTabs,
} from "../components/board-ui";
import {
  BoardSkeleton,
  groupByComp,
  LeagueGroup,
} from "../components/MatchRow";
import { useScrollMemory } from "../lib/scrollMemory";
import { compById } from "../lib/seed";
import { useUI } from "../lib/store/ui";
import { useWorld } from "../lib/store/world";

/* "Live & Upcoming" window — near-term kickoffs: 48h keeps every one
   of the five canonical groups populated on the default tab while still
   excluding the day-out tail (All Soccer shows the full scheduled+live
   book, per FB-01 "scheduled+live only; count honest") */
const LU_WINDOW = 48 * 3_600_000;

/* FB-01 — exactly five league groups, canonical order, always shown */
const FIVE_COMPS = ["epl", "ucl", "laliga", "seriea", "bundes"] as const;

/* market selector (FB-03): rebinds every row's cells, same geometry */
const MARKETS: { key: string; label: string }[] = [
  { key: "h2h", label: "Match result" },
  { key: "btts", label: "Both teams to score" },
  { key: "tg25", label: "Total goals" },
];

const TABS: { key: string; label: string }[] = [
  { key: "lu", label: "Live & Upcoming" },
  { key: "all", label: "All Soccer" },
];

export const Route = createFileRoute("/football")({
  /* FB-05 — tab + market + competition filter serialize in the URL.
     Optional keys only — absent params mean the default board. */
  validateSearch: (s) => {
    const out: { market?: string; comp?: string; tab?: string } = {};
    if (s.market === "btts" || s.market === "tg25")
      out.market = s.market as string;
    if (typeof s.comp === "string") out.comp = s.comp;
    if (s.tab === "all") out.tab = "all";
    return out;
  },
  pendingComponent: () => (
    <div className="mx-auto w-full max-w-5xl px-3 py-4 lg:px-5">
      <BoardSkeleton />
    </div>
  ),
  component: FootballPage,
});

/* selected competitions: absent param = all five; "epl,ucl" = subset */
const parseComps = (raw?: string) =>
  raw == null
    ? [...FIVE_COMPS]
    : raw
        .split(",")
        .filter((c) => (FIVE_COMPS as readonly string[]).includes(c));

function FootballPage() {
  useScrollMemory("/football");
  const nav = useNavigate({ from: "/football" });
  const { market = "h2h", comp: compRaw, tab = "lu" } = Route.useSearch();
  const matches = useWorld((s) => s.matches);
  const liveEmpty = useWorld((s) => s.liveEmpty);
  const follows = useUI((s) => s.follows);

  const selComps = useMemo(() => parseComps(compRaw), [compRaw]);
  const marketLabel = MARKETS.find((m) => m.key === market)!.label;

  // the five-competition book — finished rows only ever appear under
  // "All Soccer"; Live & Upcoming = live + kickoffs inside 24h
  const book = useMemo(
    () =>
      matches.filter(
        (m) =>
          (FIVE_COMPS as readonly string[]).includes(m.competitionId) &&
          m.status !== "finished",
      ),
    [matches],
  );
  const liveCount = liveEmpty
    ? 0
    : book.filter((m) => m.status === "live").length;

  const tabbed = useMemo(() => {
    let ms = book.filter((m) => selComps.includes(m.competitionId));
    if (tab === "lu")
      ms = ms.filter((m) =>
        m.status === "scheduled"
          ? m.kickoffAt - Date.now() < LU_WINDOW
          : !liveEmpty,
      );
    return ms;
  }, [book, selComps, tab, liveEmpty]);
  const luCount = useMemo(
    () =>
      book.filter(
        (m) =>
          selComps.includes(m.competitionId) &&
          (m.status === "scheduled"
            ? m.kickoffAt - Date.now() < LU_WINDOW
            : !liveEmpty),
      ).length,
    [book, liveEmpty, selComps],
  );
  const allCount = useMemo(
    () => book.filter((m) => selComps.includes(m.competitionId)).length,
    [book, selComps],
  );

  const groups = useMemo(() => {
    const grouped = groupByComp(tabbed, follows);
    // canonical five-comp order, never encounter order
    return grouped.sort(
      ([a], [b]) =>
        FIVE_COMPS.indexOf(a as (typeof FIVE_COMPS)[number]) -
        FIVE_COMPS.indexOf(b as (typeof FIVE_COMPS)[number]),
    );
  }, [tabbed, follows]);

  const setSearch = (next: { market?: string; comp?: string; tab?: string }) =>
    nav({
      search: {
        market: next.market === "h2h" ? undefined : next.market,
        comp: next.comp,
        tab: next.tab === "lu" ? undefined : next.tab,
      },
      replace: true,
    });

  const toggleComp = (cid: string) => {
    const next = selComps.includes(cid)
      ? selComps.filter((c) => c !== cid)
      : [...selComps, cid];
    const ordered = FIVE_COMPS.filter((c) => (next as string[]).includes(c));
    setSearch({
      market,
      tab,
      comp:
        ordered.length === FIVE_COMPS.length ? undefined : ordered.join(","),
    });
  };

  const compButton =
    selComps.length === FIVE_COMPS.length
      ? "All competitions"
      : `${selComps.length} competitions`;

  const compChecklist = (close: () => void) => (
    <>
      {FIVE_COMPS.map((cid) => {
        const c = compById(cid);
        const n = book.filter((m) => m.competitionId === cid).length;
        return (
          <CheckOption
            key={cid}
            checked={selComps.includes(cid)}
            count={n}
            onClick={() => toggleComp(cid)}
          >
            {c.name}
          </CheckOption>
        );
      })}
      <div className="mt-1 border-t border-c-hairline p-1">
        <button
          type="button"
          onClick={() => {
            setSearch({ market, tab, comp: undefined });
            close();
          }}
          className="w-full rounded-hb-sm px-2.5 py-2 text-left font-hb-ui text-hb-body-sec font-semibold text-c-neon transition-colors hover:bg-c-surface-3"
        >
          Select all five
        </button>
      </div>
    </>
  );

  const marketMenu = (close: () => void) => (
    <>
      {MARKETS.map((mk) => (
        <MenuOption
          key={mk.key}
          active={market === mk.key}
          onClick={() => {
            setSearch({ market: mk.key, comp: compRaw, tab });
            close();
          }}
        >
          {mk.label}
        </MenuOption>
      ))}
    </>
  );

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-3 py-4 lg:px-5">
      <BoardHeader
        title={
          <>
            Soccer
            <BoardMenu
              label="Switch sport"
              button={<span className="sr-only">switch sport</span>}
            >
              {(close) => (
                <>
                  <MenuOption active onClick={close}>
                    Soccer
                  </MenuOption>
                  {[
                    "Tennis",
                    "Basketball",
                    "Baseball",
                    "Am. Football",
                    "Esports",
                  ].map((s) => (
                    <MenuOption key={s} disabled onClick={() => {}}>
                      {s}
                    </MenuOption>
                  ))}
                </>
              )}
            </BoardMenu>
          </>
        }
        meta={`${FIVE_COMPS.length} competitions · ${liveCount} live`}
      >
        {/* desk: the market select rides the header (FB-01);
            phone: ≡ opens market + comp controls (FB-02) */}
        <div className="hidden lg:block">
          <BoardMenu
            label={`Market: ${marketLabel}`}
            button={
              <>
                <span className="text-c-text-2">Market:</span> {marketLabel}
              </>
            }
          >
            {marketMenu}
          </BoardMenu>
        </div>
        <div className="lg:hidden">
          <BoardMenu
            label="Markets and competitions"
            button={<SlidersHorizontal size={15} aria-hidden="true" />}
          >
            {(close) => (
              <>
                <p className="px-2.5 py-1 font-hb-ui text-hb-micro font-bold uppercase text-c-text-3">
                  Market
                </p>
                {marketMenu(close)}
                <p className="mt-1 border-t border-c-hairline px-2.5 py-1 font-hb-ui text-hb-micro font-bold uppercase text-c-text-3">
                  Competitions
                </p>
                {compChecklist(close)}
              </>
            )}
          </BoardMenu>
        </div>
        <BoardSessionLine className="hidden xl:block" />
      </BoardHeader>
      <ContentSearchBar />
      <BreakBanner />

      {/* tabs + competition checklist on one row (FB-01) */}
      <div className="flex items-center gap-2">
        <div className="min-w-0 flex-1 sm:max-w-96">
          <SegmentedTabs
            label="Fixture window"
            tabs={[
              { ...TABS[0], count: luCount },
              { ...TABS[1], count: allCount },
            ]}
            value={tab}
            onChange={(k) => setSearch({ market, comp: compRaw, tab: k })}
          />
        </div>
        <BoardMenu label="Filter competitions" button={compButton}>
          {compChecklist}
        </BoardMenu>
      </div>

      {/* five league groups — canonical order, stars on every head */}
      {groups.length > 0 ? (
        <div className="flex flex-col gap-4">
          {groups.map(([cid, ms]) => (
            <LeagueGroup
              key={cid}
              compId={cid}
              matches={ms}
              marketKey={market}
              marketLabel={marketLabel}
            />
          ))}
        </div>
      ) : selComps.length === 0 ? (
        /* FB-04 — deselect all five: the module names the fix */
        <EmptyModule
          title="No competitions selected"
          line="Select at least one ›"
          action={
            <button
              type="button"
              onClick={() => setSearch({ market, tab, comp: undefined })}
              className="mt-1 flex h-11 items-center rounded-hb-pill border border-c-hairline px-4 font-hb-ui text-hb-label font-semibold text-c-text transition-colors duration-(--dur-feedback) hover:bg-c-surface-2"
            >
              Reset filter
            </button>
          }
        />
      ) : (
        <EmptyModule
          title="No fixtures in this window"
          line="Widen the window or clear the competition filter."
          action={
            <button
              type="button"
              onClick={() => setSearch({ market, tab: "all", comp: undefined })}
              className="mt-1 flex h-11 items-center rounded-hb-pill border border-c-hairline px-4 font-hb-ui text-hb-label font-semibold text-c-text transition-colors duration-(--dur-feedback) hover:bg-c-surface-2"
            >
              Show all soccer
            </button>
          }
        />
      )}
    </div>
  );
}
