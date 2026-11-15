/**
 * Canonical site host — imported by Astro, src/data/site.ts, and Node build scripts.
 */

export const SITE_HOST = 'arc-cheats.net';
export const SITE_URL = `https://${SITE_HOST}`;

/** Indexable commercial and feature URLs (verify-seo audits these). */
export const INDEXABLE_MONEY_ROUTES = [
  '/',
  '/arc-raiders-esp/',
  '/arc-raiders-aimbot/',
  '/arc-raiders-account-vs-hardware-ban/',
];

function showcaseImage(siteUrl, file, title) {
  return { loc: `${siteUrl}/images/showcase/${file}`, title };
}

/** Google sitemap image namespace entries (keep in sync with src/data/site.ts). */
export function buildSitemapImages(siteUrl = SITE_URL) {
  return {
    '/': [
      showcaseImage(siteUrl, 'arc-esp-skeleton.webp', 'Player ESP overlay screenshot'),
      showcaseImage(siteUrl, 'arc-menu-inventory.webp', 'Inventory menu screenshot'),
    ],
    '/arc-raiders-esp/': [showcaseImage(siteUrl, 'arc-esp-loot-overlay.webp', 'Loot ESP screenshot')],
    '/arc-raiders-aimbot/': [showcaseImage(siteUrl, 'arc-gameplay-indoor.webp', 'Indoor aim HUD screenshot')],
    '/arc-raiders-account-vs-hardware-ban/': [
      showcaseImage(siteUrl, 'arc-gameplay-outdoor.webp', 'Outdoor gameplay HUD screenshot'),
    ],
    '/dota-2-scripts/': [showcaseImage(siteUrl, 'arc-gameplay-indoor.webp', 'Indoor HUD screenshot')],
    '/faq/': [{ loc: `${siteUrl}/images/showcase/arc-esp-player-radar.webp`, title: 'FAQ preview screenshot' }],
  };
}