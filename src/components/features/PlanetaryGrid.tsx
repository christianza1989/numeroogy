import { Sun, Moon, Star, Heart, Flame, Zap, Crown, Hexagon, Fingerprint, Calendar, Compass } from "lucide-react";
import { PlanetaryPositions } from "../../types/analysis";

// Išplėsta konfigūracija
const planetConfig = [
  { key: 'sun', label: 'Saulė', icon: Sun, color: 'text-yellow-400', sub: 'Esmė' },
  { key: 'moon', label: 'Mėnulis', icon: Moon, color: 'text-blue-300', sub: 'Emocijos' },
  { key: 'mercury', label: 'Merkurijus', icon: Zap, color: 'text-teal-300', sub: 'Protas' },
  { key: 'venus', label: 'Venera', icon: Heart, color: 'text-pink-400', sub: 'Meilė' },
  { key: 'mars', label: 'Marsas', icon: Flame, color: 'text-red-400', sub: 'Veiksmas' },
  { key: 'jupiter', label: 'Jupiteris', icon: Crown, color: 'text-orange-300', sub: 'Sėkmė' },
  { key: 'saturn', label: 'Saturnas', icon: Hexagon, color: 'text-indigo-400', sub: 'Karma' },
];

// Numerologiniai rodikliai
const numerologyConfig = [
  { key: 'lifePath', label: 'Gyvenimo Kelias', icon: Star, color: 'text-purple-300', sub: 'Misija' },
  { key: 'expression', label: 'Likimas', icon: Compass, color: 'text-emerald-300', sub: 'Talentai' },
  { key: 'soulUrge', label: 'Sielos Norai', icon: Heart, color: 'text-rose-300', sub: 'Vidinė aistra' },
  { key: 'personality', label: 'Asmenybė', icon: Fingerprint, color: 'text-cyan-300', sub: 'Socialinė kaukė' },
  { key: 'personalYear', label: 'Asmeniniai Metai', icon: Calendar, color: 'text-amber-300', sub: 'Prognozė' },
];

export function PlanetaryGrid({ data }: { data: PlanetaryPositions }) {
  return (
    <div className="space-y-6 mb-8">
      
      {/* PLANETOS */}
      <div>
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 ml-1">Planetų Įtaka</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
          {planetConfig.map((item) => (
            <div key={item.key} className="bg-white/5 border border-white/10 rounded-lg sm:rounded-xl p-2 sm:p-3 flex items-center gap-2 sm:gap-3 hover:bg-white/10 transition-colors">
              <div className={`p-1.5 sm:p-2 rounded-lg bg-white/5 ${item.color}`}>
                <item.icon size={14} className="sm:size-18" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[8px] sm:text-[10px] text-slate-400 uppercase tracking-wider leading-tight">{item.sub}</div>
                <div className="text-xs sm:text-sm font-heading font-bold text-white leading-tight truncate">
                  {data[item.key as keyof PlanetaryPositions]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NUMEROLOGIJA */}
      <div>
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 ml-1">Numerologinė Matrica</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 sm:gap-3">
          {numerologyConfig.map((item) => (
            <div key={item.key} className={`bg-white/5 border border-white/10 rounded-lg sm:rounded-xl p-2 sm:p-3 flex flex-col items-center text-center gap-1.5 sm:gap-2 hover:bg-white/10 transition-colors ${item.key === 'lifePath' ? 'border-purple-500/50 bg-purple-500/10' : ''}`}>
              <div className={`p-1.5 sm:p-2 rounded-full bg-white/5 ${item.color}`}>
                <item.icon size={14} className="sm:size-18" />
              </div>
              <div className="w-full">
                <div className="text-[8px] sm:text-[10px] text-slate-400 uppercase tracking-wider mb-0.5 leading-tight truncate">{item.label}</div>
                <div className="text-lg sm:text-xl font-heading font-bold text-white leading-tight">
                  {data[item.key as keyof PlanetaryPositions]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
