export type AnalysisSectionType = 'cover' | 'text_chapter' | 'planetary_row' | 'numerology_grid';

export interface PlanetaryPositions {
  sun: string;
  moon: string;
  mercury: string;
  venus: string;
  mars: string;
  jupiter: string;
  saturn: string;
  lifePath: number;
  soulUrge: number;
}

export interface AnalysisBlock {
  title: string;
  content: string; // Markdown supported
  icon?: string; // 'sun', 'moon', 'heart', 'star', 'fire'
}

export interface AnalysisSection {
  id: string;
  type: AnalysisSectionType;
  title: string;
  blocks: AnalysisBlock[];
}

export interface FullReport {
  meta: {
    user: string;
    birthDate: string;
    generatedAt: string;
  };
  planetaryData: PlanetaryPositions; // NEW FIELD
  sections: AnalysisSection[];
}
