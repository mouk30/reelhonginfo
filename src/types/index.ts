export type CategoryType = 
  | 'encyclopedia'
  | 'games'
  | 'archive'
  | 'library'
  | 'journal'
  | 'about'
  | 'policy';

export interface GameDetail {
  id: string;
  slug: string;
  title: string;
  englishTitle: string;
  subTitle: string;
  year: string;
  developer: string;
  publisher: string;
  hardwareSpecs: {
    cabinet: string;
    display: string;
    reelSystem: string;
    soundSystem: string;
  };
  summary: string;
  directAnswer: string; // For GEO & AEO
  historicalBackground: string[];
  mechanisms: {
    title: string;
    description: string;
  }[];
  keyVisualEffects: string[];
  culturalImpact: string[];
  terminology: {
    term: string;
    meaning: string;
  }[];
  lawsAndRegulation: string;
  factCheckStatus: 'Fact Checked' | 'Source Verified';
  verifiedSources: {
    title: string;
    source: string;
    date: string;
    urlReference?: string;
  }[];
  imagePath?: string;
  comparisonMetrics: {
    visualComplexity: string; // e.g. "상 (3D CG 연출)"
    soundImpact: string; // e.g. "최상 (전용 우퍼 스피커)"
    eraPeak: string; // e.g. "2004~2006년"
    regulationStatus: string; // e.g. "2006년 10월 전면 유통 취소"
  };
}

export interface GlossaryItem {
  id: string;
  term: string;
  hanjaOrEnglish?: string;
  category: '기계원리' | '오락실은어' | '연출시스템' | '제도및규제';
  shortDefinition: string;
  detailedExplanation: string;
  historicalContext: string;
  relatedGames: string[];
}

export interface ArchiveTimelineEvent {
  year: string;
  period: string;
  title: string;
  headline: string;
  description: string;
  socialContext: string;
  keyArtifact: string;
  category: '황금기' | '전환기' | '폭발기' | '규제기' | '아카이브';
}

export interface LegalDocument {
  id: string;
  title: string;
  promulgationDate: string;
  authority: string;
  summary: string;
  keyArticles: {
    articleNumber: string;
    content: string;
    impact: string;
  }[];
  historicalSignificance: string;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  authorTitle: string;
  publishedDate: string;
  modifiedDate: string;
  readingTime: string;
  coverImage?: string;
  summary: string;
  directAnswer: string;
  tableOfContents: { id: string; label: string }[];
  sections: {
    id: string;
    heading: string;
    content: string[];
    pullQuote?: string;
  }[];
  sources: string[];
}
