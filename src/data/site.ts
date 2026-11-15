/** Canonical SEO / site identity — host from config/site.mjs. */

import { SITE_HOST as CANONICAL_HOST, SITE_URL as CANONICAL_URL, buildSitemapImages } from '../../config/site.mjs';
import { PLACEHOLDER_COPY } from './placeholders';

export const SITE_HOST = CANONICAL_HOST;
export const SITE_URL = CANONICAL_URL;

export const SITE_NAME = PLACEHOLDER_COPY.siteName;
export const SITE_BRAND = SITE_NAME;
export const SUPPORT_EMAIL = `support@${SITE_HOST}`;

export const PRODUCT_BASE = '/';
export const TITLE_PREFIX = PLACEHOLDER_COPY.title;

export const PRODUCT_ID = `${SITE_URL}/#product`;

export const SITE_PURPOSE =
  'Independent ARC Raiders guides, showcase screenshots, and named checkout bridges on arc-cheats.net.';

export const SITE_ABOUT = ['Product guides', 'Feature pages', 'Checkout paths', 'Support', 'Windows PC'] as const;

export const LISTED_PRICES = {
  monthlyUsd: 35,
  lifetimeUsd: 150,
  cloudDmaLifetimeUsd: 0,
} as const;

export const SEO_ROUTE_INTENTS: Record<string, string> = {
  '/': 'arc raiders cheats, esp, aimbot, plans',
  '/arc-raiders-esp/': 'arc raiders esp, player esp, loot esp, container esp',
  '/arc-raiders-aimbot/': 'arc raiders aimbot, fov, smoothing',
  '/arc-raiders-account-vs-hardware-ban/': 'arc raiders account ban, hardware ban, hwid ban',
  '/faq/': 'arc raiders cheats faq, checkout',
  '/support/': 'arc raiders support, checkout help',
};

export { INDEXABLE_MONEY_ROUTES } from '../../config/site.mjs';

export const OG_IMAGES: Record<string, string> = {
  '/': '/og/home.jpg',
  '/arc-raiders-esp/': '/og/home.jpg',
  '/arc-raiders-aimbot/': '/og/default.jpg',
  '/arc-raiders-account-vs-hardware-ban/': '/og/pricing.jpg',
  '/faq/': '/og/faq.jpg',
  '/guides/system-requirements/': '/og/requirements.jpg',
  '/guides/cloud-dma-setup/': '/og/cloud-dma-setup.jpg',
  default: '/og/default.jpg',
};

export function ogImageForPath(pathname: string): string {
  const path = pathname.endsWith('/') || pathname === '' ? pathname || '/' : `${pathname}/`;
  return OG_IMAGES[path] ?? OG_IMAGES.default!;
}

export const SITEMAP_IMAGES = buildSitemapImages(SITE_URL) as Record<string, { loc: string; title: string }[]>;

export const KEYWORD_REDIRECTS: [string, string][] = [
  ['/pricing', '/#products'],
  ['/pricing/', '/#products'],
  ['/arena-breakout-infinite-esp/', '/arc-raiders-esp/'],
  ['/arena-breakout-infinite-aimbot/', '/arc-raiders-aimbot/'],
  ['/dota-2-maphack/', '/arc-raiders-esp/'],
  ['/dota-2-hero-esp/', '/arc-raiders-esp/'],
  ['/dota-2-scripts/', '/arc-raiders-aimbot/'],
  ['/dota-2-cheats-review/', '/arc-raiders-account-vs-hardware-ban/'],
  ['/arena-breakout-infinite-cheats-pricing/', '/#products'],
  ['/cloud-dma-for-arena-breakout-infinite/', '/'],
  ['/arena-breakout-infinite-hwid-spoofer/', '/products/dota-2-cheats/hwid-spoofer/'],
  ['/cloud-dma/', '/'],
  ['/hwid-spoofer/', '/products/dota-2-cheats/hwid-spoofer/'],
  ['/sitemap-index.xml', '/sitemap.xml'],
  ['/sitemap-0.xml', '/sitemap.xml'],
  ['/dota-2-vac-ban-risk', '/arc-raiders-account-vs-hardware-ban/'],
  ['/dota-2-vac-ban-risk/', '/arc-raiders-account-vs-hardware-ban/'],
];