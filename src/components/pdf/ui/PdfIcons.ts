// Pagalbinė funkcija gauti SVG kelią pagal pavadinimą
export const getIconPath = (name: string): string => {
  switch (name.toLowerCase()) {
    // --- UI ELEMENTAI ---
    case 'check': return "M20 6L9 17l-5-5"; // Varnelė
    case 'cross': return "M18 6L6 18M6 6l12 12"; // X
    case 'star': return "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z";
    case 'heart': return "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z";
    case 'zap': return "M13 2L3 14h9l-1 8 10-12h-9l1-8z"; // Žaibas
    case 'moon': return "M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"; 
    case 'sun': return "M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 17a5 5 0 100-10 5 5 0 000 10z";
    case 'fire': return "M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a5.5 5.5 0 11-11 0c0-1.68.59-3.22 1.58-4.42.5.72 1.02 1.7 1.02 2.92z";
    
    // --- PLANETOS (Supaprastinti simboliai) ---
    case 'mercury': return "M12 7a5 5 0 100 10 5 5 0 000-10zm0-4v4m0 10v4M8 3a4 4 0 018 0"; // Merkurijus
    case 'venus': return "M12 2a7 7 0 100 14 7 7 0 000-14zm0 14v6m-4-3h8"; // Venera
    case 'mars': return "M12 14a6 6 0 10-6-6 6 6 0 006 6zm6-10l-4 4m0-4h4v4"; // Marsas
    case 'jupiter': return "M19 8h-4c-2.21 0-4 1.79-4 4v8m0-8V4m-8 8h12"; // Jupiteris (Simbolinis)
    case 'saturn': return "M12 2a7 7 0 100 14 7 7 0 000-14zm-9 7h18"; // Saturnas (Su žiedu)
    
    // --- ZODIAKAS (Astrologiniai simboliai) ---
    case 'aries': return "M12 21a9 9 0 009-9C21 7 12 7 12 7S3 7 3 12a9 9 0 009 9z M12 7v5"; // Avinas (Ragai)
    case 'taurus': return "M12 12a5 5 0 100 10 5 5 0 000-10zm-9-5c0 4 4 5 9 5s9-1 9-5"; // Jautis
    case 'gemini': return "M6 4v16M18 4v16M4 4h16M4 20h16"; // Dvyniai (II)
    case 'cancer': return "M6 12a4 4 0 110-8 4 4 0 010 8zm12 0a4 4 0 110 8 4 4 0 010-8z"; // Vėžys (69)
    case 'leo': return "M12 4a4 4 0 100 8 4 4 0 000-8zm0 8c-3 0-5 2-5 5s2 5 5 5"; // Liūtas
    case 'virgo': return "M4 6v12m6-12v12m6-12v9a3 3 0 01-6 0"; // Mergelė
    case 'libra': return "M4 18h16M4 14h16M7 14a5 5 0 0110 0"; // Svarstyklės
    case 'scorpio': return "M4 6v12m6-12v12m6-12v12l4 2"; // Skorpionas
    case 'sagittarius': return "M4 20L20 4M20 4v8M20 4h-8M4 4l16 16"; // Šaulys (Rodyklė)
    case 'capricorn': return "M4 6l4 8 4-8 4 8"; // Ožiaragis (V)
    case 'aquarius': return "M4 10l3-3 3 3 3-3 3 3 3-3M4 16l3-3 3 3 3-3 3 3 3-3"; // Vandenis (Bangos)
    case 'pisces': return "M5 4c0 8 0 8 0 16M19 4c0 8 0 8 0 16M5 12h14"; // Žuvys )(
    
    default: return "M12 2L2 22h20L12 2z"; // Trikampis (Default)
  }
};
