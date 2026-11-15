import { getCollection } from 'astro:content';

function normalizeRoute(value: string): string {
  if (value === '' || value === '/') return '/';
  return value.endsWith('/') ? value : `${value}/`;
}

type PageData = { slug?: string; route?: string };

function pageMatchesId(page: { id: string; data: unknown }, id: string): boolean {
  if (page.id === id) return true;

  const data = page.data as PageData;
  const normalizedId = normalizeRoute(id.startsWith('/') ? id : `/${id}`);

  const wantStem = id.replace(/^\//, '').replace(/\/$/, '');

  if (data.slug) {
    const slugNorm = normalizeRoute(data.slug);
    if (slugNorm === normalizedId) return true;
    const slugPath = slugNorm.replace(/^\//, '').replace(/\/$/, '');
    if (slugPath === wantStem || slugPath.endsWith(`/${wantStem}`)) return true;
  }
  if (data.route) {
    const routeNorm = normalizeRoute(data.route);
    if (routeNorm === normalizedId) return true;
    const routePath = routeNorm.replace(/^\//, '').replace(/\/$/, '');
    if (routePath === wantStem || routePath.endsWith(`/${wantStem}`)) return true;
  }

  const stem = page.id.replace(/^\//, '').replace(/\/$/, '').replace(/\.md$/, '');
  if (stem === wantStem || stem.endsWith(`/${wantStem}`)) return true;

  if ((id === 'home' || id === 'index') && data.slug === '/') return true;

  return false;
}

/** Resolve a `pages` collection entry by filename stem, route, or marketing slug. */
export async function loadContentPage(id: string) {
  const pages = await getCollection('pages');
  const entry = pages.find((page) => pageMatchesId(page, id));

  if (!entry) {
    const available = pages.map((page) => page.id).join(', ');
    throw new Error(
      `Content page not found: ${id}${available ? `. Available: ${available}` : ' (pages collection is empty — run astro sync or restart dev)'}`,
    );
  }

  return entry;
}
