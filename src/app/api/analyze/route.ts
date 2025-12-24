import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { calculateLifePath, calculatePlanetaryPositions, calculateNameNumbers, calculatePersonalYear, calculateElementsBalance, calculateAspects } from "../../../lib/numerology";
import { 
  GET_STRUCTURED_IDENTITY_PROMPT, 
  GET_STRUCTURED_EMOTIONS_PROMPT,
  GET_STRUCTURED_KARMA_PROMPT,
  GET_STRUCTURED_FUTURE_PROMPT, // Atnaujintas
  GET_STRUCTURED_SOUL_PROMPT, // NAUJAS
  getZodiacEng 
} from "../../../lib/prompts";
import { FullReport } from "../../../types/analysis";

const parseAIResponse = (text: string) => {
  try {
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanText);
  } catch (e) {
    console.error("JSON Parse Error:", e);
    return null;
  }
};

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "No API Key" }, { status: 500 });
  
  const genAI = new GoogleGenerativeAI(apiKey);
  const modelName = process.env.GEMINI_MODEL || "gemini-flash-latest";
  
  const body = await req.json();
  const { name, surname, birthDate, type, giver, occasion, gender } = body;

  // 1. Skaičiavimai
  const lifePath = calculateLifePath(birthDate);
  const fullName = `${name} ${surname}`;
  const numbers = calculateNameNumbers(fullName);
  const planets = calculatePlanetaryPositions(new Date(birthDate));

  const currentYear = new Date().getFullYear(); 
  const targetYear = currentYear + 1; 
  const personalYear = calculatePersonalYear(birthDate, targetYear);
  
  const elements = calculateElementsBalance(planets);
  const aspects = calculateAspects(planets);

  const promptData = {
    name, 
    lifePath,
    expression: numbers.expression,
    personality: numbers.personality,
    zodiac: planets.sun, 
    moonSign: planets.moon, 
    venusSign: planets.venus,
    marsSign: planets.mars,
    jupiterSign: planets.jupiter,
    saturnSign: planets.saturn,
    giver, occasion, isGift: type === 'gift', personalYear,
    gender: gender || 'female' // Fallback jei kažkas netyčia nenurodytų
  };

  try {
    const model = genAI.getGenerativeModel({ 
      model: modelName, 
      generationConfig: { responseMimeType: "application/json" } 
    });

    // 2. AI Generavimas
    console.log("Pradedamas AI generavimas...");
    // Kviečiame 5 promptus
    const [identityResult, emotionsResult, karmaResult, futureResult, soulResult] = await Promise.all([
      model.generateContent(GET_STRUCTURED_IDENTITY_PROMPT(promptData)),
      model.generateContent(GET_STRUCTURED_EMOTIONS_PROMPT(promptData)),
      model.generateContent(GET_STRUCTURED_KARMA_PROMPT(promptData)),
      model.generateContent(GET_STRUCTURED_FUTURE_PROMPT(promptData)),
      model.generateContent(GET_STRUCTURED_SOUL_PROMPT(promptData)), // NAUJAS
    ]);

    const identityData = parseAIResponse(identityResult.response.text());
    const emotionsData = parseAIResponse(emotionsResult.response.text());
    const karmaData = parseAIResponse(karmaResult.response.text());
    const futureData = parseAIResponse(futureResult.response.text());
    const soulData = parseAIResponse(soulResult.response.text()); // NAUJAS

    if (!identityData || !emotionsData || !karmaData || !futureData || !soulData) {
        throw new Error("AI nepavyko sugeneruoti visų struktūrizuotų duomenų");
    }

    // 3. SUKURIAME "SECTIONS" WEB PERŽIŪRAI (SVARBU!)
    // Tai leidžia AnalysisResult.tsx rodyti informaciją ekrane
    const legacySections = [
      {
        id: "identity",
        type: "text_chapter" as const,
        title: "Tavo Kosminė Tapatybė",
        blocks: [
          { 
            title: `Archetipas: ${identityData.archetype}`, 
            content: `**Raktažodžiai:** ${identityData.keywords.join(', ')}\n\n${identityData.coreDescription}`, 
            icon: "star" 
          },
          { 
            title: "Tavo Stiprybės", 
            content: identityData.strengths.map((s: { title: string; desc: string }) => `**${s.title}**: ${s.desc}`).join('\n\n'), 
            icon: "sun" 
          }
        ]
      },
      {
        id: "emotions",
        type: "text_chapter" as const,
        title: "Emocinis Pasaulis",
        blocks: [
          { title: "Meilės Kalba", content: emotionsData.loveStyle, icon: "heart" },
          { title: "Emociniai Poreikiai", content: emotionsData.emotionalNeeds, icon: "moon" }
        ]
      },
      // Užrakintos sekcijos (tik placeholderiai webui, tikras turinis PDF'e)
      {
        id: "karma",
        type: "text_chapter" as const,
        title: "Karma ir Karjera",
        blocks: [{ title: "Karmos Pamokos", content: "Turinys pasiekiamas pilnoje ataskaitoje.", icon: "fire" }]
      },
      {
        id: "future",
        type: "text_chapter" as const,
        title: "Ateities Prognozė",
        blocks: [{ title: "2026 Metų Energija", content: "Turinys pasiekiamas pilnoje ataskaitoje.", icon: "star" }]
      }
    ];

    // 4. Galutinis objektas
    const report: FullReport = {
      meta: {
        user: `${name} ${surname}`,
        birthDate,
        generatedAt: new Date().toISOString(),
        isGift: type === 'gift',
        giver: giver,
        occasion: occasion,
        zodiacSignEng: getZodiacEng(planets.sun)
      },
      planetaryData: {
        sun: planets.sun,
        moon: planets.moon,
        mercury: planets.mercury,
        venus: planets.venus,
        mars: planets.mars,
        jupiter: planets.jupiter,
        saturn: planets.saturn,
        lifePath,
        soulUrge: numbers.soulUrge,
        expression: numbers.expression,
        personality: numbers.personality,
        personalYear,
        elements,
        aspects
      },
      structuredData: {
        identity: identityData,
        emotions: emotionsData,
        karmaCareer: karmaData,
        future: futureData,
        soulShadow: soulData, // NAUJAS
      },
      sections: legacySections // GRĄŽINAME SECTIONS!
    };

    return NextResponse.json(report);

  } catch (error) {
    console.error("Critical Error:", error);
    return NextResponse.json({ 
      error: "Generavimo klaida. Bandykite dar kartą.",
      details: error instanceof Error ? error.message : error 
    }, { status: 500 });
  }
}
