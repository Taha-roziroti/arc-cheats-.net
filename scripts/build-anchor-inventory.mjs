/**
 * Writes audit/anchor-inventory.json from built HTML (cursor-seo-audit-prompt §3).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { INDEXABLE_MONEY_ROUTES } from '../config/site.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(root, '..');
const dist = path.join(projectRoot, 'dist');
const outDir = path.join(projectRoot, 'audit');
const outFile = path.join(outDir, 'anchor-inventory.json');

const ROUTES = new Set([
  ...INDEXABLE_MONEY_ROUTES,
  '/guides/system-requirements/',
  '/guides/cloud-dma-setup/',
  '/about/',
  '/support/',
  '/privacy/',
  '/terms/',
  '/faq/',
  '/contact/',
]);

function routeFromFile(file) {
  const rel = path.relative(dist, file).replace(/\\/g, '/');
  if (rel === 'index.html') return '/';
  const m = rel.match(/^(.+)\/index\.html$/);
  return m ? `/${m[1]}/` : null;
}

function walkHtml(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkHtml(p, files);
    else if (ent.name.endsWith('.html')) files.push(p);
  }
  return files;
}

function normalizeText(text) {
  return text.toLowerCase().replace(/\s+/g, ' ').trim();
}

function anchorText(inner, tag) {
  const imgAlt = inner.match(/<img[^>]*alt\s*=\s*["']([^"']*)["']/i)?.[1];
  const stripped = inner.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (!stripped && imgAlt) return imgAlt.trim();
  return stripped;
}

function regionForMatch(html, index) {
  const before = html.slice(0, index);
  const footerIdx = before.lastIndexOf('<footer');
  const headerIdx = before.lastIndexOf('<header');
  const mainIdx = before.lastIndexOf('<main');
  const crumb = before.match(/<nav[^>]*aria-label=["'][^"']*breadcrumb/i);
  if (crumb && footerIdx < index) return 'breadcrumb';
  if (headerIdx >= 0 && headerIdx > mainIdx && index > headerIdx) return 'header';
  if (footerIdx >= 0 && index > footerIdx) return 'footer';
  if (mainIdx >= 0 && index > mainIdx) return 'body';
  return 'body';
}

function collect(html, route) {
  const items = [];
  const re = /<a\b[^>]*href\s*=\s*["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const href = m[1];
    if (!href || href === '#' || href.startsWith('javascript:')) continue;
    const text = anchorText(m[2]);
    if (!text) continue;
  const rel = m[0].match(/rel\s*=\s*["']([^"']+)["']/i)?.[1] ?? '';
    items.push({
      page: route,
      region: regionForMatch(html, m.index),
      text,
      normalized: normalizeText(text),
      href,
      rel,
    });
  }
  return items;
}

if (!fs.existsSync(dist)) {
  console.error('build-anchor-inventory: dist/ missing — run build first');
  process.exit(1);
}

const inventory = [];
for (const file of walkHtml(dist)) {
  const route = routeFromFile(file);
  if (!route || !ROUTES.has(route)) continue;
  inventory.push(...collect(fs.readFileSync(file, 'utf8'), route));
}

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, `${JSON.stringify({ generatedAt: new Date().toISOString(), count: inventory.length, anchors: inventory }, null, 2)}\n`);
console.log(`build-anchor-inventory: ${inventory.length} anchors → ${path.relative(projectRoot, outFile)}`);