import React from 'react';
import { GameDetail } from '../types';
import { Breadcrumb } from './Breadcrumb';
import { ShieldCheck, BookOpen, Layers, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { CLASSIC_GAMES } from '../data/games';

interface GameDetailViewProps {
  game: GameDetail;
  onNavigate: (path: string) => void;
}

export const GameDetailView: React.FC<GameDetailViewProps> = ({ game, onNavigate }) => {
  const currentIndex = CLASSIC_GAMES.findIndex((g) => g.id === game.id);
  const prevGame = currentIndex > 0 ? CLASSIC_GAMES[currentIndex - 1] : null;
  const nextGame = currentIndex < CLASSIC_GAMES.length - 1 ? CLASSIC_GAMES[currentIndex + 1] : null;

  return (
    <div className="py-8 md:py-12 bg-[#F7F5F0]">
      <div className="editorial-container">
        
        {/* Typographic Breadcrumb */}
        <Breadcrumb
          items={[
            { name: '홈', url: '/' },
            { name: '게임별 정보', url: '/games' },
            { name: game.title, url: `/games/${game.slug}` },
          ]}
          onNavigate={onNavigate}
        />

        {/* Back Link */}
        <div className="pt-6 pb-4">
          <button
            onClick={() => onNavigate('/games')}
            className="inline-flex items-center gap-1.5 text-xs text-[#68747D] hover:text-[#172637] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>6대 대표 게임 목록으로 돌아가기</span>
          </button>
        </div>

        {/* Article Header */}
        <header className="space-y-4 pb-8 border-b border-[#DFE3E2]">
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#68747D]">
            <span className="text-[#B88C61] font-semibold uppercase tracking-wider">
              ARCADE REEL ARCHIVE
            </span>
            <span aria-hidden="true">·</span>
            <span>출시 {game.year}</span>
            <span aria-hidden="true">·</span>
            <span>제작: {game.developer}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#365E65] font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              {game.factCheckStatus}
            </span>
          </div>

          <h1 className="font-editorial-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#172637] tracking-tight">
            {game.title}
            <span className="block sm:inline sm:ml-4 text-xl sm:text-2xl text-[#68747D] font-normal font-sans">
              {game.englishTitle}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#20272D] max-w-3xl leading-relaxed">
            {game.subTitle}
          </p>
        </header>

        {/* AEO / GEO Direct Answer Box */}
        <section className="my-8 p-6 bg-white border border-[#365E65]/30 rounded-xl shadow-xs">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#365E65] mb-2">
            <BookOpen className="w-4 h-4 text-[#B88C61]" />
            <span>핵심 요약 (DIRECT ANSWER)</span>
          </div>
          <p className="text-sm sm:text-base text-[#172637] leading-relaxed font-sans">
            {game.directAnswer}
          </p>
        </section>

        {/* 2-Column Editorial Reading Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-10">
          
          {/* Main Reading Column (8 cols) */}
          <main className="lg:col-span-8 space-y-12">
            
            {/* Featured Image if present */}
            {game.imagePath ? (
              <div className="rounded-xl overflow-hidden border border-[#DFE3E2] bg-[#101B29] shadow-xs">
                <img
                  src={game.imagePath}
                  alt={`${game.title} 역사적 아카이브 기기 화면`}
                  className="w-full aspect-4/3 object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="p-3 bg-white border-t border-[#DFE3E2] text-xs text-[#68747D] flex justify-between">
                  <span>아카이브 보존 사진: {game.title} 오리지널 캐비닛 디스플레이</span>
                  <span className="font-mono text-[#365E65]">HISTORICAL SPECIMEN</span>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-xl bg-white border border-[#DFE3E2] text-center space-y-2">
                <Layers className="w-10 h-10 text-[#365E65] mx-auto" />
                <h4 className="font-semibold text-sm text-[#172637]">{game.title} 아카이브 스펙 문서</h4>
                <p className="text-xs text-[#68747D]">
                  공식 영상물등급위원회 심의 서류 및 하드웨어 사양서 기반 복원 데이터
                </p>
              </div>
            )}

            {/* Section 1: Historical Background */}
            <section className="space-y-4">
              <h2 className="font-editorial-serif text-2xl font-bold text-[#172637] pb-2 border-b border-[#DFE3E2]">
                1. 역사적 배경과 아케이드 시장의 전개
              </h2>
              <div className="space-y-3 text-sm sm:text-base text-[#20272D] leading-relaxed">
                {game.historicalBackground.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </section>

            {/* Section 2: Technical Mechanisms */}
            <section className="space-y-4">
              <h2 className="font-editorial-serif text-2xl font-bold text-[#172637] pb-2 border-b border-[#DFE3E2]">
                2. 기계적 구조 및 연출·환급 메커니즘
              </h2>
              <div className="space-y-4">
                {game.mechanisms.map((mech, i) => (
                  <div key={i} className="p-4 bg-white rounded-lg border border-[#DFE3E2]">
                    <h3 className="font-semibold text-sm text-[#172637] mb-1.5 flex items-center gap-2">
                      <span className="text-[#B88C61] font-mono text-xs">0{i+1}.</span>
                      {mech.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#68747D] leading-relaxed">
                      {mech.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 3: Visual Effects */}
            <section className="space-y-4">
              <h2 className="font-editorial-serif text-2xl font-bold text-[#172637] pb-2 border-b border-[#DFE3E2]">
                3. 주요 시각 연출 및 예시(Visual Cue) 특징
              </h2>
              <ul className="space-y-2 text-sm text-[#20272D] list-disc list-inside bg-white p-5 rounded-lg border border-[#DFE3E2]">
                {game.keyVisualEffects.map((effect, i) => (
                  <li key={i} className="leading-relaxed">
                    <span className="font-medium text-[#172637]">{effect}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 4: Cultural & Social Impact */}
            <section className="space-y-4">
              <h2 className="font-editorial-serif text-2xl font-bold text-[#172637] pb-2 border-b border-[#DFE3E2]">
                4. 사회문화적 파장과 당시 오락실 생태계
              </h2>
              <div className="space-y-3 text-sm sm:text-base text-[#20272D] leading-relaxed">
                {game.culturalImpact.map((impact, i) => (
                  <p key={i}>{impact}</p>
                ))}
              </div>
            </section>

            {/* Section 5: Specific Terminology */}
            <section className="space-y-4">
              <h2 className="font-editorial-serif text-2xl font-bold text-[#172637] pb-2 border-b border-[#DFE3E2]">
                5. 관련 은어 및 핵심 용어 해설
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {game.terminology.map((t, i) => (
                  <div key={i} className="p-3 bg-white rounded-lg border border-[#DFE3E2]">
                    <div className="font-semibold text-sm text-[#172637] text-balance">
                      {t.term}
                    </div>
                    <div className="text-xs text-[#68747D] mt-1 leading-relaxed">
                      {t.meaning}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 6: Verified Sources & Legal Verdict */}
            <section className="space-y-4 pt-4 border-t border-[#DFE3E2]">
              <h2 className="font-editorial-serif text-xl font-bold text-[#172637]">
                검증 출처 및 공공 문서 (Fact Check Records)
              </h2>
              <div className="space-y-2">
                {game.verifiedSources.map((source, i) => (
                  <div key={i} className="p-3 bg-white rounded-md border border-[#DFE3E2] text-xs flex items-center justify-between">
                    <div>
                      <div className="font-medium text-[#172637]">{source.title}</div>
                      <div className="text-[#68747D] mt-0.5">
                        발행: {source.source} · 날짜: {source.date}
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-[#68747D] shrink-0" />
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Right Sidebar: Hardware Specs & Navigator (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Hardware Specification Box */}
            <div className="bg-white p-5 rounded-xl border border-[#DFE3E2] shadow-xs space-y-4">
              <h3 className="font-editorial-serif text-lg font-bold text-[#172637] pb-2 border-b border-[#DFE3E2]">
                하드웨어 제원 (Hardware Specs)
              </h3>
              <dl className="space-y-3 text-xs">
                <div>
                  <dt className="text-[#68747D] font-medium">외형 캐비닛</dt>
                  <dd className="font-semibold text-[#172637] mt-0.5">{game.hardwareSpecs.cabinet}</dd>
                </div>
                <div>
                  <dt className="text-[#68747D] font-medium">디스플레이 규격</dt>
                  <dd className="font-semibold text-[#172637] mt-0.5">{game.hardwareSpecs.display}</dd>
                </div>
                <div>
                  <dt className="text-[#68747D] font-medium">릴 회전 시스템</dt>
                  <dd className="font-semibold text-[#172637] mt-0.5">{game.hardwareSpecs.reelSystem}</dd>
                </div>
                <div>
                  <dt className="text-[#68747D] font-medium">사운드 앰프</dt>
                  <dd className="font-semibold text-[#172637] mt-0.5">{game.hardwareSpecs.soundSystem}</dd>
                </div>
                <div className="pt-2 border-t border-[#DFE3E2]">
                  <dt className="text-[#68747D] font-medium">행정 처분 및 사법 결과</dt>
                  <dd className="font-semibold text-[#B88C61] mt-0.5">{game.lawsAndRegulation}</dd>
                </div>
              </dl>
            </div>

            {/* Quick 7 Games Navigation */}
            <div className="bg-white p-5 rounded-xl border border-[#DFE3E2] shadow-xs space-y-3">
              <h4 className="text-xs uppercase tracking-widest font-semibold text-[#365E65]">
                6대 대표 릴게임 목록
              </h4>
              <div className="space-y-1">
                {CLASSIC_GAMES.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => onNavigate(`/games/${g.slug}`)}
                    className={`w-full text-left px-3 py-2 rounded text-xs transition-colors flex items-center justify-between ${
                      g.id === game.id
                        ? 'bg-[#172637] text-white font-medium'
                        : 'text-[#20272D] hover:bg-[#F7F5F0]'
                    }`}
                  >
                    <span>{g.title}</span>
                    <span className="text-[11px] opacity-70">{g.year.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Research Governance Badge */}
            <div className="p-4 bg-[#F7F5F0] rounded-lg border border-[#DFE3E2] text-xs text-[#68747D] space-y-2">
              <div className="font-semibold text-[#172637] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#365E65]" />
                <span>연구 아카이브 편찬 기준</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                본 문서는 상업적 홍보나 게임 유도를 목적으로 하지 않으며, 2006년 정부 백서 및 법원 판결문에 적시된 사료에 기반하여 엄정하게 서술되었습니다.
              </p>
            </div>
          </aside>

        </div>

        {/* Previous / Next Article Navigation Footer */}
        <div className="mt-16 pt-8 border-t border-[#DFE3E2] flex items-center justify-between gap-4">
          {prevGame ? (
            <button
              onClick={() => onNavigate(`/games/${prevGame.slug}`)}
              className="text-left group"
            >
              <div className="text-xs text-[#68747D] flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>이전 게임</span>
              </div>
              <div className="font-semibold text-sm text-[#172637] group-hover:text-[#B88C61] transition-colors mt-0.5">
                {prevGame.title}
              </div>
            </button>
          ) : <div />}

          {nextGame && (
            <button
              onClick={() => onNavigate(`/games/${nextGame.slug}`)}
              className="text-right group"
            >
              <div className="text-xs text-[#68747D] flex items-center justify-end gap-1">
                <span>다음 게임</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
              <div className="font-semibold text-sm text-[#172637] group-hover:text-[#B88C61] transition-colors mt-0.5">
                {nextGame.title}
              </div>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
