import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toNaudininkas(name: string, gender: string): string {
  if (!name) return "";
  
  const n = name.trim();
  const lower = n.toLowerCase();

  // Pagalbinė funkcija pakeisti galūnę
  // Pvz: replaceEnd('as', 'ui') pavers 'Jonas' į 'Jonui'
  const replaceEnd = (suffix: string, replacement: string) => 
    n.substring(0, n.length - suffix.length) + replacement;

  // --- VYRAI ---
  if (gender === 'male') {
    // Standartinės lietuviškos galūnės
    if (lower.endsWith('as')) return replaceEnd('as', 'ui');  // Jonas -> Jonui
    if (lower.endsWith('is')) return replaceEnd('is', 'iui'); // Rytis -> Rytiui (supaprastinta)
    if (lower.endsWith('ys')) return replaceEnd('ys', 'iui'); // Kazys -> Kaziui
    if (lower.endsWith('us')) return replaceEnd('us', 'iui'); // Paulius -> Pauliui
    
    // Nestandartinės/Užsienietiškos (Kristin, Tom) -> Pridedame UI
    return n + 'ui'; // Kristin -> Kristinui, Tom -> Tomui
  }

  // --- MOTERYS ---
  if (gender === 'female') {
    // Standartinės lietuviškos galūnės
    if (lower.endsWith('a')) return replaceEnd('a', 'ai');    // Ona -> Onai
    if (lower.endsWith('ė')) return replaceEnd('ė', 'ei');    // Eglė -> Eglei
    
    // Nestandartinės/Užsienietiškos (Kristin, Ines) -> Pridedame AI
    return n + 'ai'; // Kristin -> Kristinai, Ines -> Inesai
  }

  // Jei lytis nenustatyta (fallback)
  return n; 
}

export function capitalizeName(name: string): string {
  if (!name) return "";
  return name
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
