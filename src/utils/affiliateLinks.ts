import { checkoutPath, PRIMARY_CHECKOUT_PATH, type CheckoutProduct } from '../config/checkout';

const AFFILIATE_PLACEHOLDER = 'AFFILIATE_LINK_PLACEHOLDER';

function normalizeSlug(slug: string): string {
  return slug.endsWith('/') ? slug : `${slug}/`;
}

/** Routes where the checkout CTA should skip the hub and use a single product bridge. */
export function isDirectCheckoutSlug(slug: string): boolean {
  const normalized = normalizeSlug(slug);
  if (normalized.includes('cloud-dma')) return true;
  if (normalized.includes('hwid-spoofer')) return true;
  return false;
}

export function affiliateHrefForContentSlug(slug: string): string {
  if (isDirectCheckoutSlug(slug)) {
    return checkoutPath(checkoutProductForSlug(slug));
  }
  return PRIMARY_CHECKOUT_PATH;
}

export function injectAffiliateLinks(markdownBody: string, slug: string): string {
  const href = affiliateHrefForContentSlug(slug);
  return markdownBody.split(AFFILIATE_PLACEHOLDER).join(href);
}

export function checkoutProductForSlug(slug: string): CheckoutProduct {
  const normalized = normalizeSlug(slug);
  if (normalized.includes('cloud-dma')) return 'cloudDma';
  if (normalized.includes('hwid-spoofer')) return 'hwidSpoofer';
  return 'mainProduct';
}

/** Sidebar / panel product id for Markdown SEO pages (null → show hub chooser). */
export function checkoutPanelProductId(slug: string): 'main-product' | 'cloud-dma' | 'hwid-spoofer' | null {
  const normalized = normalizeSlug(slug);
  if (normalized.includes('cloud-dma')) return 'cloud-dma';
  if (normalized.includes('hwid-spoofer')) return 'hwid-spoofer';
  return null;
}