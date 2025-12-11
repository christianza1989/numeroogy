"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import { Menu, X, Star } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300",
      scrolled ? "bg-dark-bg-300/85 backdrop-blur-md border-b border-white/5 py-3" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Hexagon Logo Restoration */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
             {/* CSS Hexagon shape using clip-path */}
             <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600" style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}></div>
             <Star className="w-5 h-5 text-white relative z-10 group-hover:rotate-12 transition-transform" fill="currentColor" />
          </div>
          <span className="font-heading font-bold text-xl tracking-tight text-white group-hover:text-primary-300 transition-colors">
            Numerology.lt
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-1">
          {["Pradžia", "Apie", "Analizė", "Reikšmės", "DUK"].map((item) => (
            <Link key={item} href={`#${item.toLowerCase()}`} className="px-4 py-2 text-sm font-medium text-text-medium hover:text-white relative group">
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-4">
          <Link href="#analize" className="hidden md:inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-[length:200%_auto] hover:bg-right rounded-lg shadow-lg shadow-purple-500/20 hover:-translate-y-0.5">
            Gauti Analizę
          </Link>
          
          {/* Mobile Toggle */}
          <button className="md:hidden text-text-light p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}
