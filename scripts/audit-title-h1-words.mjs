import fs from 'node:fs';
import path from 'node:path';
import { INDEXABLE_MONEY_ROUTES } from '../config/site.mjs';

const routes = [
  '/',
  ...INDEXABLE_MONEY_ROUTES,
  '/faq/',
  '/about/',
  '/support/',
  '/guides/system-requirements/',
  '/guides/cloud-dma-setup/',
  '/contact/',
  '/affiliate-disclosure/',
  '/privacy/',
  '/terms/',
  '/blog/',
  '/forum/',
];

const dist = path.join(process.cwd(), 'dist');

for (const r of routes) {
  const f = path.join(dist, r === '/' ? 'index.html' : `${r.slice(1)}index.html`);
  if (!fs.existsSync(f)) {
    console.log(`${r}\tMISSING`);
    continue;
  }
  const h = fs.readFileSync(f, 'utf8');
  const title = h.match(/<title>([^<]*)<\/title>/i)?.[1] ?? '';
  const robots = h.match(/name="robots" content="([^"]*)"/i)?.[1] ?? '';
  const h1s = [...h.matchAll(/<h1[\s>][\s\S]*?>([\s\S]*?)<\/h1>/gi)].map((x) =>
    x[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
  );
  const art = h.match(/<article[^>]*class="[^"]*content-markdown[\s\S]*?<\/article>/i)?.[0] ?? '';
  const words = art.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  const ni = /noindex/i.test(robots) ? 'NOINDEX' : '';
  const lenFlag = title.length < 50 || title.length > 60 ? `title=${title.length}` : '';
  console.log([r, title.length, lenFlag, `words=${words}`, ni, h1s.join(' | ')].filter(Boolean).join('\t'));
}