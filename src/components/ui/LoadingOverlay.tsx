"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

export function LoadingOverlay({ isLoading }: { isLoading: boolean }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-[#0f0f23]/90 backdrop-blur-md"
        >
          <div className="relative">
            {/* Besisukantis ratas */}
            <div className="w-24 h-24 rounded-full border-4 border-purple-500/30 border-t-amber-400 animate-spin" />
            {/* Ikona viduryje */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white animate-pulse" />
            </div>
          </div>
          
          <h3 className="mt-8 text-2xl font-heading font-bold text-white text-center">
            Generuojama Likimo Knyga...
          </h3>
          <p className="mt-2 text-purple-200 text-sm animate-pulse">
            Sujungiame žvaigždžių ir skaičių duomenis
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
