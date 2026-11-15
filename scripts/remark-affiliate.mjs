import { visit } from 'unist-util-visit';

function affiliateHrefForContentSlug(slug) {
  const normalized = slug.endsWith('/') ? slug : `${slug}/`;
  if (normalized.includes('cloud-dma')) return '/go/cloud-dma/';
  if (normalized.includes('hwid-spoofer')) return '/go/hwid-spoofer/';
  return '/go/';
}

const FILE_SLUG = [
  ['index.md', '/'],
  ['dota-2-maphack.md', '/dota-2-maphack/'],
  ['dota-2-hero-esp.md', '/dota-2-hero-esp/'],
  ['dota-2-cheats-review.md', '/dota-2-cheats-review/'],
  ['dota-2-scripts.md', '/dota-2-scripts/'],
  ['cloud-dma-setup.md', '/guides/cloud-dma-setup/'],
  ['system-requirements.md', '/guides/system-requirements/'],
];

function slugFromFile(file) {
  const path = file.path ?? file.history?.[0] ?? '';
  const base = path.split(/[/\\]/).pop() ?? '';
  for (const [name, slug] of FILE_SLUG) {
    if (base === name || path.includes(name)) return slug;
  }
  return '/';
}

export function remarkAffiliate() {
  return (tree, file) => {
    const href = affiliateHrefForContentSlug(slugFromFile(file));
    visit(tree, 'link', (node) => {
      if (node.url === 'AFFILIATE_LINK_PLACEHOLDER') {
        node.url = href;
      }
    });
  };
}