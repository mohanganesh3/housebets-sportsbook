import { type KeyboardEvent, useRef, useState } from "react";
import { sessionNet, useBets } from "../lib/store/bets";
import { useSlip } from "../lib/store/slip";
import { useUI } from "../lib/store/ui";
import { useWorld } from "../lib/store/world";
import type { Bet, Match } from "../lib/types";
import { SESSION_START, TicketOfflineBar } from "./BetSlip";
import { LockGlyph, MorphNumber } from "./odds/OddsCell";

/* ==================================================================
   D3 — MY BETS internals (STORYBOARDS/slip-page.md frames 9–13,
   ELEMENTS/slip.md E-20..E-29). One component, two densities:
   stacked cards in sheet/panel, the W6 table on the /bets page.
   ================================================================== */

const money = (v: number) => v.toFixed(2);
const fmtPlaced = (ts: number) => {
  const d = new Date(ts);
  return `${d.toLocaleDateString([], { day: "numeric", month: "short" })} ${d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })}`;
};

const fixtureOf = (b: Bet, mt?: Match | null) =>
  mt ? `${mt.home.name} v ${mt.away.name}` : (b.fixture ?? "Fixture off-book");

/* ── E-22..E-26 · the cash-out module — one slot, every state ─────── */
function CashOutModule({ b }: { b: Bet }) {
  const cashOut = useBets((s) => s.cashOut);
  const suspReason = useWorld(
    (s) => s.suspReasons[b.marketId] ?? "market suspended",
  );
  const [mode, setMode] = useState<"idle" | "confirm" | "partial">("idle");
  // the quote the player tapped — a moved quote must re-ask (P2/E-23)
  const [seen, setSeen] = useState<number | null>(null);
  const [frac, setFrac] = useState(0.5);
  const [custom, setCustom] = useState("");
  const [custErr, setCustErr] = useState(false);
  const co = b.cashout;

  // not offered = a designed state, not an absent button (U-08/E-26)
  if (!co)
    return (
      <p className="mt-2 font-hb-ui text-hb-body-sec text-c-text-2">
        No cash out on this bet
      </p>
    );

  // E-25 paused — named reason + last quote + resume promise, never dead
  if (co.status !== "available")
    return (
      <div className="mt-2 rounded-hb-md border border-c-hairline bg-c-surface-2 p-3 opacity-60">
        <p className="flex items-center gap-2 font-hb-ui text-hb-body-sec font-semibold text-c-text">
          <span className="inline-flex items-center gap-1.5 rounded-hb-sm bg-c-suspend px-2 py-0.5 font-hb-ui text-hb-label font-semibold text-c-suspend-fg">
            <LockGlyph className="size-3.5" />
            Cash out paused — {suspReason}
          </span>
        </p>
        <p className="mt-1.5 font-hb-ui text-hb-body-sec text-c-text-2">
          last quote {co.value > 0 ? `${money(co.value)} USDT` : "—"} · Paused —
          waiting
        </p>
        <p className="mt-0.5 font-hb-ui text-hb-micro text-c-text-2">
          The market is suspended — the quote resumes when it reopens.
        </p>
      </div>
    );

  const moved = seen != null && co.value !== seen;
  const openConfirm = (m: "confirm" | "partial") => {
    setSeen(co.value);
    setMode(m);
  };

  // partial math — displayed = billed: the confirm carries the take
  const take = +(co.value * frac).toFixed(2);
  const stays = +(b.stake * (1 - frac)).toFixed(2);
  const staysRet = +(stays * b.odds).toFixed(2);
  const dust = stays > 0 && stays < 1;

  if (mode === "confirm")
    return (
      <div className="mt-2 rounded-hb-md border border-c-hairline bg-c-surface-2 p-3">
        {moved ? (
          <p role="alert" className="font-hb-ui text-hb-body-sec text-c-text">
            Offer moved to{" "}
            <span className="font-hb-num font-semibold">{money(co.value)}</span>
            <span className="ms-1.5 rounded-hb-sm bg-c-suspend px-1.5 py-px font-hb-ui text-hb-micro font-semibold text-c-suspend-fg">
              new amount
            </span>{" "}
            — confirm new amount
          </p>
        ) : (
          <p className="font-hb-ui text-hb-body-sec text-c-text-2">
            Locks in {money(co.value)} USDT now.
          </p>
        )}
        <div className="mt-2 flex gap-2">
          <button
            type="button"
            data-on-cta
            onClick={() => {
              cashOut(b.id);
              setMode("idle");
            }}
            className="h-10 flex-1 rounded-hb-md bg-c-cta font-hb-ui text-hb-label font-semibold text-c-cta-fg transition-colors duration-(--dur-feedback) hover:bg-c-cta-hi active:bg-c-cta-lo"
          >
            Confirm {money(co.value)} USDT
          </button>
          <button
            type="button"
            onClick={() => setMode("idle")}
            className="h-10 rounded-hb-md px-3 font-hb-ui text-hb-label font-semibold text-c-text-2 hover:bg-c-surface-3 hover:text-c-text"
          >
            Dismiss
          </button>
        </div>
      </div>
    );

  if (mode === "partial")
    return (
      <div className="mt-2 rounded-hb-md border border-c-hairline bg-c-surface-2 p-3">
        <p className="font-hb-ui text-hb-body-sec font-semibold text-c-text">
          Partial cash out
        </p>
        <div className="mt-1.5 flex gap-1.5">
          {[0.25, 0.5, 0.75].map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={frac === f && !custom}
              onClick={() => {
                setFrac(f);
                setCustom("");
              }}
              className={`h-9 flex-1 rounded-hb-md font-hb-num text-hb-odds-sm font-semibold transition-colors duration-(--dur-feedback) ${
                frac === f && !custom
                  ? "bg-c-cta text-c-cta-fg"
                  : "bg-c-surface-3 text-c-text hover:bg-c-surface-2"
              }`}
            >
              {Math.round(f * 100)}%
            </button>
          ))}
          <input
            value={custom}
            inputMode="decimal"
            aria-label="Custom cash out percent"
            placeholder="Custom"
            onChange={(e) => {
              const v = e.target.value.replace(/[^0-9.]/g, "");
              setCustom(v);
              setCustErr(false);
              const n = Math.min(100, parseFloat(v) || 0);
              if (n > 0) setFrac(n / 100);
            }}
            onBlur={() => {
              if (custom && parseFloat(custom) > 100) {
                setCustom("100");
                setFrac(1);
                setCustErr(true);
              }
            }}
            className={`h-9 w-20 rounded-hb-md border bg-c-surface-3 px-2 font-hb-num text-hb-h1 font-semibold text-c-text outline-none placeholder:font-hb-ui placeholder:text-hb-odds-sm placeholder:font-normal placeholder:text-c-text-3 ${
              custErr ? "border-c-down" : "border-c-hairline"
            }`}
          />
        </div>
        {custErr && (
          <p role="alert" className="mt-1 font-hb-ui text-hb-micro text-c-down">
            Two decimals max · capped at 100%
          </p>
        )}
        <p
          role="status"
          className="mt-2 font-hb-ui text-hb-body-sec text-c-text-2"
        >
          You take{" "}
          <span className="font-hb-num font-semibold text-c-text">
            {money(take)}
          </span>{" "}
          USDT
          {frac < 1 && (
            <>
              {" "}
              · {money(stays)} stays at {b.odds.toFixed(2)} → returns{" "}
              <span className="font-hb-num text-c-text">{money(staysRet)}</span>
            </>
          )}
        </p>
        {dust && (
          <p className="mt-0.5 font-hb-ui text-hb-micro text-c-text-2">
            Remaining below min — takes all
          </p>
        )}
        <div className="mt-2 flex gap-2">
          <button
            type="button"
            data-on-cta
            onClick={() => {
              cashOut(b.id, dust ? 1 : frac);
              setMode("idle");
            }}
            className="h-10 flex-1 rounded-hb-md bg-c-cta font-hb-ui text-hb-label font-semibold text-c-cta-fg transition-colors duration-(--dur-feedback) hover:bg-c-cta-hi active:bg-c-cta-lo"
          >
            Confirm {money(dust ? co.value : take)} USDT
          </button>
          <button
            type="button"
            onClick={() => setMode("idle")}
            className="h-10 rounded-hb-md px-3 font-hb-ui text-hb-label font-semibold text-c-text-2 hover:bg-c-surface-3 hover:text-c-text"
          >
            Back
          </button>
        </div>
      </div>
    );

  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={() => openConfirm("confirm")}
        aria-label={`Cash out ${money(co.value)} USDT`}
        className="flex h-10 w-full items-center justify-center gap-1.5 rounded-hb-md bg-c-surface-3 font-hb-ui text-hb-body-sec font-semibold text-c-text transition-colors duration-(--dur-feedback) hover:bg-c-surface-2 motion-safe:active:scale-[0.98]"
      >
        Cash out{" "}
        <MorphNumber
          value={money(co.value)}
          dir={co.value > co.was ? "up" : co.value < co.was ? "down" : null}
          className="font-hb-num font-bold"
        />{" "}
        USDT
      </button>
      <div className="mt-1 flex items-center justify-between">
        <span className="font-hb-ui text-hb-micro text-c-text-2">
          updates live
        </span>
        <button
          type="button"
          onClick={() => openConfirm("partial")}
          aria-haspopup="dialog"
          className="font-hb-ui text-hb-micro font-semibold text-c-text-2 underline decoration-dotted underline-offset-2 hover:text-c-text"
        >
          Partial cash out
        </button>
      </div>
    </div>
  );
}

