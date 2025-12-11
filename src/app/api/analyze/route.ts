import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { calculateLifePath, calculatePlanetaryPositions, calculateNameNumbers } from "../../../lib/numerology";
import { 
  GET_IDENTITY_PROMPT, 
  GET_EMOTIONAL_PROMPT, 
  GET_KARMA_PROMPT, 
  GET_CAREER_PROMPT, 
  GET_FUTURE_PROMPT 
} from "../../../lib/prompts";
import { FullReport } from "../../../types/analysis";

// Helper to parse AI JSON response safely
const parseAIResponse = (text: string) => {
  try {
    // Remove markdown code blocks if AI adds them
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
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash", 
    generationConfig: { responseMimeType: "application/json" } 
  });

  const body = await req.json();
  const { name, surname, birthDate } = body;

  // 1. Calculations
  const lifePath = calculateLifePath(birthDate);
  const fullName = `${name} ${surname}`;
  const numbers = calculateNameNumbers(fullName);
  const planets = calculatePlanetaryPositions(new Date(birthDate));
  
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
    saturnSign: planets.saturn
  };

  try {
    // 2. Parallel Generation with Error Handling
    const prompts = [
      GET_IDENTITY_PROMPT(promptData),
      GET_EMOTIONAL_PROMPT(promptData),
      GET_KARMA_PROMPT(promptData),
      GET_CAREER_PROMPT(promptData),
      GET_FUTURE_PROMPT(promptData)
    ];

    const results = await Promise.allSettled(
      prompts.map(p => model.generateContent(p))
    );

    // 3. Parse Responses safely
    const sections = results
      .map((res, index) => {
        if (res.status === 'fulfilled') {
          return parseAIResponse(res.value.response.text());
        } else {
          console.error(`Prompt ${index} failed:`, res.reason);
          return null;
        }
      })
      .filter(Boolean); // Filter out failed sections

    // 4. Construct Master JSON with IDs and Types
    const report: FullReport = {
      meta: {
        user: `${name} ${surname}`,
        birthDate,
        generatedAt: new Date().toISOString()
      },
      planetaryData: { // POPULATE THIS
        sun: planets.sun,
        moon: planets.moon,
        mercury: planets.mercury,
        venus: planets.venus,
        mars: planets.mars,
        jupiter: planets.jupiter,
        saturn: planets.saturn,
        lifePath,
        soulUrge: numbers.soulUrge
      },
      sections: sections.map((sec, index) => ({
        id: `sec-${index}`,
        type: "text_chapter",
        title: sec.title,
        blocks: sec.blocks
      }))
    };

    return NextResponse.json(report);

  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
