import React, { useState } from 'react';
import { ARCHIVE_TIMELINE } from '../data/archive';
import { Calendar, Package, Users } from 'lucide-react';

export const TimelineViewer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: '전체 시대' },
    { id: '황금기', label: '황금기 (1990-1995)' },
    { id: '전환기', label: '전환기 (1997-2003)' },
    { id: '폭발기', label: '폭발기 (2004-2005)' },
    { id: '규제기', label: '규제기 (2006)' },
    { id: '아카이브', label: '현대 아카이브 (2007-)' },
  ];

  const filteredEvents = selectedCategory === 'all'
    ? ARCHIVE_TIMELINE
    : ARCHIVE_TIMELINE.filter((e) => e.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white border border-[#DFE3E2] rounded-lg shadow-xs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              selectedCategory === cat.id
                ? 'bg-[#172637] text-white shadow-xs'
                : 'text-[#68747D] hover:text-[#172637] hover:bg-[#F7F5F0]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Timeline Stream */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-[#DFE3E2] space-y-12">
        {filteredEvents.map((evt, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline Node Dot */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-[#B88C61] shadow-xs group-hover:scale-125 transition-transform" />

            <article className="bg-white p-6 rounded-xl border border-[#DFE3E2] shadow-xs hover:border-[#B88C61]/50 transition-all space-y-4">
              {/* Year & Period Kicker */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#68747D]">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm text-[#B88C61]">
                    {evt.year}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-medium text-[#172637]">{evt.period}</span>
                </div>
                <span className="text-[11px] text-[#365E65] font-semibold">
                  {evt.category}
                </span>
              </div>

              {/* Title & Headline */}
              <div>
                <h3 className="font-editorial-serif text-xl sm:text-2xl font-bold text-[#172637]">
                  {evt.title}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-[#365E65] mt-1">
                  {evt.headline}
                </p>
              </div>

              {/* Narrative Prose */}
              <p className="text-xs sm:text-sm text-[#20272D] leading-relaxed">
                {evt.description}
              </p>

              {/* Social Context & Artifact */}
              <div className="pt-4 border-t border-[#DFE3E2] grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-[#68747D]">
                <div className="flex items-start gap-2 bg-[#F7F5F0] p-3 rounded">
                  <Users className="w-4 h-4 text-[#365E65] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#172637] block">당시 사회적 배경:</span>
                    <span>{evt.socialContext}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-[#F7F5F0] p-3 rounded">
                  <Package className="w-4 h-4 text-[#B88C61] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#172637] block">대표 유물 및 사료:</span>
                    <span>{evt.keyArtifact}</span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
};
