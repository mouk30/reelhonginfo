import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Clock, ShieldCheck, FileText } from 'lucide-react';
import { CLASSIC_GAMES } from '../data/games';
import { GLOSSARY_DATABASE } from '../data/encyclopedia';
import { ARCHIVE_TIMELINE } from '../data/archive';
import { JOURNAL_ARTICLES } from '../data/journal';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const filteredGames = q
    ? CLASSIC_GAMES.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.englishTitle.toLowerCase().includes(q) ||
          g.subTitle.toLowerCase().includes(q) ||
          g.summary.toLowerCase().includes(q)
      )
    : CLASSIC_GAMES.slice(0, 4);

  const filteredGlossary = q
    ? GLOSSARY_DATABASE.filter(
        (item) =>
          item.term.toLowerCase().includes(q) ||
          (item.hanjaOrEnglish && item.hanjaOrEnglish.toLowerCase().includes(q)) ||
          item.shortDefinition.toLowerCase().includes(q)
      )
    : GLOSSARY_DATABASE.slice(0, 4);

  const filteredTimeline = q
    ? ARCHIVE_TIMELINE.filter(
        (evt) =>
          evt.year.toLowerCase().includes(q) ||
          evt.title.toLowerCase().includes(q) ||
          evt.headline.toLowerCase().includes(q) ||
          evt.description.toLowerCase().includes(q)
      )
    : [];

  const filteredJournal = q
    ? JOURNAL_ARTICLES.filter(
        (art) =>
          art.title.toLowerCase().includes(q) ||
          art.subtitle.toLowerCase().includes(q) ||
          art.summary.toLowerCase().includes(q)
      )
    : JOURNAL_ARTICLES.slice(0, 2);

  const handleSelect = (path: string) => {
    onNavigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-2xl bg-[#F7F5F0] rounded-xl shadow-2xl border border-[#DFE3E2] overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#DFE3E2] bg-white">
          <Search className="w-5 h-5 text-[#68747D]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="게임명(바다이야기, 야마토), 용어(연타, 예시, 고래), 연표 검색..."
            className="flex-1 bg-transparent text-base text-[#172637] placeholder-[#68747D]/70 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-[#68747D] hover:text-[#172637]">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs text-[#68747D] hover:text-[#172637] px-2 py-1 border border-[#DFE3E2] rounded"
          >
            ESC
          </button>
        </div>

        {/* Search Results Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Games Category */}
          {filteredGames.length > 0 && (
            <div>
              <div className="text-xs uppercase tracking-wider font-semibold text-[#365E65] mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>게임별 상세 문서 ({filteredGames.length})</span>
              </div>
              <div className="space-y-1.5">
                {filteredGames.map((game) => (
                  <button
                    key={game.id}
                    onClick={() => handleSelect(`/games/${game.slug}`)}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-white border border-transparent hover:border-[#DFE3E2] transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-semibold text-sm text-[#172637] group-hover:text-[#B88C61]">
                        {game.title}{' '}
                        <span className="text-xs text-[#68747D] font-normal">
                          · {game.englishTitle} ({game.year})
                        </span>
                      </div>
                      <div className="text-xs text-[#68747D] line-clamp-1 mt-0.5">
                        {game.subTitle}
                      </div>
                    </div>
                    <span className="text-xs text-[#B88C61] shrink-0 font-medium">열람 →</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Glossary Terms */}
          {filteredGlossary.length > 0 && (
            <div>
              <div className="text-xs uppercase tracking-wider font-semibold text-[#365E65] mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>백과 사전 및 핵심 용어 ({filteredGlossary.length})</span>
              </div>
              <div className="space-y-1.5">
                {filteredGlossary.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect('/encyclopedia')}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-white border border-transparent hover:border-[#DFE3E2] transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-[#172637] group-hover:text-[#B88C61]">
                        {item.term}
                      </span>
                      {item.hanjaOrEnglish && (
                        <span className="text-[11px] text-[#68747D]">
                          ({item.hanjaOrEnglish})
                        </span>
                      )}
                      <span className="text-[10px] text-[#365E65] ml-auto">
                        {item.category}
                      </span>
                    </div>
                    <div className="text-xs text-[#68747D] line-clamp-1 mt-0.5">
                      {item.shortDefinition}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Journal Articles */}
          {filteredJournal.length > 0 && (
            <div>
              <div className="text-xs uppercase tracking-wider font-semibold text-[#365E65] mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>매거진 기획 기사 ({filteredJournal.length})</span>
              </div>
              <div className="space-y-1.5">
                {filteredJournal.map((art) => (
                  <button
                    key={art.id}
                    onClick={() => handleSelect(`/journal/${art.slug}`)}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-white border border-transparent hover:border-[#DFE3E2] transition-colors group"
                  >
                    <div className="font-semibold text-sm text-[#172637] group-hover:text-[#B88C61]">
                      {art.title}
                    </div>
                    <div className="text-xs text-[#68747D] line-clamp-1 mt-0.5">
                      {art.subtitle}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Timeline Events (When searching) */}
          {filteredTimeline.length > 0 && (
            <div>
              <div className="text-xs uppercase tracking-wider font-semibold text-[#365E65] mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>오락실 역사 연표 ({filteredTimeline.length})</span>
              </div>
              <div className="space-y-1.5">
                {filteredTimeline.map((evt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect('/archive')}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-white border border-transparent hover:border-[#DFE3E2] transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#B88C61]">
                        {evt.year}
                      </span>
                      <span className="font-semibold text-sm text-[#172637] group-hover:text-[#B88C61]">
                        {evt.title}
                      </span>
                    </div>
                    <div className="text-xs text-[#68747D] line-clamp-1 mt-0.5">
                      {evt.headline}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {query &&
            filteredGames.length === 0 &&
            filteredGlossary.length === 0 &&
            filteredJournal.length === 0 &&
            filteredTimeline.length === 0 && (
              <div className="py-12 text-center text-sm text-[#68747D]">
                &quot;{query}&quot;에 대한 검색 결과가 없습니다. 다른 검색어를 입력해 보세요.
              </div>
            )}
        </div>

        {/* Footer info in modal */}
        <div className="px-5 py-3 border-t border-[#DFE3E2] bg-white/50 flex items-center justify-between text-xs text-[#68747D]">
          <span>릴게임 홍박사 아카이브 통합 검색</span>
          <span>Tab 키 또는 방향키로 탐색 가능</span>
        </div>
      </div>
    </div>
  );
};
