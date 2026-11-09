import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  Flame,
  House,
  Lock,
  Pause,
  Play,
  RadioTower,
  Star,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { groupByComp, LeagueSection, MatchRow } from "../components/MatchRow";
import {
  EmptyState,
  LiveBadge,
  OddsCell,
  TeamLogo,
} from "../components/primitives";
import { type GlyphComponent, SPORT_GLYPHS } from "../components/SportGlyph";
import { useEngine } from "../lib/engine";
import { compById, matchById, teamById } from "../lib/seed";
import { isMatchFollowed } from "../lib/selectors";
import { useUI } from "../lib/store/ui";
import { useWorld } from "../lib/store/world";
import type { Match } from "../lib/types";

export const Route = createFileRoute("/")({ component: Home });

const PILLS: {
  key: string;
  label: string;
  icon: GlyphComponent;
  to?: "/" | "/live" | "/football";
}[] = [
  { key: "home", label: "Home", icon: House, to: "/" },
  { key: "live", label: "Live", icon: RadioTower, to: "/live" },
  {
    key: "soccer",
    label: "Soccer",
    icon: SPORT_GLYPHS.soccer,
    to: "/football",
  },
  { key: "tennis", label: "Tennis", icon: SPORT_GLYPHS.tennis },
  { key: "basketball", label: "Basketball", icon: SPORT_GLYPHS.basketball },
  { key: "esports", label: "Esports", icon: SPORT_GLYPHS.esports },
  { key: "cricket", label: "Cricket", icon: SPORT_GLYPHS.cricket },
  { key: "hockey", label: "Ice hockey", icon: SPORT_GLYPHS.hockey },
];

// Wave motif — Housebets' aquatic promo language, quiet version
function WaveArt() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 800 240"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="wv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#02f8f8" stopOpacity="0" />
          <stop offset="1" stopColor="#02f8f8" stopOpacity="0.10" />
        </linearGradient>
      </defs>
      <path
        d="M0 190 Q100 160 200 190 T400 190 T800 190 V240 H0 Z"
        fill="url(#wv)"
      />
      <path
        d="M0 210 Q100 185 200 210 T400 210 T800 210"
        fill="none"
        stroke="#02f8f8"
        strokeOpacity="0.12"
        strokeWidth="1.5"
      />
      <path
        d="M0 176 Q150 150 300 176 T700 176 T800 176"
        fill="none"
        stroke="#02f8f8"
        strokeOpacity="0.06"
        strokeWidth="1.5"
      />
      {/* roofline notch top-left — the house glyph echo */}
      <path
        d="M24 40 L60 14 L96 40"
        fill="none"
        stroke="#02f8f8"
        strokeOpacity="0.18"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Grain — the craft tell that kills banding + reads "handmade"
function Grain({ opacity = 0.05 }: { opacity?: number }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ opacity }}
      aria-hidden
    >
      <filter id="gr">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.8"
          numOctaves="2"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#gr)" />
    </svg>
  );
}

