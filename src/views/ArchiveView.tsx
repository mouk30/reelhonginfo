import React from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { TimelineViewer } from '../components/TimelineViewer';
import { Camera, Sparkles } from 'lucide-react';

interface ArchiveViewProps {
  onNavigate: (path: string) => void;
}

export const ArchiveView: React.FC<ArchiveViewProps> = ({ onNavigate }) => {
  return (
    <div className="py-8 md:py-12 bg-[#F7F5F0]">
      <div className="editorial-container space-y-12">
        
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { name: '홈', url: '/' },
            { name: '추억 아카이브', url: '/archive' },
          ]}
          onNavigate={onNavigate}
        />

        {/* Section Header */}
        <header className="space-y-4 pb-8 border-b border-[#DFE3E2]">
          <div className="text-xs uppercase tracking-widest font-semibold text-[#B88C61]">
            PILLAR 03 · RETRO CULTURE &amp; HISTORICAL ARCHIVE
          </div>
          <h1 className="font-editorial-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#172637]">
            1990~2000년대 오락실 문화 변천사
          </h1>
          <p className="text-base sm:text-lg text-[#68747D] max-w-3xl leading-relaxed">
            100원짜리 동전으로 즐기던 동네 골목 오락실의 황금기부터 외환위기 이후 성인용 유기장의 확산, 바다이야기의 광풍, 그리고 사법 단속에 이르기까지 30여 년간의 대중문화적 단면을 사료와 연표로 조명합니다.
          </p>
        </header>

        {/* Archival Photography Documentary Feature */}
        <div className="bg-white rounded-xl border border-[#DFE3E2] overflow-hidden shadow-xs">
          <div className="aspect-16/9 bg-[#101B29] relative overflow-hidden">
            <img
              src="/assets/images/arcade_culture_2000s_1792680959573.jpg"
              alt="1990년대 및 2000년대 초반 한국 골목 오락실 현장 다큐멘터리 사진"
              className="w-full h-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#172637]/90 text-white rounded-lg backdrop-blur-xs text-xs flex flex-col md:flex-row md:items-center justify-between gap-2 border border-white/10">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#D2AE78]" />
                <span className="font-medium">기록 사료 #ARC-1998: 2000년대 초 동네 오락실 환전 데스크와 동전 교환기</span>
              </div>
              <span className="text-[#D2AE78] font-mono text-[11px]">HONG INFO ARCHIVE COLLECTION</span>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-4">
            <h3 className="font-editorial-serif text-2xl font-bold text-[#172637]">
              동전의 짤랑거림에서 기계의 굉음으로
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[#20272D] leading-relaxed">
              <p>
                1990년대 초중반의 오락실은 아이들의 왁자지껄한 목소리와 브라운관에서 뿜어져 나오는 8비트·16비트 사운드가 공존하던 동네의 문화 사랑방이었습니다. 동전 교환기에서 100원 주화를 바꾼 뒤 기계 위에 줄을 세워두고 차례를 기다리던 풍경은 그 시절을 지나온 세대에게 잊을 수 없는 유년의 온기였습니다.
              </p>
              <p>
                그러나 1997년 IMF 외환위기와 2000년대 초 PC방의 등장은 청소년 오락실의 몰락을 가속화했습니다. 그 빈자리를 채운 것은 굳게 닫힌 검은 암막 커튼과 붉은 벨벳 의자, 그리고 하루아침에 인생 역전을 꿈꾸는 어른들의 담배 연기였습니다. 순수한 게임 문화가 사행성 산업으로 변질되어 가던 이 시기는 우리 사회의 불안과 갈망을 가장 적나라하게 투영한 거울이었습니다.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Chronological Timeline */}
        <section className="space-y-6 pt-4">
          <div className="space-y-1">
            <h2 className="font-editorial-serif text-2xl md:text-3xl font-bold text-[#172637]">
              한국 아케이드 및 릴게임 변천사 연표
            </h2>
            <p className="text-xs sm:text-sm text-[#68747D]">
              시대별 주요 사건을 선택하여 각 시기의 사회적 배경과 대표 유물 사료를 확인하실 수 있습니다.
            </p>
          </div>

          <TimelineViewer />
        </section>

      </div>
    </div>
  );
};
