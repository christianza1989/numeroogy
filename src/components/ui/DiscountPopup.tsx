"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function DiscountPopup() {
  // TEMPORARIAI IŠJUNGTAS - Nerodomas popup kol reikės
  return null;

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Rodyti po 3 sekundžių
    const timer = setTimeout(() => setIsOpen(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation(); // Kad nepaspaustų ant nuorodos
    setIsOpen(false);
  };

  const handleClick = () => {
    setIsOpen(false);
    document.getElementById("analize")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm">
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative w-full max-w-sm cursor-pointer"
            onClick={handleClick} // Paspaudus bet kur ant paveikslėlio - veikia kaip mygtukas
          >
            {/* TAVO SUGENERUOTAS PAVEIKSLĖLIS */}
            <Image 
              src="/discount-gift.png" 
              alt="Kalėdinis Išpardavimas" 
              width={500} 
              height={600}
              className="rounded-3xl shadow-[0_0_50px_rgba(251,191,36,0.3)] w-full h-auto"
            />

            {/* Nematomas "X" mygtukas ant viršaus (jei AI nupieštas X neveikia intuityviai) */}
            {/* Bet kadangi prašėme AI nupiešti X, galime tiesiog dėti skaidrų div ant viršaus toje vietoje */}
            <div 
               onClick={handleClose}
               className="absolute top-4 right-4 w-10 h-10 bg-transparent rounded-full z-20"
               aria-label="Uždaryti"
            />
          </motion.div>
          
        </div>
      )}
    </AnimatePresence>
  );
}
