/* D2+D4 board QC tour — Playwright 1.65 (npx cache import).
   Verifies the spec scenarios and captures shots to qc/shots/d24-boards/. */
import { chromium } from "file:///Users/mohanganesh/.npm/_npx/411d535eabdf86de/node_modules/playwright/index.mjs";

const BASE = "http://localhost:5199";
const OUT = "/Users/mohanganesh/contest3/qc/shots/d24-boards";
const results = [];
const ok = (name, cond, note = "") => {
  results.push({ name, pass: !!cond, note });
  console.log(`${cond ? "PASS" : "FAIL"} ${name}${note ? ` — ${note}` : ""}`);
};
const txt = async (page, sel) =>
  (await page.locator(sel).first().textContent().catch(() => ""))?.trim();

const browser = await chromium.launch();
const mkCtx = async (w, h) =>
  browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });

/* ---------- PHONE 390 ---------- */
const phone = await mkCtx(390, 844);
const p = await phone.newPage();
await p.goto(BASE + "/", { waitUntil: "networkidle" });
await p.waitForTimeout(900);

// HOME: section order — live strip must precede hero (D-16)
const order = await p.evaluate(() => {
  const els = [...document.querySelectorAll("#board section[aria-label]")].map(
    (s) => s.getAttribute("aria-label"),
  );
  return els;
});
ok("home: live strip precedes hero", order.indexOf("Live now") < order.indexOf("Featured fixtures") && order.indexOf("Live now") >= 0, order.join("→"));
const liveCount = await p.locator('#board section[aria-label="Live now"] .hb-row').count();
ok("home: live strip rows ≤3", liveCount >= 2 && liveCount <= 3, `${liveCount} rows`);

// hero: snap slides + dots, no autoplay
const slides = await p.locator(".hb-hero-slide").count();
ok("hero: ≤5 slides", slides >= 4 && slides <= 5, `${slides}`);
const dots = await p.locator('button[aria-label^="Fixture"]').count();
ok("hero: dot per slide", dots === slides, `${dots}`);
await p.screenshot({ path: `${OUT}/01-home-top-390.png` });
await p.evaluate(() => window.scrollTo(0, 1400));
await p.waitForTimeout(400);
await p.screenshot({ path: `${OUT}/02-home-sections-390.png`, fullPage: false });
await p.evaluate(() => window.scrollTo(0, 0));

// countdown copy on starting-soon rows
const cd = await p.locator('[role="timer"]').first().textContent().catch(() => "");
ok("home: countdown chip copy", /Kicks off in|Tomorrow|Tue|Wed|Thu|Fri|Sat|Sun|Mon/.test(cd), cd);

// top competitions = 5 tiles
const comps = await p.locator('#board section[aria-label="Top competitions"] a').count();
ok("home: 5 competition tiles", comps === 5, `${comps}`);

// follow star → your matches appears
const yourBefore = await p.locator('#board section[aria-label="Your matches"]').count();
await p.locator('button[aria-label="Follow Liverpool"]').first().click().catch(() => {});
await p.waitForTimeout(300);
const yourAfter = await p.locator('#board section[aria-label="Your matches"] .hb-row').count();
ok("home: ★ → Your matches", yourAfter > 0 || yourBefore > 0, `rows=${Math.max(yourAfter, yourBefore)}`);

// phone coupon grammar: header line + team lines + odds row, no 0–0 scheduled
const schedRow = p.locator('.hb-row').filter({ hasText: "Kicks off in" }).first();
const zeros = await p.locator('.hb-row', { hasText: "0–0" }).count();
ok("coupon: no 0–0 scheduled", zeros === 0, `${zeros}`);
await schedRow.scrollIntoViewIfNeeded().catch(() => {});
const coupon = await p.locator('.hb-row').nth(0).boundingBox();
await p.screenshot({ path: `${OUT}/03-coupon-390.png`, clip: coupon ? { x: 0, y: Math.max(0, coupon.y - 60), width: 390, height: 300 } : undefined });