/* ── Shared bits ───────────────────────────────────────────────────── */
function LivePill({ b }: { b: Bet }) {
  const mt = useWorld((s) => s.matches.find((m) => m.id === b.matchId));
  if (mt?.status !== "live") return null;
  return (
    <span className="ms-1.5 inline-flex items-center gap-1 rounded-hb-sm bg-c-live px-1.5 py-px font-hb-ui text-hb-micro font-semibold text-c-live-fg">
      LIVE {mt.score.home}–{mt.score.away}{" "}
      {mt.minute != null ? `${mt.minute}′` : (mt.period ?? "")}
    </span>
  );
}

function ResultPill({ b }: { b: Bet }) {
  if (b.result === "open")
    return (
      <span className="rounded-hb-sm bg-c-surface-3 px-2 py-0.5 font-hb-ui text-hb-label font-semibold text-c-text">
        Open
      </span>
    );
  if (b.result === "won")
    return (
      <span className="rounded-hb-sm bg-c-up-a16 px-2 py-0.5 font-hb-ui text-hb-label font-semibold text-c-up-text">
        ▲ won
      </span>
    );
  if (b.result === "lost")
    return (
      <span className="rounded-hb-sm bg-c-surface-3 px-2 py-0.5 font-hb-ui text-hb-label font-semibold text-c-text-2">
        ▼ lost
      </span>
    );
  if (b.result === "void")
    return (
      <span className="rounded-hb-sm bg-c-surface-3 px-2 py-0.5 font-hb-ui text-hb-label font-semibold text-c-text-2">
        ↺ void
      </span>
    );
  return (
    <span className="rounded-hb-sm bg-c-surface-3 px-2 py-0.5 font-hb-ui text-hb-label font-semibold text-c-text-2">
      Cashed out
    </span>
  );
}

