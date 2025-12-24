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
  // NAUJI LAUKAI:
  expression: number;
  personality: number;
  personalYear: number; // Svarbu prognozei
  elements?: { fire: number; earth: number; air: number; water: number };
  aspects?: Array<{ p1: string; p2: string; type: string; color: string }>;
}

// NAUJA: Struktūrizuoti duomenys Tapatybės sekcijai
export interface IdentityStructuredData {
  archetype: string; // Pvz: "Drąsusis Pionierius"
  keywords: string[]; // Pvz: ["Lyderystė", "Inovacijos", "Drąsa"]
  strengths: Array<{ title: string; desc: string }>; // Sąrašas su trumpais aprašymais
  challenges: Array<{ title: string; desc: string }>; // Sąrašas su trumpais aprašymais
  coreDescription: string; // Viena ilgesnė apibendrinanti pastraipa
}

// NAUJA: Struktūrizuoti duomenys Emocijoms
export interface EmotionalStructuredData {
  loveStyle: string; // Pastraipa apie meilės stilių
  idealPartnerIds: string[]; // 3-4 trumpi punktai (idėjos partneriui)
  emotionalNeeds: string; // Pastraipa apie emocinius poreikius
}

// NAUJA: Struktūrizuoti duomenys Karma/Karjera
export interface KarmaCareerStructuredData {
  saturnLesson: { title: string; desc: string }; // Karmos pamoka
  careerPath: {
    title: string; // Karjeros archetipas
    strengths: string[]; // 3 punktai
    description: string;
  };
}

// NAUJA: Sielos ir Šešėlių duomenys (Gylio suteikimui)
export interface SoulShadowStructuredData {
  lilith: {
    title: string; // Pvz: "Laukinė Moteris"
    sign: string; // Pvz: "Skorpionas"
    description: string; // Ilgas aprašymas
  };
  chiron: {
    title: string; // Pvz: "Gydytojas"
    sign: string;
    description: string;
  };
}

// ATNAUJINTA: Ateitis su 4 sezonais (daugiau turinio)
export interface FutureStructuredData {
  personalYearTitle: string;
  forecast: string;
  // Pakeičiame į 4 sezonus vietoje 2 periodų
  seasons: Array<{ title: string; content: string }>; 
  yearConclusion: string; // <--- NAUJAS LAUKAS
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
    isGift?: boolean; // Naujas
    giver?: string;   // Naujas
    occasion?: string; // Naujas
    zodiacSignEng: string; // NAUJA: reikės failų pavadinimams (pvz., 'aries')
  };
  planetaryData: PlanetaryPositions; // NEW FIELD
  // NAUJA: Vietoj 'sections' masyvo, naudojame konkrečius objektus
  structuredData: {
    identity: IdentityStructuredData;
    emotions: EmotionalStructuredData;
    // NAUJA: Pridedame šiuos
    karmaCareer?: KarmaCareerStructuredData;
    future?: FutureStructuredData;
    soulShadow?: SoulShadowStructuredData; // NAUJA SEKCIJA
  };
  sections?: AnalysisSection[]; // Paliekame saugumui backward compatibility
  userData?: { // Added for data safety
    name: string;
    surname: string;
    birthDate: string;
    type?: 'self' | 'gift';
    occasion?: string;
    gender?: string;
  };
}
