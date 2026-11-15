/**
 * Central titles/descriptions (mirrors content/pages frontmatter).
 * Length targets: title 50–60 chars (external audits), description 110–165 chars (verify-seo.mjs).
 */

export interface PageSeoEntry {
  title: string;
  description: string;
}

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': {
    title: 'Arc Raiders Cheats | ESP, Aimbot & Feature Details',
    description:
      'Compare Arc Raiders ESP, aimbot options, system requirements, and current plans. Review the full feature list before choosing an access option.',
  },
  '/arc-raiders-esp/': {
    title: 'Arc Raiders ESP Guide | Player, Loot & Container Markers',
    description:
      'See Arc Raiders ESP: player overlays, loot filters, containers, ARC markers and extraction points. Compare features before checkout.',
  },
  '/arc-raiders-aimbot/': {
    title: 'Arc Raiders Aimbot Guide | FOV, Features & Plans',
    description:
      'Review Arc Raiders aimbot controls, including FOV, smoothing, speed, stickiness and visibility checks. See the feature list and current plan details.',
  },
  '/arc-raiders-account-vs-hardware-ban/': {
    title: 'Arc Raiders Ban Guide | Account vs Hardware Explained',
    description:
      'Learn how Arc Raiders account and hardware bans differ, review official enforcement details, and check the facts before contacting support.',
  },
  '/dota-2-scripts/': {
    title: 'ARC Raiders HUD Tools: Timers, Breach & Indoor ESP',
    description:
      'HUD and indoor assist screenshots for ARC Raiders, including breach lighting and timer overlays. Pair visuals with your vendor feature list.',
  },
  '/faq/': {
    title: 'ARC Raiders Cheats FAQ | Plans, Checkout & DMA Help',
    description:
      'FAQ for ARC Raiders plans, Cloud DMA add-ons, HWID utilities, and how checkout routes through the on-site product picker.',
  },
  '/support/': {
    title: 'ARC Raiders Support | Checkout, License & Setup Help',
    description:
      'Support channels for ARC Raiders orders, license delivery, and Windows setup via email, FAQ, and setup guides.',
  },
  '/about/': {
    title: 'About ARC Cheats | Independent Product Guide Publisher',
    description:
      'How arc-cheats.net publishes independent ARC Raiders guides, screenshots, and affiliate checkout paths for informed PC shoppers.',
  },
  '/guides/system-requirements/': {
    title: 'ARC Raiders PC Requirements Guide | Win 10/11 64-bit',
    description:
      'Windows PC requirements checklist for ARC Raiders modules, with gameplay stills showing HUD load. Confirm CPU, RAM, and GPU before purchase.',
  },
  '/guides/cloud-dma-setup/': {
    title: 'Arc Raiders Cloud DMA Setup Guide | Windows PC Steps',
    description:
      'Cloud DMA preparation guide with indoor breach screenshots. Hyper-V and firmware steps belong here after vendor documentation is wired in.',
  },
  '/privacy/': {
    title: 'Privacy Policy | Analytics, Email & Checkout Records',
    description:
      'Privacy policy for arc-cheats.net covering analytics, support email, and checkout partner data when you contact us or complete an order.',
  },
  '/terms/': {
    title: 'Terms of Service | Licenses, Pricing & Refund Rules',
    description:
      'Terms and acceptable-use notes for plans listed on arc-cheats.net. Vendor checkout terms apply when you complete a purchase.',
  },
  '/affiliate-disclosure/': {
    title: 'Affiliate Disclosure | Arc Cheats Commission Policy',
    description:
      'How arc-cheats.net uses affiliate checkout links, what we earn, and how that affects product recommendations on Arc Raiders guides.',
  },
  '/contact/': {
    title: 'Contact ARC Cheats Support | Orders & License Help',
    description:
      'Contact arc-cheats.net for order questions, license delivery, and Windows setup help before you open vendor checkout.',
  },
  '/blog/': {
    title: 'ARC Cheats Blog | Arc Raiders Guides & Patch Notes',
    description:
      'Editorial notes on Arc Raiders modules, screenshot updates, and checkout changes published on arc-cheats.net for US PC shoppers.',
  },
  '/forum/': {
    title: 'ARC Cheats Forum | Arc Raiders Community Q&A Pages',
    description:
      'Community-style Q&A indexed from site guides: plans, ESP proof stills, and where vendor support handles licenses.',
  },
};

export function normalizeSeoPath(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return path;
}

export function getPageSeoEntry(pathname: string): PageSeoEntry | undefined {
  return PAGE_SEO[normalizeSeoPath(pathname)];
}