import type { GameDetail, JournalArticle } from '../../types/index.ts';
import { DEFAULT_CANONICAL_DOMAIN, normalizeBaseUrl } from './urlResolver.ts';

export const DOMAIN = DEFAULT_CANONICAL_DOMAIN;
export const SITE_NAME = '릴게임 홍박사';
export const ALT_SITE_NAME = '사이트 INFO';
export const FULL_BRAND = '릴게임 홍박사 | 사이트 INFO';

// 정확히 공백 포함 22자
export const MAIN_PAGE_TITLE = '릴게임 홍박사 | 바다이야기 오락실 백과';

// 공백 포함 123자 (최대 150자 이내)
export const HOMEPAGE_EXACT_DESCRIPTION =
  '릴게임 홍박사에서 바다이야기, 야마토, 손오공, 오션파라다이스, 황금성, 다빈치의 역사와 특징을 확인하세요. 1990~2000년대 오락실 문화, 작동 원리, 용어 해설과 관련 법제도까지 한눈에 정리한 정보 아카이브입니다.';

export const DEFAULT_OG_IMAGE = '/assets/images/hero_archive_reel_1792680956216.jpg';
export const DEFAULT_ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function getCanonicalOrigin(): string {
  const envSiteUrl =
    typeof import.meta !== 'undefined' && import.meta.env
      ? (import.meta.env.VITE_SITE_URL as string | undefined)
      : undefined;

  if (envSiteUrl && envSiteUrl.trim()) {
    return normalizeBaseUrl(envSiteUrl);
  }

  if (typeof window !== 'undefined' && window.location?.origin) {
    return normalizeBaseUrl(window.location.origin);
  }

  return DEFAULT_CANONICAL_DOMAIN;
}

export function truncateMetaDescription(text: string, maxLength = 150): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= maxLength) return clean;
  const sliced = clean.slice(0, maxLength - 1);
  const lastSpace = sliced.lastIndexOf(' ');
  const trimmed = lastSpace > maxLength * 0.6 ? sliced.slice(0, lastSpace) : sliced;
  return `${trimmed.replace(/[.,·\s]+$/, '')}…`;
}

export function generateWebsiteSchema(origin: string = getCanonicalOrigin()) {
  return {
    '@type': 'WebSite',
    '@id': `${origin}/#website`,
    url: `${origin}/`,
    name: SITE_NAME,
    alternateName: ALT_SITE_NAME,
    inLanguage: 'ko-KR',
    description: HOMEPAGE_EXACT_DESCRIPTION,
  };
}

export function generateOrganizationSchema(origin: string = getCanonicalOrigin()) {
  return {
    '@type': 'Organization',
    '@id': `${origin}/#organization`,
    name: '릴게임 홍박사 연구 아카이브',
    url: `${origin}/`,
    logo: {
      '@type': 'ImageObject',
      url: `${origin}/logos/hong_info_logo_primary.svg`,
      width: 600,
      height: 180,
    },
    sameAs: [],
  };
}

export function generateBreadcrumbSchema(
  items: BreadcrumbItem[],
  origin: string = getCanonicalOrigin()
) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${origin}${item.url}`,
    })),
  };
}

export function generateArticleSchema(
  article: JournalArticle,
  origin: string = getCanonicalOrigin()
) {
  return {
    '@type': 'Article',
    '@id': `${origin}/journal/${article.slug}#article`,
    isPartOf: {
      '@id': `${origin}/#website`,
    },
    headline: article.title,
    description: truncateMetaDescription(article.summary, 150),
    inLanguage: 'ko-KR',
    mainEntityOfPage: `${origin}/journal/${article.slug}`,
    datePublished: `${article.publishedDate}T09:00:00+09:00`,
    dateModified: `${article.modifiedDate}T15:00:00+09:00`,
    author: {
      '@type': 'Organization',
      name: article.author,
    },
    publisher: {
      '@id': `${origin}/#organization`,
    },
    image: article.coverImage
      ? `${origin}${article.coverImage}`
      : `${origin}${DEFAULT_OG_IMAGE}`,
  };
}

export function generateGameSchema(
  game: GameDetail,
  origin: string = getCanonicalOrigin()
) {
  return {
    '@type': 'Article',
    '@id': `${origin}/games/${game.slug}#article`,
    isPartOf: {
      '@id': `${origin}/#website`,
    },
    headline: `${game.title} - ${game.subTitle}`,
    description: truncateMetaDescription(game.summary, 150),
    inLanguage: 'ko-KR',
    mainEntityOfPage: `${origin}/games/${game.slug}`,
    datePublished: '2026-01-10T09:00:00+09:00',
    dateModified: '2026-10-22T10:00:00+09:00',
    author: {
      '@type': 'Organization',
      name: '홍박사 게임연구팀',
    },
    publisher: {
      '@id': `${origin}/#organization`,
    },
    image: game.imagePath
      ? `${origin}${game.imagePath}`
      : `${origin}${DEFAULT_OG_IMAGE}`,
  };
}

function setMetaContent(selector: string, content: string) {
  const el = document.querySelector(selector);
  if (el) {
    el.setAttribute('content', content);
  }
}

export function updateHeadSEO({
  title,
  description,
  path,
  robots = DEFAULT_ROBOTS,
  image = DEFAULT_OG_IMAGE,
  isHome = false,
  schemaGraph,
}: {
  title: string;
  description: string;
  path: string;
  robots?: string;
  image?: string;
  isHome?: boolean;
  schemaGraph?: object[];
}) {
  const origin = getCanonicalOrigin();
  const fullTitle = isHome ? MAIN_PAGE_TITLE : `${title} | ${SITE_NAME}`;
  const cleanDescription = truncateMetaDescription(description, 150);
  const canonicalUrl = `${origin}${path}`;
  const fullImageUrl = image.startsWith('http') ? image : `${origin}${image}`;

  document.title = fullTitle;

  // Meta Description & Robots
  setMetaContent('meta[name="description"]', cleanDescription);
  setMetaContent('meta[name="robots"]', robots);

  // Canonical URL
  const canonLink = document.querySelector('link[rel="canonical"]');
  if (canonLink) {
    canonLink.setAttribute('href', canonicalUrl);
  }

  // Open Graph
  setMetaContent('meta[property="og:title"]', fullTitle);
  setMetaContent('meta[property="og:description"]', cleanDescription);
  setMetaContent('meta[property="og:url"]', canonicalUrl);
  setMetaContent('meta[property="og:image"]', fullImageUrl);

  // Twitter Card
  setMetaContent('meta[name="twitter:title"]', fullTitle);
  setMetaContent('meta[name="twitter:description"]', cleanDescription);
  setMetaContent('meta[name="twitter:image"]', fullImageUrl);

  // JSON-LD Structured Data
  const scriptEl = document.getElementById('seo-json-ld');
  if (scriptEl) {
    const fullGraph = {
      '@context': 'https://schema.org',
      '@graph': [
        generateWebsiteSchema(origin),
        generateOrganizationSchema(origin),
        ...(schemaGraph || []),
      ],
    };
    scriptEl.textContent = JSON.stringify(fullGraph, null, 2);
  }
}
