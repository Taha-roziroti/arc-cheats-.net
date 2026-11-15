import { t } from '../i18n';
import { checkoutForSlug, checkoutPath, PRIMARY_CHECKOUT_PATH } from '../config/checkout';
import type { IconName } from '../components/icons/types';
import { SHOWCASE_SHOTS } from './showcaseImages';

export interface ProductSlide {
  src: string;
  alt: string;
  caption: string;
  captionDesc: string;
}

export interface ProductOverview {
  title: string;
  paragraphs: string[];
}

export interface AcquisitionStep {
  num: string;
  title: string;
  desc: string;
}

export interface ProductAcquisition {
  title: string;
  steps: AcquisitionStep[];
}

export interface SystemRequirement {
  icon: IconName;
  text: string;
}

export interface ProductPage {
  slug: string;
  kind: 'tier' | 'utility';
  badge: string;
  category?: string;
  tier?: string;
  name: string;
  title: string;
  subtitle: string;
  desc: string;
  features: string[];
  more: number;
  variant?: 'essential' | 'popular' | 'limited';
  buyUrl: string;
  images: ProductSlide[];
  overview: ProductOverview;
  acquisition: ProductAcquisition;
  goodToKnow: string;
  limitations: string;
  fullFeatures: string[];
  systemRequirements: SystemRequirement[];
  about?: { type: 'h2' | 'p'; text: string }[];
  body: { type: 'h2' | 'p'; text: string }[];
  relatedBlogSlugs: string[];
}

const productBase = '/products/dota-2-cheats/';

const showcaseSlide = (index: number): ProductSlide => {
  const s = SHOWCASE_SHOTS[index % SHOWCASE_SHOTS.length]!;
  return {
    src: s.src,
    alt: s.alt,
    caption: s.caption ?? 'Feature preview',
    captionDesc: s.captionDesc ?? s.alt,
  };
};

const placeholderParagraphs = [
  'Overview placeholder — describe what this product offers when your listing is ready.',
  'Add positioning, compatibility notes, and risk disclaimers in this section.',
];

const acquisitionSteps: AcquisitionStep[] = [
  { num: '01', title: 'Review requirements', desc: 'Placeholder step — confirm OS and hardware prerequisites.' },
  { num: '02', title: 'Choose a plan', desc: 'Placeholder step — pick monthly, lifetime, or utility checkout.' },
  { num: '03', title: 'Complete checkout', desc: 'Placeholder step — configure external partner URLs first.' },
  { num: '04', title: 'Follow delivery notes', desc: 'Placeholder step — document onboarding after purchase.' },
];

function acquisitionFor(productName: string): ProductAcquisition {
  return { title: `How to get ${productName}`, steps: acquisitionSteps };
}

const sharedBody: ProductPage['body'] = [
  { type: 'h2', text: 'Details placeholder' },
  {
    type: 'p',
    text: 'Replace this body copy with feature lists, screenshots, and FAQs specific to this SKU.',
  },
];

const sharedRequirements: SystemRequirement[] = [
  { icon: 'reqWindows', text: 'Operating system — placeholder requirement text.' },
  { icon: 'reqCpu', text: 'CPU — placeholder requirement text.' },
  { icon: 'reqWifi', text: 'Network — placeholder requirement text.' },
];

function buildTierPages(): ProductPage[] {
  return t.cheats.items.map((cheat) => {
    const slug = cheat.href.replace(productBase, '').replace(/\/$/, '') || 'elite';
    return {
      slug,
      kind: 'tier',
      badge: cheat.badge ?? 'Core',
      tier: cheat.tier,
      name: cheat.name,
      title: cheat.title,
      subtitle: cheat.title,
      desc: cheat.desc,
      features: cheat.features,
      more: cheat.more,
      variant: cheat.variant,
      buyUrl: checkoutForSlug(slug),
      images: [showcaseSlide(0), showcaseSlide(1)],
      overview: { title: `${cheat.title} overview`, paragraphs: placeholderParagraphs },
      acquisition: acquisitionFor(cheat.title),
      goodToKnow: 'Placeholder good-to-know text — add patch and support guidance here.',
      limitations: 'Placeholder limitations and risk disclaimer — replace before launch.',
      fullFeatures: cheat.features,
      systemRequirements: sharedRequirements,
      about: [{ type: 'p', text: 'About section placeholder for tier products.' }],
      body: sharedBody,
      relatedBlogSlugs: [],
    };
  });
}

function slugFromHref(href: string): string {
  const segment = href.replace(productBase, '').replace(/^\//, '').replace(/\/$/, '');
  return segment || 'dota-2-cheats';
}

function buildUtilityPages(): ProductPage[] {
  return t.products.items
    .filter((p) => p.href.startsWith(productBase))
    .map((product) => {
      const slug = slugFromHref(product.href);
      return {
        slug,
        kind: 'utility',
        badge: product.badge ?? product.category,
        category: product.category,
        name: product.title,
        title: product.title,
        subtitle: product.subtitle,
        desc: product.desc,
        features: product.features,
        more: product.more,
        buyUrl: checkoutForSlug(slug),
        images: [showcaseSlide(2)],
        overview: { title: `${product.title} overview`, paragraphs: placeholderParagraphs },
        acquisition: acquisitionFor(product.title),
        goodToKnow: 'Placeholder good-to-know text for utility products.',
        limitations: 'Placeholder limitations for utility products.',
        fullFeatures: product.features,
        systemRequirements: sharedRequirements,
        body: sharedBody,
        relatedBlogSlugs: [],
      };
    });
}

export const productPages: ProductPage[] = [...buildTierPages(), ...buildUtilityPages()];
export const cheatPages = productPages.filter((p) => p.kind === 'tier');

export function getProductPage(slug: string) {
  return productPages.find((p) => p.slug === slug);
}

export function getCheatPage(slug: string) {
  return cheatPages.find((p) => p.slug === slug);
}

export function getAllProductSlugs() {
  return productPages.map((p) => p.slug);
}

export function getAllCheatSlugs() {
  return cheatPages.map((p) => p.slug);
}

export const heroSlides: ProductSlide[] = [showcaseSlide(0), showcaseSlide(1), showcaseSlide(2)];

export const productHub = {
  path: productBase,
  title: t.products.title,
  subtitle: t.products.subtitle,
  description: 'Core license, Cloud DMA, and HWID utilities listed with checkout links.',
  buyUrl: PRIMARY_CHECKOUT_PATH,
};