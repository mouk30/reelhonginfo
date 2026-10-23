import React from 'react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#172637] text-[#DFE3E2] mt-24 border-t border-[#365E65]/40">
      {/* Upper Intellectual Branding Strip */}
      <div className="editorial-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Column (2 cols wide on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-[#365E65] flex items-center justify-center shrink-0">
                <svg viewBox="0 0 64 64" className="w-5 h-5" fill="none">
                  <path d="M16 16 H24 V28 H40 V16 H48 V48 H40 V36 H24 V48 H16 Z" fill="#F7F5F0" />
                  <circle cx="49" cy="16" r="3" fill="#D2AE78" />
                </svg>
              </div>
              <div>
                <span className="font-display font-bold text-2xl tracking-wider text-[#F7F5F0] block">
                  HONG INFO
                </span>
                <span className="text-xs font-medium text-[#D2AE78]">
                  릴게임 홍박사 | 사이트 INFO
                </span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-[#DFE3E2]/80 max-w-sm">
              바다이야기, 야마토, 손오공 등 1990~2000년대 한국 아케이드 릴게임의 역사와 메커니즘, 오락실 문화 변천사 및 사행성 규제 법제도를 학술적으로 기록하고 분석하는 전문 정보 아카이브입니다.
            </p>

            <div className="pt-2 text-xs text-[#D2AE78]">
              REEL GAME RESEARCH &amp; CULTURE ARCHIVE
            </div>
          </div>

          {/* Quick Links Column 1: Encyclopedia & Games */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#D2AE78]">
              게임 및 백과
            </h4>
            <ul className="space-y-2 text-xs text-[#DFE3E2]/80">
              <li>
                <button onClick={() => onNavigate('/encyclopedia')} className="hover:text-white transition-colors">
                  릴게임 메커니즘 총론
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/encyclopedia')} className="hover:text-white transition-colors">
                  용어 및 은어 사전
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/games')} className="hover:text-white transition-colors">
                  6대 대표 게임 비교
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/games/sea-story')} className="hover:text-white transition-colors">
                  바다이야기 심층 분석
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/games/yamato')} className="hover:text-white transition-colors">
                  야마토 연출 계보
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links Column 2: Archive & Research */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#D2AE78]">
              문화 및 법제도
            </h4>
            <ul className="space-y-2 text-xs text-[#DFE3E2]/80">
              <li>
                <button onClick={() => onNavigate('/archive')} className="hover:text-white transition-colors">
                  1990~2000s 오락실 연표
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/library')} className="hover:text-white transition-colors">
                  게임산업진흥법 분석
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/library')} className="hover:text-white transition-colors">
                  사행성 규제 및 판례
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/journal')} className="hover:text-white transition-colors">
                  홍박사 기획 매거진
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/library')} className="hover:text-white transition-colors">
                  중독 예방 가이드 (1336)
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links Column 3: Trust & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#D2AE78]">
              편집 및 정정 정책
            </h4>
            <ul className="space-y-2 text-xs text-[#DFE3E2]/80">
              <li>
                <button onClick={() => onNavigate('/about')} className="hover:text-white transition-colors">
                  홍박사 아카이브 소개
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/about')} className="hover:text-white transition-colors">
                  팩트체크 및 출처 원칙
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/about')} className="hover:text-white transition-colors">
                  콘텐츠 정정 신청
                </button>
              </li>
              <li>
                <a href="/robots.txt" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  robots.txt
                </a>
              </li>
              <li>
                <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  sitemap.xml
                </a>
              </li>
            </ul>
          </div>
        </div>


        {/* Bottom Copyright */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#DFE3E2]/50">
          <div>
            &copy; {new Date().getFullYear()} 릴게임 홍박사 | 사이트 INFO. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Google Technical SEO &amp; Schema.org Compliant</span>
            <span>·</span>
            <span>JSON-LD @graph Validated</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
