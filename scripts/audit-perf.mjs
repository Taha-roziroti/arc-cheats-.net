/**
 * Lighthouse median-of-3 on static preview (cursor-seo-audit-prompt §10).
 * Requires: dist/, npx lighthouse, Chrome/Chromium available to Lighthouse.
 */
import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(root, '..');
const dist = path.join(projectRoot, 'dist');
const port = Number(process.env.AUDIT_PERF_PORT) || 4177;
const base = `http://127.0.0.1:${port}`;

const TEMPLATES = [
  { name: 'home', path: '/' },
  { name: 'faq', path: '/faq/' },
  { name: 'spoke', path: '/arc-raiders-esp/' },
  { name: 'hub', path: '/products/dota-2-cheats/' },
  { name: '404', path: '/404.html' },
];

const FLOOR = 95;
const RUNS = 3;

function median(nums) {
  const s = [...nums].sort((a, b) => a - b);
  return s[Math.floor(s.length / 2)] ?? 0;
}

function runLighthouse(url, preset) {
  const out = path.join(projectRoot, 'audit', `lh-${preset}-${Date.now()}.json`);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const r = spawnSync(
    'npx',
    [
      'lighthouse',
      url,
      '--quiet',
      '--chrome-flags=--headless',
      `--form-factor=${preset}`,
      '--output=json',
      `--output-path=${out}`,
      '--only-categories=performance,accessibility,best-practices,seo',
    ],
    { cwd: projectRoot, encoding: 'utf8', shell: true, timeout: 120000 },
  );
  if (r.status !== 0) {
    return { error: r.stderr || r.stdout || 'lighthouse failed' };
  }
  try {
    const data = JSON.parse(fs.readFileSync(out, 'utf8'));
    const c = data.categories ?? {};
    return {
      performance: Math.round((c.performance?.score ?? 0) * 100),
      accessibility: Math.round((c.accessibility?.score ?? 0) * 100),
      bestPractices: Math.round((c['best-practices']?.score ?? 0) * 100),
      seo: Math.round((c.seo?.score ?? 0) * 100),
    };
  } catch (e) {
    return { error: String(e) };
  }
}

async function main() {
  if (!fs.existsSync(dist)) {
    console.error('audit-perf: dist/ missing — run npm run build first');
    process.exit(1);
  }

  const server = spawn('node', ['scripts/serve.mjs'], {
    cwd: projectRoot,
    env: { ...process.env, PORT: String(port) },
    stdio: 'ignore',
  });

  await new Promise((r) => setTimeout(r, 800));

  const failures = [];

  for (const tpl of TEMPLATES) {
    const url = `${base}${tpl.path === '/404.html' ? '/404.html' : tpl.path}`;
    for (const preset of ['mobile', 'desktop']) {
      const scores = { performance: [], accessibility: [], bestPractices: [], seo: [] };
      for (let i = 0; i < RUNS; i++) {
        const result = runLighthouse(url, preset);
        if (result.error) {
          failures.push(`${tpl.name}/${preset}: ${result.error}`);
          break;
        }
        for (const k of Object.keys(scores)) scores[k].push(result[k]);
      }
      if (failures.some((f) => f.startsWith(`${tpl.name}/${preset}`))) continue;
      const med = Object.fromEntries(Object.entries(scores).map(([k, v]) => [k, median(v)]));
      console.log(`audit-perf: ${tpl.name} (${preset}) median`, med);
      for (const [k, v] of Object.entries(med)) {
        if (v < FLOOR) failures.push(`${tpl.name}/${preset}: ${k} median ${v} < ${FLOOR}`);
      }
    }
  }

  server.kill('SIGTERM');

  if (failures.length) {
    console.error('audit-perf failed:\n' + failures.map((f) => `  - ${f}`).join('\n'));
    process.exit(1);
  }
  console.log('audit-perf: OK — all templates at or above floor', FLOOR);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});