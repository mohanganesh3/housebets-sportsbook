import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Search,
  Star,
  X,
} from "lucide-react";
import {
  type CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { TeamCrest } from "../components/Crest";
import {
  CloudOffGlyph,
  LockGlyph,
  MorphNumber,
  OddsCell,
} from "../components/odds/OddsCell";
import { FollowStar } from "../components/primitives";
import { useEngine } from "../lib/engine";
import {
  GROUP_ORDER,
  isCashoutEligible,
  outcomeVerdict,
  settlesOn90,
} from "../lib/matchBook";
import { compById, matchById } from "../lib/seed";
import { useBets } from "../lib/store/bets";
import { useUI } from "../lib/store/ui";
import { useWorld } from "../lib/store/world";
import type { Market, MarketGroupKey, Match } from "../lib/types";
import "../styles/match.css";

export const Route = createFileRoute("/match/$matchId")({
  component: MatchPage,
});

const fmtCountdown = (ms: number) => {
  const mins = Math.max(0, Math.ceil(ms / 60_000));
  if (mins < 60) return `${mins}m`;
  const h = Math.floor(mins / 60);
  return `${h}h ${mins % 60}m`;
};

// E-M-03 honest clock — `45+2′` / `90+3′` stoppage reads correctly
const clockText = (m: Match) =>
  m.period === "HT" || m.period === "FT"
    ? m.period
    : m.period === "1st half" && (m.minute ?? 0) > 45
      ? `45+${(m.minute ?? 45) - 45}′`
      : m.period === "2nd half" && (m.minute ?? 0) > 90
        ? `90+${(m.minute ?? 90) - 90}′`
        : `${m.minute ?? ""}′`;

// desk breakpoint — read from the token var at runtime (a raw px
// literal here would trip the token gate; the value IS --bp-1440)
const deskMq = () => {
  const v =
    Number.parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--bp-1440"),
    ) || 1440;
  return window.matchMedia(`(min-width: ${v}px)`);
};
function useDesk() {
  const [desk, setDesk] = useState(
    () => typeof window !== "undefined" && deskMq().matches,
  );
  useEffect(() => {
    const mq = deskMq();
    const fn = () => setDesk(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return desk;
}

/* ── E-M-03 — `● LIVE` badge (live bg + live-fg, word+dot+fill) with
   the minute kept as --c-text data (clocks are content, not accents) ─ */
function LiveClock({ match }: { match: Match }) {
  return (
    <span className="flex items-center gap-2" role="status">
      <span className="inline-flex h-5 items-center gap-1.5 rounded-hb-pill bg-c-live px-2 font-hb-ui text-hb-label font-bold uppercase leading-none text-c-live-fg">
        <span
          className="ds-live-dot size-1.5 rounded-hb-pill bg-c-live-fg"
          aria-hidden="true"
        />
        Live
      </span>
      <span className="font-hb-num text-hb-clock font-semibold tabular-nums text-c-text">
        {clockText(match)}
      </span>
    </span>
  );
}

/* ── E-M-04 — per-team follow pill (gold = the glyph, never a fill) ── */
function FollowPill({ teamId, name }: { teamId: string; name: string }) {
  const on = useUI((s) => s.follows.has(teamId));
  const toggle = useUI((s) => s.toggleFollow);
  return (
    <button
      type="button"
      onClick={() => toggle(teamId)}
      aria-pressed={on}
      aria-label={on ? `Following ${name} — tap to unfollow` : `Follow ${name}`}
      className="flex h-8 items-center gap-1 rounded-hb-pill border border-c-hairline px-3 font-hb-ui text-hb-label font-semibold text-c-text-2 transition-colors duration-(--dur-feedback) hover:text-c-text"
    >
      <Star
        size={12}
        aria-hidden="true"
        className={on ? "fill-c-gold text-c-gold" : "text-c-text-2"}
        strokeWidth={on ? 0 : 1.8}
      />
      {on ? "Following" : "Follow"}
    </button>
  );
}

/* ── E-M-09 — the one suspend chip, shared verbatim (amber bg + dark
   fg + lock glyph; `Suspended — {reason}` or the honest fallback) ─── */
function SuspChip({ reason }: { reason?: string }) {
  return (
    <span className="inline-flex h-6 shrink-0 items-center gap-1 rounded-hb-pill bg-c-suspend px-2 font-hb-ui text-hb-micro font-semibold text-c-suspend-fg">
      <LockGlyph className="size-3.5" />
      Suspended — {reason ?? "betting paused"}
    </span>
  );
}

/* ── E-M-07 — market accordion: hairline region, never a card ─────── */
function MarketAccordion({
  market,
  match,
  open,
  onToggle,
  forceOpen,
}: {
  market: Market;
  match: Match;
  open: boolean;
  onToggle: () => void;
  forceOpen?: boolean;
}) {
  const reason = useWorld((s) => s.suspReasons[market.id]);
  const susp = market.status === "suspended";
  const finished = match.status === "finished";
  const expanded = forceOpen || open;
  const regionId = `acc-${market.id}`;
  const cells = market.outcomes.length;
  // ≤3 outcomes/row on phone (P51-10); desk rows are label-left/price-right
  // for ≤3-outcome markets, a 3-up grid for deeper books
  const grid =
    cells <= 1
      ? "grid-cols-1"
      : cells === 2
        ? "grid-cols-2 desk:grid-cols-1"
        : cells === 3
          ? "grid-cols-3 desk:grid-cols-1"
          : "grid-cols-2 desk:grid-cols-3";
  return (
    <section className="border-b border-c-hairline">
      <div className="flex min-h-12 items-center gap-2 pe-1">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          aria-controls={regionId}
          className="flex min-w-0 flex-1 items-center gap-2 py-2 text-left"
        >
          <span className="min-w-0 flex-1">
            <span className="block truncate font-hb-ui text-hb-h1 font-semibold text-c-text">
              {market.name}
            </span>
            {!finished && settlesOn90(market) && (
              <span className="block font-hb-ui text-hb-micro text-c-text-2">
                Settles on 90′ + stoppage
              </span>
            )}
          </span>
          <ChevronUp
            size={18}
            aria-hidden="true"
            className={`shrink-0 text-c-text-2 transition-transform duration-(--dur-move) ease-standard ${expanded ? "" : "rotate-180"}`}
          />
        </button>
        {susp && !finished && <SuspChip reason={reason} />}
      </div>
      <div className="hb-acc" data-closed={!expanded}>
        <div className="hb-acc-body">
          <section
            id={regionId}
            aria-label={market.name}
            data-cellgrid
            className={`grid ${grid} gap-2 pb-3`}
          >
            {market.outcomes.map((o) => (
              <OddsCell
                key={o.id}
                outcome={o}
                market={market}
                match={match}
                cashoutEligible={isCashoutEligible(market)}
                settleMark={
                  finished ? outcomeVerdict(market, o, match) : undefined
                }
                verb={market.key === "h2h" ? "to win" : undefined}
              />
            ))}
          </section>
        </div>
      </div>
    </section>
  );
}

/* ── Group accordion section — first-N expanded + `+N more markets` ── */
function MarketGroup({
  label,
  markets,
  match,
  defaultOpen,
  forceOpen,
}: {
  label?: string;
  markets: Market[];
  match: Match;
  defaultOpen: number;
  forceOpen?: boolean;
}) {
  const [closed, setClosed] = useState<Set<string>>(
    () => new Set(markets.slice(defaultOpen).map((m) => m.id)),
  );
  const collapsed = markets.filter((m) => closed.has(m.id));
  return (
    <div>
      {label && (
        <h2 className="pb-1 pt-3 font-hb-ui text-hb-label font-semibold text-c-text-2">
          {label}{" "}
          <span className="font-hb-num tabular-nums">{markets.length}</span>
        </h2>
      )}
      {markets.map((mk) => (
        <MarketAccordion
          key={mk.id}
          market={mk}
          match={match}
          open={!closed.has(mk.id)}
          onToggle={() =>
            setClosed((c) => {
              const n = new Set(c);
              if (n.has(mk.id)) n.delete(mk.id);
              else n.add(mk.id);
              return n;
            })
          }
          forceOpen={forceOpen}
        />
      ))}
      {collapsed.length > 0 && !forceOpen && (
        <button
          type="button"
          onClick={() => setClosed(new Set())}
          aria-label={`Show ${collapsed.length} more markets in ${label ?? "this group"}`}
          className="flex h-10 w-full items-center justify-center border-t border-c-hairline font-hb-ui text-hb-body-sec text-c-text-2 transition-colors duration-(--dur-feedback) hover:text-c-text"
        >
          +{collapsed.length} more markets
        </button>
      )}
    </div>
  );
}

/* ── E-M-12 — `Your bet` strip: open bets on this fixture ─────────── */
function BetStrip({ match }: { match: Match }) {
  const bets = useBets((s) => s.bets);
  const open = bets.filter(
    (b) => b.matchId === match.id && b.result === "open",
  );
  const settled = bets.find(
    (b) =>
      b.matchId === match.id &&
      (b.result === "won" || b.result === "lost" || b.result === "void"),
  );
  const finished = match.status === "finished";

  if (finished && settled) {
    const line =
      settled.result === "won"
        ? `Settled · won ${(settled.returns - settled.stake).toFixed(2)} USDT`
        : settled.result === "lost"
          ? `Settled · lost ${settled.stake.toFixed(2)} USDT`
          : `Void — ${settled.settledNote ? `${settled.settledNote} · ` : ""}${settled.stake.toFixed(2)} USDT returned`;
    return (
      <Link
        to="/bets"
        className="mt-3 flex h-12 items-center gap-3 rounded-hb-md border border-c-hairline bg-c-surface-2 pe-3 ps-3"
      >
        <span className="min-w-0 flex-1">
          <span className="block font-hb-ui text-hb-micro uppercase text-c-text-2">
            Your bet
          </span>
          <span className="block truncate font-hb-ui text-hb-body-sec font-semibold text-c-text">
            {line}
          </span>
        </span>
        <span className="shrink-0 font-hb-ui text-hb-body-sec text-c-text-2">
          View in My bets ›
        </span>
      </Link>
    );
  }
  if (!open.length) return null;

  const b = open[0];
  const co = b.cashout;
  const moved = co && co.value !== co.was;
  const paused = co?.status === "suspended";
  return (
    <Link
      to="/bets"
      aria-label={`Your bet: ${b.pick} at ${b.odds.toFixed(2)}. ${
        paused
          ? "Cash out paused — market suspended"
          : co
            ? `Cash out quote ${co.value.toFixed(2)} USDT`
            : "No cash out offered"
      }. Go to ticket`}
      className="relative mt-3 flex h-12 items-center gap-3 overflow-hidden rounded-hb-md border border-c-hairline bg-c-surface-2 pe-3 ps-4"
    >
      {/* `this is yours` edge — swaps to amber when the offer moved */}
      <span
        aria-hidden="true"
        className={`absolute inset-y-0 start-0 w-0.5 ${moved || paused ? "bg-c-suspend" : "bg-c-cta"}`}
      />
      <span className="min-w-0 flex-1">
        <span className="block font-hb-ui text-hb-micro uppercase text-c-text-2">
          {open.length > 1 ? `Your bets ${open.length}` : "Your bet"}
        </span>
        <span className="block truncate font-hb-ui text-hb-body-sec font-semibold text-c-text">
          {b.pick} @ {b.odds.toFixed(2)}
        </span>
      </span>
      <span className="shrink-0 text-end">
        {paused ? (
          <span className="font-hb-ui text-hb-body-sec text-c-text-2">
            Cash out paused — market suspended
          </span>
        ) : moved ? (
          <span className="font-hb-ui text-hb-body-sec text-c-text-2">
            Offer moved to {co.value.toFixed(2)} — confirm new amount
          </span>
        ) : co ? (
          <MorphNumber
            value={`Cash out ${co.value.toFixed(2)} USDT`}
            className="font-hb-num text-hb-odds-sm font-semibold tabular-nums text-c-text"
          />
        ) : (
          <span className="font-hb-ui text-hb-body-sec text-c-text-2">
            No cash out
          </span>
        )}
      </span>
      <span aria-hidden="true" className="shrink-0 text-c-text-2">
        ›
      </span>
    </Link>
  );
}

/* team column — crest above name @phone, beside @desk (W4-03/W4-21) */
function TeamBlock({ team }: { team: Match["home"] }) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-1.5 text-center">
      <span className="flex min-w-0 flex-col items-center gap-1.5 desk:flex-row">
        <TeamCrest team={team} size={48} />
        <span className="line-clamp-2 font-hb-ui text-hb-title font-semibold leading-tight text-c-text">
          {team.name}
        </span>
      </span>
      <FollowPill teamId={team.id} name={team.name} />
    </div>
  );
}

/* ── E-M-01 — scoreboard: expanded card + pinned minimal strip ────── */
function Scoreboard({
  match,
  comp,
  flashKey,
}: {
  match: Match;
  comp: { name: string };
  flashKey?: number;
}) {
  const finished = match.status === "finished";
  const live = match.status === "live";
  return (
    <section
      aria-label={`${match.home.name} ${match.score.home}, ${match.away.name} ${match.score.away}`}
      className="relative rounded-hb-md border border-c-hairline bg-c-surface-1"
    >
      {/* goal-cascade edge flash — ::after opacity, never a border anim */}
      {flashKey !== undefined && (
        <span
          key={flashKey}
          aria-hidden="true"
          className="hb-edgeflash rounded-hb-md"
        />
      )}
      <div className="relative flex items-center justify-center px-4 pt-3">
        <span className="font-hb-ui text-hb-micro uppercase tracking-widest text-c-text-2">
          {comp.name}
        </span>
        <span className="absolute end-3 top-2">
          <FollowStar id={match.id} />
        </span>
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 pb-3 pt-2 desk:gap-6">
        <TeamBlock team={match.home} />
        <div className="flex flex-col items-center gap-1">
          {finished ? (
            <>
              <span className="flex items-center gap-2 font-hb-num text-hb-score font-bold tabular-nums text-c-text">
                <span className="grid size-11 place-items-center rounded-hb-md border border-c-hairline bg-c-surface-2 desk:size-10">
                  {match.score.home}
                </span>
                <span className="text-c-text-3">–</span>
                <span className="grid size-11 place-items-center rounded-hb-md border border-c-hairline bg-c-surface-2 desk:size-10">
                  {match.score.away}
                </span>
              </span>
              <span className="font-hb-ui text-hb-label font-semibold uppercase tracking-wide text-c-text-2">
                Full time
              </span>
            </>
          ) : live ? (
            <>
              <span className="flex items-center gap-2 font-hb-num text-hb-score font-bold tabular-nums text-c-text">
                <span className="grid size-11 place-items-center overflow-hidden rounded-hb-md border border-c-hairline bg-c-surface-2 desk:size-10">
                  <MorphNumber value={String(match.score.home)} dir="up" />
                </span>
                <span className="text-c-text-3">–</span>
                <span className="grid size-11 place-items-center overflow-hidden rounded-hb-md border border-c-hairline bg-c-surface-2 desk:size-10">
                  <MorphNumber value={String(match.score.away)} dir="up" />
                </span>
              </span>
              <LiveClock match={match} />
            </>
          ) : (
            <>
              <span className="font-hb-num text-hb-score font-bold tabular-nums text-c-text">
                {new Date(match.kickoffAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <span className="font-hb-ui text-hb-label font-semibold text-c-text-2">
                {new Date(match.kickoffAt).toLocaleDateString([], {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}
              </span>
              <span className="rounded-hb-pill bg-c-surface-2 px-2 py-0.5 font-hb-ui text-hb-micro font-semibold uppercase text-c-text-2">
                {match.kickoffAt - Date.now() < 86_400_000
                  ? `Starts in ${fmtCountdown(match.kickoffAt - Date.now())}`
                  : "Pre-match"}
              </span>
            </>
          )}
        </div>
        <TeamBlock team={match.away} />
      </div>
      {/* live-scores honesty note — clocks are content, not accents */}
      {live && (
        <div className="flex items-center justify-center border-t border-c-hairline py-1.5 font-hb-ui text-hb-micro text-c-text-2">
          Live scores may be delayed · markets can suspend at any time
        </div>
      )}
    </section>
  );
}

/* ── E-M-01 pinned strip — `[crest] ARS 1–0 BHA · ● 52′ · ☆` ──────── */
function PinnedStrip({ match, flashKey }: { match: Match; flashKey?: number }) {
  return (
    <div
      role="status"
      aria-label={`${match.home.name} ${match.score.home}, ${match.away.name} ${match.score.away}, ${clockText(match)}${match.status === "live" ? ", live" : ""}`}
      className="relative flex h-11 items-center gap-2 border-b border-c-hairline bg-c-surface-1 px-3 lg:px-4"
    >
      {flashKey !== undefined && (
        <span key={flashKey} aria-hidden="true" className="hb-edgeflash" />
      )}
      <TeamCrest team={match.home} size={16} />
      <span className="font-hb-ui text-hb-label font-semibold text-c-text">
        {match.home.short}
      </span>
      <span className="font-hb-num text-hb-odds font-semibold tabular-nums text-c-text">
        {match.score.home}–{match.score.away}
      </span>
      <span className="font-hb-ui text-hb-label font-semibold text-c-text">
        {match.away.short}
      </span>
      <TeamCrest team={match.away} size={16} />
      <span className="flex-1" />
      {match.status === "live" ? (
        <span className="flex items-center gap-1 font-hb-num text-hb-clock font-semibold tabular-nums text-c-text">
          <span
            className="ds-live-dot size-1.5 rounded-hb-pill bg-c-live"
            aria-hidden="true"
          />
          {clockText(match)}
        </span>
      ) : match.status === "finished" ? (
        <span className="font-hb-ui text-hb-label font-semibold uppercase text-c-text-2">
          Full time
        </span>
      ) : null}
      <FollowStar id={match.id} size={14} />
    </div>
  );
}

/* ═══════════════ the page ═══════════════ */
function MatchPage() {
  const { matchId } = Route.useParams();
  // `?group=` restores the tab on return (A20.c/U-20); read loosely so
  // sibling Links to this route aren't forced to declare search params
  const rawSearch = Route.useSearch() as Record<string, unknown>;
  const groupParam =
    typeof rawSearch?.group === "string" ? rawSearch.group : undefined;
  const navigate = useNavigate();
  const desk = useDesk();
  const mt = useWorld((s) => s.matches.find((x) => x.id === matchId));
  const flashKey = useWorld((s) => s.goalFlashes[matchId]);
  const offline = useUI((s) => s.offline);
  const breakUntil = useUI((s) => s.breakUntil);
  const feed = useEngine((s) => s.feed);
  const match = mt ?? matchById(matchId);
  const comp = match ? compById(match.competitionId) : null;

  const [q, setQ] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  // pinned-strip choreography: the scoreboard leaves → strip collapses in
  const sentinel = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    // % rootMargin ≈ the sticky chrome height (px literals are gate-banned;
    // ~12% of a phone viewport covers the strip+tabs offset)
    const io = new IntersectionObserver(([e]) => setPinned(!e.isIntersecting), {
      rootMargin: "-12% 0px 0px 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* goal event line + single live-region announcements (P55-22):
     the score change itself tells us which side scored — newest wins */
  const matchRef = useRef(match);
  matchRef.current = match;
  const [evLine, setEvLine] = useState<{
    text: string;
    key: number;
  } | null>(null);
  const [announce, setAnnounce] = useState("");
  const prevScore = useRef<{ h: number; a: number; id: string } | null>(null);
  const scoreKey = match
    ? `${match.id}:${match.score.home}-${match.score.away}`
    : null;
  useEffect(() => {
    const m = matchRef.current;
    if (!m) return;
    const prev = prevScore.current;
    prevScore.current = { h: m.score.home, a: m.score.away, id: m.id };
    // a fixture switch is not a goal — rebase, never announce
    if (
      !prev ||
      prev.id !== m.id ||
      (prev.h === m.score.home && prev.a === m.score.away)
    )
      return;
    const scorer = m.score.home > prev.h ? m.home.name : m.away.name;
    const line = `Goal — ${scorer} ${clockText(m)}`;
    setEvLine({ text: line, key: Date.now() });
    setAnnounce(
      `Goal, ${scorer}. Score ${m.score.home}–${m.score.away}. Markets suspended — goal scored`,
    );
    const t1 = setTimeout(() => setEvLine(null), 4200);
    const t2 = setTimeout(
      () => setAnnounce("Markets reopened — prices updated"),
      2400,
    );
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [scoreKey]);

  // suspensions announce once, naming the market + reason (E-M-09)
  const lastFeed = feed[feed.length - 1];
  const prevFeedRef = useRef(lastFeed);
  useEffect(() => {
    const m = matchRef.current;
    if (!m || lastFeed === prevFeedRef.current) return;
    prevFeedRef.current = lastFeed;
    if (lastFeed?.matchId !== m.id) return;
    if (lastFeed.kind === "suspend") {
      const mk = m.markets.find((x) => x.id === lastFeed.marketId);
      if (mk)
        setAnnounce(
          `${mk.name} suspended — ${lastFeed.reason ?? "betting paused"}`,
        );
    }
  }, [lastFeed]);

  // FT announces once — score + result state
  const prevStatus = useRef(match?.status);
  useEffect(() => {
    if (!match) return;
    if (prevStatus.current !== match.status && match.status === "finished")
      setAnnounce(
        `Full time. ${match.home.name} ${match.score.home}, ${match.away.name} ${match.score.away}.`,
      );
    prevStatus.current = match.status;
  }, [match]);

  // `/` focuses the market search (E-M-05)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        e.key !== "/" ||
        (e.target instanceof HTMLElement &&
          /^(input|textarea|select)$/i.test(e.target.tagName))
      )
        return;
      e.preventDefault();
      searchRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const groups = useMemo(() => {
    if (!match) return [];
    const counts = new Map<MarketGroupKey, number>();
    for (const g of GROUP_ORDER) counts.set(g.key, 0);
    for (const m of match.markets)
      counts.set(m.group, (counts.get(m.group) ?? 0) + 1);
    return GROUP_ORDER.filter((g) => (counts.get(g.key) ?? 0) > 0).map((g) => ({
      ...g,
      n: counts.get(g.key) ?? 0,
    }));
  }, [match]);

  const allCount = match?.markets.length ?? 0;
  type GroupKey = MarketGroupKey | "all";
  const effGroup: GroupKey =
    groupParam === "all" || groups.some((g) => g.key === groupParam)
      ? (groupParam as GroupKey)
      : "popular";
  const setGroup = (g: GroupKey) =>
    navigate({
      to: "/match/$matchId",
      params: { matchId },
      search: { group: g },
      replace: true,
    });

  // search filters across the whole book; tab counts re-sum honestly
  const query = q.trim().toLowerCase();
  const filtered = useMemo(() => {
    const map = new Map<MarketGroupKey, Market[]>();
    if (!match) return map;
    for (const m of match.markets) {
      if (
        query &&
        !m.name.toLowerCase().includes(query) &&
        !m.outcomes.some((o) => o.name.toLowerCase().includes(query))
      )
        continue;
      const arr = map.get(m.group) ?? [];
      arr.push(m);
      map.set(m.group, arr);
    }
    return map;
  }, [match, query]);

  const related = useMemo(() => {
    const all = useWorld.getState().matches;
    return all
      .filter(
        (x) => x.id !== matchId && x.competitionId === match?.competitionId,
      )
      .slice(0, 3);
  }, [matchId, match]);

  if (!match || !comp) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <p className="font-hb-ui text-hb-h1 font-semibold text-c-text">
          Match not found
        </p>
        <Link
          to="/"
          className="mt-3 inline-block rounded-hb-md bg-c-surface-2 px-4 py-2 font-hb-ui text-hb-body-sec font-semibold text-c-text"
        >
          Back to sports
        </Link>
      </div>
    );
  }

  const onBreak = breakUntil > Date.now();
  const searching = query.length > 0;
  // first TWO expanded @390 / THREE @1440 (M-12 per-width delta)
  const defaultOpen = desk ? 3 : 2;
  const visibleGroups = searching
    ? GROUP_ORDER.filter((g) => (filtered.get(g.key)?.length ?? 0) > 0)
    : effGroup === "all"
      ? groups
      : groups.filter((g) => g.key === effGroup);
  const matchCount = searching
    ? [...filtered.values()].reduce((a, l) => a + l.length, 0)
    : 0;

  return (
    <div className="mx-auto max-w-4xl px-3 pt-3 lg:px-4">
      {/* one shared live region — announces once, never per frame */}
      <div aria-live="polite" className="sr-only">
        {announce}
      </div>

      {/* ── E-M-13 breadcrumb: text path @desk, compact pill @phone ── */}
      <nav
        aria-label="Breadcrumb"
        className="mb-3 flex items-center gap-1.5 font-hb-ui text-hb-body-sec"
      >
        <Link
          to="/"
          aria-label="Back"
          className="grid size-8 shrink-0 place-items-center rounded-hb-md text-c-text-2 transition-colors duration-(--dur-feedback) hover:text-c-text"
        >
          <ChevronLeft size={16} />
        </Link>
        <ol className="flex min-w-0 items-center gap-1.5">
          <li className="hidden lg:block">
            <Link
              to="/football"
              className="text-c-text-2 transition-colors duration-(--dur-feedback) hover:text-c-text"
            >
              Soccer
            </Link>
          </li>
          <li aria-hidden="true" className="hidden text-c-text-3 lg:block">
            ›
          </li>
          <li className="hidden lg:block">
            <Link
              to="/football"
              className="text-c-text-2 transition-colors duration-(--dur-feedback) hover:text-c-text"
            >
              {comp.country || comp.name}
            </Link>
          </li>
          <li aria-hidden="true" className="hidden text-c-text-3 lg:block">
            ›
          </li>
          <li className="hidden lg:block">
            <Link
              to="/football"
              className="text-c-text-2 transition-colors duration-(--dur-feedback) hover:text-c-text"
            >
              {comp.name}
            </Link>
          </li>
          <li aria-hidden="true" className="hidden text-c-text-3 lg:block">
            ›
          </li>
          <li aria-current="page">
            <label className="relative flex h-9 items-center gap-1 rounded-hb-md border border-c-hairline bg-c-surface-2 ps-3 pe-2 font-semibold text-c-text lg:h-8 lg:border-transparent lg:bg-transparent lg:ps-0 lg:pe-4">
              <select
                value={match.id}
                onChange={(e) =>
                  navigate({
                    to: "/match/$matchId",
                    params: { matchId: e.target.value },
                  })
                }
                aria-label="Switch match"
                className="max-w-40 appearance-none truncate bg-transparent font-hb-ui text-hb-body-sec font-semibold text-c-text outline-none lg:max-w-56"
              >
                {[match, ...related].map((r) => (
                  <option
                    key={r.id}
                    value={r.id}
                    className="bg-c-surface-1 text-c-text"
                  >
                    {r.home.short} – {r.away.short}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                aria-hidden="true"
                className="pointer-events-none absolute end-2 lg:end-0"
              />
            </label>
          </li>
        </ol>
      </nav>

      {/* sentinel — when it leaves the viewport the strip pins */}
      <div ref={sentinel} aria-hidden="true" />

      {/* ── E-M-01 scoreboard (the ONE page-level card) ─────────────── */}
      <Scoreboard match={match} comp={comp} flashKey={flashKey} />

      {/* event line — h20 slot reserved, types in on goal (E-M-10);
          decorative — the live region carries the announcement */}
      <div className="hb-eventline" aria-hidden="true">
        {evLine && (
          <p
            key={evLine.key}
            className="font-hb-ui text-hb-body-sec font-semibold text-c-text"
          >
            {evLine.text.split("").map((ch, i) => (
              <span
                // chars of a fixed event string — index key is stable
                key={i}
                className="hb-evchar"
                style={{ "--i": i } as CSSProperties}
              >
                {ch}
              </span>
            ))}
          </p>
        )}
      </div>

      {/* M-14 offline band — shared grammar, under the scoreboard */}
      {offline && (
        <div
          role="status"
          className="mb-3 flex h-11 items-center justify-center gap-2 rounded-hb-md border border-c-hairline bg-c-surface-2 font-hb-ui text-hb-body-sec text-c-text"
        >
          <CloudOffGlyph className="size-4 shrink-0 text-c-text-2" />
          You&apos;re offline — prices are frozen, not live
        </div>
      )}
      {/* break strip — a chosen state, deliberately NOT amber */}
      {onBreak && !offline && (
        <div
          role="status"
          className="mb-3 flex h-11 items-center justify-center gap-2 rounded-hb-md bg-c-surface-2 font-hb-ui text-hb-body-sec text-c-text"
        >
          On a break · back{" "}
          {new Date(breakUntil).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      )}

      {/* ── E-M-12 open-bet strip — above search, in content flow ──── */}
      <BetStrip match={match} />

      {/* ── E-M-05 market search (scrolls away — tabs are the pin) ─── */}
      <search className="relative mt-1 block">
        <Search
          size={16}
          aria-hidden="true"
          className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-c-text-2"
        />
        <input
          ref={searchRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Escape" && setQ("")}
          placeholder="Search markets or players"
          aria-label="Search markets or players"
          className="h-11 w-full rounded-hb-md border border-c-hairline bg-c-surface-2 ps-10 pe-9 font-hb-ui text-hb-body text-c-text outline-none transition-colors duration-(--dur-feedback) placeholder:text-c-text-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-c-focus"
        />
        {q && (
          <button
            type="button"
            onClick={() => setQ("")}
            aria-label="Clear search"
            className="absolute end-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-hb-md text-c-text-2 hover:text-c-text"
          >
            <X size={15} />
          </button>
        )}
      </search>
      {searching && (
        <p
          aria-live="polite"
          className="mt-1.5 px-1 font-hb-ui text-hb-micro text-c-text-2"
        >
          {matchCount === 0 ? (
            <>
              No markets match &ldquo;{q.trim()}&rdquo; ·{" "}
              <button
                type="button"
                onClick={() => setQ("")}
                className="font-semibold text-c-text underline"
              >
                Clear search
              </button>
            </>
          ) : (
            `${matchCount} market${matchCount === 1 ? "" : "s"} match "${q.trim()}"`
          )}
        </p>
      )}

      {/* ── combined sticky chrome: pinned strip + tab bar (M-02) ──── */}
      <div className="sticky z-30 -mx-3 mt-2 top-[calc(var(--layout-header)+var(--layout-sportrow))] lg:-mx-4 lg:top-[var(--layout-header)]">
        <div className="hb-pinstrip" data-collapsed={!pinned}>
          <PinnedStrip match={match} flashKey={flashKey} />
        </div>
        <div
          role="tablist"
          aria-label="Market groups"
          className="hb-edge-fade no-scrollbar flex h-11 items-center gap-1 overflow-x-auto border-b border-c-hairline bg-c-bg px-3 lg:px-4"
        >
          {groups.map((g) => {
            const showing = effGroup === g.key && !searching;
            const hitN = searching ? (filtered.get(g.key)?.length ?? 0) : g.n;
            return (
              <button
                key={g.key}
                type="button"
                role="tab"
                aria-selected={showing}
                aria-label={`${g.label}, ${g.n} markets`}
                onClick={() => setGroup(g.key)}
                className={`flex h-8 shrink-0 items-center rounded-hb-pill px-4 font-hb-ui text-hb-label font-semibold transition-colors duration-(--dur-feedback) ${
                  showing
                    ? "bg-c-cta text-c-cta-fg"
                    : "text-c-text-2 hover:bg-c-surface-3 hover:text-c-text"
                }`}
              >
                {g.label}{" "}
                <span className="font-hb-num tabular-nums">
                  {searching ? `${hitN} of ${g.n}` : g.n}
                </span>
              </button>
            );
          })}
          <button
            type="button"
            role="tab"
            aria-selected={effGroup === "all" && !searching}
            aria-label={`All markets, ${allCount}`}
            onClick={() => setGroup("all")}
            className={`flex h-8 shrink-0 items-center rounded-hb-pill px-4 font-hb-ui text-hb-label font-semibold transition-colors duration-(--dur-feedback) ${
              effGroup === "all" && !searching
                ? "bg-c-cta text-c-cta-fg"
                : "text-c-text-2 hover:bg-c-surface-3 hover:text-c-text"
            }`}
          >
            All markets{" "}
            <span className="font-hb-num tabular-nums">{allCount}</span>
          </button>
        </div>
      </div>

      {/* ── accordions — content cross-fades on switch, opacity only ── */}
      <div key={searching ? "search" : effGroup} className="hb-grouppane">
        {visibleGroups.map((g) => {
          const list = searching
            ? (filtered.get(g.key) ?? [])
            : match.markets.filter((m) => m.group === g.key);
          return (
            <MarketGroup
              key={g.key}
              label={effGroup === "all" || searching ? g.label : undefined}
              markets={list}
              match={match}
              defaultOpen={defaultOpen}
              forceOpen={searching}
            />
          );
        })}
        {visibleGroups.length === 0 && (
          <p className="py-10 text-center font-hb-ui text-hb-body-sec text-c-text-2">
            No open markets in this group right now
          </p>
        )}
      </div>

      {/* related fixtures — the follow-next exit, never re-bet bait */}
      {related.length > 0 && (
        <section className="py-4">
          <h2 className="mb-2 px-1 font-hb-ui text-hb-label font-semibold text-c-text-2">
            Also in {comp.name}
          </h2>
          <div className="no-scrollbar -mx-3 flex snap-x gap-2 overflow-x-auto px-3 pb-1 lg:mx-0 lg:px-0">
            {related.map((r) => (
              <Link
                key={r.id}
                to="/match/$matchId"
                params={{ matchId: r.id }}
                className="flex w-56 shrink-0 snap-start flex-col gap-1.5 rounded-hb-md border border-c-hairline bg-c-surface-1 p-3 transition-colors duration-(--dur-feedback) hover:bg-c-surface-2"
              >
                <span className="flex items-center justify-between font-hb-ui text-hb-micro text-c-text-2">
                  {r.status === "live" ? (
                    <span className="flex items-center gap-1 font-semibold text-c-live">
                      <span
                        className="ds-live-dot size-1.5 rounded-hb-pill bg-c-live"
                        aria-hidden="true"
                      />
                      {clockText(r)}
                    </span>
                  ) : (
                    new Date(r.kickoffAt).toLocaleDateString([], {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    })
                  )}
                  <span className="font-hb-num font-semibold tabular-nums">
                    {r.status === "live"
                      ? `${r.score.home}–${r.score.away}`
                      : `+${r.markets.length}`}
                  </span>
                </span>
                {[r.home, r.away].map((t) => (
                  <span key={t.id} className="flex items-center gap-2">
                    <TeamCrest team={t} size={16} />
                    <span className="truncate font-hb-ui text-hb-body-sec font-medium text-c-text">
                      {t.name}
                    </span>
                  </span>
                ))}
              </Link>
            ))}
          </div>
        </section>
      )}
      <div className="h-6" />
    </div>
  );
}
