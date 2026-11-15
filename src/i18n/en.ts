import type { Translations } from './types';
import { PRIMARY_CHECKOUT_PATH } from '../config/checkout';
import { PRODUCT_BASE, SITE_DOMAIN, SUPPORT_EMAIL } from '../config/site';
import { PLACEHOLDER_COPY } from '../data/placeholders';

/** Product detail routes (distinct from PRODUCT_BASE redirects). */
const catalogBase = '/products/dota-2-cheats/';

const featureBento = [
  'sm:col-span-2 lg:col-span-12 lg:col-start-1 lg:row-start-1',
  'sm:col-span-2 lg:col-span-6 lg:col-start-1 lg:row-start-2',
  'sm:col-span-2 lg:col-span-6 lg:col-start-7 lg:row-start-2',
  'sm:col-span-2 lg:col-span-4 lg:col-start-1 lg:row-start-3',
  'sm:col-span-2 lg:col-span-4 lg:col-start-5 lg:row-start-3',
  'sm:col-span-2 lg:col-span-4 lg:col-start-9 lg:row-start-3',
  'sm:col-span-2 lg:col-span-6 lg:col-start-1 lg:row-start-4',
  'sm:col-span-2 lg:col-span-6 lg:col-start-7 lg:row-start-4',
] as const;

function featureShot(
  index: number,
  title: string,
  subtitle: string,
  desc: string,
  bullets: [string, string, string],
  tags: [string, string],
) {
  return { title, subtitle, desc, bullets, tags, bento: featureBento[index]! };
}

