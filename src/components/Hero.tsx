import React from 'react';
import { ArrowRight, BookOpen, Layers } from 'lucide-react';

interface HeroProps {
  onNavigate: (path: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 border-t border-b border-[#DFE3E2] bg-[#F7F5F0]">
      <div className="editorial-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Intellectual Editorial Typography (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Upper English Kicker - Pure unboxed text with tracking */}
            <div className="text-xs uppercase tracking-widest font-display font-semibold text-[#B88C61]">
              HONG INFO RESEARCH ARCHIVE
            </div>

            {/* Main H1 */}
            <h1 className="font-editorial-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-[#172637] leading-[1.2] tracking-tight text-balance">
              릴게임의 역사와 정보, <br className="hidden sm:inline" />
              <span className="text-[#365E65]">홍박사</span>가 정리합니다
            </h1>

            {/* Subtitle / Direct Thesis Statement */}
            <p className="text-base sm:text-lg text-[#20272D]/90 leading-relaxed max-w-2xl font-sans">
              바다이야기부터 야마토, 손오공까지. 한 시대를 지나온 릴게임의 역사와 특징, 그리고 오락실 문화의 기록을 체계적으로 살펴봅니다. 당시의 기계적 원리, 난수 발생기(RNG), 경품용 상품권 환전 생태계 및 사행성 규제 법제도를 팩트체크와 공공 기록을 바탕으로 분석합니다.
            </p>

            {/* CTA Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('/encyclopedia')}
                className="px-6 py-3.5 bg-[#172637] text-white rounded-md font-medium text-sm hover:bg-[#101B29] transition-all shadow-sm flex items-center gap-2 group cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-[#D2AE78]" />
                <span>릴게임 백과 보기</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('/games')}
                className="px-5 py-3.5 bg-white border border-[#DFE3E2] text-[#172637] rounded-md font-medium text-sm hover:border-[#B88C61] transition-all flex items-center gap-2 cursor-pointer"
              >
                <Layers className="w-4 h-4 text-[#365E65]" />
                <span>6대 명작 기기 비교</span>
              </button>
            </div>

            {/* Curatorial Rigor Metadata Strip (Zero-Pill compliant) */}
            <div className="pt-6 border-t border-[#DFE3E2] flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-[#68747D]">
              <span className="font-medium text-[#172637]">검증 상태</span>
              <span aria-hidden="true">·</span>
              <span>대검찰청 수사백서 및 국회 국정감사 기록 교차 검증</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#365E65] font-medium">Fact Checked</span>
            </div>
          </div>

          {/* Right Column: Museum Accession Style Media Frame (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-[#DFE3E2] shadow-sm space-y-3">
              {/* Image Container */}
              <div className="relative aspect-16/10 rounded-lg overflow-hidden bg-[#101B29]">
                <img
                  src="/assets/images/hero_archive_reel_1792680956216.jpg"
                  alt="2000년대 한국 아케이드 및 릴게임 역사 회고전 아카이브 전시관 전경"
                  className="w-full h-full object-cover"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-[#172637]/90 text-white text-[11px] font-mono tracking-wider backdrop-blur-xs rounded">
                  HISTORIC RETROSPECTIVE
                </div>
              </div>

              {/* Museum Accession Metadata Grid */}
              <div className="pt-2 border-t border-[#DFE3E2] text-[11px] text-[#68747D] grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[#172637] font-semibold block">아카이브 등록번호</span>
                  <span className="font-mono">ARC.2006.08-KOR</span>
                </div>
                <div>
                  <span className="text-[#172637] font-semibold block">기록 대상 시대</span>
                  <span>1998년 ~ 2006년 성인 아케이드</span>
                </div>
                <div className="col-span-2 text-xs font-serif italic text-[#20272D] pt-1">
                  &ldquo;한 시대를 관통한 기계의 회전, 그리고 기록되지 않았던 골목의 현대사&rdquo;
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
