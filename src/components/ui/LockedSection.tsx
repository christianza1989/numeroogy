"use client";
import { Lock } from "lucide-react";

interface LockedSectionProps {
  title: string;
  price: string;
  onUnlock: () => void;
}

export function LockedSection({ title, price, onUnlock }: LockedSectionProps) {
  return (
    <div className="relative w-full mt-8 rounded-3xl overflow-hidden border border-white/5">
      {/* Background (Blurred Content Simulation) */}
      <div className="p-8 filter blur-sm opacity-50 select-none pointer-events-none bg-dark-bg-200/50">
        <h3 className="text-2xl font-heading font-bold text-white mb-4">{title}</h3>
        <p className="text-slate-300 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p className="text-slate-300 mb-4">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <div className="h-40 bg-white/5 rounded-xl"></div>
      </div>

      {/* Overlay (The Paywall) */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-t from-dark-bg-300 via-dark-bg-300/80 to-transparent">
        <div className="bg-dark-bg-200 border border-purple-500/30 p-8 rounded-2xl shadow-2xl text-center max-w-md mx-4 transform transition-all hover:scale-105">
          <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/40">
            <Lock className="text-white w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Atrakinti Pilną Analizę</h3>
          <p className="text-slate-400 text-sm mb-6">
            Gaukite priėjimą prie Karmos, Karjeros, Ateities prognozių ir atsisiųskite PDF knygą.
          </p>
          <div className="text-3xl font-bold text-white mb-6">
            {price} <span className="text-sm text-slate-500 font-normal">/ vienkartinis</span>
          </div>
          <button 
            onClick={onUnlock}
            className="w-full py-3 px-6 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold rounded-xl shadow-lg hover:shadow-orange-500/25 transition-all active:scale-95"
          >
            Atrakinti Dabar
          </button>
        </div>
      </div>
    </div>
  );
}
