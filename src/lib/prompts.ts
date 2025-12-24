interface PromptData {
  name: string;
  lifePath: number;
  expression: number;
  personality: number;
  zodiac: string;
  moonSign?: string;
  venusSign?: string;
  marsSign?: string;
  jupiterSign?: string;
  saturnSign?: string;
  giver?: string;
  occasion?: string;
  isGift?: boolean;
  personalYear?: number;
  gender: string; // <--- SVARBU: Pridėtas lyties laukas
}

// Pagalbinė funkcija Zodiako vertimui į EN (failų pavadinimams)
export const getZodiacEng = (ltName: string): string => {
  const map: Record<string, string> = {
    "Avinas": "aries", "Jautis": "taurus", "Dvyniai": "gemini", "Vėžys": "cancer",
    "Liūtas": "leo", "Mergelė": "virgo", "Svarstyklės": "libra", "Skorpionas": "scorpio",
    "Šaulys": "sagittarius", "Ožiaragis": "capricorn", "Vandenis": "aquarius", "Žuvys": "pisces"
  };
  return map[ltName] || "aries";
};

const COMMON_INSTRUCTION = `
  RESPONSE FORMAT: Valid JSON ONLY. No Markdown blocks.
  Language: Lithuanian.
  Tone: Professional, deep, psychological, spiritual, empathetic and inspiring.
  IMPORTANT: Write extensive, detailed paragraphs. Avoid short sentences. Go deep into analysis.
`;

// Helperis suformuoti lyties instrukciją
const getGenderInstruction = (gender: string) => {
  const isMale = gender === 'male';
  return `Target Audience Gender: ${isMale ? 'MALE (VYRAS)' : 'FEMALE (MOTERIS)'}. 
  CRITICAL GRAMMAR RULE: You MUST use ${isMale ? 'MASCULINE (vyrišką)' : 'FEMININE (moterišką)'} grammatical gender for all adjectives, verbs and nouns referring to the user. 
  (Example for male: "Tu esi stiprus", NOT "Tu esi stipri").`;
};

// 1. TAPATYBĖ
export const GET_STRUCTURED_IDENTITY_PROMPT = (data: PromptData) => `
  Analyze core identity: Life Path ${data.lifePath} + Sun in ${data.zodiac}.
  Name: ${data.name}.
  ${getGenderInstruction(data.gender)}

  Return a strict JSON object:
  {
    "archetype": "A powerful 2-4 word title (e.g., 'Drąsusis Vizionierius')",
    "keywords": ["Keyword1", "Keyword2", "Keyword3"],
    "strengths": [
      { "title": "Strength 1", "desc": "A detailed explanation (approx 40-50 words) of this strength and how it manifests in daily life." },
      { "title": "Strength 2", "desc": "A detailed explanation (approx 40-50 words) of this strength." },
      { "title": "Strength 3", "desc": "A detailed explanation (approx 40-50 words) of this strength." }
    ],
    "challenges": [
      { "title": "Challenge 1", "desc": "A detailed explanation (approx 40-50 words) of this challenge/shadow side." },
      { "title": "Challenge 2", "desc": "A detailed explanation (approx 40-50 words) of this challenge." }
    ],
    "coreDescription": "A very comprehensive, deep psychological profile (approx 150-200 words) synthesizing how Life Path driver interacts with Zodiac energy. Discuss inner motivations, aura, and impact on others."
  }
  ${COMMON_INSTRUCTION}
`;

// 2. EMOCIJOS
export const GET_STRUCTURED_EMOTIONS_PROMPT = (data: PromptData) => `
  Analyze emotional profile: Moon in ${data.moonSign} + Venus in ${data.venusSign}.
  Name: ${data.name}.
  ${getGenderInstruction(data.gender)}

  Return a strict JSON object:
  {
    "loveStyle": "A detailed analysis (approx 120-150 words) of how they express affection, what they value in love, and their romantic style based on Venus.",
    "emotionalNeeds": "A deep analysis (approx 120-150 words) of their subconscious needs, what makes them feel safe, and how they process feelings based on Moon.",
    "idealPartnerIds": [
       "Trait 1 - Detailed sentence about specific quality.",
       "Trait 2 - Detailed sentence about specific quality.",
       "Trait 3 - Detailed sentence about specific quality.",
       "Trait 4 - Detailed sentence about specific quality."
    ]
  }
  ${COMMON_INSTRUCTION}
`;

// 3. KARMA
export const GET_STRUCTURED_KARMA_PROMPT = (data: PromptData) => `
  Analyze Karma (Saturn in ${data.saturnSign}) and Career (Mars in ${data.marsSign}, Jupiter in ${data.jupiterSign}).
  Name: ${data.name}.
  ${getGenderInstruction(data.gender)}

  Return a strict JSON object:
  {
    "saturnLesson": {
      "title": "A philosophical title for karmic lesson",
      "desc": "A comprehensive explanation (approx 120 words) of restriction, fear, or lesson Saturn brings and specific path to mastery."
    },
    "careerPath": {
      "title": "Professional Archetype Title",
      "strengths": ["Detailed career strength 1", "Detailed career strength 2", "Detailed career strength 3"],
      "description": "A detailed guide (approx 120 words) to their ideal professional environment, leadership style, and path to success."
    }
  }
  ${COMMON_INSTRUCTION}
`;

// 4. SIELOS ŠEŠĖLIAI
export const GET_STRUCTURED_SOUL_PROMPT = (data: PromptData) => `
  Analyze "Shadow Self" (Lilith) and "Wounded Healer" (Chiron). Use ${data.zodiac} as proxy if specific positions unknown, but interpret as points.
  Name: ${data.name}.
  ${getGenderInstruction(data.gender)}

  Return a strict JSON object:
  {
    "lilith": {
      "sign": "${data.zodiac}", 
      "title": "Mystical Title for Lilith",
      "description": "An intense, deep paragraph (approx 100-130 words) about hidden desires, raw power, and rebellious side that needs to be integrated."
    },
    "chiron": {
      "sign": "${data.zodiac}",
      "title": "Title for Chiron",
      "description": "A touching, deep paragraph (approx 100-130 words) about deepest emotional wound and unique healing gift they offer to world."
    }
  }
  ${COMMON_INSTRUCTION}
`;

// 5. ATEITIS + IŠVADA
export const GET_STRUCTURED_FUTURE_PROMPT = (data: PromptData) => `
  Analyze Personal Year ${data.personalYear} for 2026.
  Name: ${data.name}.
  ${getGenderInstruction(data.gender)}

  Return a strict JSON object:
  {
    "personalYearTitle": "Inspiring Title for 2026",
    "forecast": "A comprehensive annual forecast (approx 150 words) describing main themes, energy, and opportunities of year.",
    "seasons": [
       { "title": "Žiema (Sausis-Kovas)", "content": "Detailed forecast (approx 60 words) for this period. Specific advice and themes." },
       { "title": "Pavasaris (Balandis-Birželis)", "content": "Detailed forecast (approx 60 words) for this period. Specific advice and themes." },
       { "title": "Vasara (Liepa-Rugsėjis)", "content": "Detailed forecast (approx 60 words) for this period. Specific advice and themes." },
       { "title": "Ruduo (Spalis-Gruodis)", "content": "Detailed forecast (approx 60 words) for this period. Specific advice and themes." }
    ],
    "yearConclusion": "A powerful, spiritual, and motivating closing statement (approx 150 words). Summarize their journey, offer final wisdom, and give a blessing for path ahead."
  }
  ${COMMON_INSTRUCTION}
`;
