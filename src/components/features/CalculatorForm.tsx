"use client";
import { useState, useEffect } from "react";
import { Input } from "../ui/Input";
import { motion } from "framer-motion";
import { User, Gift, Calculator, ArrowRight, Sparkles } from "lucide-react";
import { AnalysisResult } from "./AnalysisResult";
import { LoadingOverlay } from "../ui/LoadingOverlay";
import { useSearchParams } from 'next/navigation';

interface SubmittedData {
  name: string;
  surname: string;
  birthDate: string;
  gender: string;
  type: 'self' | 'gift';
  giver?: string;
  occasion?: string;
}

export function CalculatorForm() {
  const [activeTab, setActiveTab] = useState<'self' | 'gift'>('gift'); // Default: Dovana
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<SubmittedData | null>(null);
  
  const searchParams = useSearchParams();
  const isGift = activeTab === 'gift'; // Helper kintamasis

  // 1. ATNAUJINTA: Atkuriame duomenis ir TAB'ą
  useEffect(() => {
    // Patikriname ar grįžome po apmokėjimo
    const status = searchParams.get('payment_status');
    // Visada bandome užkrauti paskutinį rezultatą, jei jis yra (net jei tiesiog refreshino)
    const savedReport = localStorage.getItem('last_generated_report');
    
    if (savedReport) {
      try {
          const parsed = JSON.parse(savedReport);
          setAnalysis(parsed);
          // Atstatome formos būseną pagal išsaugotus duomenis
          if (parsed.meta?.isGift) {
            setActiveTab('gift');
          }
          // Jei yra submittedData, atstatome ir jį (svarbu PDF generavimui)
          if (parsed.userData) {
             setSubmittedData(parsed.userData);
          }
        } catch (e) {
          console.error("Klaida atkuriant duomenis", e);
        }
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setAnalysis(null);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data: SubmittedData = {
      name: formData.get('name') as string,
      surname: formData.get('surname') as string,
      birthDate: formData.get('birthDate') as string,
      gender: formData.get('gender') as string,
      type: activeTab,
      giver: formData.get('giver') as string | undefined,
      occasion: formData.get('occasion') as string | undefined,
    };

    setSubmittedData(data);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Klaida generuojant");
      
      const resultData = json.result || json;
      
      // 2. SVARBU: Pridedame userData į patį report objektą, kad viskas būtų vienoje vietoje
      const finalReport = {
        ...resultData,
        userData: data // Išsaugome, ką žmogus įvedė
      };

      setAnalysis(finalReport);
      
      // 3. IŠSAUGOME IŠKART (Backup)
      localStorage.setItem('last_generated_report', JSON.stringify(finalReport));

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Klaida generuojant");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="analize" className="w-full max-w-4xl mx-auto px-4 sm:px-6 relative z-20">
      
      {/* LOADERIS VISADA VIRŠUJE */}
      <LoadingOverlay isLoading={loading} />
      
      {/* Glass Card Container */}
      <div className="bg-dark-bg-200/60 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-6 md:p-10 shadow-2xl shadow-purple-900/20">
        
        {/* Header - Keičiasi pagal pasirinkimą */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-3">
            {isGift ? (
              <>Sukurkite <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500">Magišką Dovaną</span></>
            ) : (
              <>Atraskite Savo <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Kosminį Kodą</span></>
            )}
          </h2>
          <p className="text-sm sm:text-base text-text-medium">
            {isGift 
              ? "Suveskite gavėjo duomenis – knygą gausite PDF formatu." 
              : "Užpildykite duomenis ir gaukite asmeninę 2026 m. analizę."}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex p-1 bg-white/5 rounded-xl mb-6 sm:mb-8 w-full max-w-sm mx-auto border border-white/5">
          <button
            onClick={() => setActiveTab('self')}
            className={`flex items-center justify-center gap-2 w-1/2 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'self' ? 'bg-purple-600 text-white shadow-lg' : 'text-text-medium hover:text-white hover:bg-white/5'
            }`}
          >
            <User size={16} />
            <span>Analizė Sau</span>
          </button>
          <button
            onClick={() => setActiveTab('gift')}
            className={`flex items-center justify-center gap-2 w-1/2 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'gift' ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg' : 'text-text-medium hover:text-white hover:bg-white/5'
            }`}
          >
            <Gift size={16} />
            <span>Dovana</span>
          </button>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <Input 
              name="name" 
              label={isGift ? "Gavėjo vardas" : "Jūsų vardas"} 
              placeholder={isGift ? "Pvz: Emilija" : "Jūsų vardas"} 
              required 
            />
            <Input 
              name="surname" 
              label={isGift ? "Gavėjo pavardė" : "Jūsų pavardė"} 
              placeholder={isGift ? "Pvz: Pavardenė" : "Jūsų pavardė"} 
              required 
            />
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <Input 
                name="birthDate" 
                type="date" 
                label={isGift ? "Gavėjo gimimo data" : "Gimimo data"} 
                required 
                className="text-white/90" 
              />
              <div className="w-full">
                 <label className="block text-sm font-medium text-purple-200 mb-1.5 ml-1">
                   {isGift ? "Gavėjo lytis" : "Lytis"}
                 </label>
                 <select name="gender" className="flex h-12 w-full appearance-none rounded-xl border border-white/10 bg-[#1a1a2e] px-4 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/50 hover:bg-[#232342] transition-colors cursor-pointer">
                   <option value="male" className="bg-[#0f0f23] text-white">Vyras</option>
                   <option value="female" className="bg-[#0f0f23] text-white">Moteris</option>
                 </select>
              </div>
            </div>
          </div>

          {/* Dovanos papildomi laukai su animacija */}
          {isGift && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }} 
              className="space-y-4 sm:space-y-6 pt-6 mt-2 border-t border-dashed border-white/10"
            >
               {/* PAKEITIMAS: Paliekame tik "Nuo ko", panaikiname "Proga" */}
               <div className="w-full">
                 <Input 
                   name="giver" 
                   label="Nuo ko dovana?" 
                   placeholder="Įrašykite savo vardą (pvz: Elanos)" 
                   required // Padarome privalomu, jei tai dovana
                 />
               </div>
            </motion.div>
          )}

          <div className="pt-4 sm:pt-6">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 ${
                isGift 
                  ? "bg-gradient-to-r from-amber-500 to-orange-600 shadow-[0_0_30px_rgba(245,158,11,0.4)]" 
                  : "bg-gradient-to-r from-purple-600 to-pink-600 shadow-purple-500/20"
              }`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 animate-spin rounded-full border-2 border-white/50 border-t-transparent border-r-transparent" />
                  <span className="text-sm sm:text-base">
                    {isGift ? "Pakuojama dovana..." : "Skaičiuojama..."}
                  </span>
                </>
              ) : (
                <>
                  {isGift ? <Gift size={20} /> : <Calculator size={20} />}
                  <span>{isGift ? "Paruošti Dovaną (PDF)" : "Generuoti Analizę"}</span> 
                  <ArrowRight size={20} />
                </>
              )}
            </button>
            <p className="text-center text-xs text-white/40 mt-3 sm:mt-4">
              * Duomenys naudojami tik skaičiavimams ir nėra kaupiami.
            </p>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mt-4 sm:mt-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-center text-sm">
            {error}
          </div>
        )}

      </div>

      {/* Result Display */}
      {analysis && <AnalysisResult content={analysis} userData={submittedData || undefined} />}
    </div>
  );
}