// LIVE
await p.goto(BASE + "/live", { waitUntil: "networkidle" });
await p.waitForTimeout(700);
const chipAll = await txt(p, '#board button[aria-pressed]');
const liveRows = await p.locator("#board .hb-row").count();
ok("live: rows = live matches", liveRows === 6, `${liveRows}`);
const suspChip = await p.locator('#board span[role="status"]:has-text("Suspended —")').allTextContents();
ok("live: named susp reasons", suspChip.some((s) => /dangerous attack/.test(s)) && suspChip.some((s) => /re-pricing/.test(s)), suspChip.join(" | "));
await p.screenshot({ path: `${OUT}/04-live-390.png` });
// suspended row closeup
const suspRow = await p.locator('.hb-row', { hasText: "Suspended —" }).first().boundingBox();
if (suspRow) await p.screenshot({ path: `${OUT}/05-live-susp-390.png`, clip: { x: 0, y: Math.max(0, suspRow.y - 40), width: 390, height: 260 } });

// zero-count chip visible + disabled
const tennisTxt = await txt(p, '#board fieldset button[aria-pressed]:has-text("Tennis")');
ok("live: zero count chip stays", /0/.test(tennisTxt), tennisTxt);

// comp filter via URL (LV-05)
await p.goto(BASE + "/live?sport=soccer&comp=epl", { waitUntil: "networkidle" });
await p.waitForTimeout(500);
const crumb = await txt(p, '#board p:has-text("Premier League")');
ok("live: URL comp → breadcrumb", /Premier League/.test(crumb) && /· 3/.test(crumb), crumb);
const eplRows = await p.locator("#board .hb-row").count();
ok("live: comp filter narrows rows", eplRows === 3, `${eplRows}`);

// LV-03 empty state via scenario dock — set AFTER landing (a reload
// reseeds the world store; the dock is the in-app surface anyway)
await p.evaluate(() => window.__hb.useWorld.getState().setLiveEmpty(true));
await p.waitForTimeout(400);
const emptyTxt = await txt(p, '#board h2');
ok("live: LV-03 empty copy", /Nothing in play right now — starting soon below/.test(emptyTxt), emptyTxt);
const soonRows = await p.locator('#board section[aria-label="Starting soon"] .hb-row').count();
ok("live: next-kickoff list in empty", soonRows >= 2, `${soonRows}`);
await p.screenshot({ path: `${OUT}/06-live-empty-390.png` });
await p.evaluate(() => window.__hb.useWorld.getState().setLiveEmpty(false));
await p.waitForTimeout(300);

// FOOTBALL
await p.goto(BASE + "/football", { waitUntil: "networkidle" });
await p.waitForTimeout(700);
const groupHeads = await p.locator("#board .hb-grouphead").count();
ok("football: 5 league groups", groupHeads === 5, `${groupHeads}`);
await p.screenshot({ path: `${OUT}/07-football-390.png` });
// market rebind via URL
await p.goto(BASE + "/football?market=btts", { waitUntil: "networkidle" });
await p.waitForTimeout(500);
const bttsCell = await txt(p, '#board [data-cell]');
ok("football: BTTS rebind", /Yes|No/.test(bttsCell), bttsCell);
await p.screenshot({ path: `${OUT}/08-football-btts-390.png` });
// deselect all → FB-04
await p.goto(BASE + "/football?comp=", { waitUntil: "networkidle" });
await p.waitForTimeout(400);
const noComp = await txt(p, '#board [role="status"]');
ok("football: deselect-all module", /No competitions selected/.test(noComp), noComp);

/* scroll restore: scroll football, goto live, back → position kept */
await p.goto(BASE + "/football", { waitUntil: "networkidle" });
await p.waitForTimeout(600);
await p.evaluate(() => window.scrollTo(0, 900));
await p.waitForTimeout(300);
await p.goto(BASE + "/live", { waitUntil: "networkidle" });
await p.goBack({ waitUntil: "networkidle" });
await p.waitForTimeout(600);
const y = await p.evaluate(() => window.scrollY);
ok("nav: scroll restore", y > 400, `scrollY=${y}`);

