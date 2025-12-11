"use client";
import { useState } from "react";
import { Input } from "../ui/Input";
import { motion } from "framer-motion";
import { User, Gift, Calculator, ArrowRight } from "lucide-react";
import { AnalysisResult } from "./AnalysisResult";

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
  const [activeTab, setActiveTab] = useState<'self' | 'gift'>('self');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<SubmittedData | null>(null);

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
      giver: formData.get('giver') as string | undefined, // Only if gift
      occasion: formData.get('occasion') as string | undefined, // Only if gift
    };

    // Save to submitted data for PDF generation
    setSubmittedData(data);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) throw new Error(json.error || "Klaida generuojant");
      
      // Handle both old format (json.result) and new FullReport format (json)
      setAnalysis(json.result || json);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Klaida generuojant");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="analize" className="w-full max-w-4xl mx-auto px-4 sm:px-6 relative z-20">
      
      {/* Glass Card Container */}
      <div className="bg-dark-bg-200/60 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-6 md:p-10 shadow-2xl shadow-purple-900/20">
        
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-3">
            Sukurkite Savo <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 bg-[length:200%_auto]">Kosminį Kodą</span>
          </h2>
          <p className="text-sm sm:text-base text-text-medium">Užpildykite duomenis ir gaukite asmeninę analizę</p>
        </div>

        {/* Tabs */}
        <div className="flex p-1 bg-white/5 rounded-xl mb-6 sm:mb-8 w-full max-w-sm mx-auto">
          <button
            onClick={() => setActiveTab('self')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'self' ? 'bg-purple-600 text-white shadow-lg' : 'text-text-medium hover:text-white'
            }`}
          >
            <User size={16} className="sm:hidden" />
            <span className="hidden sm:inline">Analizė Sau</span>
          </button>
          <button
            onClick={() => setActiveTab('gift')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'gift' ? 'bg-pink-600 text-white shadow-lg' : 'text-text-medium hover:text-white'
            }`}
          >
            <Gift size={16} className="sm:hidden" />
            <span className="hidden sm:inline">Dovana</span>
          </button>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <Input name="name" label="Vardas" placeholder="Jūsų vardas" required />
            <Input name="surname" label="Pavardė" placeholder="Jūsų pavardė" required />
          </div>

          <div className="space-y-4 sm:space-y-6">
            <Input name="birthDate" type="date" label="Gimimo data" required className="text-white/90" />
            <div className="w-full">
               <label className="block text-sm font-medium text-purple-200 mb-1.5 ml-1">Lytis</label>
               <select name="gender" className="flex h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/50 hover:bg-white/10">
                 <option value="male" className="bg-dark-bg-200">Vyras</option>
                 <option value="female" className="bg-dark-bg-200">Moteris</option>
               </select>
            </div>
          </div>

          {activeTab === 'gift' && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4 sm:space-y-6 pt-4 border-t border-white/10">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                 <Input name="giver" label="Jūsų vardas" placeholder="Jonas" />
                 <Input name="occasion" label="Proga" placeholder="Gimtadienis, Kalėdos..." />
               </div>
            </motion.div>
          )}

          <div className="pt-4 sm:pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-bold text-base sm:text-lg shadow-xl shadow-purple-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 animate-spin rounded-full border-2 border-purple-300 border-t-transparent border-r-transparent animate-spin" />
                  <span className="text-sm sm:text-base">Generuojama...</span>
                </>
              ) : (
                <>
                  <Calculator size={18} className="text-sm sm:text-base" /> 
                  <span className="text-sm sm:text-base">Generuoti Analizę</span> 
                  <ArrowRight size={18} className="text-sm sm:text-base" />
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
