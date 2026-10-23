import { GameDetail, JournalArticle } from '../../types';

export const DOMAIN = 'https://honginfo.org';
export const SITE_NAME = '릴게임 홍박사';
export const ALT_SITE_NAME = '사이트 INFO';
export const FULL_BRAND = '릴게임 홍박사 | 사이트 INFO';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export const HOMEPAGE_EXACT_DESCRIPTION =
  '릴게임 홍박사 | 사이트 INFO는 바다이야기, 야마토, 손오공, 오션파라다이스, 황금성, 신천지, 다빈치 등 릴게임의 역사와 종류, 특징을 체계적으로 정리한 정보 아카이브입니다. 1990~2000년대 오락실 문화와 당시 유행했던 게임의 배경, 주요 용어, 작동 방식, 관련 제도와 주의사항까지 쉽고 깊이 있게 살펴보세요. 게임별 자료와 비교 해설, 추억을 담은 이야기, 확인 가능한 참고 출처를 통해 정확하고 유용한 정보를 제공합니다. 검색자가 궁금해하는 게임별 차이와 시대적 흐름을 비교해볼 수 있도록 구성했습니다. #릴게임 #릴게임홍박사 #사이트INFO #바다이야기 #야마토 #손오공 #오션파라다이스 #황금성 #오락실추억';

export function generateWebsiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${DOMAIN}/#website`,
    url: `${DOMAIN}/`,
    name: SITE_NAME,
    alternateName: ALT_SITE_NAME,
    inLanguage: 'ko-KR',
    description: HOMEPAGE_EXACT_DESCRIPTION
  };
}

export function generateOrganizationSchema() {
  return {
    '@type': 'Organization',
    '@id': `${DOMAIN}/#organization`,
    name: '릴게임 홍박사 연구 아카이브',
    url: `${DOMAIN}/`,
    logo: {
      '@type': 'ImageObject',
      url: `${DOMAIN}/logos/hong_info_logo_primary.svg`,
      width: 600,
      height: 180
    },
    sameAs: []
  };
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${DOMAIN}${item.url}`
    }))
  };
}

export function generateArticleSchema(article: JournalArticle) {
  return {
    '@type': 'Article',
    '@id': `${DOMAIN}/journal/${article.slug}#article`,
    isPartOf: {
      '@id': `${DOMAIN}/#website`
    },
    headline: article.title,
    description: article.summary,
    inLanguage: 'ko-KR',
    mainEntityOfPage: `${DOMAIN}/journal/${article.slug}`,
    datePublished: `${article.publishedDate}T09:00:00+09:00`,
    dateModified: `${article.modifiedDate}T15:00:00+09:00`,
    author: {
      '@type': 'Organization',
      name: article.author
    },
    publisher: {
      '@id': `${DOMAIN}/#organization`
    },
    image: article.coverImage ? `${DOMAIN}${article.coverImage}` : `${DOMAIN}/logos/hong_info_og_card.svg`
  };
}

export function generateGameSchema(game: GameDetail) {
  return {
    '@type': 'Article',
    '@id': `${DOMAIN}/games/${game.slug}#article`,
    isPartOf: {
      '@id': `${DOMAIN}/#website`
    },
    headline: `${game.title} - ${game.subTitle}`,
    description: game.directAnswer,
    inLanguage: 'ko-KR',
    mainEntityOfPage: `${DOMAIN}/games/${game.slug}`,
    datePublished: '2026-01-10T09:00:00+09:00',
    dateModified: '2026-10-22T10:00:00+09:00',
    author: {
      '@type': 'Organization',
      name: '홍박사 게임연구팀'
    },
    publisher: {
      '@id': `${DOMAIN}/#organization`
    },
    image: game.imagePath ? `${DOMAIN}${game.imagePath}` : `${DOMAIN}/logos/hong_info_og_card.svg`
  };
}

export function updateHeadSEO({
  title,
  description,
  path,
  schemaGraph
}: {
  title: string;
  description: string;
  path: string;
  schemaGraph?: object[];
}) {
  const fullTitle = title === FULL_BRAND ? title : `${title} | ${SITE_NAME}`;
  document.title = fullTitle;

  // Update meta description
  let descMeta = document.querySelector('meta[name="description"]');
  if (descMeta) {
    descMeta.setAttribute('content', description);
  }

  // Update canonical
  const canonicalUrl = `${DOMAIN}${path}`;
  let canonLink = document.querySelector('link[rel="canonical"]');
  if (canonLink) {
    canonLink.setAttribute('href', canonicalUrl);
  }

  // Update OpenGraph
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', fullTitle);

  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', description);

  let ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);

  // Update JSON-LD
  let scriptEl = document.getElementById('seo-json-ld');
  if (scriptEl && schemaGraph) {
    const fullGraph = {
      '@context': 'https://schema.org',
      '@graph': [
        generateWebsiteSchema(),
        generateOrganizationSchema(),
        ...schemaGraph
      ]
    };
    scriptEl.textContent = JSON.stringify(fullGraph, null, 2);
  }
}
