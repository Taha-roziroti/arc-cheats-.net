import type { ProductSlide } from './products';
import { PRIMARY_CHECKOUT_PATH } from '../config/checkout';
import type { IconName } from '../components/icons/types';
import { PLACEHOLDER_COPY } from './placeholders';
import { HERO_SHOWCASE_SLIDES } from './showcaseImages';

export interface LandingCatalogProduct {
  slug: string;
  label: string;
  title: string;
  href: string;
  buyUrl: string;
  features: string[];
  more: number;
  icon: IconName;
  badge?: string;
  variant?: 'essential' | 'popular' | 'limited';
}

export const heroSlides: ProductSlide[] = HERO_SHOWCASE_SLIDES;

export const landingProducts: LandingCatalogProduct[] = [
  {
    slug: 'main-product',
    label: 'Core',
    title: PLACEHOLDER_COPY.productName,
    href: PRIMARY_CHECKOUT_PATH,
    buyUrl: PRIMARY_CHECKOUT_PATH,
    variant: 'popular',
    icon: 'coreProduct',
    features: [
      'Player ESP and loot stills on the homepage',
      'Monthly and lifetime figures in the hero',
      'Checkout via /go/main-product',
      'Windows 10 and 11 scope',
    ],
    more: 0,
  },
  {
    slug: 'cloud-dma',
    label: 'Add-on',
    title: 'Cloud DMA',
    href: '/guides/cloud-dma-setup/',
    buyUrl: '/go/cloud-dma/',
    variant: 'essential',
    icon: 'dmaHardware',
    features: [
      'Hyper-V setup article indexed',
      'Separate /go/cloud-dma/ bridge',
      'For shoppers who need remote DMA',
      'Documented apart from core ESP',
    ],
    more: 0,
  },
  {
    slug: 'hwid-spoofer',
    label: 'Utility',
    title: 'HWID spoofer',
    href: '/products/dota-2-cheats/hwid-spoofer/',
    buyUrl: '/go/hwid-spoofer/',
    icon: 'sidebarHwid',
    features: [
      'Product detail route on this domain',
      'Dedicated checkout bridge',
      'Linked from the checkout picker',
      'Windows-only utility',
    ],
    more: 0,
  },
];

export const guideCards = [
  {
    title: 'Loot & world ESP',
    desc: 'See container dots, loot lines, and rooftop radar stills before you publish specs.',
    href: '/arc-raiders-esp/',
    readLabel: 'ESP feature tour',
  },
  {
    title: 'Aimbot options',
    desc: 'FOV, smoothing, and indoor HUD examples for assist modules.',
    href: '/arc-raiders-aimbot/',
    readLabel: 'Aimbot overview',
  },
  {
    title: 'Account vs hardware ban',
    desc: 'How enforcement types differ before you buy third-party tools.',
    href: '/arc-raiders-account-vs-hardware-ban/',
    readLabel: 'Ban guide',
  },
] as const;