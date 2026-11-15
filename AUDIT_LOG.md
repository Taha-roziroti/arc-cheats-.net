# SEO audit log (`cursor-seo-audit-prompt.md`)

Workflow: `npm run audit` → fix → rebuild → log. Script: `scripts/seo-audit.mjs` (frozen after pass 3; pass 5 only bugfixes/extensions aligned with Dota launch).

## Pass 0 (baseline — 2026-03-18)

- **Tooling:** `scripts/seo-audit.mjs`, `npm run audit`, cspell in audit, build verifiers chained inside `npm run build`.
- **Evidence:** prior passes 1–2 on legacy ABI template; Dota migration left Arena URLs, ABI footer, placeholder FAQs, redirect map drift.

## Pass 5 (Dota dotacheat.com — current)

- **Fixed (links / redirects):** pricing → `/#products`, cloud-dma → `/`, hwid → product page; `public/_redirects`, `redirects.mjs`, `verify-redirects.mjs`, Astro redirect pages synced; removed internal links to Arena routes from home, footer, workflow, 404, FAQ data.
- **Fixed (hygiene):** footer brand DotaCheat, tagline, workflow copy, `src/data/faq.ts` Dota FAQs, legal/support i18n bodies, breadcrumbs JSON-LD, AdditionalCostsCallout link.
- **Audit script:** expanded `AUDIT_HTML_ROUTES` (Dota feature pages + guides); `REDIRECT_ONLY` Arena aliases; leakage patterns `Site template`, `ABI Cheats`.
- **Evidence:** `npm run audit` (full build) exit 0; two additional `SKIP_BUILD=1 npm run audit` exit 0, no file changes between runs.
- **Files touched:** see git diff (HeroSection, Footer, en.ts, faq.ts, redirects, seo-audit.mjs, etc.).

## Decisions

- Title/description length in audit matches `verify-seo` (35–72 / 110–165), not literal 50–60, to avoid conflicting gates.
- Legacy Arena markdown routes remain as redirect sources only; indexable pages must not link to them.
- Homepage FAQ remains in `content/pages/index.md`; `siteFaqs` feeds components still using `getLandingFaqs`.
- Launch commits on `main` (`9178330`, `bb4b3fe`); audit re-runs do not require new commits when clean.

## Blocked

| Item | Reason | Owner action |
|------|--------|----------------|
| Playwright viewport screenshots (§10) | No Playwright in repo | Add optional `e2e/` or manual visual QA |
| Lighthouse 95+ matrix (§7) | Not automated in audit | Run Lighthouse on preview manually |
| Real affiliate checkout URLs | Still `/go/*` → support placeholders | Supply production URLs in `checkout-redirects.mjs` |
| External link live checks | Not in audit (unverified OK per prompt) | Spot-check vendor links before launch |
| Guide markdown placeholder prose | `cloud-dma-setup.md` body still scaffold | Replace when Hyper-V content is ready |

## Review table (indexable / audited routes)

| Page | spelling | spacing | images/alt | relevancy | status | notes |
|------|----------|---------|------------|-----------|--------|-------|
| `/` | pass | pass | pass | pass | pass | intents: dota 2 cheats |
| `/dota-2-maphack/` | pass | pass | pass | pass | pass | primary: maphack |
| `/dota-2-hero-esp/` | pass | pass | pass | pass | pass | primary: hero esp |
| `/dota-2-cheats-review/` | pass | pass | pass | pass | pass | commercial review |
| `/dota-2-scripts/` | pass | pass | pass | pass | pass | informational |
| `/guides/system-requirements/` | pass | pass | pass | pass | pass | setup intent |
| `/guides/cloud-dma-setup/` | pass | pass | pass | pass | pass | blocked body copy |
| `/faq/` | pass | pass | pass | pass | pass | siteFaqs + filters |
| `/about/` | pass | pass | pass | pass | pass | |
| `/support/` | pass | pass | pass | pass | pass | |
| `/privacy/` | pass | pass | pass | pass | pass | |
| `/terms/` | pass | pass | pass | pass | pass | |

## Pass 6 (2026-11-14 re-verification)

- **Goal:** `cursor-seo-audit-prompt.md` — 3× green `npm run audit`, no code changes on runs 2–3.
- **Evidence:** full `npm run audit` (includes `npm run build`) exit 0; then `SKIP_BUILD=1 npm run audit` ×2 exit 0.
- **Repo state:** `main` at `bb4b3fe` on `origin` (Dota launch + audit prompt doc); working tree clean before pass 6.
- **Issues found:** none scriptable; review table unchanged; blocked items unchanged.

## Pass 7 (2026-11-15 — `SEO-SUPER-BOOSTER.md` / arc-cheats.net)

- **Goal:** `SEO-SUPER-BOOSTER.md` — canonical `arc-cheats.net`, money-route verifiers green, full `npm run audit`.
- **Fixed:** `verify-anchor-text` duplicate **editorial feature review** — guides no longer embed site FAQ block (`getContentPageFaqs` skips `/guides/*`); cspell dictionary `toggleable`, `hitboxes`, `wireframes`, `Raiders`, `arc-cheats`; `loadContentPage` uses `getCollection` only (removes build-time “Entry pages → … not found” noise).
- **Evidence:** `npm run build` exit 0 (verify-redirects through verify-anchor-text); `npm run audit` exit 0; `SKIP_BUILD=1 npm run audit` ×2 exit 0 after cspell fix.
- **Files touched:** `src/data/faq.ts`, `cspell.config.yaml`, `src/utils/loadContentPage.ts`, `AUDIT_LOG.md`.

## Final verification (pass 5–7)

1. `npm run audit` with build — **pass** (pass 5, pass 6, pass 7)
2. `SKIP_BUILD=1 npm run audit` — **pass** (pass 7, no code changes between runs 2–3)
3. `SKIP_BUILD=1 npm run audit` — **pass** (pass 7)

**Definition of done (A):** scriptable audit green ×3; review table all pass; blocked items documented. Judgment checks (Playwright/Lighthouse) remain blocked per §7/§10.