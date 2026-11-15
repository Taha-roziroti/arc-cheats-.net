import type { ProductSlide } from './products';
import { SHOWCASE_SHOTS } from './showcaseImages';

export const ABI_PRIMARY_IMAGE = SHOWCASE_SHOTS[0]!.src;

export const ABI_HERO_SLIDES: ProductSlide[] = SHOWCASE_SHOTS.slice(0, 6).map((s) => ({
  src: s.src,
  alt: s.alt,
  caption: s.caption ?? 'Feature preview',
  captionDesc: s.captionDesc ?? s.alt,
}));

export const ABI_GALLERY = SHOWCASE_SHOTS.map((s) => ({ src: s.src, alt: s.alt }));

/** Feature-page hero previews (must match `src` in showcaseImages). */
export const ABI_PAGE_PREVIEW: Record<string, string> = {
  '/arc-raiders-esp/': SHOWCASE_SHOTS[1]!.src,
  '/arc-raiders-aimbot/': SHOWCASE_SHOTS[2]!.src,
  '/arc-raiders-account-vs-hardware-ban/': SHOWCASE_SHOTS[5]!.src,
};