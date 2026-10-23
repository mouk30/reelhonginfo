import React from 'react';
import { Hero } from '../components/Hero';
import { GameComparisonMatrix } from '../components/GameComparisonMatrix';
import { CLASSIC_GAMES } from '../data/games';
import { JOURNAL_ARTICLES } from '../data/journal';
import { ARCHIVE_TIMELINE } from '../data/archive';
import { ArrowRight, BookOpen, Clock, ShieldCheck, Scale, FileText } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (path: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const featuredJournal = JOURNAL_ARTICLES[0];
  const secondaryJournal = JOURNAL_ARTICLES.slice(1, 3);
  const featuredTimeline = ARCHIVE_TIMELINE.slice(0, 3);

  return (
    <div className="space-y-20 md:space-y-28">
      {/* TOP SECTION — 2000년대 6대 대표 릴게임 아카이브 */}
      <section className="editorial-container pt-6 sm:pt-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#DFE3E2]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#B88C61]">
                TOP ARCHIVE · 6 TITLES LINEUP
              </span>
              <span className="text-[11px] font-mono text-[#365E65] bg-white px-2 py-0.5 rounded border border-[#DFE3E2]">
                ORIGINAL ARTWORK · ARCHIVE ACCESS
              </span>
            </div>
            <h2 className="font-editorial-serif text-2xl md:text-3xl font-bold text-[#172637] mt-1">
              2000년대 6대 대표 릴게임 아카이브
            </h2>
            <p className="text-xs sm:text-sm text-[#68747D] mt-1">
              엄선된 6종의 대표 릴게임을 한눈에 확인하고 심층 역사·제원 문서를 바로 살펴보세요.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/games')}
            className="text-xs font-medium text-[#365E65] hover:text-[#B88C61] flex items-center gap-1 group self-start md:self-auto cursor-pointer"
          >
            <span>6대 게임 전체 보기</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 6 Games 3x2 Cards Grid matching reference layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {CLASSIC_GAMES.map((game, idx) => {
            const badges = [
              { code: '01', tag: 'OCEAN', sub: '신비로운 바다의 프리미엄 어드벤처' },
              { code: '02', tag: 'GOLDEN', sub: '황금빛 전설을 담은 클래식 판타지' },
              { code: '03', tag: 'PARADISE', sub: '끝없이 펼쳐지는 바다의 새로운 즐거움' },
              { code: '04', tag: 'YAMATO', sub: '강렬한 에너지로 완성한 다이내믹 액션' },
              { code: '05', tag: 'LEGEND', sub: '전설적인 영웅의 화려한 모험' },
              { code: '06', tag: 'PHOENIX', sub: '불사조의 열기로 완성한 판타지 라인업' },
            ];
            const badge = badges[idx] || { code: `0${idx + 1}`, tag: 'PREMIUM', sub: game.subTitle };

            return (
              <div
                key={game.id}
                className="bg-[#101B29] text-white rounded-2xl border border-[#365E65]/40 overflow-hidden shadow-md hover:border-[#D2AE78] hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                {/* Artwork Area with Tag Overlays - 6종 이미지 클릭시 https://reelkings.kr 링크 연결 */}
                <a
                  href="https://reelkings.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${game.title} - 사이트 바로가기`}
                  className="relative aspect-square w-full bg-[#0a111a] overflow-hidden block cursor-pointer group"
                >
                  <img
                    src={game.imagePath}
                    alt={`${game.title} 아트워크`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 px-2 py-0.5 bg-[#D2AE78] text-[#172637] font-mono font-bold text-xs rounded">
                    {badge.code}
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 bg-[#172637]/80 text-[#D2AE78] font-mono text-[10px] tracking-wider rounded backdrop-blur-xs border border-[#365E65]/60">
                    {badge.tag}
                  </div>
                </a>

                {/* Content Description Area */}
                <div className="p-5 space-y-3 bg-[#101B29] flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      onClick={() => onNavigate(`/games/${game.slug}`)}
                      className="font-editorial-serif text-xl font-bold text-[#F7F5F0] hover:text-[#D2AE78] transition-colors cursor-pointer"
                      title={`${game.title} 심층 사료 보기`}
                    >
                      {game.title}
                    </h3>
                    <p className="text-xs text-[#DFE3E2]/80 mt-1 line-clamp-2">
                      {badge.sub}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#365E65]/40 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-[#DFE3E2]/60">
                      <button
                        type="button"
                        onClick={() => onNavigate(`/games/${game.slug}`)}
                        className="font-mono uppercase tracking-wider text-[10px] text-[#DFE3E2]/70 hover:text-[#D2AE78] underline underline-offset-2 transition-colors cursor-pointer"
                      >
                        상세 사료 열람
                      </button>
                      <span className="text-[#D2AE78]">아카이브 열람 가능</span>
                    </div>

                    {/* 사이트 바로가기 클릭시 https://reelkings.kr 링크 연결 */}
                    <a
                      href="https://reelkings.kr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 bg-[#D2AE78] hover:bg-[#e0be88] text-[#172637] font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <span>사이트 바로가기</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Side-by-side Comparative Table Strip */}
        <div className="mt-12">
          <GameComparisonMatrix onSelectGame={(slug) => onNavigate(`/games/${slug}`)} />
        </div>
      </section>

      {/* HERO SECTION — 릴게임의 역사와 정보, 홍박사가 정리합니다 (아래칸으로 위치이동) */}
      <Hero onNavigate={onNavigate} />

      {/* SECTION 01 — FEATURED RESEARCH */}
      <section className="editorial-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#DFE3E2]">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-[#B88C61]">
              SECTION 01 · FEATURED RESEARCH
            </span>
            <h2 className="font-editorial-serif text-2xl md:text-3xl font-bold text-[#172637] mt-1">
              홍박사 학술 기획 특집
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/journal')}
            className="text-xs font-medium text-[#365E65] hover:text-[#B88C61] flex items-center gap-1 group self-start md:self-auto cursor-pointer"
          >
            <span>매거진 전체 보기</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3-Tier Salience: Lead Story (70%) + Secondary Features (30%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-stretch">
          
          {/* Main Lead Feature (8 cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between bg-white rounded-xl border border-[#DFE3E2] p-6 shadow-xs hover:border-[#B88C61]/50 transition-all">
            <div className="space-y-4">
              {featuredJournal.coverImage && (
                <div className="aspect-16/9 rounded-lg overflow-hidden bg-[#101B29]">
                  <img
                    src={featuredJournal.coverImage}
                    alt={featuredJournal.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              <div className="flex items-center gap-2 text-xs text-[#68747D]">
                <span>{featuredJournal.publishedDate}</span>
                <span aria-hidden="true">·</span>
                <span>{featuredJournal.readingTime}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#365E65] font-medium">Fact Checked</span>
              </div>

              <h3 
                onClick={() => onNavigate(`/journal/${featuredJournal.slug}`)}
                className="font-editorial-serif text-2xl md:text-3xl font-bold text-[#172637] hover:text-[#B88C61] cursor-pointer transition-colors leading-tight"
              >
                {featuredJournal.title}
              </h3>

              <p className="text-sm text-[#20272D] leading-relaxed">
                {featuredJournal.summary}
              </p>
            </div>

            <div className="pt-6 border-t border-[#DFE3E2] mt-6 flex items-center justify-between">
              <span className="text-xs text-[#68747D]">
                집필: {featuredJournal.author}
              </span>
              <button
                onClick={() => onNavigate(`/journal/${featuredJournal.slug}`)}
                className="text-xs font-semibold text-[#172637] hover:text-[#B88C61] flex items-center gap-1 cursor-pointer"
              >
                <span>전문 읽기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Secondary Features (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {secondaryJournal.map((art) => (
              <div 
                key={art.id}
                className="flex-1 bg-white rounded-xl border border-[#DFE3E2] p-5 shadow-xs hover:border-[#B88C61]/50 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="text-xs text-[#68747D]">
                    {art.publishedDate} · {art.readingTime}
                  </div>
                  <h4
                    onClick={() => onNavigate(`/journal/${art.slug}`)}
                    className="font-editorial-serif text-lg font-bold text-[#172637] hover:text-[#B88C61] cursor-pointer transition-colors leading-snug"
                  >
                    {art.title}
                  </h4>
                  <p className="text-xs text-[#68747D] line-clamp-3 leading-relaxed">
                    {art.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#DFE3E2] mt-4 flex justify-end">
                  <button
                    onClick={() => onNavigate(`/journal/${art.slug}`)}
                    className="text-xs font-medium text-[#365E65] hover:text-[#B88C61] flex items-center gap-1 cursor-pointer"
                  >
                    <span>상세 기사 보기</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 03 — RETRO CULTURE ARCHIVE */}
      <section className="editorial-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#DFE3E2]">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-[#B88C61]">
              SECTION 03 · RETRO CULTURE ARCHIVE
            </span>
            <h2 className="font-editorial-serif text-2xl md:text-3xl font-bold text-[#172637] mt-1">
              1990~2000년대 오락실 문화 변천사
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/archive')}
            className="text-xs font-medium text-[#365E65] hover:text-[#B88C61] flex items-center gap-1 group self-start md:self-auto cursor-pointer"
          >
            <span>연표 전체 탐색</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {featuredTimeline.map((item, idx) => (
            <article
              key={idx}
              onClick={() => onNavigate('/archive')}
              className="bg-white p-6 rounded-xl border border-[#DFE3E2] shadow-xs hover:border-[#B88C61]/60 transition-all cursor-pointer flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <span className="font-mono text-xs font-bold text-[#B88C61] block">
                  {item.year}
                </span>
                <h3 className="font-editorial-serif text-lg font-bold text-[#172637] leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#68747D] line-clamp-3 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#DFE3E2] text-[11px] text-[#365E65]">
                사료: {item.keyArtifact.split(',')[0]}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SECTION 04 & 05 — INFORMATION LIBRARY & LEGAL HERITAGE */}
      <section className="editorial-container">
        <div className="bg-[#172637] text-white rounded-2xl p-8 md:p-12 shadow-sm space-y-8">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#D2AE78]">
              SECTION 05 · INFORMATION LIBRARY &amp; GOVERNANCE
            </span>
            <h2 className="font-editorial-serif text-2xl md:text-3xl font-bold text-[#F7F5F0]">
              게임의 작동 원리, 상품권 경제, 그리고 법제도
            </h2>
            <p className="text-xs sm:text-sm text-[#DFE3E2]/80 leading-relaxed">
              사행성 릴게임이 단순한 놀이를 넘어 사회적 파장으로 번졌던 이면에는 정교한 난수 발생기(RNG)와 심리적 예시 연출, 그리고 경품용 상품권 환전소라는 탈법적 유통망이 자리하고 있었습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#365E65]">
            <div 
              onClick={() => onNavigate('/encyclopedia')}
              className="p-5 rounded-lg bg-[#101B29] border border-[#365E65]/50 hover:border-[#D2AE78] transition-all cursor-pointer space-y-2"
            >
              <div className="w-8 h-8 rounded bg-[#365E65] flex items-center justify-center text-[#D2AE78] mb-3">
                <BookOpen className="w-4 h-4" />
              </div>
              <h4 className="font-semibold text-sm text-[#F7F5F0]">릴게임 메커니즘 총론</h4>
              <p className="text-xs text-[#DFE3E2]/70 leading-relaxed">
                슬롯머신과의 차이, 메인보드 칩 개조, 가변 환급률의 실체 분석
              </p>
            </div>

            <div 
              onClick={() => onNavigate('/encyclopedia')}
              className="p-5 rounded-lg bg-[#101B29] border border-[#365E65]/50 hover:border-[#D2AE78] transition-all cursor-pointer space-y-2"
            >
              <div className="w-8 h-8 rounded bg-[#365E65] flex items-center justify-center text-[#D2AE78] mb-3">
                <FileText className="w-4 h-4" />
              </div>
              <h4 className="font-semibold text-sm text-[#F7F5F0]">용어 및 은어 사전</h4>
              <p className="text-xs text-[#DFE3E2]/70 leading-relaxed">
                연타, 예시, 잠식, 모닝, 체스트 우퍼 등 당시 오락실 풍속어 10선
              </p>
            </div>

            <div 
              onClick={() => onNavigate('/library')}
              className="p-5 rounded-lg bg-[#101B29] border border-[#365E65]/50 hover:border-[#D2AE78] transition-all cursor-pointer space-y-2"
            >
              <div className="w-8 h-8 rounded bg-[#365E65] flex items-center justify-center text-[#D2AE78] mb-3">
                <Scale className="w-4 h-4" />
              </div>
              <h4 className="font-semibold text-sm text-[#F7F5F0]">게임산업진흥법과 규제사</h4>
              <p className="text-xs text-[#DFE3E2]/70 leading-relaxed">
                2006년 특수본 수사, 영등위 심의 취소, 상품권 영구 폐지 법조문 해설
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 06 — ABOUT HONG INFO & EDITORIAL PRINCIPLES */}
      <section className="editorial-container">
        <div className="bg-white rounded-xl border border-[#DFE3E2] p-8 md:p-10 shadow-xs space-y-6">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#B88C61]">
              SECTION 06 · ABOUT HONG INFO
            </span>
            <h2 className="font-editorial-serif text-2xl md:text-3xl font-bold text-[#172637]">
              홍박사 아카이브의 편찬 원칙
            </h2>
            <p className="text-xs sm:text-sm text-[#20272D] leading-relaxed">
              &lsquo;릴게임 홍박사 | 사이트 INFO&rsquo;는 왜곡되거나 잊혀가는 한국 아케이드 릴게임의 역사를 사법적·기술적·문화적 공공 기록에 기반하여 체계적으로 정리하는 연구 아카이브입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#DFE3E2] text-xs text-[#20272D]">
            <div className="space-y-1.5">
              <span className="font-semibold text-[#172637] block text-sm">1. 팩트체크와 원전 중심</span>
              <p className="text-[#68747D] leading-relaxed">
                확인되지 않은 루머나 사설 업자의 과장 광고를 배제하고 국회 회의록, 검찰 수사백서, 정부 전자관보 등 1차 사료를 기준으로 작성합니다.
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="font-semibold text-[#172637] block text-sm">2. 사행성 조장 및 베팅 불허</span>
              <p className="text-[#68747D] leading-relaxed">
                베팅, 머니 충전, 불법 게임 중개, 환전 기능을 일절 제공하지 않으며, 사행성의 위험성과 중독 예방 가이드를 최우선으로 배치합니다.
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="font-semibold text-[#172637] block text-sm">3. 투명한 정정 및 피드백</span>
              <p className="text-[#68747D] leading-relaxed">
                출시 연도, 제작사, 기계 제원 등 사료적 오류가 발견될 경우 편집위원회의 엄정한 재검증을 거쳐 투명하게 수정 이력을 공시합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 07 — EXPLORE MORE */}
      <section className="editorial-container pb-8 text-center space-y-4">
        <h3 className="font-editorial-serif text-2xl font-bold text-[#172637]">
          연구 아카이브 둘러보기
        </h3>
        <p className="text-xs sm:text-sm text-[#68747D] max-w-xl mx-auto">
          궁금하신 기종의 제원이나 역사적 사건, 혹은 1990~2000년대 오락실 문화에 대한 체계적인 해설을 자유롭게 탐색해 보세요.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('/games/sea-story')}
            className="px-4 py-2 bg-white border border-[#DFE3E2] rounded text-xs font-medium text-[#172637] hover:border-[#B88C61] transition-colors cursor-pointer"
          >
            바다이야기 분석
          </button>
          <button
            onClick={() => onNavigate('/games/yamato')}
            className="px-4 py-2 bg-white border border-[#DFE3E2] rounded text-xs font-medium text-[#172637] hover:border-[#B88C61] transition-colors cursor-pointer"
          >
            야마토 분석
          </button>
          <button
            onClick={() => onNavigate('/encyclopedia')}
            className="px-4 py-2 bg-white border border-[#DFE3E2] rounded text-xs font-medium text-[#172637] hover:border-[#B88C61] transition-colors cursor-pointer"
          >
            용어사전 전체
          </button>
          <button
            onClick={() => onNavigate('/archive')}
            className="px-4 py-2 bg-white border border-[#DFE3E2] rounded text-xs font-medium text-[#172637] hover:border-[#B88C61] transition-colors cursor-pointer"
          >
            1990-2026 연표
          </button>
        </div>
      </section>
    </div>
  );
};
