import { CLASSIC_GAMES } from '../../data/games.ts';
import { JOURNAL_ARTICLES } from '../../data/journal.ts';
import { DEFAULT_CANONICAL_DOMAIN, normalizeBaseUrl } from './urlResolver.ts';

export interface SitemapImageEntry {
  path: string;
  title: string;
}

export interface SitemapRouteEntry {
  path: string;
  lastmod: string;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: string;
  image?: SitemapImageEntry;
}

const STATIC_CORE_MODIFIED_DATE = '2026-10-22';
const HOME_LAST_MODIFIED_DATE = '2026-11-24';

export function getSitemapEntries(): SitemapRouteEntry[] {
  const entries: SitemapRouteEntry[] = [
    {
      path: '/',
      lastmod: HOME_LAST_MODIFIED_DATE,
      changefreq: 'weekly',
      priority: '1.0',
      image: {
        path: '/assets/images/hero_archive_reel_1792680956216.jpg',
        title: '릴게임 홍박사 | 2000년대 한국 아케이드 및 릴게임 역사 아카이브',
      },
    },
    {
      path: '/encyclopedia',
      lastmod: STATIC_CORE_MODIFIED_DATE,
      changefreq: 'monthly',
      priority: '0.9',
    },
    {
      path: '/games',
      lastmod: STATIC_CORE_MODIFIED_DATE,
      changefreq: 'weekly',
      priority: '0.9',
    },
    ...CLASSIC_GAMES.map((game) => ({
      path: `/games/${game.slug}`,
      lastmod: STATIC_CORE_MODIFIED_DATE,
      changefreq: 'monthly' as const,
      priority: '0.85',
      ...(game.imagePath
        ? {
            image: {
              path: game.imagePath,
              title: `${game.title} (${game.englishTitle}) 아케이드 아카이브`,
            },
          }
        : {}),
    })),
    {
      path: '/archive',
      lastmod: STATIC_CORE_MODIFIED_DATE,
      changefreq: 'monthly',
      priority: '0.8',
      image: {
        path: '/assets/images/arcade_culture_2000s_1792680959573.jpg',
        title: '1990~2000년대 한국 오락실 문화 변천사 현장 사료 사진',
      },
    },
    {
      path: '/library',
      lastmod: STATIC_CORE_MODIFIED_DATE,
      changefreq: 'monthly',
      priority: '0.8',
    },
    {
      path: '/journal',
      lastmod: STATIC_CORE_MODIFIED_DATE,
      changefreq: 'weekly',
      priority: '0.85',
    },
    ...JOURNAL_ARTICLES.map((article) => ({
      path: `/journal/${article.slug}`,
      lastmod: article.modifiedDate || article.publishedDate || STATIC_CORE_MODIFIED_DATE,
      changefreq: 'monthly' as const,
      priority: '0.8',
    })),
    {
      path: '/about',
      lastmod: STATIC_CORE_MODIFIED_DATE,
      changefreq: 'monthly',
      priority: '0.7',
    },
  ];

  // Deduplicate routes and ensure unique image URLs across the sitemap
  const seenPaths = new Set<string>();
  const seenImages = new Set<string>();

  return entries.filter((entry) => {
    if (seenPaths.has(entry.path)) return false;
    seenPaths.add(entry.path);
    if (entry.image) {
      if (seenImages.has(entry.image.path)) {
        delete entry.image;
      } else {
        seenImages.add(entry.image.path);
      }
    }
    return true;
  });
}

export function isValidAppRoute(pathname: string): boolean {
  const normalized = pathname === '' ? '/' : pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  if (normalized === '/editorial-policy') return true;
  return getSitemapEntries().some((entry) => entry.path === normalized);
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function generateSitemapXml(baseUrlInput: string = DEFAULT_CANONICAL_DOMAIN): string {
  const baseUrl = normalizeBaseUrl(baseUrlInput);
  const entries = getSitemapEntries();

  const urlBlocks = entries
    .map((entry) => {
      const fullLoc = `${baseUrl}${entry.path}`;
      const imageXml = entry.image
        ? `\n    <image:image>\n      <image:loc>${escapeXml(`${baseUrl}${entry.image.path}`)}</image:loc>\n      <image:title>${escapeXml(entry.image.title)}</image:title>\n    </image:image>`
        : '';

      return `  <url>\n    <loc>${escapeXml(fullLoc)}</loc>\n    <lastmod>${escapeXml(entry.lastmod)}</lastmod>\n    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority}</priority>${imageXml}\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urlBlocks}\n</urlset>\n`;
}

export function generateRobotsTxt(baseUrlInput: string = DEFAULT_CANONICAL_DOMAIN): string {
  const baseUrl = normalizeBaseUrl(baseUrlInput);
  return [
    'User-agent: *',
    'Allow: /',
    '',
    'User-agent: Googlebot',
    'Allow: /',
    '',
    'User-agent: Googlebot-Image',
    'Allow: /',
    '',
    `Sitemap: ${baseUrl}/sitemap.xml`,
    '',
  ].join('\n');
}
