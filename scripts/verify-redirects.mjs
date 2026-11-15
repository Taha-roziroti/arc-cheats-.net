import fs from 'node:fs';
import path from 'node:path';
import { PATH_REDIRECTS } from './redirects.mjs';
import { checkoutRedirectLines } from '../src/config/checkout-redirects.mjs';

/** Keep in sync with src/data/site.ts KEYWORD_REDIRECTS */
const KEYWORD_REDIRECTS = [
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
  ['/arena-breakout-infinite-esp/', '/arc-raiders-esp/'],
  ['/arena-breakout-infinite-aimbot/', '/arc-raiders-aimbot/'],
];

const errors = [];

for (const [from, to] of KEYWORD_REDIRECTS) {
  const mapped = PATH_REDIRECTS.get(from);
  if (mapped !== to) {
    errors.push(`PATH_REDIRECTS["${from}"] expected "${to}" got "${mapped ?? 'undefined'}"`);
  }
}

const redirectsFile = path.join(process.cwd(), 'public', '_redirects');
if (!fs.existsSync(redirectsFile)) {
  errors.push('public/_redirects missing');
} else {
  const text = fs.readFileSync(redirectsFile, 'utf8');
  for (const [from, to] of KEYWORD_REDIRECTS) {
    if (!text.includes(from) || !text.includes(to)) {
      errors.push(`_redirects missing alias ${from} → ${to}`);
    }
  }

  for (const line of checkoutRedirectLines()) {
    const [from, to] = line.split(/\s+/);
    if (!text.includes(from) || !text.includes(to)) {
      errors.push(`_redirects missing checkout ${from} → ${to}`);
    }
  }
}

if (errors.length) {
  console.error('verify-redirects failed:\n' + errors.map((e) => `  - ${e}`).join('\n'));
  process.exit(1);
}

console.log('verify-redirects: OK');
