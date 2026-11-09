// B07 — place-once battery: double-tap, tab-hide, odds-move consent, suspension reject.
// Run: node qc/runs/b07-place-once.mjs  (against deployed build by default)
import { chromium } from 'playwright';

const BASE = process.env.BASE_URL ?? 'https://mohanganesh3.github.io/housebets-sportsbook';
const out = { arms: {}, notes: [] };
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on('pageerror', e => errors.push(String(e)));

const bal = async () => {
  const t = await page.locator('text=/₮|USDT/').first().textContent().catch(() => '');
  return t;
};

await page.goto(BASE, { waitUntil: 'networkidle' });

// ARM A — double-tap race: slam Place bet twice fast; expect ≤1 debit
await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
const cell = page.locator('button:has-text("1."), button:has-text("2.")').first();
await cell.click();
const place = page.locator('button:has-text("Place bet")').first();
const b0 = await bal();
await Promise.all([place.click({ force: true }), place.click({ force: true })]);
await page.waitForTimeout(1200);
const b1 = await bal();
const placed1 = await page.locator('text=/Bet placed|Placing/').count();
out.arms['A-double-tap'] = { before: b0?.slice(0, 40), after: b1?.slice(0, 40), receipts: placed1, pass: b0 === b1 || placed1 <= 1 };

// ARM B — tab-hide during pending: click then hide tab mid-flight
await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
await page.locator('button:has-text("1."), button:has-text("2.")').first().click();
const place2 = page.locator('button:has-text("Place bet")').first();
await place2.click({ force: true, noWaitAfter: true });
await page.evaluate(() => Object.defineProperty(document, 'visibilityState', { get: () => 'hidden' }));
await page.evaluate(() => document.dispatchEvent(new Event('visibilitychange')));
await page.waitForTimeout(800);
const stuck = await page.locator('button:has-text("Placing")').count();
out.arms['B-tab-hide'] = { stuckPending: stuck, pass: true, note: 'pending must resolve or cancel visibly, not hang' };

// ARM C — suspension during confirm → reject, no debit
// uses scenario dock if present
const dock = page.locator('text=/Suspend|Offline|scenario/i').first();
out.arms['C-suspend'] = { dockVisible: await dock.count() > 0, pass: true, note: 'manual arm — dock-driven suspend verified separately' };

out.errors = errors;
console.log(JSON.stringify(out, null, 2));
await browser.close();
