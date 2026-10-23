import React from 'react';
import { JournalArticle } from '../types';
import { Breadcrumb } from './Breadcrumb';
import { Clock, ShieldCheck, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { JOURNAL_ARTICLES } from '../data/journal';

interface ArticleReaderProps {
  article: JournalArticle;
  onNavigate: (path: string) => void;
}

export const ArticleReader: React.FC<ArticleReaderProps> = ({ article, onNavigate }) => {
  const currentIndex = JOURNAL_ARTICLES.findIndex((a) => a.id === article.id);
  const prevArticle = currentIndex > 0 ? JOURNAL_ARTICLES[currentIndex - 1] : null;
  const nextArticle = currentIndex < JOURNAL_ARTICLES.length - 1 ? JOURNAL_ARTICLES[currentIndex + 1] : null;

  return (
    <div className="py-8 md:py-12 bg-[#F7F5F0]">
      <div className="editorial-container">
        
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { name: '홈', url: '/' },
            { name: '매거진', url: '/journal' },
            { name: article.title, url: `/journal/${article.slug}` },
          ]}
          onNavigate={onNavigate}
        />

        {/* Back Link */}
        <div className="pt-6 pb-4">
          <button
            onClick={() => onNavigate('/journal')}
            className="inline-flex items-center gap-1.5 text-xs text-[#68747D] hover:text-[#172637] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>매거진 목록으로 돌아가기</span>
          </button>
        </div>

        {/* Article Header */}
        <header className="max-w-3xl mx-auto space-y-4 pb-8 border-b border-[#DFE3E2] text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs text-[#68747D]">
            <span className="text-[#B88C61] font-semibold tracking-wider uppercase font-display">
              HONG INFO JOURNAL
            </span>
            <span aria-hidden="true">·</span>
            <span>{article.publishedDate} 발행</span>
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

          <h1 className="font-editorial-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#172637] leading-tight text-balance">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-[#68747D] leading-relaxed">
            {article.subtitle}
          </p>

          <div className="pt-2 text-xs text-[#20272D] flex items-center justify-center md:justify-start gap-2">
            <span className="font-semibold">{article.author}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#68747D]">{article.authorTitle}</span>
          </div>
        </header>

        {/* Cover Image if present */}
        {article.coverImage && (
          <div className="max-w-4xl mx-auto my-8 rounded-xl overflow-hidden border border-[#DFE3E2] shadow-sm bg-[#101B29]">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full aspect-16/9 object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        {/* Direct Answer Summary Box */}
        <section className="max-w-3xl mx-auto my-8 p-6 bg-white border border-[#365E65]/30 rounded-xl shadow-xs">
          <div className="text-xs uppercase tracking-widest font-semibold text-[#365E65] mb-2">
            요약 및 학술 분석 개요 (DIRECT SUMMARY)
          </div>
          <p className="text-sm sm:text-base text-[#172637] leading-relaxed font-sans">
            {article.directAnswer}
          </p>
        </section>

        {/* Table of Contents */}
        <nav className="max-w-3xl mx-auto mb-10 p-5 bg-white rounded-xl border border-[#DFE3E2]">
          <h2 className="text-xs uppercase tracking-widest font-semibold text-[#68747D] mb-3">
            목차 (TABLE OF CONTENTS)
          </h2>
          <ul className="space-y-1.5 text-xs sm:text-sm">
            {article.tableOfContents.map((toc) => (
              <li key={toc.id}>
                <a
                  href={`#${toc.id}`}
                  className="text-[#365E65] hover:text-[#B88C61] hover:underline transition-colors block py-0.5"
                >
                  {toc.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Reading Body Prose */}
        <main className="max-w-3xl mx-auto space-y-12 reading-prose text-base sm:text-lg text-[#20272D]">
          {article.sections.map((sec, secIdx) => (
            <section key={sec.id} id={sec.id} className="space-y-4">
              <h2 className="font-editorial-serif text-2xl sm:text-3xl font-bold text-[#172637] pb-2 border-b border-[#DFE3E2] pt-4">
                {sec.heading}
              </h2>

              {sec.content.map((p, pIdx) => {
                const isFirst = secIdx === 0 && pIdx === 0;
                return (
                  <p
                    key={pIdx}
                    className={`leading-relaxed ${
                      isFirst
                        ? 'first-letter:text-5xl first-letter:font-editorial-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#172637]'
                        : ''
                    }`}
                  >
                    {p}
                  </p>
                );
              })}

              {/* Pull quote if present */}
              {sec.pullQuote && (
                <div className="my-8 py-6 px-4 border-y border-[#DFE3E2] text-center">
                  <blockquote className="font-editorial-serif italic text-lg sm:text-xl text-[#172637] leading-snug">
                    {sec.pullQuote}
                  </blockquote>
                </div>
              )}
            </section>
          ))}

          {/* Bibliographic Sources */}
          <section className="pt-8 border-t border-[#DFE3E2] space-y-3">
            <h3 className="font-editorial-serif text-lg font-bold text-[#172637]">
              참고 문헌 및 공공 사료 (References)
            </h3>
            <ul className="space-y-1.5 text-xs text-[#68747D]">
              {article.sources.map((src, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-[#365E65] shrink-0" />
                  <span>{src}</span>
                </li>
              ))}
            </ul>
          </section>
        </main>

        {/* Previous / Next Article Navigation Footer */}
        <div className="max-w-3xl mx-auto mt-16 pt-8 border-t border-[#DFE3E2] flex items-center justify-between gap-4">
          {prevArticle ? (
            <button
              onClick={() => onNavigate(`/journal/${prevArticle.slug}`)}
              className="text-left group"
            >
              <div className="text-xs text-[#68747D] flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>이전 기사</span>
              </div>
              <div className="font-semibold text-sm text-[#172637] group-hover:text-[#B88C61] transition-colors mt-0.5 max-w-xs line-clamp-1">
                {prevArticle.title}
              </div>
            </button>
          ) : <div />}

          {nextArticle && (
            <button
              onClick={() => onNavigate(`/journal/${nextArticle.slug}`)}
              className="text-right group"
            >
              <div className="text-xs text-[#68747D] flex items-center justify-end gap-1">
                <span>다음 기사</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
              <div className="font-semibold text-sm text-[#172637] group-hover:text-[#B88C61] transition-colors mt-0.5 max-w-xs line-clamp-1">
                {nextArticle.title}
              </div>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
