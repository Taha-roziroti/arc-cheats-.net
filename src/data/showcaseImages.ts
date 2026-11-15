/** Product screenshots under /images/showcase/ (responsive widths from optimize-images). */

export const SHOWCASE_BASE = '/images/showcase';

export interface ShowcaseShot {
  src: string;
  alt: string;
  caption?: string;
  captionDesc?: string;
}

const shot = (file: string, alt: string, caption?: string, captionDesc?: string): ShowcaseShot => ({
  src: `${SHOWCASE_BASE}/${file}`,
  alt,
  caption,
  captionDesc,
});

export const SHOWCASE_SHOTS: ShowcaseShot[] = [
  shot(
    'arc-esp-skeleton.webp',
    'Player ESP overlay with skeletal hitboxes and distance readout',
    'Bone ESP',
    'Example of enemy skeleton, box, and meter distance labels on target.',
  ),
  shot(
    'arc-esp-loot-overlay.webp',
    'Loot and container ESP markers through interior windows',
    'Loot ESP',
    'Distant loot, containers, and player tags layered on the world view.',
  ),
  shot(
    'arc-esp-indoor-radar.webp',
    'Indoor combat view with player silhouette and container ESP',
    'Indoor ESP',
    'Close-range player wireframe plus container callouts in a dark facility.',
  ),
  shot(
    'arc-esp-player-radar.webp',
    'Wide-area ESP with player names, loot dots, and drone indicators',
    'Area radar',
    'Multiple player tags, loot clusters, and distance markers across the map.',
  ),
  shot(
    'arc-menu-inventory.webp',
    'ARC Raiders-style inventory and loadout menu interface',
    'Loadout menu',
    'Organized gear, weapons, and quick-use slots from the product UI.',
  ),
  shot(
    'arc-gameplay-outdoor.webp',
    'Third-person ARC Raiders gameplay on rocky terrain with HUD',
    'Open world',
    'Traversal and HUD elements during an outdoor extraction run.',
  ),
  shot(
    'arc-gameplay-rooftop.webp',
    'Tactical rooftop vantage with loot ESP on distant structures',
    'Vantage point',
    'Long-range loot and player overlays from an elevated position.',
  ),
  shot(
    'arc-gameplay-indoor.webp',
    'Indoor breach with weapon light cone and extraction timer HUD',
    'CQB entry',
    'Flashlight entry and timer UI in a confined industrial room.',
  ),
];

export const HERO_SHOWCASE_SLIDES = SHOWCASE_SHOTS.slice(0, 5).map((s) => ({
  src: s.src,
  alt: s.alt,
  caption: s.caption ?? 'Feature preview',
  captionDesc: s.captionDesc ?? s.alt,
}));

export const PRIMARY_SHOWCASE_IMAGE = SHOWCASE_SHOTS[0]!.src;

export const HERO_SECTION_BACKGROUND = '/images/hero/hero-background.webp';
export const HERO_SECTION_LCP_PRELOAD = '/images/hero/hero-background-400.webp';