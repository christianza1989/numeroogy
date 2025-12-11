import { Sun, Moon, Star, Heart, Flame, Zap, Crown } from "lucide-react";
import { PlanetaryPositions } from "../../types/analysis";

const planetConfig = [
  { key: 'sun', label: 'Saulė (Esmė)', icon: Sun, color: 'text-yellow-400' },
  { key: 'moon', label: 'Mėnulis (Emocijos)', icon: Moon, color: 'text-blue-300' },
  { key: 'mercury', label: 'Merkurijus (Protas)', icon: Zap, color: 'text-teal-300' },
  { key: 'venus', label: 'Venera (Meilė)', icon: Heart, color: 'text-pink-400' },
  { key: 'mars', label: 'Marsas (Veiksmas)', icon: Flame, color: 'text-red-400' },
  { key: 'jupiter', label: 'Jupiteris (Sėkmė)', icon: Crown, color: 'text-orange-300' },
];

export function PlanetaryGrid({ data }: { data: PlanetaryPositions }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
      {planetConfig.map((planet) => (
        <div key={planet.key} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3 hover:bg-white/10 transition-colors">
          <div className={`p-2 rounded-lg bg-white/5 ${planet.color}`}>
            <planet.icon size={20} />
          </div>
          <div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">{planet.label}</div>
            <div className="text-lg font-heading font-bold text-white">
              {data[planet.key as keyof PlanetaryPositions]}
            </div>
          </div>
        </div>
      ))}
      {/* Life Path Card */}
      <div className="col-span-2 md:col-span-3 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/30 rounded-xl p-4 flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/20 text-purple-300">
              <Star size={20} />
            </div>
            <div>
              <div className="text-xs text-purple-200 uppercase tracking-wider">Gyvenimo Kelias</div>
              <div className="text-sm text-slate-300">Pagrindinė jūsų misija</div>
            </div>
         </div>
         <div className="text-3xl font-heading font-bold text-white pr-4">{data.lifePath}</div>
      </div>
    </div>
  );
}
