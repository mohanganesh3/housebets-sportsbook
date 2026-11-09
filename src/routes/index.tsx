import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, X } from "lucide-react";
import { useMemo } from "react";
import {
  BoardSessionLine,
  BreakBanner,
  ContentSearchBar,
  SectionHead,
  TextLink,
} from "../components/board-ui";
import { HeroSlider } from "../components/Hero";
import {
  BoardSkeleton,
  CompMark,
  groupByComp,
  LeagueGroup,
  MatchRow,
  RowRegion,
  StarBtn,
} from "../components/MatchRow";
import { useScrollMemory } from "../lib/scrollMemory";
import { compById, matchById, teamById } from "../lib/seed";
import { isMatchFollowed } from "../lib/selectors";
import { useUI } from "../lib/store/ui";
import { useWorld } from "../lib/store/world";
import type { Match } from "../lib/types";

export const Route = createFileRoute("/")({
  pendingComponent: () => (
    <div className="mx-auto w-full max-w-5xl px-3 py-4 lg:px-5">
      <BoardSkeleton />
    </div>
  ),
  component: HomePage,
});

const TOP_COMPS = ["epl", "ucl", "laliga", "seriea", "bundes"] as const;
const DAY = 86_400_000;

/* ── Favourites chips — removable follows + the "via ★" explainer ──── */
function FavChips() {
  const follows = useUI((s) => s.follows);
  const toggle = useUI((s) => s.toggleFollow);
  const items = [...follows]
    .map((id) => {
      const comp = compById(id);
      if (comp) return { id, label: comp.name, kind: "comp" as const };
      const team = teamById(id);
      if (team) return { id, label: team.name, kind: "team" as const };
      const match = matchById(id);
      if (match)
        return {
          id,
          label: `${match.home.short} v ${match.away.short}`,
          kind: "match" as const,
        };
      return null;
    })
    .filter(Boolean) as { id: string; label: string; kind: string }[];

  if (!items.length) {
    // HM-03 — the empty module is a differentiator, never a dead box
    return (
      <div className="flex flex-wrap items-center gap-2 rounded-hb-md bg-c-surface-1 px-3 py-2.5">
        <p className="me-1 font-hb-ui text-hb-body-sec text-c-text-2">
          Nothing followed yet — ★ any team or league pins it here
        </p>
        <button
          type="button"
          onClick={() => toggle("epl")}
          className="flex h-8 items-center gap-1 rounded-hb-pill bg-c-surface-2 px-3 font-hb-ui text-hb-label font-semibold text-c-text transition-colors duration-(--dur-feedback) hover:bg-c-surface-3"
        >
          <Star size={11} aria-hidden="true" /> Premier League
        </button>
        <button
          type="button"
          onClick={() => toggle("ars")}
          className="flex h-8 items-center gap-1 rounded-hb-pill bg-c-surface-2 px-3 font-hb-ui text-hb-label font-semibold text-c-text transition-colors duration-(--dur-feedback) hover:bg-c-surface-3"
        >
          <Star size={11} aria-hidden="true" /> Arsenal
        </button>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map((it) => (
        <span
          key={it.id}
          className="flex h-8 items-center gap-1.5 rounded-hb-pill bg-c-surface-2 pe-1.5 ps-2.5 font-hb-ui text-hb-label font-semibold text-c-text"
        >
          <Star
            size={11}
            aria-hidden="true"
            className="fill-c-gold text-c-gold"
          />
          <span className="max-w-36 truncate">{it.label}</span>
          <button
            type="button"
            onClick={() => toggle(it.id)}
            aria-label={`Unfollow ${it.label}`}
            className="grid size-6 place-items-center rounded-full text-c-text-2 transition-colors duration-(--dur-feedback) hover:bg-c-surface-3 hover:text-c-text"
          >
            <X size={12} aria-hidden="true" />
          </button>
        </span>
      ))}
      <span className="font-hb-ui text-hb-micro text-c-text-3">
        + Add — via ★ anywhere
      </span>
    </div>
  );
}

/* ── LIVE NOW strip — before the hero on every width (D-16) ────────── */
function LiveStrip({ live }: { live: Match[] }) {
  if (!live.length) return null;
  return (
    <section aria-label="Live now" className="flex flex-col gap-2">
      <SectionHead
        title={
          <span className="inline-flex items-center gap-2">
            <span
              aria-hidden="true"
              className="hb-live-pulse size-2 rounded-full bg-c-live"
            />
            Live now
          </span>
        }
        count={live.length}
        aside={<TextLink to="/live">View all live</TextLink>}
      />
      <RowRegion>
        {live.slice(0, 3).map((m, i) => (
          <MatchRow
            key={m.id}
            match={m}
            className={i >= 2 ? "hidden lg:block" : ""}
          />
        ))}
      </RowRegion>
    </section>
  );
}

