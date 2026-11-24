import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { HomeView } from './views/HomeView';
import { EncyclopediaView } from './views/EncyclopediaView';
import { GamesListView } from './views/GamesListView';
import { GameDetailView } from './components/GameDetailView';
import { ArchiveView } from './views/ArchiveView';
import { LibraryView } from './views/LibraryView';
import { JournalListView } from './views/JournalListView';
import { ArticleReader } from './components/ArticleReader';
import { AboutView } from './views/AboutView';
import { NotFoundView } from './views/NotFoundView';
import { CLASSIC_GAMES } from './data/games';
import { JOURNAL_ARTICLES } from './data/journal';
import {
  updateHeadSEO,
  generateGameSchema,
  generateArticleSchema,
  generateBreadcrumbSchema,
  getCanonicalOrigin,
  MAIN_PAGE_TITLE,
  HOMEPAGE_EXACT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
} from './lib/seo/schema';

function normalizePath(rawPath: string): string {
  if (!rawPath || rawPath === '/') return '/';
  return rawPath.length > 1 && rawPath.endsWith('/') ? rawPath.slice(0, -1) : rawPath;
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return normalizePath(window.location.pathname || '/');
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Sync with browser navigation (popstate)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname || '/'));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Custom client navigation
  const navigate = (path: string) => {
    const normalized = normalizePath(path);
    if (normalized === currentPath) return;
    window.history.pushState({}, '', normalized);
    setCurrentPath(normalized);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // SEO & Head Metadata synchronization whenever currentPath changes
  useEffect(() => {
    const origin = getCanonicalOrigin();

    if (currentPath === '/') {
      updateHeadSEO({
        title: MAIN_PAGE_TITLE,
        description: HOMEPAGE_EXACT_DESCRIPTION,
        path: '/',
        image: DEFAULT_OG_IMAGE,
        isHome: true,
        schemaGraph: [
          {
            '@type': 'WebPage',
            '@id': `${origin}/#webpage`,
            url: `${origin}/`,
            name: MAIN_PAGE_TITLE,
            description: HOMEPAGE_EXACT_DESCRIPTION,
            inLanguage: 'ko-KR',
            isPartOf: { '@id': `${origin}/#website` },
          },
        ],
      });
    } else if (currentPath === '/encyclopedia') {
      const desc =
        '릴게임의 정의, 하드웨어 난수 발생기(RNG), 가변 환급률과 메모리 잠식 로직, 경품용 상품권 유통 체계 및 전문 용어 사전을 확인하세요.';
      updateHeadSEO({
        title: '릴게임 백과 · 원리와 메커니즘',
        description: desc,
        path: '/encyclopedia',
        schemaGraph: [
          generateBreadcrumbSchema(
            [
              { name: '홈', url: '/' },
              { name: '릴게임 백과', url: '/encyclopedia' },
            ],
            origin
          ),
          {
            '@type': 'CollectionPage',
            '@id': `${origin}/encyclopedia#webpage`,
            url: `${origin}/encyclopedia`,
            name: '릴게임 백과 · 원리와 메커니즘 | 릴게임 홍박사',
            description: desc,
            inLanguage: 'ko-KR',
            isPartOf: { '@id': `${origin}/#website` },
          },
        ],
      });
    } else if (currentPath === '/games') {
      const desc =
        '바다이야기, 황금성, 오션파라다이스, 야마토, 손오공, 다빈치 등 2000년대 한국 아케이드 시장을 풍미한 6대 대표 릴게임을 비교 분석합니다.';
      updateHeadSEO({
        title: '2000년대 6대 대표 릴게임 아카이브',
        description: desc,
        path: '/games',
        schemaGraph: [
          generateBreadcrumbSchema(
            [
              { name: '홈', url: '/' },
              { name: '게임별 정보', url: '/games' },
            ],
            origin
          ),
          {
            '@type': 'CollectionPage',
            '@id': `${origin}/games#webpage`,
            url: `${origin}/games`,
            name: '2000년대 6대 대표 릴게임 아카이브 | 릴게임 홍박사',
            description: desc,
            inLanguage: 'ko-KR',
            isPartOf: { '@id': `${origin}/#website` },
          },
        ],
      });
    } else if (currentPath.startsWith('/games/')) {
      const slug = currentPath.replace('/games/', '');
      const game = CLASSIC_GAMES.find((g) => g.slug === slug);
      if (game) {
        updateHeadSEO({
          title: `${game.title} (${game.englishTitle}) 심층 제원`,
          description: game.summary,
          path: `/games/${game.slug}`,
          image: game.imagePath || DEFAULT_OG_IMAGE,
          schemaGraph: [
            generateBreadcrumbSchema(
              [
                { name: '홈', url: '/' },
                { name: '게임별 정보', url: '/games' },
                { name: game.title, url: `/games/${game.slug}` },
              ],
              origin
            ),
            generateGameSchema(game, origin),
          ],
        });
      } else {
        updateHeadSEO({
          title: '페이지를 찾을 수 없습니다',
          description: '요청하신 게임 문서를 찾을 수 없습니다. 릴게임 홍박사 아카이브 홈에서 전체 기종 목록을 확인해 보세요.',
          path: currentPath,
          robots: 'noindex, nofollow',
        });
      }
    } else if (currentPath === '/archive') {
      const desc =
        '동네 골목 오락실의 100원짜리 동전 시절부터 성인 유기장 확산, 바다이야기 열풍, 2006년 단속까지의 아케이드 문화 변천사 연표입니다.';
      updateHeadSEO({
        title: '1990~2000년대 오락실 문화 변천사 연표',
        description: desc,
        path: '/archive',
        image: '/assets/images/arcade_culture_2000s_1792680959573.jpg',
        schemaGraph: [
          generateBreadcrumbSchema(
            [
              { name: '홈', url: '/' },
              { name: '추억 아카이브', url: '/archive' },
            ],
            origin
          ),
          {
            '@type': 'WebPage',
            '@id': `${origin}/archive#webpage`,
            url: `${origin}/archive`,
            name: '1990~2000년대 오락실 문화 변천사 연표 | 릴게임 홍박사',
            description: desc,
            inLanguage: 'ko-KR',
            isPartOf: { '@id': `${origin}/#website` },
          },
        ],
      });
    } else if (currentPath === '/library') {
      const desc =
        '게임산업진흥에 관한 법률 조문 분석, 사행행위처벌특례법, 2006년 정부 백서 기록 및 도박문제 예방 상담(1336) 지침을 안내합니다.';
      updateHeadSEO({
        title: '릴게임 자료실 · 관련 법률 및 중독 예방',
        description: desc,
        path: '/library',
        schemaGraph: [
          generateBreadcrumbSchema(
            [
              { name: '홈', url: '/' },
              { name: '자료실 & 법제도', url: '/library' },
            ],
            origin
          ),
          {
            '@type': 'WebPage',
            '@id': `${origin}/library#webpage`,
            url: `${origin}/library`,
            name: '릴게임 자료실 · 관련 법률 및 중독 예방 | 릴게임 홍박사',
            description: desc,
            inLanguage: 'ko-KR',
            isPartOf: { '@id': `${origin}/#website` },
          },
        ],
      });
    } else if (currentPath === '/journal') {
      const desc =
        '2006년 1만 5천 개 오락실 폐쇄의 전말, 화면 뒤의 난수 확률론, 상품권 경제학을 심층 취재한 홍박사 학술 기획 매거진 목록입니다.';
      updateHeadSEO({
        title: '홍박사 학술 기획 매거진',
        description: desc,
        path: '/journal',
        schemaGraph: [
          generateBreadcrumbSchema(
            [
              { name: '홈', url: '/' },
              { name: '매거진', url: '/journal' },
            ],
            origin
          ),
          {
            '@type': 'CollectionPage',
            '@id': `${origin}/journal#webpage`,
            url: `${origin}/journal`,
            name: '홍박사 학술 기획 매거진 | 릴게임 홍박사',
            description: desc,
            inLanguage: 'ko-KR',
            isPartOf: { '@id': `${origin}/#website` },
          },
        ],
      });
    } else if (currentPath.startsWith('/journal/')) {
      const slug = currentPath.replace('/journal/', '');
      const article = JOURNAL_ARTICLES.find((a) => a.slug === slug);
      if (article) {
        updateHeadSEO({
          title: article.title,
          description: article.summary,
          path: `/journal/${article.slug}`,
          image: article.coverImage || DEFAULT_OG_IMAGE,
          schemaGraph: [
            generateBreadcrumbSchema(
              [
                { name: '홈', url: '/' },
                { name: '매거진', url: '/journal' },
                { name: article.title, url: `/journal/${article.slug}` },
              ],
              origin
            ),
            generateArticleSchema(article, origin),
          ],
        });
      } else {
        updateHeadSEO({
          title: '페이지를 찾을 수 없습니다',
          description: '요청하신 매거진 기사를 찾을 수 없습니다. 릴게임 홍박사 매거진 목록으로 이동해 보세요.',
          path: currentPath,
          robots: 'noindex, nofollow',
        });
      }
    } else if (currentPath === '/about' || currentPath === '/editorial-policy') {
      const desc =
        '릴게임 홍박사 브랜드 정체성, 1차 사료 중심 팩트체크 원칙, 사행성 조장 금지 및 독자 정정 신청 절차를 투명하게 공개합니다.';
      updateHeadSEO({
        title: '홍박사 소개 및 편집·정정 정책',
        description: desc,
        path: '/about',
        robots: currentPath === '/editorial-policy' ? 'noindex, follow' : undefined,
        schemaGraph: [
          generateBreadcrumbSchema(
            [
              { name: '홈', url: '/' },
              { name: '홍박사 소개 & 정책', url: '/about' },
            ],
            origin
          ),
          {
            '@type': 'AboutPage',
            '@id': `${origin}/about#webpage`,
            url: `${origin}/about`,
            name: '홍박사 소개 및 편집·정정 정책 | 릴게임 홍박사',
            description: desc,
            inLanguage: 'ko-KR',
            isPartOf: { '@id': `${origin}/#website` },
          },
        ],
      });
    } else {
      updateHeadSEO({
        title: '페이지를 찾을 수 없습니다',
        description: '요청하신 페이지를 찾을 수 없습니다. 릴게임 홍박사 정보 아카이브의 다른 문서를 탐색해 보세요.',
        path: currentPath,
        robots: 'noindex, nofollow',
      });
    }
  }, [currentPath]);

  // Route Rendering
  const renderCurrentView = () => {
    if (currentPath === '/') {
      return <HomeView onNavigate={navigate} />;
    }

    if (currentPath === '/encyclopedia') {
      return <EncyclopediaView onNavigate={navigate} />;
    }

    if (currentPath === '/games') {
      return <GamesListView onNavigate={navigate} />;
    }

    if (currentPath.startsWith('/games/')) {
      const slug = currentPath.replace('/games/', '');
      const game = CLASSIC_GAMES.find((g) => g.slug === slug);
      if (game) {
        return <GameDetailView game={game} onNavigate={navigate} />;
      }
      return <NotFoundView onNavigate={navigate} />;
    }

    if (currentPath === '/archive') {
      return <ArchiveView onNavigate={navigate} />;
    }

    if (currentPath === '/library') {
      return <LibraryView onNavigate={navigate} />;
    }

    if (currentPath === '/journal') {
      return <JournalListView onNavigate={navigate} />;
    }

    if (currentPath.startsWith('/journal/')) {
      const slug = currentPath.replace('/journal/', '');
      const article = JOURNAL_ARTICLES.find((a) => a.slug === slug);
      if (article) {
        return <ArticleReader article={article} onNavigate={navigate} />;
      }
      return <NotFoundView onNavigate={navigate} />;
    }

    if (currentPath === '/about' || currentPath === '/editorial-policy') {
      return <AboutView onNavigate={navigate} />;
    }

    return <NotFoundView onNavigate={navigate} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#172637] selection:bg-[#B88C61]/20">
      {/* Top Header */}
      <Header
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigate} />

      {/* Research Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={navigate}
      />
    </div>
  );
}
