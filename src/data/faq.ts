import type { IconName } from '../components/icons/types';
import { PRIMARY_CHECKOUT_PATH } from '../config/checkout';
import { SITE_DOMAIN } from '../config/site';
import { PLACEHOLDER_COPY } from './placeholders';
import { normalizeInternalPath } from '../utils/path';

export type FaqTopic =
  | 'all'
  | 'plans'
  | 'esp'
  | 'scripts'
  | 'safety'
  | 'products'
  | 'blog'
  | 'setup';

export interface SiteFaqItem {
  id: string;
  topic: FaqTopic;
  icon: IconName;
  q: string;
  a: string;
  aHtml?: string;
  scopes?: string[];
}

function a(text: string): string {
  return text;
}

function link(text: string, href: string): string {
  return `<a href="${normalizeInternalPath(href)}">${text}</a>`;
}

export const siteFaqs: SiteFaqItem[] = [
  {
    id: 'what-is-site',
    topic: 'setup',
    icon: 'faqStatus',
    q: `What is ${PLACEHOLDER_COPY.siteName}?`,
    a: a(`${SITE_DOMAIN} publishes independent ARC Raiders guides, screenshots, and affiliate checkout paths.`),
  },
  {
    id: 'checkout-flow',
    topic: 'plans',
    icon: 'faqAfterBuy',
    q: 'How does checkout work?',
    a: a(
      `Choose ARC Raiders, Cloud DMA, or HWID utilities in the ${link('ARC product picker', PRIMARY_CHECKOUT_PATH)}, then continue to the vendor bridge.`,
    ),
  },
  {
    id: 'pricing-listed',
    topic: 'plans',
    icon: 'faqComparePlans',
    q: 'What do the listed prices mean?',
    a: a('Hero metrics list $35 monthly and $150 lifetime—confirm the live total on the vendor checkout before you pay.'),
  },
  {
    id: 'risk-disclaimer',
    topic: 'safety',
    icon: 'faqBanRisk',
    q: 'Where is the risk disclaimer?',
    a: a(
      `Risk and publisher context sit on the ${link('Embark Studios ban policy primer', '/arc-raiders-account-vs-hardware-ban/')} and in the legal pages in the footer.`,
    ),
  },
  {
    id: 'windows-reqs',
    topic: 'setup',
    icon: 'faqDiscordHelp',
    q: 'Where are system requirements documented?',
    a: a(`Use the ${link('Arc Raiders overlay PC requirements', '/guides/system-requirements/')} before you install overlays.`),
  },
  {
    id: 'feature-pages',
    topic: 'products',
    icon: 'faqProductsPage',
    q: 'Where are features explained?',
    a: a(
      `Draft features on ${link('Arc Raiders ESP stills', '/arc-raiders-esp/')}, ${link('aimbot control notes', '/arc-raiders-aimbot/')}, and ${link('Embark ban enforcement primer', '/arc-raiders-account-vs-hardware-ban/')}.`,
    ),
  },
];

export const SITE_FAQ_SECTION_COPY = {
  eyebrow: 'FAQ',
  title: 'Straight answers before checkout',
  subtitle: 'Plans, Windows build, bridges, and module links in one list.',
} as const;

export const CONTEXTUAL_FAQ_SECTION_COPY = {
  eyebrow: 'FAQ',
  title: 'Questions on this page',
  subtitle: 'Filtered to topics that match the guide you are reading.',
} as const;

export const SITE_FAQ_FILTER_TOPICS = ['all', 'plans', 'setup', 'products', 'safety'] as const;

export function faqFilterTopicsForItems(items: SiteFaqItem[]): FaqTopic[] {
  const present = new Set(items.map((item) => item.topic));
  const topics: FaqTopic[] = ['all'];
  for (const topic of SITE_FAQ_FILTER_TOPICS) {
    if (topic !== 'all' && present.has(topic)) topics.push(topic);
  }
  return topics;
}

/** Shared site FAQ items omit copy duplicated on the dedicated /faq/ page. */
const PRODUCT_EMBED_FAQ_SKIP = new Set(['risk-disclaimer', 'windows-reqs', 'feature-pages']);

export function getProductFaqs(slug: string, kind: 'tier' | 'utility'): SiteFaqItem[] {
  const scoped = siteFaqs.filter((f) => f.scopes?.includes(slug));
  const general = siteFaqs.filter((f) => !f.scopes && !PRODUCT_EMBED_FAQ_SKIP.has(f.id));
  const combined = kind === 'tier' ? [...scoped, ...general] : [...scoped, ...general.slice(0, 4)];
  const seen = new Set<string>();
  return combined.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

const blogTopicFaqs: Record<string, SiteFaqItem[]> = {};

export function faqItemsForBlogTag(tag: string): SiteFaqItem[] {
  return blogTopicFaqs[tag] ?? [];
}

export function getAllFaqs(): SiteFaqItem[] {
  return siteFaqs;
}

export function getLandingFaqs(): SiteFaqItem[] {
  return siteFaqs.slice(0, 4);
}

export function getContentPageFaqs(route: string): SiteFaqItem[] {
  if (route.startsWith('/guides/')) return [];
  return siteFaqs.slice(0, 4);
}

export function getBlogFaqs(_tag: string, _slug: string): SiteFaqItem[] {
  return [];
}