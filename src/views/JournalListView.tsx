import React from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { JOURNAL_ARTICLES } from '../data/journal';
import { Clock, ShieldCheck, ArrowRight } from 'lucide-react';

interface JournalListViewProps {
  onNavigate: (path: string) => void;
}

export const JournalListView: React.FC<JournalListViewProps> = ({ onNavigate }) => {
  return (
    <div className="py-8 md:py-12 bg-[#F7F5F0]">
      <div className="editorial-container space-y-12">
        
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { name: '홈', url: '/' },
            { name: '매거진', url: '/journal' },
          ]}
          onNavigate={onNavigate}
        />

        {/* Section Header */}
        <header className="space-y-4 pb-8 border-b border-[#DFE3E2]">
          <div className="text-xs uppercase tracking-widest font-semibold text-[#B88C61]">
            HONG INFO JOURNAL &amp; ESSAYS
          </div>
          <h1 className="font-editorial-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#172637]">
            홍박사 학술 기획 매거진
          </h1>
          <p className="text-base sm:text-lg text-[#68747D] max-w-3xl leading-relaxed">
            아케이드 기계의 침묵, 화면 뒤의 난수 확률론, 상품권 경제학 등 당시의 사회현상과 기술적 원리를 심층 취재하여 집필한 전문 저널입니다.
          </p>
        </header>

        {/* Articles List */}
        <div className="space-y-8">
          {JOURNAL_ARTICLES.map((article) => (
            <article
              key={article.id}
              onClick={() => onNavigate(`/journal/${article.slug}`)}
              className="bg-white rounded-xl border border-[#DFE3E2] p-6 md:p-8 shadow-xs hover:border-[#B88C61] transition-all cursor-pointer flex flex-col md:flex-row gap-8 items-start group"
            >
              {article.coverImage && (
                <div className="w-full md:w-72 lg:w-80 shrink-0 aspect-16/10 rounded-lg overflow-hidden bg-[#101B29]">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#68747D]">
                  <span className="text-[#B88C61] font-semibold uppercase tracking-wider">
                    RESEARCH ESSAY
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{article.publishedDate}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#365E65]" />
                    {article.readingTime}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#365E65] font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Fact Checked
                  </span>
                </div>

                <h2 className="font-editorial-serif text-2xl md:text-3xl font-bold text-[#172637] group-hover:text-[#B88C61] transition-colors leading-snug">
                  {article.title}
                </h2>

                <p className="text-sm font-medium text-[#365E65] leading-relaxed">
                  {article.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-[#20272D] leading-relaxed line-clamp-3">
                  {article.summary}
                </p>

                <div className="pt-4 border-t border-[#DFE3E2] flex items-center justify-between text-xs">
                  <span className="text-[#68747D]">
                    집필: <strong className="text-[#172637]">{article.author}</strong> ({article.authorTitle})
                  </span>
                  <span className="font-semibold text-[#172637] group-hover:text-[#B88C61] flex items-center gap-1 transition-colors">
                    전문 읽기 <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
};
