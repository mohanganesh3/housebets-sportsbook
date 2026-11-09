import { createFileRoute, Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { groupByComp, LeagueSection, MatchRow } from "../components/MatchRow";
import { EmptyState, FollowStar, TeamLogo } from "../components/primitives";
import { compById, TEAMS } from "../lib/seed";
import { isMatchFollowed } from "../lib/selectors";
import { useUI } from "../lib/store/ui";
import { useWorld } from "../lib/store/world";

export const Route = createFileRoute("/following")({
  component: FollowingPage,
});

function FollowingPage() {
  const matches = useWorld((s) => s.matches);
  const follows = useUI((s) => s.follows);
  const mine = matches.filter((m) => isMatchFollowed(m, follows));
  const live = mine.filter((m) => m.status === "live");
  const upcoming = mine
    .filter((m) => m.status === "scheduled")
    .sort((a, b) => a.kickoffAt - b.kickoffAt);
  const teams = Object.values(TEAMS).filter((t) => follows.has(t.id));
  const comps = Object.keys(
    matches.reduce<Record<string, true>>((a, m) => {
      if (follows.has(m.competitionId)) a[m.competitionId] = true;
      return a;
    }, {}),
  );

  return (
    <div className="mx-auto max-w-4xl px-3 py-4 lg:px-5">
      <div className="mb-4 flex items-center gap-3">
        <h1 className="font-display text-[20px] font-bold">Following</h1>
        <span className="rounded-full bg-warning-a15 px-2 py-0.5 font-odds text-[11px] font-bold text-warning-400">
          {mine.length} matches · {follows.size} starred
        </span>
        <p className="ml-auto hidden text-[12px] text-text-tertiary sm:block">
          Star teams, matches or leagues · they live here
        </p>
      </div>

      {follows.size === 0 ? (
        <EmptyState
          icon={<Star size={26} className="text-warning-400/60" />}
          title="Nothing followed yet"
          hint="Tap the star on any match, team or league. Your picks collect here · live first, kickoffs next · so you never hunt for your bet twice."
          action={
            <div className="mt-1 flex items-center gap-2">
              <Link
                to="/football"
                className="btn-primary rounded-lg px-4 py-2 text-[13px] font-bold"
              >
                Browse football
              </Link>
              <button
                type="button"
                onClick={() => useUI.getState().toggleFollow("epl")}
                className="rounded-lg border border-gold-500/40 bg-warning-a15 px-4 py-2 text-[13px] font-semibold text-gold-500 transition-colors hover:bg-warning-a15/70"
              >
                <Star size={13} className="inline fill-gold-500" /> Premier
                League
              </button>
            </div>
          }
        />
      ) : (
        <div className="space-y-5">
          {teams.length > 0 && (
            <section>
              <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
                Teams
              </h2>
              <div className="flex flex-wrap gap-2">
                {teams.map((t) => (
                  <span
                    key={t.id}
                    className="flex items-center gap-2 rounded-xl border border-border-soft bg-surface-secondary px-2.5 py-1.5"
                  >
                    <TeamLogo team={t} size={18} />
                    <span className="text-[13px] font-medium">{t.name}</span>
                    <FollowStar id={t.id} size={14} />
                  </span>
                ))}
              </div>
            </section>
          )}

          {live.length > 0 && (
            <section>
              <h2 className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
                <span className="size-1.5 animate-pulse rounded-full bg-error-400" />
                Live now · {live.length}
              </h2>
              <div className="space-y-1 rounded-xl border border-border-soft bg-surface-primary p-1.5">
                {live.map((m) => (
                  <MatchRow key={m.id} match={m} />
                ))}
              </div>
            </section>
          )}

          {upcoming.length > 0 && (
            <section>
              <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
                Coming up · {upcoming.length}
              </h2>
              <div className="space-y-3">
                {groupByComp(upcoming).map(([cid, ms]) => (
                  <LeagueSection key={cid} compId={cid} matches={ms} />
                ))}
              </div>
            </section>
          )}

          {comps.length > 0 && (
            <section>
              <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
                Leagues
              </h2>
              <div className="flex flex-wrap gap-2">
                {comps.map((cid) => {
                  const c = compById(cid);
                  return c ? (
                    <span
                      key={cid}
                      className="flex items-center gap-2 rounded-xl border border-border-soft bg-surface-secondary px-3 py-1.5 text-[13px] font-medium"
                    >
                      {c.name}
                      <FollowStar id={c.id} size={14} />
                    </span>
                  ) : null;
                })}
              </div>
            </section>
          )}

          {mine.length === 0 && (
            <p className="rounded-xl border border-dashed border-border-very-strong px-4 py-8 text-center text-[13px] text-text-tertiary">
              Your followed teams and leagues have no fixtures in this window.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
