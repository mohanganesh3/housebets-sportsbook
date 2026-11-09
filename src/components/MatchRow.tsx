import { Link } from "@tanstack/react-router";
import { ChevronRight, Star } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import { compById, compShort } from "../lib/seed";
import { useBets } from "../lib/store/bets";
import { useUI } from "../lib/store/ui";
import { useWorld } from "../lib/store/world";
import type { Competition, Match } from "../lib/types";
import { TeamCrest } from "./Crest";
import { LockGlyph, OddsCell } from "./odds/OddsCell";

/* ==================================================================
   MatchRow — THE shared coupon grammar (E-BRD-01/E-BRD-02, SA4-01).
   One component renders on Home, Live and Football, desk and phone.

   Desk (lg+): clock column | crest+name lines (scores right) |
               odds cells | susp chip | bet mark | +N ›
   Phone:      header (status · comp · ★ · +N ›) | two team lines |
               odds row (susp = amber band over dimmed prices)

   Grammar laws honoured here:
   · scheduled rows NEVER render 0–0 — kickoff time or countdown
   · suspended = last prices at 60%, inert, amber reason chip, +N stays
   · counts are arithmetic-true from the book, never decorative
   ================================================================== */

/* ── clock grammar (E-BRD-05): live badge + minute/HT/period words ── */
export const clockText = (mt: Match): string => {
  if (mt.period === "HT") return "HT";
  if (mt.period === "FT") return "FT";
  if (mt.period === "1st half" && (mt.minute ?? 0) > 45)
    return `45+${(mt.minute ?? 45) - 45}′`;
  if (mt.period === "2nd half" && (mt.minute ?? 0) > 90)
    return `90+${(mt.minute ?? 90) - 90}′`;
  if (mt.period && mt.period !== "1st half" && mt.period !== "2nd half")
    return mt.period;
  return `${mt.minute ?? 0}′`;
};

const kickTime = (ts: number) =>
  new Date(ts).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
const kickDay = (ts: number) => {
  const d = new Date(ts);
  const now = new Date();
  const tmr = new Date(now);
  tmr.setDate(now.getDate() + 1);
  if (d.toDateString() === now.toDateString()) return "Today";
  if (d.toDateString() === tmr.toDateString()) return "Tomorrow";
  return d.toLocaleDateString([], {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
};
const DAY = 86_400_000;

/* ── ★ follow — canonical gold glyph, never a fill; one action idiom ── */
export function StarBtn({ id, name }: { id: string; name: string }) {
  const on = useUI((s) => s.follows.has(id));
  const toggle = useUI((s) => s.toggleFollow);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        toggle(id);
      }}
      aria-pressed={on}
      aria-label={on ? `Unfollow ${name}` : `Follow ${name}`}
      className="-m-1.5 grid size-11 shrink-0 place-items-center rounded-hb-sm text-c-text-3 transition-colors duration-(--dur-feedback) hover:text-c-gold"
    >
      <Star
        size={15}
        aria-hidden="true"
        className={on ? "fill-c-gold text-c-gold" : ""}
        strokeWidth={on ? 0 : 1.8}
      />
    </button>
  );
}

/* ── countdown chip (E-BRD-05): one chip, honest formats ────────────
   <1h  → Kicks off in MM:SS (ticking)
   <24h → Kicks off in HH:MM
   ≥24h → Tomorrow HH:MM · Day, Mon DD · HH:MM                       */
