import React, { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';

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
      <div className="editorial-container">
        {/* Top Bar Contract: Zone 1 (Brand) — Zone 2 (Nav Links) — Zone 3 (Action) */}
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88C61] rounded-sm py-1"
            aria-label="릴게임 홍박사 | 사이트 INFO 홈으로 이동"
          >
            {/* Geometric H Monogram Icon */}
            <div className="w-10 h-10 rounded-lg bg-[#172637] flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden">
              <svg viewBox="0 0 64 64" className="w-6 h-6" fill="none">
                <path d="M16 16 H24 V28 H40 V16 H48 V48 H40 V36 H24 V48 H16 Z" fill="#F7F5F0" />
                <circle cx="49" cy="16" r="3" fill="#B88C61" />
              </svg>
            </div>
            
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl md:text-2xl tracking-wider text-[#172637] leading-tight">
                HONG INFO
              </span>
              <span className="text-[11px] font-medium tracking-tight text-[#365E65] whitespace-nowrap">
                릴게임 홍박사 <span className="text-[#B88C61]">|</span> 사이트 INFO
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-[#20272D]">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`transition-colors py-1 relative whitespace-nowrap shrink-0 text-sm ${
                    isActive
                      ? 'text-[#172637] font-semibold'
                      : 'text-[#68747D] hover:text-[#172637]'
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
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#20272D] bg-white border border-[#DFE3E2] rounded-md hover:border-[#B88C61] hover:text-[#172637] transition-all shadow-xs"
              aria-label="아카이브 통합 검색 열기"
            >
              <Search className="w-3.5 h-3.5 text-[#68747D]" />
              <span className="hidden sm:inline">자료 검색</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono text-[#68747D] bg-[#F7F5F0] border border-[#DFE3E2] rounded">
                ⌘K
              </kbd>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#20272D] hover:text-[#172637] focus:outline-none"
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
