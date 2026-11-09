import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { compById } from "../lib/seed";
import { useUI } from "../lib/store/ui";
import { useWorld } from "../lib/store/world";
import type { Match } from "../lib/types";
import { TeamCrest } from "./Crest";
import { CountdownChip, clockText } from "./MatchRow";
import { OddsCell } from "./odds/OddsCell";

/* ==================================================================
   HeroSlider — featured-fixture slideshow (E-BRD-04, HM-01/HM-02).
   CSS scroll-snap only (S6): no autoplay, no bounce, no pause control.
   Phone: full-bleed single card, swipe-snap, next-card edge peek.
   Desk: ‹ › steppers + 1/5 counter + dots (dots are buttons + indicator).
   ================================================================== */

function LiveChip({ mt }: { mt: Match }) {
  const offline = useUI((s) => s.offline);
  return (
    <span className="inline-flex h-6 items-center gap-1.5 rounded-hb-sm bg-c-live px-2 font-hb-ui text-hb-micro font-bold uppercase text-c-live-fg">
      <span
        aria-hidden="true"
        className="hb-live-pulse size-1.5 rounded-full bg-c-live-fg"
      />
      Live · {clockText(mt)}
      {offline && <span className="font-normal normal-case">· Frozen</span>}
    </span>
  );
}

function Slide({ match: seedMatch }: { match: Match }) {
  const mt = useWorld((s) => s.matches.find((m) => m.id === seedMatch.id)!);
  const comp = compById(mt.competitionId);
  const mkt = mt.markets.find((m) => m.key === "h2h") ?? mt.markets[0];
  const scored = mt.status !== "scheduled";
  return (
    <article
      aria-label={`${mt.home.name} v ${mt.away.name}`}
      className="flex w-full flex-col gap-3 rounded-hb-md border border-c-hairline bg-c-surface-1 p-4"
    >
      {/* comp label + status — hero status uses the CHIP encoding */}
      <div className="flex items-center gap-2">
        <span className="min-w-0 flex-1 truncate font-hb-ui text-hb-label font-semibold text-c-text-2">
          {comp.name}
        </span>
        {mt.status === "live" && <LiveChip mt={mt} />}
        {mt.status === "scheduled" && (
          <CountdownChip kickoffAt={mt.kickoffAt} />
        )}
        {mt.status === "finished" && (
          <span className="font-hb-ui text-hb-micro font-bold text-c-text-2">
            FT
          </span>
        )}
      </div>
      {/* editorial line — crests 48 + names, score or 'v' between */}
      <div className="flex items-center gap-3">
        <TeamCrest team={mt.home} size={48} />
        <div className="flex min-w-0 flex-1 items-baseline justify-center gap-2.5">
          <Link
            to="/match/$matchId"
            params={{ matchId: mt.id }}
            className="min-w-0 truncate font-hb-ui text-hb-title font-bold text-c-text transition-colors duration-(--dur-feedback) hover:text-c-neon"
          >
            {mt.home.name}
          </Link>
          {scored ? (
            <span className="shrink-0 font-hb-num text-hb-score font-bold text-c-text tabular-nums">
              {mt.score.home}–{mt.score.away}
            </span>
          ) : (
            <span className="shrink-0 font-hb-ui text-hb-body-sec font-semibold text-c-text-3">
              v
            </span>
          )}
          <Link
            to="/match/$matchId"
            params={{ matchId: mt.id }}
            className="min-w-0 truncate font-hb-ui text-hb-title font-bold text-c-text transition-colors duration-(--dur-feedback) hover:text-c-neon"
          >
            {mt.away.name}
          </Link>
        </div>
        <TeamCrest team={mt.away} size={48} />
      </div>
      {/* 1X2 cells — the same OddsCell anatomy, never a paraphrase */}
      <div className="flex items-center gap-2">
        <div data-cellgrid className="grid min-w-0 flex-1 grid-cols-3 gap-2">
          {mkt.outcomes.slice(0, 3).map((o) => (
            <OddsCell
              key={o.id}
              outcome={o}
              market={mkt}
              match={mt}
              verb="to win"
            />
          ))}
        </div>
        <Link
          to="/match/$matchId"
          params={{ matchId: mt.id }}
          className="flex min-h-11 shrink-0 items-center gap-0.5 rounded-hb-sm px-2 font-hb-ui text-hb-label font-semibold text-c-neon"
        >
          View match
          <span aria-hidden="true" className="rtl:-scale-x-100">
            ›
          </span>
        </Link>
      </div>
    </article>
  );
}

export function HeroSlider({ matches }: { matches: Match[] }) {
  const slides = matches.slice(0, 5);
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // active dot from scroll position — IntersectionObserver, no math
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const io = new IntersectionObserver(
      (es) => {
        for (const e of es)
          if (e.isIntersecting)
            setActive(Number((e.target as HTMLElement).dataset.i));
      },
      { root: rail, threshold: 0.55 },
    );
    rail.querySelectorAll("[data-i]").forEach((el) => {
      io.observe(el);
    });
    return () => io.disconnect();
  }, [slides.length]);

  const step = useCallback((dir: 1 | -1) => {
    const rail = railRef.current;
    const slide = rail?.querySelector<HTMLElement>("[data-i]");
    if (!rail || !slide) return;
    rail.scrollBy({ left: dir * (slide.offsetWidth + 16) });
  }, []);

  if (!slides.length) return null;
  return (
    <div className="flex flex-col gap-2">
      <div ref={railRef} className="hb-hero-rail hb-edge-fade">
        {slides.map((m, i) => (
          <div key={m.id} data-i={i} className="hb-hero-slide flex">
            <Slide match={m} />
          </div>
        ))}
      </div>
      {slides.length > 1 && (
        <div className="flex items-center justify-center gap-3 px-1">
          <button
            type="button"
            aria-label="Previous fixture"
            onClick={() => step(-1)}
            className="hidden size-9 place-items-center rounded-hb-pill border border-c-hairline text-c-text-2 transition-colors duration-(--dur-feedback) hover:bg-c-surface-2 hover:text-c-text lg:grid"
          >
            <ChevronLeft size={15} aria-hidden="true" />
          </button>
          <div className="flex items-center gap-1.5">
            {slides.map((m, i) => (
              <button
                key={m.id}
                type="button"
                aria-label={`Fixture ${i + 1} of ${slides.length}`}
                aria-current={i === active}
                onClick={() => {
                  const el =
                    railRef.current?.querySelectorAll<HTMLElement>("[data-i]")[
                      i
                    ];
                  el?.scrollIntoView({
                    block: "nearest",
                    inline: "start",
                  });
                }}
                className={`grid size-6 place-items-center rounded-full`}
              >
                <span
                  aria-hidden="true"
                  className={`size-1.5 rounded-full transition-colors duration-(--dur-feedback) ${
                    i === active ? "bg-c-neon" : "bg-c-surface-3"
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="hidden font-hb-num text-hb-micro text-c-text-3 tabular-nums lg:inline">
            {active + 1} / {slides.length}
          </span>
          <button
            type="button"
            aria-label="Next fixture"
            onClick={() => step(1)}
            className="hidden size-9 place-items-center rounded-hb-pill border border-c-hairline text-c-text-2 transition-colors duration-(--dur-feedback) hover:bg-c-surface-2 hover:text-c-text lg:grid"
          >
            <ChevronRight size={15} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
