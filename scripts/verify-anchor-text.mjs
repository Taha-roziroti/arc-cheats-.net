import fs from 'node:fs';
import path from 'node:path';
const dist = path.join(process.cwd(), 'dist');
const projectRoot = process.cwd();
const errors = [];

function walkHtmlFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkHtmlFiles(p, files);
    else if (ent.name.endsWith('.html')) files.push(p);
  }
  return files;
}

function routeFromDistFile(file) {
  const rel = path.relative(dist, file).replace(/\\/g, '/');
  if (rel === 'index.html') return '/';
  if (rel === '404.html') return '/404/';
  const m = rel.match(/^(.+)\/index\.html$/);
  return m ? `/${m[1]}/` : `/${rel}`;
}

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

function chromeChunks(html) {
  const header = html.match(/<header[\s\S]*?<\/header>/i)?.[0] ?? '';
  const footer = html.match(/<footer[\s\S]*?<\/footer>/i)?.[0] ?? '';
  const breadcrumb = html.match(
    /<nav[^>]*aria-label=["'][^"']*breadcrumb[^"']*["'][\s\S]*?<\/nav>/gi,
  );
  return [header, footer, ...(breadcrumb ?? [])];
}

const htmlFiles = walkHtmlFiles(dist);
if (!htmlFiles.length) {
  errors.push('dist/ has no HTML — run build first');
}

const siteChromeLabels = new Set();
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  for (const chunk of chromeChunks(html)) {
    for (const link of extractLinks(chunk)) {
      siteChromeLabels.add(link.norm);
    }
  }
}

const globalAnchorSeen = new Map();
const globalAnchorToHrefs = new Map();
let auditedPages = 0;

for (const file of htmlFiles) {
  const route = routeFromDistFile(file);
  const html = fs.readFileSync(file, 'utf8');
  const chunk = mainBody(html);
  if (!chunk.trim()) continue;
  auditedPages += 1;

  const links = extractLinks(chunk);
  const byNorm = new Map();

  for (const link of links) {
    if (GENERIC.has(link.norm)) {
      errors.push(`${route}: generic anchor "${link.text}" → ${link.href}`);
    }
    if (siteChromeLabels.has(link.norm)) {
      errors.push(`${route}: body anchor "${link.text}" reuses chrome label → ${link.href}`);
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

console.log(
  `verify-anchor-text: OK (${auditedPages} built pages + markdown, ${siteChromeLabels.size} chrome labels)`,
);