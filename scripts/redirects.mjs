/** Static path redirects (301). Keys are pathname without query/hash. */
export const PATH_REDIRECTS = new Map([
  ['/blog', '/blog/'],
  ['/about', '/about/'],
  ['/affiliate-disclosure', '/about/'],
  ['/affiliate-disclosure/', '/about/'],
  ['/contact', '/support/'],
  ['/contact/', '/support/'],
  ['/support', '/support/'],
  ['/privacy', '/privacy/'],
  ['/terms', '/terms/'],
  ['/faq', '/faq/'],
  ['/cheats', '/'],
  ['/cheats/', '/'],
  ['/cheats/lite', '/'],
  ['/cheats/lite/', '/'],
  ['/cheats/pro', '/'],
  ['/cheats/pro/', '/'],
  ['/cheats/elite', '/'],
  ['/cheats/elite/', '/'],
  ['/cheats/compare', '/blog/dota-2-lite-vs-pro/'],
  ['/cheats/compare/', '/blog/dota-2-lite-vs-pro/'],
  ['/products/dota-2-cheats/utilities', '/products/dota-2-cheats/utilities/'],
  ['/products/dota-2-cheats', '/'],
  ['/products/dota-2-cheats/', '/'],
  ['/products/dota-2-cheats/account-recovery', '/products/dota-2-cheats/ugc/'],
  ['/products/dota-2-cheats/account-recovery/', '/products/dota-2-cheats/ugc/'],
  ['/pricing', '/#products'],
  ['/pricing/', '/#products'],
  ['/cloud-dma', '/'],
  ['/cloud-dma/', '/'],
  ['/hwid-spoofer', '/products/dota-2-cheats/hwid-spoofer/'],
  ['/hwid-spoofer/', '/products/dota-2-cheats/hwid-spoofer/'],
  ['/guides/borderlands-3-cheat-system-requirements', '/guides/system-requirements/'],
  ['/guides/borderlands-3-cheat-system-requirements/', '/guides/system-requirements/'],
  ['/cloud-dma-setup', '/guides/cloud-dma-setup/'],
  ['/cloud-dma-setup/', '/guides/cloud-dma-setup/'],
  ['/sitemap-index.xml', '/sitemap.xml'],
  ['/sitemap-0.xml', '/sitemap.xml'],
  ['/dota-2-vac-ban-risk', '/arc-raiders-account-vs-hardware-ban/'],
  ['/dota-2-vac-ban-risk/', '/arc-raiders-account-vs-hardware-ban/'],
  ['/dota-2-maphack', '/arc-raiders-esp/'],
  ['/dota-2-maphack/', '/arc-raiders-esp/'],
  ['/dota-2-hero-esp', '/arc-raiders-esp/'],
  ['/dota-2-hero-esp/', '/arc-raiders-esp/'],
  ['/dota-2-scripts', '/arc-raiders-aimbot/'],
  ['/dota-2-scripts/', '/arc-raiders-aimbot/'],
  ['/dota-2-cheats-review', '/arc-raiders-account-vs-hardware-ban/'],
  ['/dota-2-cheats-review/', '/arc-raiders-account-vs-hardware-ban/'],
  ['/arena-breakout-infinite-esp', '/arc-raiders-esp/'],
  ['/arena-breakout-infinite-esp/', '/arc-raiders-esp/'],
  ['/arena-breakout-infinite-aimbot', '/arc-raiders-aimbot/'],
  ['/arena-breakout-infinite-aimbot/', '/arc-raiders-aimbot/'],
]);

/** Paths that should not receive a forced trailing slash. */
export const TRAILING_SLASH_SKIP = /\.[a-z0-9]+$/i;

export function resolvePathRedirect(pathname) {
  const direct = PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/') && !TRAILING_SLASH_SKIP.test(pathname)) {
    return `${pathname}/`;
  }

  return null;
}