const fmtDay = (ts: number) =>
  new Date(ts).toLocaleTimeString([], {
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

// Auto-rotating featured spotlight — the slideshow, but content-first
function HeroSpotlight({ matches }: { matches: Match[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const all = useWorld((s) => s.matches);
  const slides = matches
    .map((m) => all.find((x) => x.id === m.id) ?? m)
    .slice(0, 4);
  const n = slides.length;
  useEffect(() => {
    if (paused || n < 2) return;
    const t = setInterval(() => setI((v) => (v + 1) % n), 6000);
    return () => clearInterval(t);
  }, [paused, n]);
  const mt = slides[i % n];
  const h2h = mt.markets.find((m) => m.key === "h2h");

  return (
    <section
      aria-label="Featured"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="hero-cine relative overflow-hidden rounded-2xl border border-border-soft bg-gradient-to-br from-[#0e2530] via-[#0b1920] to-[#0e202a]"
    >
      <WaveArt />
      <Grain />
      <AnimatePresence mode="wait">
        <motion.div
          key={mt.id}
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -32 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative grid grid-cols-1 gap-4 p-5 sm:grid-cols-[1fr_auto] sm:p-6"
        >
          <div className="min-w-0">
            <div className="mb-3 flex items-center gap-2.5">
              {mt.status === "live" ? (
                <LiveBadge minute={mt.minute} period={mt.period} />
              ) : (
                <span className="rounded-full bg-warning-a15 px-2.5 py-1 font-odds text-[11px] font-bold text-warning-400">
                  {fmtDay(mt.kickoffAt)}
                </span>
              )}
              <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-text-tertiary">
                {mt.competitionId === "epl"
                  ? "Premier League"
                  : "Champions League"}
              </span>
              {i === 0 && (
                <span className="rounded bg-secondary-a20 px-1.5 py-0.5 text-[10px] font-semibold text-secondary-25">
                  Match of the day
                </span>
              )}
            </div>
            <Link
              to="/match/$matchId"
              params={{ matchId: mt.id }}
              className="group block"
            >
              {[
                { t: mt.home, s: mt.score.home },
                { t: mt.away, s: mt.score.away },
              ].map(({ t, s }) => (
                <div key={t.id} className="flex items-center gap-3 py-1">
                  <TeamLogo team={t} size={34} />
                  <span className="truncate font-display text-[19px] font-bold group-hover:text-brand-200 sm:text-[22px]">
                    {t.name}
                  </span>
                  {mt.status === "live" && (
                    <span className="tnum ml-auto font-odds text-[26px] font-bold sm:text-[30px]">
                      {s}
                    </span>
                  )}
                </div>
              ))}
            </Link>
          </div>
          <div className="flex flex-col justify-end gap-2.5 sm:w-56">
            {h2h && (
              <div className="grid grid-cols-3 gap-1.5">
                {h2h.outcomes.map((o) => (
                  <OddsCell key={o.id} outcome={o} market={h2h} compact />
                ))}
              </div>
            )}
            <Link
              to="/match/$matchId"
              params={{ matchId: mt.id }}
              className="btn-primary flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-[13px] font-bold"
            >
              View match · {mt.markets.length} markets
              <ChevronRight size={15} />
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>
      {/* controls */}
      <div className="relative flex items-center justify-between px-5 pb-4 sm:px-6">
        <div className="flex gap-1.5">
          {slides.map((_, j) => (
            <button
              key={j}
              type="button"
              aria-label={`Slide ${j + 1}`}
              onClick={() => setI(j)}
              className="group relative h-4 w-8"
            >
              <span
                className={`absolute inset-x-0 top-1.5 h-1 rounded-full transition-colors ${j === i % n ? "bg-brand-500" : "bg-border-very-strong group-hover:bg-text-tertiary"}`}
              />
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            aria-label={paused ? "Play slideshow" : "Pause slideshow"}
            aria-pressed={paused}
            onClick={() => setPaused((v) => !v)}
            className="grid size-7 place-items-center rounded-lg border border-border-soft text-text-tertiary transition-colors hover:border-border-very-strong hover:text-text-primary"
          >
            {paused ? <Play size={13} /> : <Pause size={13} />}
          </button>
          {[
            {
              icon: ChevronLeft,
              fn: () => setI((v) => (v - 1 + n) % n),
              l: "Previous",
            },
            {
              icon: ChevronRight,
              fn: () => setI((v) => (v + 1) % n),
              l: "Next",
            },
          ].map(({ icon: Icon, fn, l }) => (
            <button
              key={l}
              type="button"
              aria-label={l}
              onClick={fn}
              className="grid size-7 place-items-center rounded-lg border border-border-soft text-text-tertiary transition-colors hover:border-border-very-strong hover:text-text-primary"
            >
              <Icon size={15} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({ match }: { match: Match }) {
  const mt = useWorld((s) => s.matches.find((x) => x.id === match.id)) ?? match;
  const h2h = mt.markets.find((m) => m.key === "h2h");
  return (
    <div className="group relative flex w-[300px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-border-soft bg-gradient-to-b from-surface-secondary to-surface-primary p-4 transition-colors hover:border-border-very-strong">
      <Link
        to="/match/$matchId"
        params={{ matchId: mt.id }}
        aria-label={`${mt.home.name} v ${mt.away.name}`}
        className="absolute inset-0 z-0 rounded-2xl"
      />
      <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-brand-a05 blur-2xl transition-opacity group-hover:opacity-100" />
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-text-tertiary">
          {mt.competitionId === "epl" ? "Premier League" : "Champions League"}
        </span>
        {mt.status === "live" ? (
          <LiveBadge minute={mt.minute} period={mt.period} />
        ) : (
          <Flame size={13} className="text-warning-400" />
        )}
      </div>
      <div className="mb-3 space-y-2.5">
        {[mt.home, mt.away].map((t, i) => (
          <div key={t.id} className="flex items-center gap-2.5">
            <TeamLogo team={t} size={26} />
            <span className="truncate text-[14px] font-semibold">{t.name}</span>
            {mt.status === "live" && (
              <span className="tnum ml-auto font-odds text-[16px] font-bold">
                {i === 0 ? mt.score.home : mt.score.away}
              </span>
            )}
          </div>
        ))}
      </div>
      {h2h && (
        <div className="pointer-events-none relative z-10 mt-auto grid grid-cols-3 gap-1.5">
          {h2h.outcomes.map((o) => (
            <span key={o.id} className="pointer-events-auto">
              <OddsCell outcome={o} market={h2h} compact />
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// "Your matches" strip — followed teams' next matches, one tap to the hub
function FollowingStrip() {
  const follows = useUI((s) => s.follows);
  const matches = useWorld((s) => s.matches);
  const mine = matches
    .filter((m) => isMatchFollowed(m, follows))
    .sort(
      (a, b) => (a.status === "live" ? -1 : 1) - (b.status === "live" ? -1 : 1),
    )
    .slice(0, 4);
  if (mine.length === 0) return null;
  return (
    <section aria-label="Your matches">
      <div className="mb-2.5 flex items-center justify-between px-1">
        <h2 className="flex items-center gap-2 text-[15px] font-bold">
          <Star size={15} className="fill-gold-500 text-gold-500" /> Your
          matches · {mine.length}
        </h2>
        <Link
          to="/following"
          className="flex items-center gap-0.5 text-[12px] font-semibold text-brand-300 hover:text-brand-200"
        >
          All <ChevronRight size={14} />
        </Link>
      </div>
      <div className="space-y-1 rounded-xl border border-warning-a15 bg-surface-primary p-1.5">
        <div className="flex items-center justify-between px-3 pt-1 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-text-tertiary">
          <span>Match</span>
          <span className="hidden w-[216px] text-center sm:block">
            Match result
          </span>
        </div>
        {mine.map((m) => (
          <MatchRow key={m.id} match={m} />
        ))}
      </div>
    </section>
  );
}

// Removable favourite chips — wireframe's quick-manage strip
function FavChips() {
  const follows = useUI((s) => s.follows);
  const toggle = useUI((s) => s.toggleFollow);
  const chips = [...follows]
    .map((id) => ({ id, name: compById(id)?.name ?? teamById(id)?.name }))
    .filter((c): c is { id: string; name: string } => Boolean(c.name))
    .slice(0, 8);
  if (chips.length === 0) return null;
  return (
    <section
      className="no-scrollbar -mx-3 flex gap-2 overflow-x-auto px-3 lg:mx-0 lg:px-0"
      aria-label="Your favourites"
    >
      {chips.map((c) => (
        <button
          key={c.id}
          type="button"
          onClick={() => toggle(c.id)}
          title="Remove from favourites"
          className="flex shrink-0 items-center gap-1.5 rounded-full border border-gold-500/25 bg-gold-500/10 px-3 py-1.5 text-[12px] font-semibold text-base-75 transition-colors hover:border-gold-500/50"
        >
          <Star size={11} className="fill-gold-500 text-gold-500" />
          {c.name}
          <X size={12} className="text-text-tertiary" />
        </button>
      ))}
    </section>
  );
}

// "Live at the House" — the real event feed, not fabricated social proof
function HouseFeed() {
  const feed = useEngine((s) => s.feed);
  const items = feed
    .filter(
      (e) => e.kind === "goal" || e.kind === "suspend" || e.kind === "resume",
    )
    .slice(-6)
    .reverse();
  if (items.length === 0) return null;
  return (
    <section aria-label="Live at the House" className="overflow-hidden">
      <p className="mb-1.5 flex items-center gap-1.5 px-1 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-text-tertiary">
        <RadioTower size={11} className="text-brand-300" /> Live at the House ·
        real feed
      </p>
      <div className="no-scrollbar -mx-3 flex gap-2 overflow-x-auto px-3 lg:mx-0 lg:px-0">
        {items.map((e, i) => {
          const mt = matchById(e.matchId);
          const label =
            e.kind === "goal"
              ? `GOAL ${e.newScore?.[0]}-${e.newScore?.[1]}${e.scorer ? ` · ${e.scorer}` : ""}`
              : e.kind === "suspend"
                ? `Suspended · ${e.reason ?? "Dangerous attack"}`
                : "Markets reopened";
          return (
            <span
              key={`${e.at}-${i}`}
              className="flex shrink-0 items-center gap-1.5 rounded-full border border-border-soft bg-surface-secondary px-2.5 py-1 text-[11px] text-text-secondary"
            >
              {e.kind === "goal" ? (
                <SPORT_GLYPHS.soccer size={11} className="text-warning-400" />
              ) : (
                <Lock size={10} className="text-warning-400" />
              )}
              <span className="font-semibold text-text-primary">
                {mt ? `${mt.home.short} v ${mt.away.short}` : ""}
              </span>
              {label}
            </span>
          );
        })}
      </div>
    </section>
  );
}

function Home() {
  const matches = useWorld((s) => s.matches);
  const [sport, setSport] = useState<string | null>(null);
  const live = matches.filter((m) => m.status === "live");
  const featured = matches.filter((m) => m.featured);
  const upcoming = matches.filter((m) => m.status === "scheduled");

  // Sports without demo fixtures render an honest empty state, never a dead link
  if (sport) {
    const pill = PILLS.find((p) => p.key === sport);
    return (
      <div className="mx-auto max-w-[860px] space-y-5 px-3 pt-10 lg:px-4">
        <EmptyState
          title={`${pill?.label} isn't in this demo feed`}
          hint={`The contest scope is football · the demo feed carries soccer fixtures only. This is where ${pill?.label} markets would land.`}
          action={
            <button
              type="button"
              onClick={() => setSport(null)}
              className="btn-primary mt-1 rounded-lg px-4 py-2 text-[13px] font-bold"
            >
              Back to football
            </button>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[860px] space-y-5 px-3 pt-4 lg:px-4">
      <h1 className="sr-only">Housebets sportsbook</h1>
      {/* Sport icon-grid — mobile signature from the wireframes */}
      <nav className="grid grid-cols-4 gap-2 sm:hidden" aria-label="Sports">
        {PILLS.slice(0, 8).map(({ key, label, icon: Icon, to }) =>
          to ? (
            <Link
              key={key}
              to={to}
              className={`relative flex flex-col items-center gap-1.5 rounded-xl border py-3 text-[11px] font-semibold transition-colors ${
                key === "home"
                  ? "border-brand-a30 bg-secondary-a20 text-brand-300"
                  : "border-border-soft bg-surface-primary text-text-secondary"
              }`}
            >
              <Icon size={18} />
              {label}
              {key === "live" && (
                <span className="absolute right-1.5 top-1.5 grid min-w-4 place-items-center rounded-full bg-error-500 px-0.5 font-odds text-[9px] font-bold text-white">
                  {live.length}
                </span>
              )}
            </Link>
          ) : (
            <button
              key={key}
              type="button"
              onClick={() => setSport(key)}
              className={`flex flex-col items-center gap-1.5 rounded-xl border py-3 text-[11px] font-semibold transition-colors ${
                sport === key
                  ? "border-brand-a30 bg-secondary-a20 text-brand-300"
                  : "border-border-soft bg-surface-primary text-text-secondary"
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ),
        )}
      </nav>
      {/* Sport pills — sm+ */}
      <nav
        className="no-scrollbar -mx-3 hidden snap-x gap-2 overflow-x-auto px-3 sm:flex lg:mx-0 lg:px-0"
        aria-label="Sports"
      >
        {PILLS.map(({ key, label, icon: Icon, to }, i) =>
          to ? (
            <Link
              key={key}
              to={to}
              className={`flex shrink-0 snap-start items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors ${
                i === 0
                  ? "border-brand-a30 bg-secondary-a20 text-brand-300"
                  : "border-border-soft bg-surface-primary text-text-secondary hover:border-border-very-strong hover:text-text-primary"
              }`}
            >
              <Icon size={15} />
              {label}
              {key === "live" && (
                <span className="grid min-w-4.5 place-items-center rounded-full bg-error-500 px-1 font-odds text-[10px] font-bold text-white">
                  {live.length}
                </span>
              )}
            </Link>
          ) : (
            <button
              key={key}
              type="button"
              onClick={() => setSport(key)}
              className={`flex shrink-0 snap-start items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors ${
                sport === key
                  ? "border-brand-a30 bg-secondary-a20 text-brand-300"
                  : "border-border-soft bg-surface-primary text-text-secondary hover:border-border-very-strong hover:text-text-primary"
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ),
        )}
      </nav>

      <FavChips />

      <HeroSpotlight matches={featured.length ? featured : live} />

      <HouseFeed />

      <FollowingStrip />

      {/* Featured rail */}
      <section aria-label="Featured matches">
        <div className="mb-2.5 flex items-center justify-between px-1">
          <h2 className="flex items-center gap-2 text-[16px] font-bold">
            <RadioTower size={17} className="text-error-400" /> In play now
          </h2>
          <Link
            to="/live"
            className="flex items-center gap-0.5 text-[12px] font-semibold text-brand-300 hover:text-brand-200"
          >
            All live <ChevronRight size={14} />
          </Link>
        </div>
        <div className="no-scrollbar -mx-3 flex snap-x gap-3 overflow-x-auto px-3 pb-1 lg:mx-0 lg:px-0">
          {featured.map((mt) => (
            <FeaturedCard key={mt.id} match={mt} />
          ))}
          {live
            .filter((m) => !m.featured)
            .map((mt) => (
              <FeaturedCard key={mt.id} match={mt} />
            ))}
        </div>
      </section>

      {/* Live sections */}
      <section className="space-y-3" aria-label="Live matches">
        {groupByComp(live.filter((m) => !featured.includes(m))).map(
          ([cid, ms]) => (
            <LeagueSection key={cid} compId={cid} matches={ms} />
          ),
        )}
      </section>

      {/* Upcoming */}
      <section className="space-y-3" aria-label="Upcoming matches">
        <h2 className="px-1 text-[16px] font-bold">Upcoming</h2>
        {groupByComp(upcoming).map(([cid, ms]) => (
          <LeagueSection key={cid} compId={cid} matches={ms} />
        ))}
      </section>

      <p className="px-1 pb-6 text-center text-[11px] text-text-tertiary">
        Prototype · sample data only · no real money · decimal odds · singles
        only
      </p>
    </div>
  );
}