function SameAgain({ b }: { b: Bet }) {
  const mt = useWorld((s) => s.matches.find((m) => m.id === b.matchId));
  const done = mt?.status === "finished" || !b.outcomeId;
  const reason = !b.outcomeId
    ? "Fixture isn't in this demo's book"
    : mt?.status === "finished"
      ? "Fixture has ended — markets are closed"
      : null;
  if (done)
    return (
      <span
        title={reason ?? undefined}
        className="ms-auto font-hb-ui text-hb-micro text-c-text-3"
      >
        Same again · {reason ?? "off-book"}
      </span>
    );
  return (
    <button
      type="button"
      onClick={() => {
        const slip = useSlip.getState();
        if (slip.selections.some((x) => x.outcomeId === b.outcomeId)) {
          useUI.getState().setPanelTab("slip");
          useUI.getState().toast("Already on the slip", "info");
          return;
        }
        slip.toggle(b.outcomeId);
        const landed = useSlip
          .getState()
          .selections.some((x) => x.outcomeId === b.outcomeId);
        if (landed) {
          useUI.getState().setPanelTab("slip");
          useSlip.getState().setMobileOpen(true);
          useUI
            .getState()
            .toast("Same pick added · review the price before placing", "info");
        } else {
          useUI
            .getState()
            .toast("That market is closed for this fixture", "info");
        }
      }}
      className="ms-auto font-hb-ui text-hb-micro font-semibold text-c-text-2 underline decoration-dotted underline-offset-2 hover:text-c-text"
    >
      Same again
    </button>
  );
}

