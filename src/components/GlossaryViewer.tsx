import React, { useState } from 'react';
import { GLOSSARY_DATABASE } from '../data/encyclopedia';
import { Search, BookMarked, Tag } from 'lucide-react';

interface GlossaryViewerProps {
  onSelectGame?: (gameTitle: string) => void;
}

export const GlossaryViewer: React.FC<GlossaryViewerProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState('');

  const categories = [
    { id: 'all', label: '전체 용어' },
    { id: '기계원리', label: '기계원리 (RNG·알고리즘)' },
    { id: '연출시스템', label: '연출시스템 (예시·시각효과)' },
    { id: '오락실은어', label: '오락실 은어 및 풍속' },
    { id: '제도및규제', label: '제도 및 법률 규제' },
  ];

  const filteredItems = GLOSSARY_DATABASE.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      searchFilter === '' ||
      item.term.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (item.hanjaOrEnglish && item.hanjaOrEnglish.toLowerCase().includes(searchFilter.toLowerCase())) ||
      item.shortDefinition.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.detailedExplanation.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Search and Category Control Bar */}
      <div className="bg-white p-5 rounded-xl border border-[#DFE3E2] shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-[#68747D] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="용어 검색 (예: 연타, 예시, 잠식, 모닝, 고래, 상품권)..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#F7F5F0] border border-[#DFE3E2] rounded-lg text-sm text-[#172637] placeholder-[#68747D]/70 focus:outline-none focus:border-[#B88C61]"
          />
        </div>

        {/* Category Tabs (Buttons conforming to design discipline) */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-[#172637] text-white shadow-xs'
                  : 'bg-[#F7F5F0] text-[#68747D] hover:text-[#172637] hover:bg-black/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Glossary Items List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <article
            key={item.id}
            className="bg-white p-5 rounded-xl border border-[#DFE3E2] shadow-xs hover:border-[#B88C61]/50 transition-all space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#DFE3E2]">
                <div className="flex items-baseline gap-2">
                  <h3 className="font-editorial-serif text-lg font-bold text-[#172637]">
                    {item.term}
                  </h3>
                  {item.hanjaOrEnglish && (
                    <span className="text-xs text-[#68747D] font-mono">
                      {item.hanjaOrEnglish}
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-[#365E65] font-medium shrink-0">
                  {item.category}
                </span>
              </div>

              {/* Short Definition */}
              <p className="text-xs font-medium text-[#B88C61] pt-2">
                {item.shortDefinition}
              </p>

              {/* Detailed Explanation */}
              <p className="text-xs text-[#20272D] leading-relaxed pt-1.5">
                {item.detailedExplanation}
              </p>

              {/* Historical Context */}
              <div className="mt-3 p-2.5 bg-[#F7F5F0] rounded text-[11px] text-[#68747D] leading-relaxed">
                <span className="font-semibold text-[#172637] block mb-0.5">역사적 사료 기록:</span>
                {item.historicalContext}
              </div>
            </div>

            {/* Related Games */}
            <div className="pt-3 border-t border-[#DFE3E2] flex items-center gap-1.5 text-[11px] text-[#68747D]">
              <Tag className="w-3 h-3 text-[#365E65]" />
              <span>관련 게임:</span>
              <span className="text-[#172637] font-medium">
                {item.relatedGames.join(', ')}
              </span>
            </div>
          </article>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-[#DFE3E2] text-sm text-[#68747D]">
          일치하는 용어가 없습니다. 다른 검색어를 입력해 보세요.
        </div>
      )}
    </div>
  );
};
