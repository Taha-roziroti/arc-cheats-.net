import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { sitemapSerialize } from './src/config/sitemap.ts';
import { SITE_URL } from './config/site.mjs';
export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  redirects: {
    '/pricing/': '/#products',
    '/cloud-dma/': '/',
    '/hwid-spoofer/': '/products/dota-2-cheats/hwid-spoofer/',
    '/arena-breakout-infinite-esp/': '/arc-raiders-esp/',
    '/arena-breakout-infinite-aimbot/': '/arc-raiders-aimbot/',
    '/dota-2-maphack/': '/arc-raiders-esp/',
    '/dota-2-hero-esp/': '/arc-raiders-esp/',
    '/dota-2-scripts/': '/arc-raiders-aimbot/',
    '/dota-2-cheats-review/': '/arc-raiders-account-vs-hardware-ban/',
    '/arena-breakout-infinite-cheats-pricing/': '/#products',
    '/cloud-dma-for-arena-breakout-infinite/': '/',
    '/arena-breakout-infinite-hwid-spoofer/': '/products/dota-2-cheats/hwid-spoofer/',
    '/guides/borderlands-3-cheat-system-requirements/': '/guides/system-requirements/',
    '/cloud-dma-setup/': '/guides/cloud-dma-setup/',
    '/cheats/': '/',
    '/products/dota-2-cheats/': '/',
    '/products/dota-2-cheats/elite/': '/',
    '/products/dota-2-cheats/utilities/': '/',
    '/cheats/lite/': '/',
    '/cheats/pro/': '/',
    '/cheats/elite/': '/',
    '/cheats/compare/': '/blog/dota-2-lite-vs-pro/',
    '/dota-2-vac-ban-risk/': '/arc-raiders-account-vs-hardware-ban/',
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/go/'),
      serialize: sitemapSerialize,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        ignored: ['**/unslop/**'],
      },
    },
    build: {
      cssMinify: true,
      minify: 'esbuild',
      target: 'es2022',
      modulePreload: { polyfill: false },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/gsap')) return 'vendor-gsap';
            if (id.includes('node_modules/lenis')) return 'vendor-lenis';
          },
        },
      },
    },
  },
  build: {
    /** External CSS when large — better cache reuse than inlining on every HTML file. */
    inlineStylesheets: 'auto',
  },
});