function QuerySettlement() {
  return (
    <button
      type="button"
      onClick={() =>
        useUI
          .getState()
          .toast(
            "Query logged — a live book would open a settlement case (demo)",
            "info",
          )
      }
      className="font-hb-ui text-hb-micro font-semibold text-c-text-2 underline decoration-dotted underline-offset-2 hover:text-c-text"
    >
      Query this settlement
    </button>
  );
}

/* ── E-21 · bet card — the sheet/panel density (role=article) ──────── */
function BetCard({ b }: { b: Bet }) {
  const mt = useWorld((s) => s.matches.find((m) => m.id === b.matchId));
  const [open, setOpen] = useState(false);
  const isOpen = b.result === "open";
  const net = +(b.returns - b.stake).toFixed(2);
  return (
    <article className="rounded-hb-md border border-c-hairline bg-c-surface-2 p-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="flex flex-wrap items-center font-hb-ui text-hb-body font-semibold text-c-text">
            <span className="truncate">{b.pick}</span>
            {isOpen && <LivePill b={b} />}
          </p>
          <p className="mt-0.5 truncate font-hb-ui text-hb-body-sec text-c-text-2">
            {b.marketName} · {fixtureOf(b, mt)}
          </p>
          <p className="mt-0.5 font-hb-ui text-hb-micro text-c-text-3">
            {fmtPlaced(b.placedAt)}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <span className="font-hb-num text-hb-odds font-bold text-c-text">
            {b.odds.toFixed(2)}
          </span>
          <ResultPill b={b} />
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between border-t border-c-hairline pt-2 font-hb-ui text-hb-body-sec text-c-text-2">
        <span>
          Stake{" "}
          <span className="font-hb-num font-semibold text-c-text">
            {money(b.stake)}
          </span>
        </span>
        <span>
          {isOpen
            ? "Returns"
            : b.result === "lost"
              ? "Returned"
              : b.result === "void"
                ? "Returned"
                : "Paid"}{" "}
          <span className="font-hb-num font-semibold text-c-text">
            {b.result === "lost" ? "0.00" : money(b.returns)}
          </span>
          {!isOpen && b.result !== "void" && (
            <span className="font-hb-num">
              {" "}
              · net {net >= 0 ? "+" : "−"}
              {money(Math.abs(net))}
            </span>
          )}
        </span>
      </div>
      {isOpen && b.settledNote && (
        <p className="mt-1 font-hb-ui text-hb-micro text-c-text-2">
          {b.settledNote}
        </p>
      )}
      {/* CO control lives ON the row (E-21), never inside the expand —
          every cash-out state is visible without disclosure */}
      {isOpen && <CashOutModule b={b} />}
      {!isOpen && (
        <p
          className={`mt-1.5 font-hb-ui text-hb-body-sec ${
            b.result === "won" ? "text-c-up-text" : "text-c-text-2"
          }`}
        >
          {b.settledNote ??
            (b.result === "won"
              ? `Settled · won ${money(net)} USDT`
              : b.result === "lost"
                ? `Settled · lost ${money(b.stake)} USDT`
                : "")}
        </p>
      )}
      {/* expansion — row extension, never a floating card */}
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="mt-1.5 flex h-8 w-full items-center justify-center rounded-hb-md font-hb-ui text-hb-label text-c-text-2 transition-colors duration-(--dur-feedback) hover:bg-c-surface-3 hover:text-c-text"
      >
        <span aria-hidden className={open ? "rotate-180" : ""}>
          ⌄
        </span>
      </button>
      {open && (
        <div className="border-t border-c-hairline pt-2">
          <p className="font-hb-ui text-hb-body-sec text-c-text-2">
            ref {b.id} · placed {fmtPlaced(b.placedAt)} · {b.odds.toFixed(2)}{" "}
            accepted
          </p>
          <p className="mt-0.5 font-hb-ui text-hb-micro text-c-text-2">
            {isOpen
              ? "Settles on the official result"
              : "Settled on the official result"}
            {isOpen &&
              (b.cashout ? " · Cash out offered" : " · No cash out offered")}
          </p>
          <div className="mt-2 flex items-center gap-3">
            {!isOpen && <QuerySettlement />}
            <SameAgain b={b} />
          </div>
        </div>
      )}
    </article>
  );
}

