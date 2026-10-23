import React, { useState } from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { ShieldCheck, Mail, AlertTriangle, BookCheck, Send } from 'lucide-react';

interface AboutViewProps {
  onNavigate: (path: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [targetArticle, setTargetArticle] = useState('');
  const [feedbackContent, setFeedbackContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetArticle.trim() || !feedbackContent.trim()) return;
    setFeedbackSent(true);
  };

  return (
    <div className="py-8 md:py-12 bg-[#F7F5F0]">
      <div className="editorial-container space-y-12">
        
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { name: '홈', url: '/' },
            { name: '홍박사 소개 & 정책', url: '/about' },
          ]}
          onNavigate={onNavigate}
        />

        {/* Section Header */}
        <header className="space-y-4 pb-8 border-b border-[#DFE3E2]">
          <div className="text-xs uppercase tracking-widest font-semibold text-[#B88C61]">
            ABOUT HONG INFO &amp; EDITORIAL TRUST
          </div>
          <h1 className="font-editorial-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#172637]">
            홍박사 아카이브 소개 및 편집·정정 정책
          </h1>
          <p className="text-base sm:text-lg text-[#68747D] max-w-3xl leading-relaxed">
            &lsquo;릴게임 홍박사 | 사이트 INFO&rsquo;는 투명한 정보 공개, 1차 사료 중심의 팩트체크, 그리고 엄격한 윤리 기준을 준수하는 전문 정보 플랫폼입니다.
          </p>
        </header>

        {/* Identity & Legal Disclaimer Box */}
        <section className="bg-white p-6 md:p-8 rounded-xl border border-[#DFE3E2] shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#B88C61]">
            <ShieldCheck className="w-4 h-4 text-[#365E65]" />
            <span>브랜드 정체성 및 명칭에 관한 투명한 고지</span>
          </div>

          <h2 className="font-editorial-serif text-2xl font-bold text-[#172637]">
            ‘홍박사’ 브랜드의 의의
          </h2>

          <div className="space-y-3 text-xs sm:text-sm text-[#20272D] leading-relaxed">
            <p>
              <strong>‘홍박사(HONG INFO)’</strong>는 1990~2000년대 한국 아케이드 및 릴게임 역사를 학술적으로 정리하기 위해 설립된 리서치 아카이브의 고유 브랜드 명칭입니다. 실존하는 특정인의 박사학위나 공인 전문가 자격을 무단으로 암시하거나 사칭하지 않습니다.
            </p>
            <p>
              본 사이트는 릴게임의 역사, 기계적 작동 원리, 대중문화적 배경, 그리고 사행성 규제 법제도를 연구·보존하는 학술 및 정보 제공을 유일한 목적으로 합니다. <strong>베팅, 머니 충전, 불법 환전, 사설 게임장 중개, 카지노 운영 등의 기능은 일절 제공하지 않으며 영구히 배제합니다.</strong>
            </p>
          </div>
        </section>

        {/* Three Pillar Policies */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Policy 1 */}
          <div className="bg-white p-6 rounded-xl border border-[#DFE3E2] shadow-xs space-y-3">
            <div className="w-8 h-8 rounded bg-[#F7F5F0] border border-[#DFE3E2] flex items-center justify-center text-[#365E65]">
              <BookCheck className="w-4 h-4" />
            </div>
            <h3 className="font-editorial-serif text-lg font-bold text-[#172637]">
              1. 팩트체크 및 출처 원칙
            </h3>
            <p className="text-xs text-[#68747D] leading-relaxed">
              모든 게임 제원과 사건 기록은 대검찰청 수사백서, 국회 회의록, 영상물등급위원회 심의 필증, 법원 판결문 등 공인된 1차 문헌을 교차 검증하여 작성합니다. 미확인 정보는 추측하지 않고 &apos;미확인&apos;으로 명기합니다.
            </p>
          </div>

          {/* Policy 2 */}
          <div className="bg-white p-6 rounded-xl border border-[#DFE3E2] shadow-xs space-y-3">
            <div className="w-8 h-8 rounded bg-[#F7F5F0] border border-[#DFE3E2] flex items-center justify-center text-[#B88C61]">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h3 className="font-editorial-serif text-lg font-bold text-[#172637]">
              2. 사행성 조장 금지 정책
            </h3>
            <p className="text-xs text-[#68747D] leading-relaxed">
              온라인 사설 도박 사이트나 불법 릴게임 업소의 홍보성 링크 및 댓글은 즉시 차단되며, 사행성 게임의 위험성과 중독 예방 헬프라인(1336) 정보를 항상 우선 배치합니다.
            </p>
          </div>

          {/* Policy 3 */}
          <div className="bg-white p-6 rounded-xl border border-[#DFE3E2] shadow-xs space-y-3">
            <div className="w-8 h-8 rounded bg-[#F7F5F0] border border-[#DFE3E2] flex items-center justify-center text-[#172637]">
              <Mail className="w-4 h-4" />
            </div>
            <h3 className="font-editorial-serif text-lg font-bold text-[#172637]">
              3. 투명한 정정 정책
            </h3>
            <p className="text-xs text-[#68747D] leading-relaxed">
              독자나 연구자가 사료적 오류를 지적해주실 경우, 편집위원회 검토 후 48시간 이내에 사실관계를 확인하여 본문 수정 및 수정 이력 각주를 투명하게 공개합니다.
            </p>
          </div>
        </div>

        {/* Correction Feedback Interactive Form */}
        <section className="bg-white p-6 md:p-8 rounded-xl border border-[#DFE3E2] shadow-xs space-y-6">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#B88C61]">
              EDITORIAL CORRECTION REQUEST
            </span>
            <h2 className="font-editorial-serif text-2xl font-bold text-[#172637]">
              사료 오류 제보 및 콘텐츠 정정 신청
            </h2>
            <p className="text-xs sm:text-sm text-[#68747D]">
              기재된 게임의 출시 연도, 제작사, 기계 제원, 법률 조문 등에 수정이 필요한 부분이 있다면 아래 서식을 통해 제보해 주시기 바랍니다.
            </p>
          </div>

          {feedbackSent ? (
            <div className="p-6 bg-[#F7F5F0] rounded-lg border border-[#365E65] text-center space-y-2">
              <ShieldCheck className="w-8 h-8 text-[#365E65] mx-auto" />
              <h4 className="font-semibold text-sm text-[#172637]">정정 제보가 접수되었습니다</h4>
              <p className="text-xs text-[#68747D]">
                홍박사 편집위원회에서 해당 사료를 재검토한 후 반영 결과를 아카이브에 공시하겠습니다. 감사합니다.
              </p>
              <button
                onClick={() => {
                  setFeedbackSent(false);
                  setTargetArticle('');
                  setFeedbackContent('');
                }}
                className="mt-3 px-4 py-1.5 text-xs bg-[#172637] text-white rounded hover:bg-[#101B29] transition-colors"
              >
                추가 제보 작성
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#172637] font-semibold mb-1">
                    대상 문서 또는 게임명 *
                  </label>
                  <input
                    type="text"
                    required
                    value={targetArticle}
                    onChange={(e) => setTargetArticle(e.target.value)}
                    placeholder="예: 바다이야기 하드웨어 제원, 야마토 연표 등"
                    className="w-full px-3.5 py-2.5 bg-[#F7F5F0] border border-[#DFE3E2] rounded-md text-sm text-[#172637] focus:outline-none focus:border-[#B88C61]"
                  />
                </div>
                <div>
                  <label className="block text-[#172637] font-semibold mb-1">
                    제보자 연락처 또는 이메일 (선택)
                  </label>
                  <input
                    type="email"
                    placeholder="검증 회신을 원하실 경우 기재해 주세요"
                    className="w-full px-3.5 py-2.5 bg-[#F7F5F0] border border-[#DFE3E2] rounded-md text-sm text-[#172637] focus:outline-none focus:border-[#B88C61]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#172637] font-semibold mb-1">
                  정정 요청 내용 및 근거 사료 *
                </label>
                <textarea
                  required
                  rows={4}
                  value={feedbackContent}
                  onChange={(e) => setFeedbackContent(e.target.value)}
                  placeholder="오류 내용과 해당 사실을 입증하는 정부 관보, 신문 기사, 공식 출판물 등의 출처를 기재해 주세요."
                  className="w-full px-3.5 py-2.5 bg-[#F7F5F0] border border-[#DFE3E2] rounded-md text-sm text-[#172637] focus:outline-none focus:border-[#B88C61]"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#172637] text-white rounded-md font-medium text-xs hover:bg-[#101B29] transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>정정 신청서 제출</span>
                </button>
              </div>
            </form>
          )}
        </section>

      </div>
    </div>
  );
};
