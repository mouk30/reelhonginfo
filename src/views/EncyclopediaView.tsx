import React from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { ENCYCLOPEDIA_OVERVIEW } from '../data/encyclopedia';
import { GlossaryViewer } from '../components/GlossaryViewer';
import { Cpu, Eye, CreditCard, ShieldAlert } from 'lucide-react';

interface EncyclopediaViewProps {
  onNavigate: (path: string) => void;
}

export const EncyclopediaView: React.FC<EncyclopediaViewProps> = ({ onNavigate }) => {
  return (
    <div className="py-8 md:py-12 bg-[#F7F5F0]">
      <div className="editorial-container space-y-12">
        
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { name: '홈', url: '/' },
            { name: '릴게임 백과', url: '/encyclopedia' },
          ]}
          onNavigate={onNavigate}
        />

        {/* Section Header */}
        <header className="space-y-4 pb-8 border-b border-[#DFE3E2]">
          <div className="text-xs uppercase tracking-widest font-semibold text-[#B88C61]">
            PILLAR 01 · COMPREHENSIVE REEL ENCYCLOPEDIA
          </div>
          <h1 className="font-editorial-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#172637]">
            {ENCYCLOPEDIA_OVERVIEW.title}
          </h1>
          <p className="text-base sm:text-lg text-[#68747D] max-w-3xl leading-relaxed">
            {ENCYCLOPEDIA_OVERVIEW.subtitle}
          </p>
        </header>

        {/* Direct Answer Box */}
        <section className="p-6 bg-white border border-[#365E65]/30 rounded-xl shadow-xs">
          <div className="text-xs uppercase tracking-widest font-semibold text-[#365E65] mb-2">
            릴게임의 학술적 정의 (DIRECT DEFINITION)
          </div>
          <p className="text-sm sm:text-base text-[#172637] leading-relaxed font-sans">
            {ENCYCLOPEDIA_OVERVIEW.directAnswer}
          </p>
        </section>

        {/* Core Architectural Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-[#DFE3E2] shadow-xs space-y-3">
            <div className="w-9 h-9 rounded-lg bg-[#F7F5F0] border border-[#DFE3E2] flex items-center justify-center text-[#365E65]">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-editorial-serif text-lg font-bold text-[#172637]">
              하드웨어와 RNG
            </h3>
            <p className="text-xs text-[#68747D] leading-relaxed">
              임베디드 보드, ROM 칩, 의사 난수 발생기(PRNG)를 통한 매 스핀 독립 추첨 로직 및 불법 변조 기판의 구조적 결함.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#DFE3E2] shadow-xs space-y-3">
            <div className="w-9 h-9 rounded-lg bg-[#F7F5F0] border border-[#DFE3E2] flex items-center justify-center text-[#B88C61]">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="font-editorial-serif text-lg font-bold text-[#172637]">
              예시와 심리 공학
            </h3>
            <p className="text-xs text-[#68747D] leading-relaxed">
              바다 속 고래, 상어 떼, 우주전함 워프 등 당첨 직전 뇌 속 도파민을 분비시키는 근접 미스(Near Miss) 시각 효과 분석.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#DFE3E2] shadow-xs space-y-3">
            <div className="w-9 h-9 rounded-lg bg-[#F7F5F0] border border-[#DFE3E2] flex items-center justify-center text-[#172637]">
              <CreditCard className="w-5 h-5" />
            </div>
            <h3 className="font-editorial-serif text-lg font-bold text-[#172637]">
              상품권 유통 경제
            </h3>
            <p className="text-xs text-[#68747D] leading-relaxed">
              법정 배출 한도를 맞추기 위해 도입된 5,000원권 문화상품권과 뒷골목 사설 환전소의 10% 수수료 환전 카르텔.
            </p>
          </div>
        </div>

        {/* Detailed Narrative Sections */}
        <div className="space-y-12">
          {ENCYCLOPEDIA_OVERVIEW.coreSections.map((sec) => (
            <section key={sec.id} className="bg-white p-8 rounded-xl border border-[#DFE3E2] shadow-xs space-y-4">
              <div>
                <h2 className="font-editorial-serif text-2xl font-bold text-[#172637]">
                  {sec.heading}
                </h2>
                <div className="text-xs font-medium text-[#365E65] mt-1">
                  {sec.lead}
                </div>
              </div>
              <div className="space-y-3 text-sm sm:text-base text-[#20272D] leading-relaxed pt-2 border-t border-[#DFE3E2]">
                {sec.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Interactive Glossary Section */}
        <section className="space-y-6 pt-6 border-t border-[#DFE3E2]">
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-widest font-semibold text-[#B88C61]">
              TERMINOLOGY &amp; GLOSSARY
            </div>
            <h2 className="font-editorial-serif text-2xl md:text-3xl font-bold text-[#172637]">
              릴게임 백과 용어 및 은어 사전
            </h2>
            <p className="text-xs sm:text-sm text-[#68747D]">
              당시 오락실 현장에서 사용되었던 기계 용어, 사행성 은어, 제도적 법률 용어를 상세히 해설합니다.
            </p>
          </div>

          <GlossaryViewer />
        </section>

      </div>
    </div>
  );
};
