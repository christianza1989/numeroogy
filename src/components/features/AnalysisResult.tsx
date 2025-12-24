"use client";
import ReactMarkdown from 'react-markdown';
import { Sparkles, Download, Loader2, Lock, RotateCcw } from 'lucide-react'; // --- NAUJA: Pridėta RotateCcw
import { PDFDownloadLink } from "@react-pdf/renderer";
import { NumerologyReportPdf } from "../pdf/NumerologyReportPdf";
import { useEffect, useState } from 'react';
import { FullReport, AnalysisSection } from '../../types/analysis';
import { PlanetaryGrid } from './PlanetaryGrid';
import { useSearchParams, useRouter } from 'next/navigation';
import { toNaudininkas } from '../../lib/utils';
import { SuccessCelebration } from '../ui/SuccessCelebration';

interface AnalysisResultProps {
  content: string | FullReport;
  userData?: {
    name: string;
    surname: string;
    birthDate: string;
    type?: 'self' | 'gift';
    occasion?: string;
    gender?: string;
  }
}

export function AnalysisResult({ content, userData }: AnalysisResultProps) {
  const [isClient, setIsClient] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLoadingPayment, setIsLoadingPayment] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  
  const searchParams = useSearchParams();
  const router = useRouter();

  // 1. PASIIMAME KAINĄ IŠ .ENV
  const PRICE = process.env.NEXT_PUBLIC_STRIPE_PRICE_EUR || "9.99";

  const safeUserData = userData || (content as FullReport).userData || {
    name: '',
    surname: '',
    birthDate: '',
    type: 'self' as const,
    occasion: '',
    gender: 'female'
  };
  
  const isGift = safeUserData?.type === 'gift';
  const gender = safeUserData?.gender || 'female';
  
  const recipientName = isGift && safeUserData?.name 
    ? toNaudininkas(safeUserData.name, gender) 
    : (safeUserData?.name || '');

  useEffect(() => {
    setIsClient(true);
    
    const paymentStatus = searchParams.get('payment_status');
    
    if (paymentStatus === 'success') {
      setIsUnlocked(true);
      router.replace('/', { scroll: false });
      
      setTimeout(() => {
        setShowSuccessPopup(true);
      }, 500);
    }
  }, [searchParams, router]);

  useEffect(() => {
    if (content && typeof content === 'object') {
      localStorage.setItem('last_generated_report', JSON.stringify(content));
    }
  }, [content]);

  // --- NAUJA: Funkcija išvalyti duomenis ir pradėti iš naujo ---
  const handleReset = () => {
    // 1. Išvalome išsaugotą ataskaitą
    localStorage.removeItem('last_generated_report');
    
    // 2. Perkrauname puslapį, kad "CalculatorForm" užsikrautų tuščia
    window.location.reload();
  };
  // -------------------------------------------------------------

  const handlePayment = async () => {
    setIsLoadingPayment(true);
    try {
      localStorage.setItem('last_generated_report', JSON.stringify(content));

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportId: (content as FullReport).meta?.generatedAt }),
      });

      const data = await res.json();
      
      if (data.url) {
        window.location.href = data.url; 
      } else {
        alert("Įvyko klaida ruošiant apmokėjimą.");
      }
    } catch (error) {
      console.error(error);
      alert("Nepavyko susisiekti su mokėjimo sistema.");
    } finally {
      setIsLoadingPayment(false);
    }
  };

  const isFullReport = (c: string | FullReport): c is FullReport => Boolean(c && typeof c === 'object' && 'sections' in c);
  if (!isFullReport(content)) return null; 

  const report = content as FullReport;
  
  const freeSections = report.sections?.slice(0, 2) || []; 
  const lockedSections = report.sections?.slice(2) || []; 

  const renderSection = (section: AnalysisSection) => {
    if (!section) return null;
    
    return (
      <div key={section.id} className="mb-12 last:mb-0">
        <h3 className="text-2xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-white mb-6 border-b border-white/10 pb-2">
          {section.title}
        </h3>
        <div className="space-y-8">
          {section.blocks.map((block, idx) => (
            <div key={idx} className="bg-white/5 rounded-2xl p-6 border border-white/5 hover:border-purple-500/30 transition-colors">
              <h4 className="text-lg font-bold text-purple-200 mb-3 flex items-center gap-2">
                <span className="text-xl">{block.icon === 'sun' ? '☀️' : block.icon === 'moon' ? '🌙' : block.icon === 'star' ? '⭐' : block.icon === 'heart' ? '❤️' : block.icon === 'fire' ? '🔥' : block.icon === 'zap' ? '⚡' : block.icon === 'feather' ? '🪶' : block.icon === 'gift' ? '🎁' : '✨'}</span>
                {block.title}
              </h4>
              <div className="prose prose-invert prose-p:text-slate-300 max-w-none text-sm leading-relaxed">
                <ReactMarkdown>{block.content}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 sm:mt-10 animate-fade-in-up pb-20">
      <div className="bg-dark-bg-200/80 backdrop-blur-md border border-purple-500/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-[0_0_50px_rgba(139,92,246,0.15)] relative">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-white/10">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
            <span className="text-xl sm:text-3xl">🌌</span>
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-white">Jūsų Kosminė Analizė</h2>
            <p className="text-purple-300 text-sm sm:text-base">{report.meta.user}</p>
          </div>
        </div>

        {/* PLANETARY GRID */}
        {report.planetaryData && <PlanetaryGrid data={report.planetaryData} />}

        {/* NEMOKAMAS TURINYS */}
        <div className="space-y-12">
          {freeSections.map(sec => renderSection(sec))}
        </div>

        {/* MOKAMAS TURINYS */}
        {!isUnlocked ? (
          <div className="mt-8 relative">
             <div className="opacity-30 filter blur-md select-none h-64 overflow-hidden pointer-events-none">
                {lockedSections[0] && renderSection(lockedSections[0])}
             </div>

             <div className="absolute inset-0 z-10 flex flex-col items-center justify-center -mt-20">
                <div className="bg-[#0f0f23] border border-amber-500/30 p-8 rounded-3xl shadow-2xl text-center max-w-md mx-4 w-full">
                   <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce">
                      <Lock className="text-white w-8 h-8" />
                   </div>
                   <h3 className="text-2xl font-heading font-bold text-white mb-2">
                     {isGift ? "Atrakinti Pilną Dovaną" : "Atrakinti 2026 Prognozę"}
                   </h3>
                   <p className="text-slate-400 mb-6">
                     Norėdami matyti ateities prognozes, karmos pamokas ir gauti PDF knygą, atrakinkite pilną ataskaitą.
                   </p>
                   
                   <button 
                      onClick={handlePayment}
                      disabled={isLoadingPayment}
                      className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
                   >
                      {/* 2. NAUDOJAME KAINOS KINTAMĄJĲ */}
                      {isLoadingPayment ? <Loader2 className="animate-spin"/> : `Atrakinti – ${PRICE}€`}
                   </button>

                   {/* --- NAUJA: PRADĖTI IŠ NAUJO MYGTUKAS PAYWALL SEKCIJOJE --- */}
                   <button 
                      onClick={handleReset}
                      className="mt-4 text-sm text-slate-500 hover:text-white transition-colors flex items-center justify-center gap-2"
                   >
                      <RotateCcw size={14} />
                      <span>Ne tas žmogus? Pradėti iš naujo</span>
                   </button>
                   {/* --------------------------------------------------------- */}
                </div>
             </div>
          </div>
        ) : (
          /* ATRAKINTA */
          <div className="mt-12 pt-12 border-t border-dashed border-purple-500/30 animate-fade-in-up">
             <div className="mb-10 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-200 text-center flex items-center justify-center gap-2">
               <Sparkles className="w-5 h-5" />
               <span>
                 {isGift 
                   ? "Dovana sėkmingai paruošta! Galite ją atsisiųsti." 
                   : "Apmokėjimas sėkmingas! Visas turinys atrakintas."}
               </span>
             </div>
             
             {lockedSections.map(sec => renderSection(sec))}

             {/* PDF DOWNLOAD SEKCIJA */}
             <div className="mt-16 pt-12 border-t border-white/10 flex flex-col items-center text-center">
                <h3 className="text-2xl font-heading font-bold text-white mb-4">
                  {isGift 
                    ? `Knyga skirta ${recipientName} – Paruošta` 
                    : "Jūsų Asmeninė Knyga Paruošta"}
                </h3>
                <p className="text-slate-400 mb-8 max-w-md">
                  {isGift 
                    ? "Atsisiųskite PDF failą, atsispausdinkite arba nusiųskite jį tiesiogiai kaip dovaną." 
                    : "Tai jūsų unikalus dokumentas. Išsisaugokite jį, nes duomenys naršyklėje saugomi laikinai."}
                </p>
                
                {isClient ? (
                  <div className="flex flex-col items-center gap-4 w-full">
                    {/* DOWNLOAD MYGTUKAS */}
                    <PDFDownloadLink
                      document={<NumerologyReportPdf data={report} />}
                      fileName={`LikimoKnyga_${report.meta.user.replace(/ /g, '_')}.pdf`}
                      className="group flex items-center justify-center gap-3 px-8 py-4 bg-white/10 border border-white/20 text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all w-full sm:w-auto"
                    >
                      {({ loading }) => loading ? (
                          <><Loader2 className="animate-spin" /> Generuojama PDF...</>
                        ) : (
                          <><Download /> Atsisiųsti PDF Knygą</>
                        )
                      }
                    </PDFDownloadLink>

                    {/* --- NAUJA: PRADĖTI IŠ NAUJO MYGTUKAS --- */}
                    <button 
                      onClick={handleReset}
                      className="flex items-center justify-center gap-2 px-6 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all text-sm w-full sm:w-auto mt-2"
                    >
                      <RotateCcw size={16} />
                      <span>Kurti Naują Analizę</span>
                    </button>
                  </div>
                ) : (
                  <button disabled className="px-8 py-4 bg-white/5 rounded-xl text-white">Kraunama...</button>
                )}
             </div>
          </div>
        )}

      </div>
      
      <SuccessCelebration
        isVisible={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
        isGift={isGift}
        recipientName={recipientName}
      />
    </div>
  );
}
