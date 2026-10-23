import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { SeoDebugPanel } from './components/SeoDebugPanel';
import { HomeView } from './views/HomeView';
import { EncyclopediaView } from './views/EncyclopediaView';
import { GamesListView } from './views/GamesListView';
import { GameDetailView } from './components/GameDetailView';
import { ArchiveView } from './views/ArchiveView';
import { LibraryView } from './views/LibraryView';
import { JournalListView } from './views/JournalListView';
import { ArticleReader } from './components/ArticleReader';
import { AboutView } from './views/AboutView';
import { CLASSIC_GAMES } from './data/games';
import { JOURNAL_ARTICLES } from './data/journal';
import {
  updateHeadSEO,
  generateGameSchema,
  generateArticleSchema,
  generateBreadcrumbSchema,
  FULL_BRAND,
  SITE_NAME,
  HOMEPAGE_EXACT_DESCRIPTION
} from './lib/seo/schema';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Sync with browser navigation (popstate)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Custom client navigation
  const navigate = (path: string) => {
    if (path === currentPath) return;
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // SEO & Head Metadata synchronization whenever currentPath changes
  useEffect(() => {
    if (currentPath === '/' || currentPath === '') {
      updateHeadSEO({
        title: FULL_BRAND,
        description: HOMEPAGE_EXACT_DESCRIPTION,
        path: '/',
        schemaGraph: [
          {
            '@type': 'WebPage',
            '@id': 'https://honginfo.org/#webpage',
            url: 'https://honginfo.org/',
            name: FULL_BRAND,
            description: HOMEPAGE_EXACT_DESCRIPTION,
            isPartOf: { '@id': 'https://honginfo.org/#website' }
          }
        ]
      });
    } else if (currentPath === '/encyclopedia') {
      updateHeadSEO({
        title: '릴게임 백과 · 원리와 메커니즘',
        description: '릴게임의 정의, 하드웨어 난수 발생기(RNG), 가변 환급률과 메모리 잠식 로직, 경품용 상품권 유통 체계 및 전문 용어 사전.',
        path: '/encyclopedia',
        schemaGraph: [
          generateBreadcrumbSchema([
            { name: '홈', url: '/' },
            { name: '릴게임 백과', url: '/encyclopedia' }
          ]),
          {
            '@type': 'CollectionPage',
            '@id': 'https://honginfo.org/encyclopedia#webpage',
            url: 'https://honginfo.org/encyclopedia',
            name: '릴게임 백과 | 릴게임 홍박사',
            isPartOf: { '@id': 'https://honginfo.org/#website' }
          }
        ]
      });
    } else if (currentPath === '/games') {
      updateHeadSEO({
        title: '2000년대 6대 대표 릴게임 아카이브',
        description: '바다이야기, 황금성, 오션파라다이스, 야마토, 손오공, 다빈치 등 2000년대 중반 한국 아케이드 시장을 풍미했던 6대 대표 릴게임 상세 비교.',
        path: '/games',
        schemaGraph: [
          generateBreadcrumbSchema([
            { name: '홈', url: '/' },
            { name: '게임별 정보', url: '/games' }
          ]),
          {
            '@type': 'CollectionPage',
            '@id': 'https://honginfo.org/games#webpage',
            url: 'https://honginfo.org/games',
            name: '6대 대표 릴게임 아카이브 | 릴게임 홍박사',
            isPartOf: { '@id': 'https://honginfo.org/#website' }
          }
        ]
      });
    } else if (currentPath.startsWith('/games/')) {
      const slug = currentPath.replace('/games/', '');
      const game = CLASSIC_GAMES.find((g) => g.slug === slug);
      if (game) {
        updateHeadSEO({
          title: `${game.title} - ${game.subTitle}`,
          description: game.directAnswer,
          path: `/games/${game.slug}`,
          schemaGraph: [
            generateBreadcrumbSchema([
              { name: '홈', url: '/' },
              { name: '게임별 정보', url: '/games' },
              { name: game.title, url: `/games/${game.slug}` }
            ]),
            generateGameSchema(game)
          ]
        });
      }
    } else if (currentPath === '/archive') {
      updateHeadSEO({
        title: '1990~2000년대 오락실 문화 변천사 연표',
        description: '동네 골목 오락실의 100원짜리 동전 낭만부터 외환위기 이후 성인 유기장 확산, 바다이야기 폭발, 2006년 특수본 단속까지의 역사적 기록.',
        path: '/archive',
        schemaGraph: [
          generateBreadcrumbSchema([
            { name: '홈', url: '/' },
            { name: '추억 아카이브', url: '/archive' }
          ])
        ]
      });
    } else if (currentPath === '/library') {
      updateHeadSEO({
        title: '릴게임 자료실 · 관련 법률 및 중독 예방 지침',
        description: '게임산업진흥에 관한 법률 조문 분석, 사행행위처벌특례법, 2006년 정부 백서 기록 및 도박문제 헬프라인(1336) 안내.',
        path: '/library',
        schemaGraph: [
          generateBreadcrumbSchema([
            { name: '홈', url: '/' },
            { name: '자료실 & 법제도', url: '/library' }
          ])
        ]
      });
    } else if (currentPath === '/journal') {
      updateHeadSEO({
        title: '홍박사 학술 기획 매거진',
        description: '2006년 1만 5천 개 오락실 폐쇄의 전말, 화면 뒤의 난수 확률론, 상품권 경제학을 심층 취재한 홍박사 기획 저널.',
        path: '/journal',
        schemaGraph: [
          generateBreadcrumbSchema([
            { name: '홈', url: '/' },
            { name: '매거진', url: '/journal' }
          ])
        ]
      });
    } else if (currentPath.startsWith('/journal/')) {
      const slug = currentPath.replace('/journal/', '');
      const article = JOURNAL_ARTICLES.find((a) => a.slug === slug);
      if (article) {
        updateHeadSEO({
          title: article.title,
          description: article.summary,
          path: `/journal/${article.slug}`,
          schemaGraph: [
            generateBreadcrumbSchema([
              { name: '홈', url: '/' },
              { name: '매거진', url: '/journal' },
              { name: article.title, url: `/journal/${article.slug}` }
            ]),
            generateArticleSchema(article)
          ]
        });
      }
    } else if (currentPath === '/about' || currentPath === '/editorial-policy') {
      updateHeadSEO({
        title: '홍박사 소개 및 편집·정정 정책',
        description: '릴게임 홍박사 브랜드 정체성, 1차 사료 중심 팩트체크 원칙, 사행성 조장 금지 및 독자 정정 신청 절차 안내.',
        path: '/about',
        schemaGraph: [
          generateBreadcrumbSchema([
            { name: '홈', url: '/' },
            { name: '홍박사 소개 & 정책', url: '/about' }
          ])
        ]
      });
    }
  }, [currentPath]);

  // Route Rendering
  const renderCurrentView = () => {
    if (currentPath === '/' || currentPath === '') {
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
      return <GamesListView onNavigate={navigate} />;
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
      return <JournalListView onNavigate={navigate} />;
    }

    if (currentPath === '/about' || currentPath === '/editorial-policy') {
      return <AboutView onNavigate={navigate} />;
    }

    // Fallback to HomeView
    return <HomeView onNavigate={navigate} />;
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

      {/* Real-time SEO Debugging Inspector Panel */}
      <SeoDebugPanel currentPath={currentPath} />
    </div>
  );
}
