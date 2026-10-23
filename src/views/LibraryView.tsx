import React from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { LEGAL_DOCUMENTS, ADDICTION_PREVENTION_GUIDE } from '../data/laws';
import { Scale, ShieldAlert, PhoneCall, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';

interface LibraryViewProps {
  onNavigate: (path: string) => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({ onNavigate }) => {
  return (
    <div className="py-8 md:py-12 bg-[#F7F5F0]">
      <div className="editorial-container space-y-12">
        
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { name: '홈', url: '/' },
            { name: '자료실 & 법제도', url: '/library' },
          ]}
          onNavigate={onNavigate}
        />

        {/* Section Header */}
        <header className="space-y-4 pb-8 border-b border-[#DFE3E2]">
          <div className="text-xs uppercase tracking-widest font-semibold text-[#B88C61]">
            PILLAR 04 · LEGAL ARCHIVES &amp; GOVERNANCE
          </div>
          <h1 className="font-editorial-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#172637]">
            릴게임 관련 법률, 제도, 그리고 중독 예방 지침
          </h1>
          <p className="text-base sm:text-lg text-[#68747D] max-w-3xl leading-relaxed">
            사행성 게임에 대한 사법적 규제의 변천사와 &lsquo;게임산업진흥에 관한 법률&rsquo; 제정 과정의 핵심 조문, 그리고 이용자 권익 보호를 위한 공공 지원 가이드를 집대성했습니다.
          </p>
        </header>

        {/* Public Addiction Prevention Banner (Prominently placed per prompt ethics) */}
        <div className="bg-[#101B29] text-white p-6 md:p-8 rounded-xl border border-[#365E65] shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#365E65] flex items-center justify-center text-[#D2AE78] shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-editorial-serif text-xl sm:text-2xl font-bold text-[#F7F5F0]">
                {ADDICTION_PREVENTION_GUIDE.title}
              </h2>
              <span className="text-xs text-[#D2AE78]">
                국가 공공 지원 · 24시간 도박문제 상담 헬프라인
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#DFE3E2]/80 leading-relaxed max-w-3xl">
            {ADDICTION_PREVENTION_GUIDE.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#365E65]/50">
            {ADDICTION_PREVENTION_GUIDE.rules.map((rule, idx) => (
              <div key={idx} className="bg-[#172637] p-4 rounded-lg border border-[#365E65]/30 space-y-1.5">
                <span className="font-semibold text-xs text-[#F7F5F0] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B88C61]" />
                  {rule.title}
                </span>
                <p className="text-[11px] text-[#DFE3E2]/70 leading-relaxed">
                  {rule.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Hotline Contact Bar */}
          <div className="p-4 bg-[#172637] rounded-lg border border-[#D2AE78]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs text-[#DFE3E2]/70 block">{ADDICTION_PREVENTION_GUIDE.hotline.name}</span>
              <span className="text-lg font-bold text-white tracking-wider">
                {ADDICTION_PREVENTION_GUIDE.hotline.phone}
              </span>
            </div>
            <div className="text-xs text-[#D2AE78]">
              {ADDICTION_PREVENTION_GUIDE.hotline.sms} · {ADDICTION_PREVENTION_GUIDE.hotline.chatUrl}
            </div>
          </div>
        </div>

        {/* Legal Documents Section */}
        <section className="space-y-8">
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-widest font-semibold text-[#B88C61]">
              STATUTORY PROVISIONS &amp; PRECEDENTS
            </div>
            <h2 className="font-editorial-serif text-2xl md:text-3xl font-bold text-[#172637]">
              핵심 법률 및 규제 체계 해설
            </h2>
          </div>

          <div className="space-y-6">
            {LEGAL_DOCUMENTS.map((doc) => (
              <article
                key={doc.id}
                className="bg-white p-6 md:p-8 rounded-xl border border-[#DFE3E2] shadow-xs space-y-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#DFE3E2]">
                  <div>
                    <h3 className="font-editorial-serif text-xl sm:text-2xl font-bold text-[#172637]">
                      {doc.title}
                    </h3>
                    <div className="text-xs text-[#68747D] mt-1">
                      제정 및 공포: {doc.promulgationDate} · 소관: {doc.authority}
                    </div>
                  </div>
                  <span className="text-xs text-[#365E65] font-semibold bg-[#F7F5F0] px-3 py-1 rounded border border-[#DFE3E2]">
                    공식 법령 사료
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#20272D] leading-relaxed">
                  {doc.summary}
                </p>

                {/* Key Articles Grid */}
                <div className="space-y-3">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#68747D]">
                    주요 핵심 조문 및 사법적 효력
                  </h4>
                  <div className="space-y-3">
                    {doc.keyArticles.map((art, idx) => (
                      <div key={idx} className="p-4 bg-[#F7F5F0] rounded-lg border border-[#DFE3E2] space-y-2">
                        <div className="font-semibold text-xs sm:text-sm text-[#172637]">
                          {art.articleNumber}
                        </div>
                        <p className="text-xs text-[#20272D] italic font-serif leading-relaxed">
                          &ldquo;{art.content}&rdquo;
                        </p>
                        <div className="pt-2 border-t border-[#DFE3E2] text-xs text-[#365E65] font-medium">
                          법적 파장 및 해설: {art.impact}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Historical Significance */}
                <div className="p-4 bg-white rounded-lg border border-[#B88C61]/30 text-xs text-[#68747D]">
                  <span className="font-semibold text-[#172637] block mb-1">역사적 의의:</span>
                  {doc.historicalSignificance}
                </div>
              </article>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
