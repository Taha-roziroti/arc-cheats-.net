# SEO audit log (`cursor-seo-audit-prompt.md`)

Workflow: `npm run audit` → fix → rebuild → log. Script: `scripts/seo-audit.mjs` (frozen after pass 3; extensions only for Arc Raiders URL map).

## Pass 0 (baseline — 2026-03-18)

- **Tooling:** `scripts/seo-audit.mjs`, `npm run audit`, cspell in audit, build verifiers chained inside `npm run build`.
- **Evidence:** prior passes 1–2 on legacy ABI template; Dota migration left Arena URLs, ABI footer, placeholder FAQs, redirect map drift.

## Decisions

- Title/description length in audit matches `verify-seo` (35–72 / 110–165), not literal 50–60, to avoid conflicting gates.
- Legacy Arena and Dota markdown routes remain as **301 redirect sources only**; indexable pages must not link to them.
- Homepage FAQ remains in `content/pages/index.md`; `siteFaqs` feeds components still using `getLandingFaqs`.
- `keywords.json` is the single source of truth for US commercial Arc Raiders URLs (2026-11-15).
- `/go/*` checkout bridges stay out of sitemap; only allowed internal→redirect exception per prompt Step 0.
- Ban guide is informational: no Product JSON-LD (`verify-seo` `noProductRoutes`).
- Mobile/coarse viewports skip dynamic GSAP/Lenis import (`BaseLayout` boot guard); desktop-only motion matches `motion.ts`.
- `audit:perf` skips SEO floor on `404` template (intentional `noindex` error page).
- Lighthouse raw JSON under `audit/lh-*.json` is gitignored; scores summarized here.

## Blocked

| Item | Reason | Owner action |
|------|--------|----------------|
| Playwright viewport screenshots (§10) | No Playwright in repo | Add optional `e2e/` or manual visual QA |
| Lighthouse 95+ matrix (§7 / DoD A) | After optimizations: home/spoke mobile perf medians often **75–90** (local `127.0.0.1`); FAQ/ban/404 templates pass. Full DoD **A** perf gate not met on homepage + ESP mobile | Re-run `npm run audit:perf` on production; further JS/image tuning |
| Real affiliate checkout URLs | Still `/go/*` → vendor placeholders | Supply production URLs in `checkout-redirects.mjs` |
| External link live checks | Not in audit (unverified OK per prompt) | Spot-check vendor links before launch |
| Guide markdown placeholder prose | `cloud-dma-setup.md` body still scaffold | Replace when Hyper-V content is ready |
| HWID spoofer + cloud DMA money URLs | Not ARC-verified in `keywords.json` | Confirm SKUs before promoting |
| IndexNow | `INDEXNOW_KEY` unset | Set env on deploy |

## Review table (indexable / audited routes)

Keyword and anchor judgments from `keywords.json` + anchor inventory. Hash = git at pass 8 verification.

| Page | spelling | spacing | images/alt | relevancy | keywords/anchors | status | notes |
|------|----------|---------|------------|-----------|------------------|--------|-------|
| `/` | pass | pass | pass | pass | pass | pass | primary: Arc Raiders cheats; `e2f1313` |
| `/arc-raiders-esp/` | pass | pass | pass | pass | pass | pass | commercial ESP intent |
| `/arc-raiders-aimbot/` | pass | pass | pass | pass | pass | pass | commercial aimbot intent |
| `/arc-raiders-account-vs-hardware-ban/` | pass | pass | pass | pass | pass | pass | informational ban guide |
| `/guides/system-requirements/` | pass | pass | pass | pass | pass | pass | setup intent |
| `/guides/cloud-dma-setup/` | pass | pass | pass | blocked | pass | blocked | body scaffold only |
| `/faq/` | pass | pass | pass | pass | pass | pass | siteFaqs |
| `/about/` | pass | pass | pass | pass | pass | pass | |
| `/support/` | pass | pass | pass | pass | pass | pass | |
| `/contact/` | pass | pass | pass | pass | pass | pass | trust/support |
| `/affiliate-disclosure/` | pass | pass | pass | pass | pass | pass | trust/legal |
| `/privacy/` | pass | pass | pass | pass | pass | pass | |
| `/terms/` | pass | pass | pass | pass | pass | pass | |

## Pass 8 (2026-11-15 — Arc Raiders + `cursor-seo-audit-prompt.md` DoD A)

- **Goal:** Definition of done **(A)** scriptable gates on `arc-cheats.net` money URL map.
- **Context:** Money routes migrated to `/arc-raiders-*`; Dota/Arena 301s; `keywords.json`; verifiers green after migration commit `e2f1313`.
- **Evidence — build:** `npm run build` exit 0 (verify-redirects through verify-anchor-text).
- **Evidence — audit ×3:** `npm run audit` exit 0 (full build); `SKIP_BUILD=1 npm run audit` ×2 exit 0 with no code changes between runs 2–3.
- **Evidence — anchor inventory:** `verify-anchor-text` OK; `audit/anchor-inventory.json` from build.
- **Evidence — perf:** `npm run audit:perf` — see command output in pass 8 addendum below (or Blocked if &lt;95 medians).
- **Issues found (scriptable):** none on pass 8.
- **Files touched (pass 8):** `AUDIT_LOG.md`, `scripts/audit-perf.mjs`, `src/pages/404.astro`, `BaseLayout.astro`, `motion.ts`, `responsiveImage.ts`, `showcaseImages.ts`, `WhySetupSection.astro`, `Header.astro`, `en.ts`, `.gitignore`.

## Final verification (pass 8 — scriptable Definition A)

1. `npm run build` — **pass**
2. `npm run audit` (includes build when not skipping) — **pass**
3. `SKIP_BUILD=1 npm run audit` — **pass** (no file changes before run 3)
4. `SKIP_BUILD=1 npm run audit` — **pass** (no file changes)
5. Post–404 fix: full `npm run audit` + `SKIP_BUILD=1` ×2 — **pass** (2026-11-15)
6. Wrap-up (2026-11-15 PM): `npm run build` + `npm run audit` + `SKIP_BUILD=1 npm run audit` — **pass** after header alt restore

**Definition of done (A) — scriptable subset:** build green; audit ×3 with last two no-change; review table updated; blocked items documented. Judgment checks (Playwright, full Lighthouse sign-off) remain blocked or logged per §7/§10 where automation cannot prove them.

## Pass 8 perf addendum

`npm run audit:perf` (2026-11-15, before desktop preset fix) — **fail** (exit 1):

| Template | mobile perf | a11y | BP | SEO |
|----------|-------------|------|-----|-----|
| home | 72 | 96 | 100 | 100 |
| faq | 81 | 100 | 100 | 100 |
| spoke (`/arc-raiders-esp/`) | 78 | 96 | 100 | 100 |
| money-ban | 71 | 96 | 100 | 100 |
| 404 | 82 | 96 | 100 | 69 |

Desktop runs errored (`formFactor` vs screen emulation); fixed in `scripts/audit-perf.mjs` (`--preset=desktop`).

**Later run (post-optimizations, same day):** FAQ/ban/404 at **96–100** mobile perf; home/spoke still **&lt;95** mobile perf; home desktop a11y improved (compare table ARIA, metric contrast, header labels) but median can remain **&lt;95** across 3 runs. **Blocked** for strict DoD **A** until production re-test or further perf work.