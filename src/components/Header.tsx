import React, { useState } from 'react';
import { Search, Menu, X, ArrowRight } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate, onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: '홈', path: '/' },
    { label: '릴게임 백과', path: '/encyclopedia' },
    { label: '게임별 정보', path: '/games' },
    { label: '추억 아카이브', path: '/archive' },
    { label: '자료실 & 법제도', path: '/library' },
    { label: '매거진', path: '/journal' },
    { label: '홍박사 소개', path: '/about' },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F7F5F0]/95 backdrop-blur-md border-b border-[#DFE3E2] transition-colors">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Top Bar Contract: Zone 1 (Brand) — Zone 2 (Nav Links) — Zone 3 (Action) */}
        <div className="flex items-center justify-between gap-2 lg:gap-4 h-20">
          
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-2 sm:gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88C61] rounded-sm py-1 shrink-0"
            aria-label="릴게임 홍박사 | 사이트 INFO 홈으로 이동"
          >
            {/* Geometric H Monogram Icon */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#172637] flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden">
              <svg viewBox="0 0 64 64" className="w-5 h-5 sm:w-6 sm:h-6" fill="none">
                <path d="M16 16 H24 V28 H40 V16 H48 V48 H40 V36 H24 V48 H16 Z" fill="#F7F5F0" />
                <circle cx="49" cy="16" r="3" fill="#B88C61" />
              </svg>
            </div>
            
            <div className="flex flex-col">
              <span className="font-display font-bold text-base sm:text-xl md:text-2xl tracking-wider text-[#172637] leading-tight">
                HONG INFO
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium tracking-tight text-[#365E65] whitespace-nowrap">
                릴게임 홍박사 <span className="text-[#B88C61]">|</span> 사이트 INFO
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-5 text-sm font-medium text-[#20272D]">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`transition-colors py-1 relative whitespace-nowrap shrink-0 text-sm xl:text-[15px] cursor-pointer ${
                    isActive
                      ? 'text-[#172637] font-bold'
                      : 'text-[#4B5660] hover:text-[#172637] font-medium'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B88C61]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Search Affordance */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-1.5 p-2 xl:px-3 xl:py-2 text-xs font-medium text-[#20272D] bg-white border border-[#DFE3E2] rounded-md hover:border-[#B88C61] hover:text-[#172637] transition-all shadow-xs cursor-pointer"
              aria-label="아카이브 통합 검색 열기"
              title="자료 검색 (⌘K)"
            >
              <Search className="w-4 h-4 xl:w-3.5 xl:h-3.5 text-[#68747D]" />
              <span className="hidden xl:inline">자료 검색</span>
            </button>

            <a
              href="https://reelkings.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 sm:px-5 py-2 sm:py-2.5 bg-[#D2AE78] hover:bg-[#e0be88] text-[#172637] font-cta font-bold text-sm sm:text-base tracking-tight rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm whitespace-nowrap shrink-0"
            >
              <span>사이트 바로가기</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </a>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 text-[#20272D] hover:text-[#172637] focus:outline-none"
              aria-label={mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#DFE3E2] bg-[#F7F5F0] px-6 py-5 shadow-lg">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`text-left text-base py-2.5 px-3 rounded-md transition-colors ${
                    isActive
                      ? 'bg-[#172637] text-white font-medium'
                      : 'text-[#20272D] hover:bg-black/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>
          
          <div className="mt-5 pt-4 border-t border-[#DFE3E2] flex items-center justify-between text-xs text-[#68747D]">
            <span>REEL GAME RESEARCH &amp; CULTURE</span>
            <span className="text-[#365E65] font-semibold">HONG INFO</span>
          </div>
        </div>
      )}
    </header>
  );
};
