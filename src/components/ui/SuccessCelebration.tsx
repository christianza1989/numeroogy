"use client";
import { useEffect, useState } from 'react';
import { X, Sparkles, Gift, Star } from 'lucide-react';

interface SuccessCelebrationProps {
  isVisible: boolean;
  onClose: () => void;
  isGift?: boolean;
  recipientName?: string;
}

export function SuccessCelebration({ isVisible, onClose, isGift = false, recipientName = "" }: SuccessCelebrationProps) {
  const [showConfetti, setShowConfetti] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      // Auto close after 8 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  // Reset confetti when popup visibility changes
  if (showConfetti !== isVisible) {
    setShowConfetti(isVisible);
  }

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Popup */}
      <div className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 rounded-3xl p-8 max-w-md w-full mx-auto border border-purple-500/30 shadow-[0_0_50px_rgba(139,92,246,0.3)] animate-fade-in-up">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-purple-300 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)] animate-pulse">
              {isGift ? (
                <Gift className="w-10 h-10 text-white" />
              ) : (
                <Sparkles className="w-10 h-10 text-white" />
              )}
            </div>
            
            {/* Floating Stars */}
            {showConfetti && (
              <>
                <Star className="absolute -top-2 -left-2 w-4 h-4 text-yellow-300 animate-bounce" style={{ animationDelay: '0.1s' }} />
                <Star className="absolute -top-1 -right-2 w-3 h-3 text-pink-300 animate-bounce" style={{ animationDelay: '0.3s' }} />
                <Star className="absolute -bottom-1 left-1 w-3 h-3 text-amber-300 animate-bounce" style={{ animationDelay: '0.5s' }} />
              </>
            )}
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-3">
            {isGift ? (
              <>Dovana Paruošta! 🎉</>
            ) : (
              <>Apmokėjimas Sėkmingas! ✨</>
            )}
          </h3>
          
          <p className="text-purple-200 mb-6 leading-relaxed">
            {isGift ? (
              <>
                <span className="text-amber-300 font-semibold">{recipientName}</span> jau gali atsisiųsti savo unikalią kosminę analizę.<br/>
                Tai bus tikra dovana, kuri paliks atmintyje visam gyvenimui!
              </>
            ) : (
              <>
                Jūsų pilna kosminė analizė dabar pasiekiama.<br/>
                Sužinokite savo karmos pamokas, karjeros pašaukimą ir ateities prognozę.
              </>
            )}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={onClose}
              className="w-full py-3 px-6 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold rounded-xl shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] hover:scale-105 active:scale-95 transition-all"
            >
              {isGift ? "Peržiūrėti Dovaną" : "Peržiūrėti Analizę"}
            </button>
            
            <p className="text-xs text-purple-400 text-center">
              Uždarys automatiškai po 8 sekundžių
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full rounded-3xl overflow-hidden pointer-events-none">
          <div className="absolute top-4 left-4 w-2 h-2 bg-amber-400 rounded-full opacity-60 animate-pulse" />
          <div className="absolute top-6 right-6 w-1 h-1 bg-pink-400 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-8 left-8 w-1 h-1 bg-purple-400 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
      </div>
    </div>
  );
}