/* ── E-21 · bet row — the /bets table density (W6-05 parity) ───────── */
function BetRow({ b }: { b: Bet }) {
  const mt = useWorld((s) => s.matches.find((m) => m.id === b.matchId));
  const [open, setOpen] = useState(false);
  const isOpen = b.result === "open";
  const net = +(b.returns - b.stake).toFixed(2);
  return (
    <>
      <tr className="border-b border-c-hairline last:border-0">
        <td className="whitespace-nowrap px-3 py-2.5 font-hb-ui text-hb-body-sec text-c-text-2">
          {fmtPlaced(b.placedAt)}
        </td>
        <td className="min-w-0 px-3 py-2.5">
          <p className="truncate font-hb-ui text-hb-body-sec font-semibold text-c-text">
            {b.pick}
            {isOpen && <LivePill b={b} />}
          </p>
          <p className="truncate font-hb-ui text-hb-micro text-c-text-2">
            {b.marketName} · {fixtureOf(b, mt)}
          </p>
        </td>
        <td className="whitespace-nowrap px-3 py-2.5 text-end font-hb-num text-hb-odds-sm font-semibold text-c-text">
          {b.odds.toFixed(2)}
        </td>
        <td className="whitespace-nowrap px-3 py-2.5 text-end font-hb-num text-hb-odds-sm text-c-text">
          {money(b.stake)}
        </td>
        <td className="whitespace-nowrap px-3 py-2.5 text-end font-hb-num text-hb-odds-sm text-c-text">
          {b.result === "lost" ? "0.00" : money(b.returns)}
        </td>
        <td className="whitespace-nowrap px-3 py-2.5 text-end">
          <ResultPill b={b} />
        </td>
        <td className="w-10 px-2 py-2.5 text-end">
          <button
            type="button"
            aria-expanded={open}
            aria-label={`${open ? "Collapse" : "Expand"} ${b.id}`}
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-hb-md text-c-text-2 hover:bg-c-surface-2 hover:text-c-text"
          >
            <span aria-hidden className={open ? "rotate-180" : ""}>
              ⌄
            </span>
          </button>
        </td>
      </tr>
      {open && (
        <tr className="border-b border-c-hairline bg-c-surface-1 last:border-0">
          <td colSpan={7} className="px-3 py-3">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-56 font-hb-ui text-hb-body-sec text-c-text-2">
                <p>
                  ref {b.id} · placed {fmtPlaced(b.placedAt)} ·{" "}
                  {b.odds.toFixed(2)} accepted
                </p>
                <p className="mt-0.5 font-hb-ui text-hb-micro">
                  {isOpen
                    ? "Settles on the official result"
                    : "Settled on the official result"}
                  {isOpen &&
                    (b.cashout
                      ? " · Cash out offered"
                      : " · No cash out offered")}
                </p>
                {b.settledNote && (
                  <p className="mt-0.5 font-hb-ui text-hb-micro">
                    {b.settledNote}
                  </p>
                )}
                {!isOpen && b.result !== "void" && (
                  <p className="mt-0.5 font-hb-ui text-hb-micro">
                    net {net >= 0 ? "+" : "−"}
                    {money(Math.abs(net))} USDT
                  </p>
                )}
                <div className="mt-1.5 flex items-center gap-3">
                  {!isOpen && <QuerySettlement />}
                  <SameAgain b={b} />
                </div>
              </div>
              {isOpen && (
                <div className="w-full max-w-xs">{<CashOutModule b={b} />}</div>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

/* ── E-20 · tabs + filters ─────────────────────────────────────────── */
type Period = "all" | "today" | "7d" | "30d" | "custom";
const PERIODS: { k: Period; label: string }[] = [
  { k: "all", label: "All time" },
  { k: "today", label: "Today" },
  { k: "7d", label: "Last 7 days" },
  { k: "30d", label: "Last 30 days" },
  { k: "custom", label: "Custom" },
];

export function MyBetsBody({ full = false }: { full?: boolean }) {
  const bets = useBets((s) => s.bets);
  const wMatches = useWorld((s) => s.matches);
  const open = bets.filter((b) => b.result === "open");
  const settled = bets
    .filter((b) => b.result !== "open")
    .sort((a, b) => b.placedAt - a.placedAt);
  const [tab, setTab] = useState<"open" | "settled">("open");
  const [period, setPeriod] = useState<Period>("all");
  const [sport, setSport] = useState<"all" | "soccer">("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [range, setRange] = useState<[number, number] | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [roving, setRoving] = useState(0);

  const since = (ts: number) => {
    const day = 86_400_000;
    if (period === "today") {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      return ts >= d.getTime();
    }
    if (period === "7d") return ts >= Date.now() - 7 * day;
    if (period === "30d") return ts >= Date.now() - 30 * day;
    if (period === "custom" && range)
      return ts >= range[0] && ts <= range[1] + 86_399_000;
    return true;
  };
  const shown = (tab === "open" ? open : settled).filter(
    (b) =>
      since(b.placedAt) &&
      // off-book fixtures have no sport — they only live under "All"
      (sport === "all" ||
        wMatches.find((m) => m.id === b.matchId)?.sport === sport),
  );
  const tabs = [
    { k: "open" as const, label: `Open (${open.length})` },
    { k: "settled" as const, label: `Settled (${settled.length})` },
  ];
  const onTabKey = (e: KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (roving + (e.key === "ArrowRight" ? 1 : -1) + 2) % 2;
    setRoving(next);
    tabRefs.current[next]?.focus();
  };

  const net = sessionNet(bets);

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-3 pb-4">
      {full && (
        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2 pt-3">
          <h1 className="font-hb-ui text-hb-title font-semibold text-c-text">
            My bets{" "}
            <span className="font-hb-ui text-hb-body-sec font-normal text-c-text-2">
              {open.length} open · {settled.length} settled
            </span>
          </h1>
          <p className="font-hb-ui text-hb-body-sec text-c-text-2">
            Session{" "}
            {Math.max(1, Math.floor((Date.now() - SESSION_START) / 60_000))} min
            · net{" "}
            <span dir="ltr" className="font-hb-num text-c-text">
              {net >= 0 ? "+" : "−"}
              {money(Math.abs(net))}
            </span>{" "}
            USDT
          </p>
        </div>
      )}
      <TicketOfflineBar myBets />
      {/* segmented Open/Settled — honest counts on the tabs (U-28) */}
      <div
        role="tablist"
        aria-label="Bet status"
        onKeyDown={onTabKey}
        className="sticky top-0 z-10 -mx-3 flex gap-1 bg-c-surface-1 px-3 pb-2 pt-2"
      >
        {tabs.map((t, i) => (
          <button
            key={t.k}
            type="button"
            role="tab"
            aria-selected={tab === t.k}
            tabIndex={i === roving ? 0 : -1}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            onClick={() => {
              setTab(t.k);
              setRoving(i);
            }}
            className={`h-10 flex-1 rounded-hb-md font-hb-ui text-hb-label font-semibold transition-colors duration-(--dur-feedback) ${
              tab === t.k
                ? "bg-c-surface-3 text-c-text"
                : "text-c-text-2 hover:bg-c-surface-2 hover:text-c-text"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {/* filters — time chips + sport (full page density, W6-02/03/04) */}
      {full && (
        <div
          className="flex flex-wrap items-center gap-1 pb-2"
          role="toolbar"
          aria-label="Filters"
        >
          {PERIODS.map((p) => (
            <button
              key={p.k}
              type="button"
              aria-pressed={period === p.k}
              onClick={() => setPeriod(p.k)}
              className={`h-9 rounded-hb-md px-2.5 font-hb-ui text-hb-label font-semibold transition-colors duration-(--dur-feedback) ${
                period === p.k
                  ? "bg-c-surface-3 text-c-text"
                  : "text-c-text-2 hover:bg-c-surface-2 hover:text-c-text"
              }`}
            >
              {p.label}
            </button>
          ))}
          <select
            value={sport}
            onChange={(e) => setSport(e.target.value as typeof sport)}
            aria-label="Sport"
            className="ms-auto h-9 rounded-hb-md border border-c-hairline bg-c-surface-2 px-2 font-hb-ui text-hb-label font-semibold text-c-text outline-none"
          >
            <option value="all">All sports</option>
            <option value="soccer">Football</option>
          </select>
          {period === "custom" && (
            <div className="flex w-full items-center gap-2 pt-1">
              <label className="font-hb-ui text-hb-label text-c-text-2">
                From{" "}
                <input
                  type="date"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="h-9 rounded-hb-md border border-c-hairline bg-c-surface-2 px-2 font-hb-ui text-hb-label text-c-text"
                />
              </label>
              <label className="font-hb-ui text-hb-label text-c-text-2">
                To{" "}
                <input
                  type="date"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="h-9 rounded-hb-md border border-c-hairline bg-c-surface-2 px-2 font-hb-ui text-hb-label text-c-text"
                />
              </label>
              <button
                type="button"
                onClick={() =>
                  from &&
                  to &&
                  setRange([new Date(from).getTime(), new Date(to).getTime()])
                }
                className="h-9 rounded-hb-md bg-c-surface-3 px-3 font-hb-ui text-hb-label font-semibold text-c-text hover:bg-c-surface-2"
              >
                Apply
              </button>
            </div>
          )}
        </div>
      )}

      {full ? (
        <>
          {/* W6-05 table ≥lg · stacked cards below */}
          <table className="mt-1 hidden w-full border-collapse lg:table">
            <thead>
              <tr className="border-b border-c-hairline text-start font-hb-ui text-hb-micro uppercase text-c-text-2">
                <th className="px-3 py-2 text-start font-semibold">Placed</th>
                <th className="px-3 py-2 text-start font-semibold">Bet</th>
                <th className="px-3 py-2 text-end font-semibold">Odds</th>
                <th className="px-3 py-2 text-end font-semibold">Stake</th>
                <th className="px-3 py-2 text-end font-semibold">Returns</th>
                <th className="px-3 py-2 text-end font-semibold">Result</th>
                <th className="w-10 px-2 py-2" aria-label="Expand" />
              </tr>
            </thead>
            <tbody>
              {shown.map((b) => (
                <BetRow key={b.id} b={b} />
              ))}
            </tbody>
          </table>
          <div className="space-y-2 pt-1 lg:hidden">
            {shown.map((b) => (
              <BetCard key={b.id} b={b} />
            ))}
          </div>
        </>
      ) : (
        <div className="space-y-2 pt-1">
          {shown.map((b) => (
            <BetCard key={b.id} b={b} />
          ))}
        </div>
      )}
      {shown.length === 0 && (
        <p
          role="status"
          className="px-1 py-6 font-hb-ui text-hb-body-sec text-c-text-2"
        >
          {tab === "open"
            ? open.length === 0
              ? "No open bets — your ticket lives on the slip tab"
              : "No open bets in this range"
            : settled.length === 0
              ? "No settled bets yet"
              : "No settled bets in this range"}
        </p>
      )}
    </div>
  );
}