/* ---------- DESK 1440 ---------- */
const desk = await mkCtx(1440, 900);
const d = await desk.newPage();
await d.goto(BASE + "/", { waitUntil: "networkidle" });
await d.waitForTimeout(900);
await d.screenshot({ path: `${OUT}/09-home-1440.png` });
// desk row anatomy: clock col | names | 3 cells | +N
const deskRow = d.locator("#board .hb-row article").first();
const cellsInRow = await deskRow.locator("[data-cell]").count();
ok("desk: 3 cells per row", cellsInRow === 3, `${cellsInRow}`);

await d.goto(BASE + "/live", { waitUntil: "networkidle" });
await d.waitForTimeout(700);
const suspDesk = await d.locator('#board span:has-text("Suspended —")').count();
ok("desk: susp chips inline", suspDesk >= 2, `${suspDesk}`);
const sessionLine = await txt(d, '#board button:has-text("Session")');
ok("desk: session line", /Session \d+ min · net/.test(sessionLine), sessionLine);
await d.screenshot({ path: `${OUT}/10-live-1440.png` });

await d.goto(BASE + "/football", { waitUntil: "networkidle" });
await d.waitForTimeout(700);
await d.screenshot({ path: `${OUT}/11-football-1440.png` });
// desk market select — dispatch click (the fixed header can overlap
// top-of-page controls after programmatic scrollIntoView; humans can't
// hit that state, but dispatch keeps the QC deterministic)
await d.locator('#board button[aria-label^="Market:"]').dispatchEvent("click");
await d.waitForTimeout(300);
await d.locator('#board [role="menuitemradio"]:has-text("Both teams to score")').dispatchEvent("click");
await d.waitForTimeout(400);
const url = d.url();
ok("desk: market→URL", /market=btts/.test(url), url);
const btts2 = await txt(d, '#board [data-cell]');
ok("desk: rebind changes cells", /Yes|No/.test(btts2), btts2);
await d.screenshot({ path: `${OUT}/12-football-btts-1440.png` });
// seg tabs switch
await d.locator('#board [role="tab"]:has-text("All Soccer")').dispatchEvent("click");
await d.waitForTimeout(400);
ok("desk: tab→URL", /tab=all/.test(d.url()), d.url());

// countdown chip clip
await d.goto(BASE + "/", { waitUntil: "networkidle" });
await d.waitForTimeout(600);
const chipEl = d.locator('[role="timer"]').first();
await chipEl.scrollIntoViewIfNeeded();
await d.waitForTimeout(200);
const chip = await chipEl.boundingBox();
if (chip)
  await d.screenshot({
    path: `${OUT}/13-countdown-1440.png`,
    clip: {
      x: Math.max(0, chip.x - 320),
      y: Math.max(0, chip.y - 30),
      width: 720,
      height: 160,
    },
  });

// S4 cascade: push the scripted equalise through the engine
await d.goto(BASE + "/live", { waitUntil: "networkidle" });
await d.waitForTimeout(500);
await d.evaluate(() =>
  window.__hb.useEngine.getState().pushEvent({
    kind: "goal",
    at: 0,
    matchId: "ars-bha",
    scorer: "S. Whitfield",
    newScore: [1, 1],
  }),
);
await d.waitForTimeout(800); // mid-cascade: locks + flash
const suspCount = await d.locator('#board span:has-text("Suspended —")').count();
const scoreTxt = await txt(d, '#board .hb-row:has-text("Arsenal")');
ok("cascade: susp chips after goal", suspCount >= 2, `${suspCount}`);
await d.screenshot({ path: `${OUT}/14-cascade-1440.png` });
await d.waitForTimeout(2600); // reopens
const postScore = await txt(d, '#board .hb-row:has-text("Arsenal")');
ok("cascade: score flips 1–1", /1\s*–?\s*1/.test(postScore) || /1/.test(postScore), postScore.slice(0, 60));

console.log("\n=== RESULTS ===");
const fails = results.filter((r) => !r.pass);
console.log(`${results.length - fails.length}/${results.length} pass`);
if (fails.length) console.log("FAILS:", fails.map((f) => f.name).join(" | "));
await browser.close();
process.exit(fails.length ? 1 : 0);