export const en: Translations = {
  site: {
    name: PLACEHOLDER_COPY.siteName,
    domain: SITE_DOMAIN,
    title: 'Arc Raiders Cheats | ESP, Aimbot & Feature Details',
    description:
      'ARC Raiders software with player ESP, loot markers, and menu previews on PC. Compare modules, screenshots, and checkout paths before you buy.',
    discord: PRIMARY_CHECKOUT_PATH,
  },
  nav: [
    { href: '/#features', label: 'Features' },
    { href: '/arc-raiders-esp/', label: 'ESP' },
    { href: '/arc-raiders-aimbot/', label: 'Aimbot' },
    { href: '/arc-raiders-account-vs-hardware-ban/', label: 'Ban guide' },
    { href: '/faq/', label: 'FAQ' },
  ],
  hero: {
    status: 'Windows 10 and 11',
    eyebrow: PLACEHOLDER_COPY.eyebrow,
    titleLine1: 'Arc Raiders Cheats',
    titleLine2: 'ESP, Aimbot & Feature Details',
    subtitle: PLACEHOLDER_COPY.subtitle,
    ctaPrimary: PLACEHOLDER_COPY.cta,
    ctaDiscord: 'Ban guide',
    modesLabel: 'Supported clients',
    modes: ['Steam on PC'],
    metrics: [
      { label: 'Monthly', strong: '$35' },
      { label: 'Lifetime', strong: '$150' },
      { label: 'Access', strong: '31 days' },
      { label: 'Market', strong: 'United States' },
    ],
  },
  features: {
    eyebrow: 'Modules',
    title: 'ESP, loot radar, and menu panels',
    subtitle: 'Each card matches a still from the on-page gallery and hero slider.',
    items: [
      {
        title: 'Player ESP',
        subtitle: 'Bones & boxes',
        desc: 'Skeleton hitboxes, distance tags, and nameplates as shown in the hero slider.',
        bullets: ['Bone ESP preview', 'Box and reticle alignment', 'Meter readouts on target'],
        tags: ['esp', 'bones', 'pvp'],
        bento: featureBento[0]!,
      },
      {
        title: 'Loot radar',
        subtitle: 'Containers & items',
        desc: 'Colored loot and container markers across interiors and open world lines.',
        bullets: ['Item category colors', 'Drone indicators', 'Long-range rooftop tags'],
        tags: ['loot', 'containers', 'map'],
        bento: featureBento[1]!,
      },
      {
        title: 'Loadout menu',
        subtitle: 'Inventory UI',
        desc: 'Backpack grid, weapons, and quick-use row from the in-game menu still.',
        bullets: ['Weapon cards', 'Quick-use strip', 'Safe pocket slot'],
        tags: ['menu', 'inventory', 'ui'],
        bento: featureBento[2]!,
      },
      featureShot(
        3,
        'Indoor ESP',
        'Facility CQB',
        'Wireframe targets and container dots in a dark interior from the showcase set.',
        ['Close-range silhouettes', 'Container callouts', 'Low-light readability'],
        ['indoor', 'cqb'],
      ),
      featureShot(
        4,
        'Area radar',
        'Wide map view',
        'Name tags, loot clusters, and drone markers across the full tactical view.',
        ['Multi-target labels', 'Loot density', 'Distance text'],
        ['radar', 'map'],
      ),
      featureShot(
        5,
        'Open world HUD',
        'Outdoor run',
        'Third-person traversal with compass and overlay spacing on rocky terrain.',
        ['Compass layout', 'Traversal HUD', 'Extraction context'],
        ['outdoor', 'hud'],
      ),
      featureShot(
        6,
        'Rooftop tags',
        'Long sight lines',
        'Elevated vantage with distant structure markers during multi-level fights.',
        ['Height stress test', 'Structure labels', 'Long-range dots'],
        ['rooftop', 'range'],
      ),
      featureShot(
        7,
        'Breaching HUD',
        'Timer and light',
        'Indoor breach with flashlight cone, weapon light, and extraction timer text.',
        ['Timer readout', 'Flashlight cone', 'Confined room'],
        ['breach', 'timer'],
      ),
    ],
  },
  whyUs: {
    eyebrow: 'Why us',
    title: 'What you see before checkout',
    subtitle: 'How this site differs from a bare product listing.',
    usLabel: 'ARC Cheats',
    otherLabel: 'Generic listing',
    rows: [
      { title: 'Screenshot proof', desc: 'Every module links to a still from the gallery on this domain.' },
      { title: 'Listed USD plans', desc: 'Monthly and lifetime prices sit in the hero before you open checkout.' },
      { title: 'Indexed guides', desc: 'Requirements, DMA setup, and feature articles stay in the sitemap.' },
      { title: 'Named bridges', desc: 'Core, Cloud DMA, and HWID each use a separate /go/ handoff.' },
    ],
    metrics: [
      { value: '$35', title: 'Monthly plan', desc: '31-day access—confirm on checkout before paying.' },
      { value: '$150', title: 'Lifetime plan', desc: 'One-time USD purchase while the product remains listed.' },
      { value: 'PC', title: 'Windows build', desc: 'Steam client on 64-bit Windows 10 or 11.' },
    ],
  },
  setup: {
    eyebrow: 'Setup',
    titleLead: 'Three steps',
    titleHighlight: 'before install',
    intro: 'Read screenshots and guides, confirm Windows build, then open the checkout bridge that matches your cart.',
    ctaPrimary: 'View plans',
    ctaSecondary: 'Open FAQ',
    ctaPrimaryHref: '/#products',
    ctaSecondaryHref: '/faq/',
    steps: [
      {
        step: 'Step 1',
        title: 'Check requirements',
        desc: 'Match Steam, GPU, and OS notes on the Windows compatibility article.',
      },
      {
        step: 'Step 2',
        title: 'Pick a plan',
        desc: 'Compare monthly and lifetime figures in the hero against your budget.',
      },
      {
        step: 'Step 3',
        title: 'Open checkout',
        desc: 'Use the product picker or /go/ bridge, then finish payment on the vendor site.',
      },
    ],
  },
  compatibility: {
    eyebrow: 'Compatibility',
    title: 'Windows and add-ons',
    subtitle: 'Build targets for the listed modules.',
    items: [
      'Windows 10 and 11',
      '64-bit Steam client',
      'Player and loot ESP',
      'Cloud DMA option',
      'HWID utility SKU',
      'Affiliate checkout',
      'Setup articles',
      'Support desk',
    ],
  },
  cheats: {
    eyebrow: 'Tiers',
    title: 'Core plan card',
    subtitle: 'Primary SKU shown on product detail templates.',
    viewAll: 'View tiers',
    explore: 'Explore',
    items: [
      {
        tier: 'Core',
        name: PLACEHOLDER_COPY.productName,
        title: PLACEHOLDER_COPY.productName,
        desc: 'Monthly or lifetime access to the modules documented in the showcase gallery.',
        features: [
          'Player ESP stills on the homepage',
          'Loot radar examples in guides',
          'Checkout via /go/main-product',
          'Windows-only scope',
        ],
        more: 0,
        href: `${catalogBase}elite/`,
        variant: 'popular',
      },
    ],
  },
  products: {
    eyebrow: 'Utilities',
    title: 'Plans and add-ons',
    subtitle: 'Core license plus optional Cloud DMA and HWID utilities.',
    viewAll: 'View utilities',
    get: 'Get',
    explore: 'Explore',
    items: [
      {
        category: 'Core',
        title: PLACEHOLDER_COPY.productName,
        subtitle: 'ESP, loot radar, menu UI',
        desc: 'Main license documented across the homepage and feature guides.',
        features: [
          'Monthly at $35 in hero metrics',
          'Lifetime at $150 in hero metrics',
          'Screenshots on every money page',
          'Checkout hub at /go/',
        ],
        more: 0,
        href: PRIMARY_CHECKOUT_PATH,
      },
      {
        category: 'Add-on',
        title: 'Cloud DMA',
        subtitle: 'Remote memory path',
        desc: 'Optional hardware lane with its own setup article and bridge.',
        features: [
          'Hyper-V setup guide',
          '/go/cloud-dma/ bridge',
          'Separate from core ESP cart',
          'Windows host required',
        ],
        more: 0,
        href: '/guides/cloud-dma-setup/',
      },
      {
        category: 'Utility',
        title: 'HWID spoofer',
        subtitle: 'Standalone utility',
        desc: 'Utility SKU with a product detail route and dedicated checkout.',
        features: [
          'Product detail page',
          '/go/hwid-spoofer/ bridge',
          'Linked from checkout picker',
          'Windows-only',
        ],
        more: 0,
        href: `${catalogBase}hwid-spoofer/`,
      },
    ],
  },
  blog: {
    eyebrow: 'Blog',
    title: 'Field notes',
    subtitle: 'Articles appear here when you add posts in src/data/blog/posts.ts.',
    latestTitle: 'Latest articles',
    latestSubtitle: 'Filters and sort controls remain functional.',
    filterAll: 'All',
    sortLabel: 'Sort',
    sortNewest: 'Newest',
    sortOldest: 'Oldest',
    sortShortRead: 'Short read',
    sortLongRead: 'Long read',
    emptyFilter: 'No articles yet.',
    viewAll: 'View blog',
    read: 'Read',
    items: [],
  },
  toolkit: {
    eyebrow: 'Toolkit',
    title: 'Module groups',
    subtitle: 'Grouped settings panels for future articles.',
    items: [
      { num: '01', label: 'ESP', title: 'Visibility filters', desc: 'Distance caps, team colors, and bone toggles in vendor docs.' },
      { num: '02', label: 'Loot', title: 'Category colors', desc: 'Container dots, drones, and small items called out separately.' },
      { num: '03', label: 'Menu', title: 'HUD density', desc: 'Inventory layout captured in the loadout still.' },
    ],
  },
  workflow: {
    eyebrow: 'Workflow',
    badge: '4 steps',
    titleBefore: 'From review to',
    titleHighlight: 'checkout',
    subtitle: 'A typical path from first visit to paid access on this site.',
    ctaLabel: 'View plans',
    ctaHref: '/#products',
    ctaSecondary: 'FAQ',
    ctaSecondaryHref: '/faq/',
    items: [
      {
        num: '01',
        phase: 'Review',
        title: 'Study screenshots',
        desc: 'Walk the hero slider and feature cards to see ESP, loot, and menu UI.',
      },
      {
        num: '02',
        phase: 'Compare',
        title: 'Read guides',
        desc: 'Open loot ESP, player ESP, and review routes linked from the nav.',
      },
      {
        num: '03',
        phase: 'Decide',
        title: 'Pick a plan',
        desc: 'Note monthly, lifetime, and add-on paths in the products row.',
      },
      {
        num: '04',
        phase: 'Pay',
        title: 'Use checkout',
        desc: 'Launch the matching /go/ bridge and finish on the vendor page.',
      },
    ],
  },
  fieldNotes: {
    eyebrow: 'Notes',
    title: 'Publisher notes',
    items: [
      { num: '01', title: 'Independence', desc: 'Not affiliated with the game publisher; ARC Raiders is named descriptively.' },
      { num: '02', title: 'Pricing', desc: 'Hero metrics show list prices—confirm totals on checkout.' },
      { num: '03', title: 'Risk', desc: 'Third-party software may violate client terms; read the review page before paying.' },
    ],
  },
  support: {
    eyebrow: 'Support',
    title: 'Help before and after checkout',
    subtitle: 'Self-service links first, then email for order-specific issues.',
    channels: [
      {
        icon: 'users',
        title: 'Checkout hub',
        desc: 'Pick core, Cloud DMA, or HWID before the vendor handoff.',
        linkLabel: 'Open checkout hub',
        href: PRIMARY_CHECKOUT_PATH,
      },
      {
        icon: 'headphones',
        title: 'Email',
        desc: 'Order email, receipts, and license delivery questions.',
        linkLabel: SUPPORT_EMAIL,
        href: `mailto:${SUPPORT_EMAIL}`,
      },
      {
        icon: 'navFaq',
        title: 'FAQ',
        desc: 'Plans, bridges, and Windows requirements in one list.',
        linkLabel: 'View FAQ',
        href: '/faq/',
      },
      {
        icon: 'clock',
        title: 'Guides',
        desc: 'DMA setup and PC requirements before you install.',
        linkLabel: 'Open setup guide',
        href: '/guides/cloud-dma-setup/',
      },
    ],
    ticketTitle: 'Include in tickets',
    ticketItems: [
      { title: 'Order email', desc: 'The address used at checkout and any receipt ID you received.' },
      { title: 'Product name', desc: 'Core license, Cloud DMA, or HWID utility as shown on your invoice.' },
      { title: 'Windows build', desc: 'OS version, Steam install path, and a short description of the error text.' },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Common pre-purchase questions',
    subtitle: 'Short answers; the full list lives on the FAQ route.',
    items: [
      {
        num: '01',
        q: 'Where do I start?',
        a: 'Open the feature review, then compare loot and player ESP guides before checkout.',
      },
      {
        num: '02',
        q: 'How do prices work?',
        a: 'Hero metrics show $35 monthly and $150 lifetime—confirm the live total on the vendor page.',
      },
      {
        num: '03',
        q: 'What PC do I need?',
        a: 'Use the Windows compatibility checklist for Steam, OS, and GPU notes.',
      },
    ],
  },
  footer: {
    explore: 'Explore',
    tagline: `Independent ARC Raiders guides, screenshots, and checkout paths on ${SITE_DOMAIN}.`,
    exploreLinks: [
      { href: '/#features', label: 'Features', ariaLabel: 'Features' },
      { href: '/arc-raiders-esp/', label: 'ESP', ariaLabel: 'Arc Raiders ESP' },
      { href: '/arc-raiders-aimbot/', label: 'Aimbot', ariaLabel: 'Arc Raiders aimbot' },
      { href: '/arc-raiders-account-vs-hardware-ban/', label: 'Ban guide', ariaLabel: 'Account vs hardware ban' },
      { href: '/faq/', label: 'FAQ', ariaLabel: 'FAQ' },
    ],
    support: 'Support',
    legal: 'Legal',
    privacy: 'Privacy',
    terms: 'Terms',
    about: 'About',
  },
  legalPages: {
    about: {
      title: 'Independent ARC Raiders Product Guides',
      description: `Who publishes ${SITE_DOMAIN}, how we test screenshots, and how affiliate checkout works.`,
      sections: [
        {
          heading: 'Publisher',
          paragraphs: [
            `${PLACEHOLDER_COPY.siteName} is an independent editorial site. We document ARC Raiders ESP, aim modules, and ban-risk context with dated screenshots—not developer patches or private binaries.`,
            'We are not endorsed by Embark Studios or any anti-cheat vendor. Vendor licenses ship only after you finish payment on the affiliate checkout bridge.',
          ],
        },
        {
          heading: 'What we publish',
          paragraphs: [
            'Money pages cover ESP overlays, aimbot controls, and plan tables tied to the same showcase set as the homepage hero.',
            'Support articles explain Windows builds, DMA add-ons when verified, and the difference between account and hardware enforcement.',
          ],
        },
        {
          heading: 'How we earn',
          paragraphs: [
            'Some checkout links are affiliate URLs. Commissions do not change list prices on the vendor page. Read the on-site disclosure before you buy.',
            'Checkout bridges under /go/ are excluded from search indexing so crawlers focus on guides, not interim redirect HTML.',
          ],
        },
        {
          heading: 'Proof we show shoppers',
          paragraphs: [
            'Each module page links to full-resolution stills with alt text describing what is visible—distance readouts, loot filters, menu tabs, and indoor breach lighting.',
            'We list monthly and lifetime figures in the hero ($35 / $150) as previews; the vendor checkout shows the binding USD total.',
            'When Embark ships a lighting or UI change, we replace stills and adjust copy instead of leaving outdated claims live.',
          ],
        },
        {
          heading: 'How guides stay independent',
          paragraphs: [
            'Navigation order follows shopper intent—ESP, aim, bans, requirements—not partner payouts.',
            'We do not accept payment to reorder feature lists or hide risk notes on the ban primer.',
            'Negative experiences belong in vendor reviews; we document what screenshots show on our rigs, not live detection telemetry.',
          ],
        },
        {
          heading: 'Contact and corrections',
          paragraphs: [
            'Use the contact page to report broken links, wrong plan copy, or accessibility issues on money URLs.',
            'License resends, HWID resets, and refunds stay with the vendor inbox printed on your receipt.',
          ],
        },
        {
          heading: 'United States shoppers',
          paragraphs: [
            'Copy targets PC players researching modules in English. Prices preview in USD; tax lines appear on the vendor cart based on your billing address.',
            'Affiliate disclosure satisfies labeling expectations for US readers; international shoppers should still read vendor terms in their jurisdiction.',
            'Support hours follow US business-day patterns even though vendors may answer globally.',
          ],
        },
      ],
    },
    privacy: {
      title: 'Privacy policy',
      description: `How ${SITE_DOMAIN} handles analytics, email, and checkout referrals.`,
      sections: [
        {
          heading: 'Data collection',
          paragraphs: [
            'Anonymous analytics may record page views; support email collects only what you send in a message.',
            'Checkout partners receive order data when you complete payment on their site.',
          ],
        },
        {
          heading: 'Cookies',
          paragraphs: [
            'Cookie and analytics behavior is described in the on-page notice linked from the footer.',
          ],
        },
      ],
    },
    terms: {
      title: 'Terms of service',
      description: `Purchase rules and limitations for visitors on ${SITE_DOMAIN}.`,
      sections: [
        {
          heading: 'Agreement',
          paragraphs: [
            'Software is licensed by the vendor you pay; this site does not deliver binaries itself.',
            'You are responsible for complying with the game client terms in your region.',
          ],
        },
        {
          heading: 'Refunds',
          paragraphs: [
            'Refund requests follow the vendor policy tied to your checkout receipt.',
          ],
        },
      ],
    },
    support: {
      title: 'Support',
      description: `Contact and setup help for ${SITE_DOMAIN} visitors.`,
    },
  },
  ui: {
    skipLink: 'Skip to main content',
    browseCheats: PLACEHOLDER_COPY.cta,
    browseCheatsMobile: PLACEHOLDER_COPY.cta,
    homeAria: `${PLACEHOLDER_COPY.siteName} site header`,
    checkoutAria: PLACEHOLDER_COPY.cta,
    discordAria: 'Community link',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
  },
};