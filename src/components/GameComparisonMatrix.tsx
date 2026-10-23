import React from 'react';
import { CLASSIC_GAMES } from '../data/games';
import { ArrowRight, Info } from 'lucide-react';

interface GameComparisonMatrixProps {
  onSelectGame: (slug: string) => void;
}

export const GameComparisonMatrix: React.FC<GameComparisonMatrixProps> = ({ onSelectGame }) => {
  return (
    <div className="bg-white rounded-xl border border-[#DFE3E2] p-6 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#DFE3E2]">
        <div>
          <div className="text-xs uppercase tracking-widest font-semibold text-[#B88C61]">
            COMPARATIVE ANALYSIS
          </div>
          <h3 className="font-editorial-serif text-2xl font-bold text-[#172637] mt-1">
            2000년대 6대 대표 릴게임 기술·문화 비교 분석표
          </h3>
          <p className="text-xs text-[#68747D] mt-1">
            공식 영상물등급위원회 심의 기록 및 사법기관 압수 감정서를 토대로 작성된 데이터 매트릭스
          </p>
        </div>
        <div className="text-xs text-[#365E65] bg-[#F7F5F0] px-3 py-1.5 rounded border border-[#DFE3E2] flex items-center gap-1.5 shrink-0 self-start md:self-auto">
          <Info className="w-3.5 h-3.5 text-[#B88C61]" />
          <span>각 게임명을 클릭하면 심층 연구 문서로 이동합니다</span>
        </div>
      </div>

      {/* Responsive Horizontal Table */}
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#DFE3E2] text-[#68747D] uppercase tracking-wider font-semibold bg-[#F7F5F0]/50">
              <th className="py-3 px-4">게임명 / 영문</th>
              <th className="py-3 px-3">출시 연도</th>
              <th className="py-3 px-3">제작사 / 유통</th>
              <th className="py-3 px-4">디스플레이 및 릴 시스템</th>
              <th className="py-3 px-4">핵심 당첨 예시 연출</th>
              <th className="py-3 px-3">사운드 특징</th>
              <th className="py-3 px-3">최전성기</th>
              <th className="py-3 px-3">상세</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DFE3E2]/70 text-[#20272D]">
            {CLASSIC_GAMES.map((game) => (
              <tr 
                key={game.id}
                onClick={() => onSelectGame(game.slug)}
                className="hover:bg-[#F7F5F0] transition-colors cursor-pointer group"
              >
                <td className="py-3.5 px-4 font-semibold text-sm text-[#172637] group-hover:text-[#B88C61]">
                  <div>{game.title}</div>
                  <div className="text-[11px] font-normal text-[#68747D]">{game.englishTitle}</div>
                </td>
                <td className="py-3.5 px-3 whitespace-nowrap font-mono text-[11px]">
                  {game.year.split(' ')[0]}
                </td>
                <td className="py-3.5 px-3">
                  {game.developer}
                </td>
                <td className="py-3.5 px-4 text-[#20272D]/90 max-w-xs">
                  {game.hardwareSpecs.display}
                </td>
                <td className="py-3.5 px-4 font-medium text-[#365E65]">
                  {game.keyVisualEffects[0] || '특화 연출'}
                </td>
                <td className="py-3.5 px-3 text-[#68747D]">
                  {game.hardwareSpecs.soundSystem.split('+')[0]}
                </td>
                <td className="py-3.5 px-3 whitespace-nowrap font-mono text-[11px] text-[#B88C61]">
                  {game.comparisonMetrics.eraPeak}
                </td>
                <td className="py-3.5 px-3 text-right">
                  <span className="inline-flex items-center text-xs text-[#B88C61] font-medium group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
