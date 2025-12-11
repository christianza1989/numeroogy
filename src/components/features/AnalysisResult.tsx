"use client";
import ReactMarkdown from 'react-markdown';
import { Sparkles, Download, Loader2 } from 'lucide-react';
import { PDFDownloadLink } from "@react-pdf/renderer";
import { NumerologyReportPdf } from "../pdf/NumerologyReportPdf";
import { useEffect, useState } from 'react';
import { FullReport, AnalysisSection } from '../../types/analysis';
// import { LockedSection } from '../ui/LockedSection'; // No longer needed
import { PlanetaryGrid } from './PlanetaryGrid';

interface AnalysisResultProps {
  content: string | FullReport;
  userData?: {
    name: string;
    surname: string;
    birthDate: string;
  }
}

export function AnalysisResult({ content, userData }: AnalysisResultProps) {
  const [isClient, setIsClient] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false); // New State

  useEffect(() => {
    const timeoutId = setTimeout(() => setIsClient(true), 0);
    return () => clearTimeout(timeoutId);
  }, []);

  // Helper to simulate payment
  const handlePayment = () => {
    // In real app: Redirect to Stripe
    alert("Imituojamas apmokėjimas... Sėkmė!");
    setIsUnlocked(true);
  };

  const isFullReport = (c: string | FullReport): c is FullReport => Boolean(c && typeof c === 'object' && 'sections' in c);

  if (!isFullReport(content)) return <div>Legacy content error</div>;

  const report = content as FullReport;
  
  // Separate Free vs Paid sections
  // Assuming API returns sections in order: Identity (0), Emotional (1), Karma (2), Career (3), Future (4)
  const freeSection = report.sections[0]; 
  const emotionalSection = report.sections[1];
  // Sections to lock
  const lockedSections = report.sections.slice(2); 

  // Helper to render a section
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
                <span className="text-xl">{block.icon === 'sun' ? '☀️' : block.icon === 'moon' ? '🌙' : '✨'}</span>
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
    <div className="w-full max-w-4xl mx-auto mt-8 sm:mt-10 animate-fade-in-up">
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

        {/* FREE CONTENT */}
        <div className="space-y-12">
          {freeSection && renderSection(freeSection)}
          {emotionalSection && renderSection(emotionalSection)}
        </div>

        {/* ALL CONTENT - NO PAYWALL */}
        <div className="mt-12 pt-12 border-t border-dashed border-purple-500/30">
          <div className="mb-8 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-200 text-center text-sm">
            ✨ Visas turinys nemokamai prieinamas! Mėgaukite pilną analizę.
          </div>
          
          {/* Render All Sections */}
          {lockedSections.filter(Boolean).map(sec => renderSection(sec))}

          {/* PDF DOWNLOAD - Always Available */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col items-center text-center">
             <h3 className="text-xl font-bold text-white mb-4">Jūsų Asmeninė Knyga Paruošta</h3>
             <p className="text-slate-400 mb-6 max-w-md">
               Atsisiųskite pilną, profesionaliai sumaketuotą PDF versiją spausdinimui.
             </p>
             {isClient ? (
               <PDFDownloadLink
                 document={<NumerologyReportPdf data={report} />}
                 fileName={`Analize_${report.meta.user.replace(/ /g, '_')}.pdf`}
                 className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg shadow-xl shadow-purple-500/40 hover:scale-105 transition-all"
               >
                 {({ loading }) => loading ? (
                     <><Loader2 className="animate-spin" /> Generuojama...</>
                   ) : (
                     <><Download /> Atsisiųsti PDF Knygą</>
                   )
                 }
               </PDFDownloadLink>
             ) : (
               <button disabled className="px-8 py-4 bg-white/5 rounded-xl text-white">Kraunama...</button>
             )}
          </div>
        </div>

      </div>
    </div>
  );
}
