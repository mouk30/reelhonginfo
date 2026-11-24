import React from 'react';
import { ArrowLeft, Compass, BookOpen } from 'lucide-react';

interface NotFoundViewProps {
  onNavigate: (path: string) => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ onNavigate }) => {
  return (
    <div className="py-16 md:py-24 bg-[#F7F5F0]">
      <div className="editorial-container max-w-2xl text-center space-y-6">
        <div className="text-xs uppercase tracking-widest font-semibold text-[#B88C61]">
          HTTP 404 · PAGE NOT FOUND
        </div>

        <h1 className="font-editorial-serif text-3xl sm:text-4xl font-bold text-[#172637]">
          요청하신 페이지를 찾을 수 없습니다
        </h1>

        <p className="text-sm sm:text-base text-[#68747D] leading-relaxed">
          입력하신 주소가 변경되었거나 존재하지 않는 문서입니다. 아래 버튼을 통해 릴게임 홍박사 아카이브의 주요 페이지로 이동해 주세요.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            className="px-5 py-3 bg-[#172637] text-white rounded-lg font-semibold text-sm hover:bg-[#101B29] transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>홈으로 돌아가기</span>
          </a>

          <a
            href="/games"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/games');
            }}
            className="px-5 py-3 bg-white border border-[#DFE3E2] text-[#172637] rounded-lg font-medium text-sm hover:border-[#B88C61] transition-colors inline-flex items-center gap-2"
          >
            <Compass className="w-4 h-4 text-[#365E65]" />
            <span>6대 게임별 정보</span>
          </a>

          <a
            href="/encyclopedia"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/encyclopedia');
            }}
            className="px-5 py-3 bg-white border border-[#DFE3E2] text-[#172637] rounded-lg font-medium text-sm hover:border-[#B88C61] transition-colors inline-flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-[#B88C61]" />
            <span>릴게임 백과</span>
          </a>
        </div>
      </div>
    </div>
  );
};