/* ── YOUR MATCHES — followed fixtures, live first (HM-01) ──────────── */
function YourMatches({ mine }: { mine: Match[] }) {
  if (!mine.length) return null; // collapses entirely when no follows hit
  return (
    <section aria-label="Your matches" className="flex flex-col gap-2">
      <SectionHead
        title="Your matches"
        count={mine.length}
        countSuffix={` match${mine.length === 1 ? "" : "es"} — from your follows`}
        aside={
          <span className="font-hb-ui text-hb-micro text-c-text-3">
            Match result
          </span>
        }
      />
      <RowRegion>
        {mine.map((m) => (
          <MatchRow key={m.id} match={m} />
        ))}
      </RowRegion>
    </section>
  );
}

/* ── TOP COMPETITIONS — five league tiles w/ ★ + true live counts ──── */
function TopCompetitions({ live }: { live: Match[] }) {
  const liveIn = (cid: string) =>
    live.filter((m) => m.competitionId === cid).length;
  return (
    <section aria-label="Top competitions" className="flex flex-col gap-2">
      <SectionHead title="Top competitions" count={TOP_COMPS.length} />
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
        {TOP_COMPS.map((cid) => {
          const comp = compById(cid);
          const n = liveIn(cid);
          return (
            <div
              key={cid}
              className="flex items-center gap-2 rounded-hb-md bg-c-surface-1 px-3 py-2.5"
            >
              <CompMark comp={comp} />
              <Link
                to="/football"
                search={{ comp: cid }}
                className="min-w-0 flex-1 font-hb-ui text-hb-label font-semibold text-c-text transition-colors duration-(--dur-feedback) hover:text-c-neon"
              >
                <span className="block truncate">{comp.name}</span>
                <span
                  className={`block font-hb-num text-hb-micro tabular-nums ${
                    n ? "text-c-live" : "text-c-text-3"
                  }`}
                >
                  {n} live
                </span>
              </Link>
              <StarBtn id={cid} name={comp.name} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

function HomePage() {
  useScrollMemory("/");
  const matches = useWorld((s) => s.matches);
  const liveEmpty = useWorld((s) => s.liveEmpty);
  const follows = useUI((s) => s.follows);

  const live = useMemo(
    () => (liveEmpty ? [] : matches.filter((m) => m.status === "live")),
    [matches, liveEmpty],
  );
  const scheduled = useMemo(
    () =>
      matches
        .filter((m) => m.status === "scheduled")
        .sort((a, b) => a.kickoffAt - b.kickoffAt),
    [matches],
  );
  const featured = useMemo(
    () =>
      matches
        .filter((m) => m.featured)
        .sort(
          (a, b) =>
            (a.status === "live" ? 0 : 1) - (b.status === "live" ? 0 : 1) ||
            a.kickoffAt - b.kickoffAt,
        ),
    [matches],
  );
  const mine = useMemo(
    () =>
      matches
        .filter((m) => isMatchFollowed(m, follows) && m.status !== "finished")
        .sort(
          (a, b) =>
            (a.status === "live" ? 0 : a.status === "scheduled" ? 1 : 2) -
              (b.status === "live" ? 0 : b.status === "scheduled" ? 1 : 2) ||
            a.kickoffAt - b.kickoffAt,
        ),
    [matches, follows],
  );
  // Starting soon = real kickoffs inside 24h (countdown surfaces);
  // the day-out tail lives under Upcoming events (E-BRD-05 grammar)
  const soon = scheduled
    .filter((m) => m.kickoffAt - Date.now() < DAY)
    .slice(0, 3);
  const upcoming = scheduled.filter((m) => !soon.includes(m));

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-3 py-4 lg:px-5">
      <div className="flex items-center gap-3">
        <ContentSearchBar />
        <BoardSessionLine className="hidden sm:block" />
      </div>
      <BreakBanner />
      <FavChips />
      <LiveStrip live={live} />
      <section aria-label="Featured fixtures">
        <HeroSlider matches={featured} />
      </section>
      <YourMatches mine={mine} />
      {soon.length > 0 && (
        <section aria-label="Starting soon" className="flex flex-col gap-2">
          <SectionHead
            title="Starting soon"
            aside={
              <span className="font-hb-ui text-hb-micro text-c-text-3">
                Kickoff countdowns
              </span>
            }
          />
          <RowRegion>
            {soon.map((m) => (
              <MatchRow key={m.id} match={m} />
            ))}
          </RowRegion>
        </section>
      )}
      <TopCompetitions live={live} />
      {upcoming.length > 0 && (
        <section aria-label="Upcoming events" className="flex flex-col gap-2">
          <SectionHead title="Upcoming events" count={upcoming.length} />
          <div className="flex flex-col gap-4">
            {groupByComp(upcoming, follows).map(([cid, ms]) => (
              <LeagueGroup key={cid} compId={cid} matches={ms} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
