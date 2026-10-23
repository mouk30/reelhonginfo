import React from 'react';
import { BreadcrumbItem } from '../lib/seo/schema';

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onNavigate: (url: string) => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, onNavigate }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-3 border-b border-[#DFE3E2] text-xs text-[#68747D]">
      <ol className="flex items-center flex-wrap gap-2">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={item.url} className="flex items-center gap-2">
              {idx > 0 && <span aria-hidden="true" className="text-[#DFE3E2]">/</span>}
              {isLast ? (
                <span className="font-medium text-[#172637]" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <button
                  onClick={() => onNavigate(item.url)}
                  className="hover:text-[#B88C61] transition-colors whitespace-nowrap underline-offset-4 hover:underline"
                >
                  {item.name}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
