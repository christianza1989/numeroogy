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
}

// Helper to enforce JSON format
export const JSON_INSTRUCTION = `
  RESPONSE FORMAT:
  You must respond with valid JSON only. Do not wrap in markdown code blocks.
  Structure your response to match the requested schema exactly.
`;

export const GET_IDENTITY_PROMPT = (data: PromptData) => `
  Analyze the "Core Identity" for: ${data.name}, Life Path: ${data.lifePath}, Sun Sign: ${data.zodiac}.
  
  Return JSON object:
  {
    "title": "Tavo Kosminis DNR",
    "blocks": [
      { "title": "Gyvenimo Kelio Esmė", "content": "Deep paragraph about Life Path ${data.lifePath}...", "icon": "star" },
      { "title": "Saulės Energija", "content": "Deep paragraph about Sun in ${data.zodiac}...", "icon": "sun" }
    ]
  }
  ${JSON_INSTRUCTION}
`;

export const GET_EMOTIONAL_PROMPT = (data: PromptData) => `
  Analyze "Love & Emotions" for Moon in ${data.moonSign} and Venus in ${data.venusSign}.
  
  Return JSON object:
  {
    "title": "Širdies ir Jausmų Pasaulis",
    "blocks": [
      { "title": "Emocinis Saugumas (Mėnulis)", "content": "Analysis of Moon in ${data.moonSign}...", "icon": "moon" },
      { "title": "Meilės Kalba (Venera)", "content": "Analysis of Venus in ${data.venusSign}...", "icon": "heart" }
    ]
  }
  ${JSON_INSTRUCTION}
`;

export const GET_KARMA_PROMPT = (data: PromptData) => `
  Analyze "Karma, Challenges & Life Lessons".
  Saturn is in: ${data.saturnSign}.
  Personality Number: ${data.personality}.
  
  Return JSON object:
  {
    "title": "Karmos Pamokos ir Iššūkiai",
    "blocks": [
      { "title": "Saturno Mokykla", "content": "Analysis of Saturn in ${data.saturnSign} regarding discipline and karma...", "icon": "fire" },
      { "title": "Išorinis Pasaulis", "content": "Analysis of Personality number ${data.personality} - how others see you vs reality...", "icon": "star" }
    ]
  }
  ${JSON_INSTRUCTION}
`;

export const GET_CAREER_PROMPT = (data: PromptData) => `
  Analyze "Career, Ambition & Success".
  Mars is in: ${data.marsSign}.
  Jupiter is in: ${data.jupiterSign}.
  Expression Number: ${data.expression}.
  
  Return JSON object:
  {
    "title": "Karjera ir Sėkmė",
    "blocks": [
      { "title": "Veiksmo Energija (Marsas)", "content": "Analysis of Mars in ${data.marsSign} regarding work style...", "icon": "fire" },
      { "title": "Sėkmės Faktorius (Jupiteris)", "content": "Analysis of Jupiter in ${data.jupiterSign} regarding luck and expansion...", "icon": "star" },
      { "title": "Pašaukimas", "content": "Analysis of Expression number ${data.expression}...", "icon": "sun" }
    ]
  }
  ${JSON_INSTRUCTION}
`;

export const GET_FUTURE_PROMPT = (data: PromptData) => `
  Provide a "Future Outlook" for the coming year.
  Based on Life Path: ${data.lifePath}.
  
  Return JSON object:
  {
    "title": "Ateities Perspektyvos",
    "blocks": [
      { "title": "Metų Energija", "content": "Forecast based on Personal Year cycle (calculate 2025 + ${data.lifePath})...", "icon": "moon" },
      { "title": "Patarimas Ateičiai", "content": "Final spiritual advice...", "icon": "heart" }
    ]
  }
  ${JSON_INSTRUCTION}
`;
