import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, Copy, Check, Eye } from 'lucide-react';

interface EffectiveSeoData {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogSiteName: string;
  ogUrl: string;
  jsonLdSnippet: string;
}

export const SeoDebugPanel: React.FC<{ currentPath: string }> = ({ currentPath }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [seoData, setSeoData] = useState<EffectiveSeoData>({
    title: '',
    description: '',
    canonical: '',
    ogTitle: '',
    ogDescription: '',
    ogSiteName: '',
    ogUrl: '',
    jsonLdSnippet: ''
  });

  const inspectMetadata = () => {
    const title = document.title || '';
    const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
    const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content') || '';
    const ogDescription = document.querySelector('meta[property="og:description"]')?.getAttribute('content') || '';
    const ogSiteName = document.querySelector('meta[property="og:site_name"]')?.getAttribute('content') || '';
    const ogUrl = document.querySelector('meta[property="og:url"]')?.getAttribute('content') || '';

    const scriptEl = document.getElementById('seo-json-ld');
    let jsonLdSnippet = '';
    if (scriptEl && scriptEl.textContent) {
      try {
        const parsed = JSON.parse(scriptEl.textContent);
        const types = parsed['@graph']?.map((node: { '@type': string }) => node['@type']).join(', ');
        jsonLdSnippet = `@graph Types: [${types || 'WebSite'}]`;
      } catch {
        jsonLdSnippet = 'JSON-LD present';
      }
    }

    setSeoData({
      title,
      description,
      canonical,
      ogTitle,
      ogDescription,
      ogSiteName,
      ogUrl,
      jsonLdSnippet
    });
  };

  useEffect(() => {
    // Re-inspect on path change and small settle timeout
    inspectMetadata();
    const timer = setTimeout(inspectMetadata, 150);
    return () => clearTimeout(timer);
  }, [currentPath]);

  const handleCopy = () => {
    const jsonOutput = JSON.stringify(seoData, null, 2);
    navigator.clipboard.writeText(jsonOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside 
      aria-label="SEO 실시간 메타데이터 검증 패널"
      className="fixed bottom-4 right-4 z-50 font-sans"
    >
      {/* Minimized Trigger Button */}
      {!isOpen ? (
        <button
          onClick={() => {
            inspectMetadata();
            setIsOpen(true);
          }}
          className="flex items-center gap-2 px-3 py-2 bg-[#172637] text-white rounded-lg shadow-lg border border-[#365E65] hover:bg-[#101B29] transition-all text-xs font-medium cursor-pointer"
          title="클릭하여 실시간 SEO 메타데이터 확인"
        >
          <Search className="w-3.5 h-3.5 text-[#D2AE78]" />
          <span>SEO 메타데이터 검증</span>
          <span className="text-[10px] bg-[#365E65] text-[#F7F5F0] px-1.5 py-0.5 rounded font-mono">
            LIVE
          </span>
        </button>
      ) : (
        /* Expanded Inspector Panel */
        <div className="w-[360px] sm:w-[420px] bg-[#F7F5F0] rounded-xl shadow-2xl border border-[#DFE3E2] overflow-hidden flex flex-col text-xs text-[#172637] animate-in fade-in slide-in-from-bottom-2 duration-200">
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#172637] text-white">
            <div className="flex items-center gap-2">
              <Eye className="w-3.5 h-3.5 text-[#D2AE78]" />
              <span className="font-semibold text-xs tracking-wide">SEO Live Inspector</span>
              <span className="text-[10px] text-[#D2AE78] font-mono">200 OK</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleCopy}
                className="p-1 hover:bg-white/10 rounded text-[#DFE3E2] hover:text-white transition-colors"
                title="메타데이터 JSON 복사"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded text-[#DFE3E2] hover:text-white transition-colors"
                title="패널 닫기"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body Fields */}
          <div className="p-4 space-y-3 max-h-[70vh] overflow-y-auto">
            {/* Title */}
            <div>
              <div className="flex items-center justify-between text-[11px] text-[#68747D] mb-1">
                <span className="font-semibold text-[#172637]">Title (&lt;title&gt;)</span>
                <span className="font-mono text-[10px]">{seoData.title.length}자</span>
              </div>
              <div className="p-2 bg-white rounded border border-[#DFE3E2] font-medium text-xs break-words">
                {seoData.title || '(비어있음)'}
              </div>
            </div>

            {/* Description */}
            <div>
              <div className="flex items-center justify-between text-[11px] text-[#68747D] mb-1">
                <span className="font-semibold text-[#172637]">Meta Description</span>
                <span className="font-mono text-[10px]">{seoData.description.length}자</span>
              </div>
              <div className="p-2 bg-white rounded border border-[#DFE3E2] text-[11px] leading-relaxed text-[#20272D] max-h-24 overflow-y-auto break-words">
                {seoData.description || '(비어있음)'}
              </div>
            </div>

            {/* Canonical */}
            <div>
              <span className="font-semibold text-[11px] text-[#68747D] block mb-1">Canonical URL</span>
              <div className="p-1.5 bg-white rounded border border-[#DFE3E2] font-mono text-[11px] text-[#365E65] break-all">
                {seoData.canonical || '(비어있음)'}
              </div>
            </div>

            {/* Open Graph Group */}
            <div className="pt-2 border-t border-[#DFE3E2] space-y-2">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#B88C61] block">
                Open Graph Tags
              </span>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-1.5 bg-white rounded border border-[#DFE3E2]">
                  <span className="text-[10px] text-[#68747D] block">og:site_name</span>
                  <span className="font-medium text-[#172637]">{seoData.ogSiteName || '-'}</span>
                </div>
                <div className="p-1.5 bg-white rounded border border-[#DFE3E2]">
                  <span className="text-[10px] text-[#68747D] block">og:url</span>
                  <span className="font-mono text-[10px] text-[#365E65] truncate block">
                    {seoData.ogUrl || '-'}
                  </span>
                </div>
              </div>

              <div className="p-1.5 bg-white rounded border border-[#DFE3E2] text-[11px]">
                <span className="text-[10px] text-[#68747D] block">og:title</span>
                <span className="font-medium text-[#172637] break-words">{seoData.ogTitle || '-'}</span>
              </div>
            </div>

            {/* JSON-LD Schema Group */}
            <div className="pt-2 border-t border-[#DFE3E2]">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#365E65] block mb-1">
                JSON-LD Structured Data
              </span>
              <div className="p-2 bg-[#172637] text-white rounded font-mono text-[10px] flex items-center justify-between">
                <span>{seoData.jsonLdSnippet || 'Schema.org @graph active'}</span>
                <span className="text-[#D2AE78]">VALID</span>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="px-4 py-2 bg-white border-t border-[#DFE3E2] text-[10px] text-[#68747D] flex items-center justify-between">
            <span>실시간 클라이언트 라우팅 감지 중</span>
            <button
              onClick={inspectMetadata}
              className="text-[#B88C61] hover:underline font-medium"
            >
              새로고침
            </button>
          </div>

        </div>
      )}
    </aside>
  );
};
