import React from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { CLASSIC_GAMES } from '../data/games';
import { GameComparisonMatrix } from '../components/GameComparisonMatrix';
import { ArrowRight, BookOpen, ShieldCheck } from 'lucide-react';

interface GamesListViewProps {
  onNavigate: (path: string) => void;
}

export const GamesListView: React.FC<GamesListViewProps> = ({ onNavigate }) => {
  return (
    <div className="py-8 md:py-12 bg-[#F7F5F0]">
      <div className="editorial-container space-y-12">
        
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { name: '홈', url: '/' },
            { name: '게임별 정보', url: '/games' },
          ]}
          onNavigate={onNavigate}
        />

        {/* Section Header */}
        <header className="space-y-4 pb-8 border-b border-[#DFE3E2]">
          <div className="text-xs uppercase tracking-widest font-semibold text-[#B88C61]">
            PILLAR 02 · GAME CATALOG &amp; ANALYSIS
          </div>
          <h1 className="font-editorial-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#172637]">
            2000년대 6대 대표 릴게임 아카이브
          </h1>
          <p className="text-base sm:text-lg text-[#68747D] max-w-3xl leading-relaxed">
            바다이야기, 황금성, 오션파라다이스, 야마토, 손오공, 다빈치 등 2000년대 중반 한국 아케이드 시장을 풍미했던 6대 대표 기종들의 역사적 개발 배경, 기계적 제원, 그리고 사법적 결말을 정리합니다.
          </p>
        </header>

        {/* 7 Games Detailed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CLASSIC_GAMES.map((game) => (
            <article
              key={game.id}
              onClick={() => onNavigate(`/games/${game.slug}`)}
              className="bg-white rounded-xl border border-[#DFE3E2] overflow-hidden shadow-xs hover:border-[#B88C61] hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Image Frame */}
                {game.imagePath ? (
                  <div className="aspect-16/10 bg-[#101B29] overflow-hidden">
                    <img
                      src={game.imagePath}
                      alt={game.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <div className="aspect-16/10 bg-[#F7F5F0] border-b border-[#DFE3E2] flex items-center justify-center text-xs text-[#68747D]">
                    <BookOpen className="w-8 h-8 text-[#365E65]" />
                  </div>
                )}

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#68747D]">
                    <span className="font-mono text-[#B88C61] font-semibold">{game.year.split(' ')[0]}</span>
                    <span className="flex items-center gap-1 text-[#365E65]">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {game.factCheckStatus}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-editorial-serif text-2xl font-bold text-[#172637] group-hover:text-[#B88C61] transition-colors">
                      {game.title}
                    </h3>
                    <div className="text-xs text-[#68747D] font-mono mt-0.5">
                      {game.englishTitle} · {game.developer}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#20272D] line-clamp-3 leading-relaxed">
                    {game.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-[#DFE3E2] flex items-center justify-between text-xs">
                  <span className="text-[#68747D]">
                    대표 연출: <strong className="text-[#172637]">{game.keyVisualEffects[0]?.split(' ')[0] || '특화'}</strong>
                  </span>
                  <span className="font-semibold text-[#B88C61] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    심층 연구 열람 <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Interactive Comparison Table */}
        <section className="pt-8">
          <GameComparisonMatrix onSelectGame={(slug) => onNavigate(`/games/${slug}`)} />
        </section>

      </div>
    </div>
  );
};