export function CountdownChip({ kickoffAt }: { kickoffAt: number }) {
  const [now, setNow] = useState(() => Date.now());
  const rem = Math.max(0, kickoffAt - now);
  const urgent = rem > 0 && rem < 60_000;
  const tick = rem < 3_600_000 ? 1_000 : 15_000;
  useEffect(() => {
    const iv = setInterval(() => setNow(Date.now()), tick);
    return () => clearInterval(iv);
  }, [tick]);
  let text: string;
  if (rem >= DAY)
    text =
      kickDay(kickoffAt) === "Tomorrow"
        ? `Tomorrow ${kickTime(kickoffAt)}`
        : `${kickDay(kickoffAt)} · ${kickTime(kickoffAt)}`;
  else if (rem >= 3_600_000) {
    const h = Math.floor(rem / 3_600_000);
    const m = Math.floor((rem % 3_600_000) / 60_000);
    text = `Kicks off in ${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  } else {
    const m = Math.floor(rem / 60_000);
    const s = Math.floor((rem % 60_000) / 1_000);
    text = `Kicks off in ${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return (
    <span
      role="timer"
      className={`inline-flex h-6 shrink-0 items-center whitespace-nowrap rounded-hb-sm bg-c-surface-2 px-2 font-hb-num text-hb-micro tabular-nums ${
        urgent ? "text-c-text" : "text-c-text-2"
      }`}
    >
      {text}
    </span>
  );
}

/* ── suspended chip — amber reason, S3 vocabulary, +N stays ───────── */
export function SuspChip({ reason, band }: { reason: string; band?: boolean }) {
  return (
    <span
      role="status"
      className={`inline-flex h-6 max-w-full items-center gap-1 truncate rounded-hb-sm bg-c-suspend px-2 font-hb-ui text-hb-micro font-bold text-c-suspend-fg ${
        band ? "hb-susp-band" : ""
      }`}
    >
      <LockGlyph className="size-3 shrink-0" />
      <span className="truncate">Suspended — {reason}</span>
    </span>
  );
}

/* ── your-open-bet marker — quiet neon fact, never a CTA ──────────── */
export function BetMark({ matchId }: { matchId: string }) {
  const n = useBets(
    (s) =>
      s.bets.filter((b) => b.result === "open" && b.matchId === matchId).length,
  );
  if (!n) return null;
  return (
    <span
      role="img"
      aria-label={`${n} open bet${n > 1 ? "s" : ""} on this match`}
      className="font-hb-num text-hb-micro font-semibold text-c-neon"
    >
      ●{n}
    </span>
  );
}

/* ── +N › — arithmetic-true market count, always navigable ────────── */
export function MoreLink({ mt }: { mt: Match }) {
  const n = mt.markets.length;
  return (
    <Link
      to="/match/$matchId"
      params={{ matchId: mt.id }}
      aria-label={`View all ${n} markets, ${mt.home.short} v ${mt.away.short}`}
      className="flex min-h-11 shrink-0 items-center gap-0.5 rounded-hb-sm px-1 font-hb-num text-hb-micro font-semibold text-c-text-2 transition-colors duration-(--dur-feedback) hover:text-c-neon lg:min-h-9"
    >
      +{n}
      <ChevronRight size={12} aria-hidden="true" className="rtl:-scale-x-100" />
    </Link>
  );
}

/* ── live status — badge pair + clock; offline freezes to a caption ── */
function LiveStatus({ mt }: { mt: Match }) {
  const offline = useUI((s) => s.offline);
  return (
    <span className="flex items-center gap-1">
      <span
        aria-hidden="true"
        className="hb-live-pulse size-1.5 shrink-0 rounded-full bg-c-live"
      />
      <span className="font-hb-ui text-hb-micro font-bold uppercase text-c-live">
        Live
      </span>
      <span className="font-hb-num text-hb-micro font-semibold text-c-live tabular-nums">
        {clockText(mt)}
      </span>
      {offline && (
        <span className="font-hb-ui text-hb-micro text-c-text-3">Frozen</span>
      )}
    </span>
  );
}

/* ── desk clock column — fixed so live→scheduled flips never move
   the row (E-BRD-05 layout honesty) ────────────────────────────────── */
function StatusCol({ mt }: { mt: Match }) {
  return (
    <div className="flex w-14 flex-col items-start justify-center gap-0.5">
      {mt.status === "live" && <LiveStatus mt={mt} />}
      {mt.status === "scheduled" && (
        <>
          <span className="font-hb-num text-hb-body-sec font-semibold text-c-text tabular-nums">
            {kickTime(mt.kickoffAt)}
          </span>
          <span className="max-w-full truncate font-hb-ui text-hb-micro text-c-text-3">
            {kickDay(mt.kickoffAt)}
          </span>
        </>
      )}
      {mt.status === "finished" && (
        <span className="font-hb-ui text-hb-label font-bold text-c-text-2">
          FT
        </span>
      )}
    </div>
  );
}

/* ── team line — crest + end-ellipsed name + optional team ★ + score ── */
function TeamLine({
  mt,
  team,
  score,
  star,
}: {
  mt: Match;
  team: Match["home"];
  score?: number;
  star?: boolean;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <TeamCrest team={team} size={20} />
      <Link
        to="/match/$matchId"
        params={{ matchId: mt.id }}
        className="min-w-0 flex-1 truncate font-hb-ui text-hb-body-sec font-semibold text-c-text transition-colors duration-(--dur-feedback) hover:text-c-neon"
      >
        {team.name}
      </Link>
      {star && <StarBtn id={team.id} name={team.name} />}
      {score != null && (
        <span className="w-6 shrink-0 text-end font-hb-num text-hb-body-sec font-bold text-c-text tabular-nums">
          {score}
        </span>
      )}
    </div>
  );
}

/* ── the row ───────────────────────────────────────────────────────── */
export function MatchRow({
  match: seedMatch,
  marketKey = "h2h",
  className = "",
}: {
  match: Match;
  marketKey?: string;
  className?: string;
}) {
  // consume the live book — engine ticks/suspends/goals must show here
  const mt = useWorld((s) => s.matches.find((m) => m.id === seedMatch.id))!;
  const comp = compById(mt.competitionId);
  const mkt =
    mt.markets.find((m) => m.key === marketKey) ??
    mt.markets.find((m) => m.key === "h2h") ??
    mt.markets[0];
  const suspReason = useWorld((s) => s.suspReasons[mkt.id]);
  const suspended = mkt.status === "suspended";
  const cols = Math.min(3, mkt.outcomes.length);
  const scored = mt.status !== "scheduled";
  const soon = mt.status === "scheduled" && mt.kickoffAt - Date.now() < DAY;
  const cells = mkt.outcomes
    .slice(0, cols)
    .map((o) => (
      <OddsCell
        key={o.id}
        outcome={o}
        market={mkt}
        match={mt}
        verb={mkt.key === "h2h" ? "to win" : undefined}
      />
    ));

  return (
    <div
      className={`hb-row transition-colors duration-(--dur-feedback) hover:bg-c-surface-3 ${className}`}
    >
      {/* ─── desk coupon row (lg+) ─── */}
      <article className="hidden items-center gap-3 px-3 py-2 lg:grid lg:grid-cols-[3.5rem_minmax(0,1fr)_auto]">
        <StatusCol mt={mt} />
        <div className="flex min-w-0 flex-col gap-0.5">
          <TeamLine
            mt={mt}
            team={mt.home}
            score={scored ? mt.score.home : undefined}
            star
          />
          <TeamLine
            mt={mt}
            team={mt.away}
            score={scored ? mt.score.away : undefined}
            star
          />
        </div>
        <div className="flex items-center gap-2">
          <div
            data-cellgrid
            inert={suspended || undefined}
            className={`grid w-64 gap-2 ${
              cols === 2 ? "grid-cols-2" : "grid-cols-3"
            }`}
          >
            {cells}
          </div>
          {suspended && <SuspChip reason={suspReason ?? "betting paused"} />}
          {soon && <CountdownChip kickoffAt={mt.kickoffAt} />}
          <BetMark matchId={mt.id} />
          <MoreLink mt={mt} />
        </div>
      </article>

      {/* ─── phone coupon (<lg) ─── */}
      <article className="flex flex-col gap-2 px-3 py-2.5 lg:hidden">
        <div className="flex min-w-0 items-center gap-1.5">
          {mt.status === "live" && <LiveStatus mt={mt} />}
          {mt.status === "scheduled" &&
            (soon ? (
              <CountdownChip kickoffAt={mt.kickoffAt} />
            ) : (
              <span className="shrink-0 font-hb-num text-hb-micro font-semibold text-c-text-2 tabular-nums">
                {kickDay(mt.kickoffAt)} {kickTime(mt.kickoffAt)}
              </span>
            ))}
          {mt.status === "finished" && (
            <span className="font-hb-ui text-hb-micro font-bold text-c-text-2">
              FT
            </span>
          )}
          <span aria-hidden="true" className="shrink-0 text-c-text-3">
            ·
          </span>
          <span className="min-w-0 flex-1 truncate font-hb-ui text-hb-micro text-c-text-2">
            {comp.name}
          </span>
          <BetMark matchId={mt.id} />
          <StarBtn id={mt.id} name={`${mt.home.short} v ${mt.away.short}`} />
          <MoreLink mt={mt} />
        </div>
        <div className="flex min-w-0 flex-col gap-1">
          <TeamLine
            mt={mt}
            team={mt.home}
            score={scored ? mt.score.home : undefined}
          />
          <TeamLine
            mt={mt}
            team={mt.away}
            score={scored ? mt.score.away : undefined}
          />
        </div>
        <div className="relative">
          <div
            data-cellgrid
            inert={suspended || undefined}
            className={`grid gap-2 ${
              cols === 2 ? "grid-cols-2" : "grid-cols-3"
            }`}
          >
            {cells}
          </div>
          {suspended && (
            <SuspChip reason={suspReason ?? "betting paused"} band />
          )}
        </div>
      </article>
    </div>
  );
}

/* ── flat coupon region — s1 + hairline rows, no border, no card ──── */
export function RowRegion({ children }: { children: ReactNode }) {
  return (
    <div className="hb-coupon rounded-hb-md bg-c-surface-1">{children}</div>
  );
}

/* ── league group (E-BRD-02): sticky head — comp mark + name +
   count + ★ + market label + View all ›; body = coupon region ─────── */
export function CompMark({ comp }: { comp: Competition }) {
  return (
    <span
      aria-hidden="true"
      className="grid size-6 shrink-0 place-items-center rounded-hb-sm bg-c-surface-2 font-hb-num text-hb-micro font-bold text-c-text-2"
    >
      {compShort(comp.id)}
    </span>
  );
}

export function LeagueGroup({
  compId,
  matches,
  marketKey = "h2h",
  marketLabel,
  compLink = "/football",
}: {
  compId: string;
  matches: Match[];
  marketKey?: string;
  marketLabel?: string;
  compLink?: "/football" | "/live";
}) {
  const comp = compById(compId);
  if (!matches.length) return null;
  return (
    <section aria-label={comp.name} className="rounded-hb-md bg-c-surface-1">
      <header className="hb-grouphead flex items-center gap-2 px-3">
        <CompMark comp={comp} />
        <h3 className="min-w-0 flex-1 truncate font-hb-ui text-hb-label font-bold text-c-text">
          {comp.name}
          <span className="font-normal text-c-text-2">
            {" "}
            · {matches.length} {matches.length === 1 ? "match" : "matches"}
          </span>
        </h3>
        <StarBtn id={compId} name={comp.name} />
        {marketLabel && (
          <span className="hidden shrink-0 font-hb-ui text-hb-micro text-c-text-3 sm:inline">
            {marketLabel}
          </span>
        )}
        <Link
          to={compLink}
          search={{ comp: compId }}
          aria-label={`View all ${matches.length} ${comp.name} matches`}
          className="flex min-h-8 shrink-0 items-center gap-0.5 rounded-hb-sm px-1 font-hb-ui text-hb-micro font-semibold text-c-neon"
        >
          <span className="hidden sm:inline">View all {matches.length}</span>
          <span className="sm:hidden">All {matches.length}</span>
          <ChevronRight
            size={12}
            aria-hidden="true"
            className="rtl:-scale-x-100"
          />
        </Link>
      </header>
      <div className="hb-coupon">
        {matches.map((m) => (
          <MatchRow key={m.id} match={m} marketKey={marketKey} />
        ))}
      </div>
    </section>
  );
}

/* legacy name kept for the Following page — same component */
export const LeagueSection = LeagueGroup;

/* ── group + order: PL first, then followed comps, then seed order ── */
export function groupByComp(
  matches: Match[],
  follows?: Set<string>,
): [string, Match[]][] {
  const seen = new Map<string, Match[]>();
  for (const m of matches) {
    const arr = seen.get(m.competitionId) ?? [];
    arr.push(m);
    seen.set(m.competitionId, arr);
  }
  const entries = [...seen.entries()];
  return entries.sort(([a], [b]) => {
    const rank = (id: string, i: number) =>
      id === "epl" ? 0 : follows?.has(id) ? 1 : 2 + i / 1000;
    return rank(a, 0) - rank(b, 0);
  });
}

/* ── skeleton — real markup, is-loading geometry (E-BRD-10) ────────── */
export function MatchRowSkeleton() {
  return (
    <div className="hb-row">
      <article className="hidden items-center gap-3 px-3 py-2 lg:grid lg:grid-cols-[3.5rem_minmax(0,1fr)_auto]">
        <div className="flex w-14 flex-col gap-1.5">
          <span className="hb-sk h-3.5 w-10" />
          <span className="hb-sk h-3 w-8" />
        </div>
        <div className="flex min-w-0 flex-col gap-1.5">
          {[60, 42].map((w) => (
            <div key={w} className="flex items-center gap-2">
              <span className="hb-sk size-5 rounded-full" />
              <span className="hb-sk h-3.5" style={{ width: `${w}%` }} />
            </div>
          ))}
        </div>
        <div className="grid w-64 grid-cols-3 gap-2">
          <span className="hb-sk h-9" />
          <span className="hb-sk h-9" />
          <span className="hb-sk h-9" />
        </div>
      </article>
      <article className="flex flex-col gap-2 px-3 py-2.5 lg:hidden">
        <div className="flex items-center gap-2">
          <span className="hb-sk h-3.5 w-16" />
          <span className="hb-sk h-3.5 w-24" />
          <span className="hb-sk ms-auto h-3.5 w-10" />
        </div>
        {[55, 38].map((w) => (
          <div key={w} className="flex items-center gap-2">
            <span className="hb-sk size-5 rounded-full" />
            <span className="hb-sk h-3.5" style={{ width: `${w}%` }} />
          </div>
        ))}
        <div className="grid grid-cols-3 gap-2">
          <span className="hb-sk h-11" />
          <span className="hb-sk h-11" />
          <span className="hb-sk h-11" />
        </div>
      </article>
    </div>
  );
}

/* pending route skeleton — the honest async moment (code-split chunk) */
export function BoardSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-4" role="status" aria-label="Loading">
      <span className="hb-sk h-9 w-56 rounded-hb-pill" />
      <div className="hb-coupon rounded-hb-md bg-c-surface-1">
        {Array.from({ length: rows }, (_, i) => (
          <MatchRowSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
