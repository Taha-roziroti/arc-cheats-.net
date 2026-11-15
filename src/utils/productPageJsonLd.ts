import {
  cloudDmaOffer,
  CLOUD_DMA_CHECKOUT,
  hwidSpooferOffer,
  HWID_SPOOFER_CHECKOUT,
  MAIN_PRODUCT_CHECKOUT,
  mainProductOffers,
} from '../data/productCatalog';
export type CheckoutProductKind = 'main-product' | 'cloud-dma' | 'hwid-spoofer';
import { PRODUCT_ID, SITE_URL } from '../data/site';
import { PLACEHOLDER_COPY } from '../data/placeholders';
import { productSchema } from './schema';

import { ABI_PAGE_PREVIEW } from '../data/abiImages';

const ROUTE_PRODUCT_IMAGE: Record<string, string> = {
  '/arc-raiders-esp/': ABI_PAGE_PREVIEW['/arc-raiders-esp/']!,
  '/arc-raiders-aimbot/': ABI_PAGE_PREVIEW['/arc-raiders-aimbot/']!,
};

export function productJsonLdForRoute(
  route: string,
  name: string,
  description: string,
  checkout: CheckoutProductKind,
): Record<string, unknown> | null {
  const image = ROUTE_PRODUCT_IMAGE[route];
  if (!image) return null;

  if (checkout === 'cloud-dma') {
    return productSchema({
      name: 'Add-on product (placeholder)',
      description,
      url: route,
      offerUrl: CLOUD_DMA_CHECKOUT,
      sku: 'cloud-dma-license',
      image,
      productId: `${SITE_URL}${route}#product`,
      offers: [
        {
          name: cloudDmaOffer.name,
          priceUsd: cloudDmaOffer.priceUsd,
          url: CLOUD_DMA_CHECKOUT,
        },
      ],
    });
  }

  if (checkout === 'hwid-spoofer') {
    return productSchema({
      name: 'Utility product (placeholder)',
      description,
      url: route,
      offerUrl: HWID_SPOOFER_CHECKOUT,
      sku: 'hwid-spoofer',
      image,
      productId: `${SITE_URL}${route}#product`,
      offers: [
        {
          name: hwidSpooferOffer.name,
          priceUsd: hwidSpooferOffer.priceUsd,
          url: HWID_SPOOFER_CHECKOUT,
        },
      ],
    });
  }

  return productSchema({
    name: name || PLACEHOLDER_COPY.productName,
    description,
    url: route,
    offerUrl: MAIN_PRODUCT_CHECKOUT,
    sku: 'main-product',
    image,
    productId: PRODUCT_ID,
    offers: mainProductOffers.map((o) => ({
      name: o.name,
      priceUsd: o.priceUsd,
      url: o.url,
    })),
  });
}