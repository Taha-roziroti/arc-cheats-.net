import fs from 'node:fs';
import path from 'node:path';
import { INDEXABLE_MONEY_ROUTES } from '../config/site.mjs';

const dist = path.join(process.cwd(), 'dist');
const projectRoot = process.cwd();
const errors = [];

const AUDIT_ROUTES = new Set([
  ...INDEXABLE_MONEY_ROUTES,
  '/guides/system-requirements/',
  '/guides/cloud-dma-setup/',
  '/about/',
  '/support/',
  '/privacy/',
  '/terms/',
  '/faq/',
  '/contact/',
  '/affiliate-disclosure/',
]);

/** Main content only; chrome nav/footer sit outside `<main>`. */
function mainBody(html) {
  let main = html.match(/<main[^>]*>([\s\S]*)<\/main>/i)?.[1] ?? '';
  main = main.replace(/<nav[^>]*aria-label=["']Breadcrumb["'][\s\S]*?<\/nav>/gi, '');
  return main;
}

function normalizeHref(href) {
  if (!href || href.startsWith('mailto:') || href.startsWith('javascript:')) return null;
  let p = href.split('#')[0].trim();
  if (!p) return '/';
  if (!p.startsWith('/')) return null;
  if (!p.endsWith('/') && !p.includes('.')) p = `${p}/`;
  return p;
}

function anchorTextFromHtml(inner) {
  return inner
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeAnchor(text) {
  return text.toLowerCase().replace(/\s+/g, ' ').trim();
}

const GENERIC = new Set([
  'click here',
  'here',
  'read more',
  'learn more',
  'more',
  'view',
  'see more',
  'details',
  'continue',
  'this page',
  'link',
  'faq',
  'support',
  'home',
]);

function extractLinks(htmlChunk) {
  const links = [];
  const re = /<a\b[^>]*href\s*=\s*["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = re.exec(htmlChunk)) !== null) {
    const href = normalizeHref(m[1]);
    const text = anchorTextFromHtml(m[2]);
    if (!href || !text) continue;
    if (href.startsWith('/go/')) continue;
    links.push({ text, href, norm: normalizeAnchor(text) });
  }
  return links;
}

function readHtml(route) {
  const file = path.join(dist, route === '/' ? 'index.html' : `${route.slice(1)}index.html`);
  if (!fs.existsSync(file)) {
    errors.push(`Missing built page: ${route}`);
    return null;
  }
  return fs.readFileSync(file, 'utf8');
}

const globalAnchorSeen = new Map();
const globalAnchorToHrefs = new Map();

for (const route of AUDIT_ROUTES) {
  const html = readHtml(route);
  if (!html) continue;

  const chunk = mainBody(html);
  if (!chunk.trim()) continue;

  const links = extractLinks(chunk);
  const byNorm = new Map();

  for (const link of links) {
    if (GENERIC.has(link.norm)) {
      errors.push(`${route}: generic anchor "${link.text}" → ${link.href}`);
    }

    const hits = byNorm.get(link.norm) ?? [];
    hits.push(link);
    byNorm.set(link.norm, hits);

    const globalHrefSet = globalAnchorToHrefs.get(link.norm) ?? new Set();
    globalHrefSet.add(link.href);
    globalAnchorToHrefs.set(link.norm, globalHrefSet);

    const prior = globalAnchorSeen.get(link.norm);
    if (prior) {
      errors.push(
        `Global duplicate anchor "${link.text}" on ${route} and ${prior.route} (→ ${link.href})`,
      );
    } else {
      globalAnchorSeen.set(link.norm, { route, text: link.text, href: link.href });
    }
  }

  for (const [norm, hits] of byNorm) {
    const hrefs = new Set(hits.map((h) => h.href));
    if (hrefs.size > 1) {
      errors.push(`${route}: anchor "${hits[0].text}" points to ${[...hrefs].join(' and ')}`);
    }
    if (hits.length > 1 && hrefs.size === 1) {
      errors.push(
        `${route}: repeated anchor "${hits[0].text}" (${hits.length}×) → ${[...hrefs][0]}`,
      );
    }
  }
}

for (const [norm, hrefs] of globalAnchorToHrefs) {
  if (hrefs.size > 1 && norm.length >= 3) {
    errors.push(`Global anchor conflict "${norm}" → ${[...hrefs].join(', ')}`);
  }
}

/** Markdown: unique labels per file + site-wide (internal links only). */
const mdGlobal = new Map();
const mdDir = path.join(projectRoot, 'content', 'pages');
for (const file of fs.readdirSync(mdDir).filter((f) => f.endsWith('.md'))) {
  const text = fs.readFileSync(path.join(mdDir, file), 'utf8');
  const mdLinks = [...text.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)].map((m) => ({
    text: m[1].replace(/\*\*/g, '').trim(),
    href: m[2].trim(),
    norm: normalizeAnchor(m[1].replace(/\*\*/g, '')),
  }));
  const byNorm = new Map();
  for (const link of mdLinks) {
    if (link.href.includes('AFFILIATE')) continue;
    const hits = byNorm.get(link.norm) ?? [];
    hits.push(link);
    byNorm.set(link.norm, hits);

    const prior = mdGlobal.get(link.norm);
    if (prior) {
      errors.push(`Markdown global duplicate "${link.text}" in ${file} and ${prior.file}`);
    } else {
      mdGlobal.set(link.norm, { file, text: link.text });
    }
  }
  for (const [norm, hits] of byNorm) {
    const hrefs = new Set(hits.map((h) => h.href));
    if (hrefs.size > 1) {
      errors.push(`content/pages/${file}: "${hits[0].text}" → ${[...hrefs].join(' and ')}`);
    }
    if (hits.length > 1 && hrefs.size === 1) {
      errors.push(
        `content/pages/${file}: repeated "${hits[0].text}" (${hits.length}×) → ${[...hrefs][0]}`,
      );
    }
  }
}

if (errors.length) {
  console.error('verify-anchor-text failed:\n' + errors.map((e) => `  - ${e}`).join('\n'));
  process.exit(1);
}

console.log(`verify-anchor-text: OK (${AUDIT_ROUTES.size} routes + markdown)`);