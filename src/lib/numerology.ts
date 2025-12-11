// Numerology Logic - Pythagorean System + Scientific Astrology

import { Body, Observer, GeoVector, Equator, Ecliptic } from 'astronomy-engine';

// Mapping Lithuanian letters to numbers
const letterMap: Record<string, number> = {
  a: 1, ą: 1, j: 1, s: 1, š: 1, b: 2, k: 2, t: 2, c: 3, č: 3, l: 3, u: 3, ų: 3, ū: 3,
  d: 4, m: 4, v: 4, e: 5, ę: 5, ė: 5, n: 5, w: 5, f: 6, o: 6, x: 6, g: 7, p: 7, y: 7,
  h: 8, q: 8, z: 8, ž: 8, i: 9, r: 9
};
const vowels = ['a', 'ą', 'e', 'ę', 'ė', 'i', 'į', 'y', 'o', 'u', 'ų', 'ū'];

export function reduceNumber(num: number): number {
  if (num <= 9 || num === 11 || num === 22 || num === 33) return num;
  const sum = num.toString().split('').reduce((acc, d) => acc + parseInt(d), 0);
  return reduceNumber(sum);
}

export function calculateLifePath(dateStr: string): number {
  if (!dateStr) return 0;
  const [year, month, day] = dateStr.split('-').map(Number);
  return reduceNumber(reduceNumber(year) + reduceNumber(month) + reduceNumber(day));
}

export function calculateNameNumbers(fullName: string) {
  const cleanName = fullName.toLowerCase().replace(/[^a-ąž]/g, '');
  let expressionSum = 0, soulSum = 0, personalitySum = 0;
  for (const char of cleanName) {
    const val = letterMap[char] || 0;
    expressionSum += val;
    if (vowels.includes(char)) soulSum += val;
    else personalitySum += val;
  }
  return {
    expression: reduceNumber(expressionSum),
    soulUrge: reduceNumber(soulSum),
    personality: reduceNumber(personalitySum)
  };
}

// --- ASTROLOGY SECTION (FIXED) ---

function getZodiacFromLongitude(lon: number) {
  const signs = ["Avinas", "Jautis", "Dvyniai", "Vėžys", "Liūtas", "Mergelė", "Svarstyklės", "Skorpionas", "Šaulys", "Ožiaragis", "Vandenis", "Žuvys"];
  // Normalize longitude to 0-360
  const normalizedLon = ((lon % 360) + 360) % 360;
  const index = Math.floor(normalizedLon / 30);
  return signs[index];
}

export function getZodiacSign(dateStr: string): { name: string; symbol: string } {
  const positions = calculatePlanetaryPositions(new Date(dateStr));
  return { name: positions.sun, symbol: "☀" };
}

export function calculatePlanetaryPositions(date: Date) {
  // Default Observer (Vilnius)
  const observer = new Observer(54.68, 25.27, 0); 
  
  const getSign = (body: Body) => {
    // Use simpler approach with direct ecliptic longitude calculation
    const vector = GeoVector(body, date, true);
    const lon = Math.atan2(vector.y, vector.x) * 180 / Math.PI;
    return getZodiacFromLongitude(lon);
  };

  return {
    sun: getSign(Body.Sun),
    moon: getSign(Body.Moon),
    mercury: getSign(Body.Mercury),
    venus: getSign(Body.Venus),
    mars: getSign(Body.Mars),
    jupiter: getSign(Body.Jupiter),
    saturn: getSign(Body.Saturn)
  };
}
