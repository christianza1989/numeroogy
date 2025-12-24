"use client";

import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import ParticlesBackground from "../components/ui/ParticlesBackground";
import { CalculatorForm } from "../components/features/CalculatorForm";
import { DiscountPopup } from "../components/ui/DiscountPopup";
import { Testimonials } from "../components/ui/Testimonials";
import { Gift, Sparkles, BookOpen, Star, Heart, Zap, ShieldCheck } from "lucide-react";
import Image from "next/image"; // Būtina importuoti Image

export default function Home() {
  return (
    <>
      <Navbar />
      <DiscountPopup />
      
      <main className="min-h-screen bg-dark-bg-300 text-text-medium font-sans relative overflow-hidden">
        
        {/* HERO SECTION */}
        {/* PATAISYMAS: Padidinome pb-16 iki pb-32 ar net pb-48, kad būtų vietos formai */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-48 overflow-hidden">
          
          <div className="absolute inset-0 z-10 opacity-60 pointer-events-none">
             <ParticlesBackground />
          </div>

          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 opacity-20" 
                 style={{ backgroundImage: 'linear-gradient(to right, rgba(167, 139, 250, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(167, 139, 250, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            <div className="absolute -top-[20%] -left-[10%] w-[700px] h-[700px] rounded-full bg-purple-600/20 blur-[120px] animate-pulse-slow" />
            <div className="absolute bottom-[10%] -right-[10%] w-[600px] h-[600px] rounded-full bg-pink-500/10 blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
          </div>

          <div className="container mx-auto px-4 relative z-20 text-center max-w-5xl mx-auto">
            
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 backdrop-blur-md text-amber-200 text-sm font-medium mb-8 animate-fade-in-up">
              <Gift className="w-4 h-4 mr-2 text-amber-400 animate-bounce" />
              <span>Nespėjote nupirkti dovanos? Turime sprendimą! 🎁</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Asmeninė <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400 font-extrabold">2026</span> Metų<br className="block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 animate-gradient-flow bg-[length:200%_auto]">
                Likimo Knyga
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-text-medium mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Ideali paskutinės minutės dovana. 
              <span className="text-white font-medium"> Gaunama akimirksniu</span> el. paštu (PDF formatu).
              <br className="hidden sm:block" />
              Sužinokite, ką žvaigždės ir skaičiai jums paruošė ateinantiems metams.
            </p>

            {/* Buttons - PATAISYMAS: Pridėjau scroll funkcijas */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <button 
                onClick={() => document.getElementById('analize')?.scrollIntoView({ behavior: 'smooth' })} 
                className="group w-full sm:w-auto relative px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 text-lg"
              >
                <Gift className="w-5 h-5" />
                Paruošti Dovaną
              </button>
              
              <button 
                onClick={() => document.getElementById('analize')?.scrollIntoView({ behavior: 'smooth' })} 
                className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/20 text-white rounded-xl font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-lg"
              >
                <Sparkles className="w-5 h-5 text-purple-400" />
                Analizė Sau
              </button>
            </div>

          </div>
        </section>

        {/* Calculator Form Section - PATAISYMAS: -mt-24 kad gražiau užliptų */}
        <section className="relative -mt-32 z-30 px-4 pb-20">
          <CalculatorForm />
        </section>

        {/* NEW SECTION: What's Inside? - PATAISYMAS: NAUJAS VAIZDAS */}
        <section className="py-20 bg-[#0f0f23] border-y border-white/5 relative overflow-hidden">
           {/* Fono dekoracija */}
           <div className="absolute top-0 right-0 w-1/2 h-full bg-purple-900/5 blur-[120px] pointer-events-none" />

           <div className="container mx-auto px-4 max-w-6xl relative z-10">
              <div className="text-center mb-16">
                 <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">Ką rasite "Likimo Knygoje"?</h2>
                 <p className="text-slate-400 text-lg">Tai ne šiaip horoskopas. Tai 10-12 puslapių asmeninė gyvenimo instrukcija.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                 
                 {/* Visual Representation (Left) - PATAISYMAS: TIKRAS PAVEIKSLĖLIS */}
                 <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-dark-bg-200">
                       {/* Čia įdėk savo sugeneruotą book-preview.png */}
                       <Image 
                         src="/book-preview.png" 
                         alt="Likimo Knyga Preview" 
                         fill 
                         className="object-cover hover:scale-105 transition-transform duration-700"
                       />
                       
                       {/* Badge ant viršaus */}
                       <div className="absolute top-4 right-4 bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg z-20">
                         PDF FORMATAS
                       </div>
                    </div>
                 </div>

                 {/* Content List (Right) */}
                 <div className="space-y-8">
                    {[
                       { icon: BookOpen, title: "Kosminis Pasas", desc: "Visi jūsų pagrindiniai numerologiniai ir astrologiniai rodikliai vienoje vietoje." },
                       { icon: Zap, title: "2026 Metų Prognozė", desc: "Detali analizė, ką jums žada ateinantys metai. Sužinokite savo sėkmės periodus." },
                       { icon: Heart, title: "Emocijos ir Santykiai", desc: "Kaip jūs mylite? Koks partneris jums tinka pagal Mėnulį ir Venerą?" },
                       { icon: Star, title: "Karmos Pamokos", desc: "Sužinokite, kokius iššūkius turite įveikti šiame gyvenime, kad pasiektumėte ramybę." },
                       { icon: ShieldCheck, title: "Sielos Simbolis", desc: "Unikalus, jūsų energiją atspindintis simbolis (Tattoo idėja) su paaiškinimu." }
                    ].map((item, i) => (
                       <div key={i} className="flex gap-5 p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-900 to-indigo-900 border border-white/10 flex items-center justify-center text-amber-300 shadow-lg">
                             <item.icon size={22} />
                          </div>
                          <div>
                             <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                             <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </section>

        {/* Trust/Benefits Section - ATNAUJINTA */}
        <section className="py-20 relative z-10 overflow-hidden">
          {/* Fono gradientas, kad apačia nebūtų tokia tamsi */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-[#0f0f23] to-[#0f0f23] z-0" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {[
                { 
                  title: "Momentinis Pristatymas", 
                  desc: "Jokio laukimo. PDF knygą gausite į el. paštą iškart po apmokėjimo (per 1 min).", 
                  icon: "⚡",
                  color: "text-amber-400",
                  bg: "bg-amber-500/10",
                  border: "border-amber-500/20"
                },
                { 
                  title: "Mokslinis Tikslumas", 
                  desc: "Tai ne atsitiktiniai tekstai. Naudojame NASA efemerides planetų pozicijoms skaičiuoti.", 
                  icon: "🌌",
                  color: "text-purple-400",
                  bg: "bg-purple-500/10",
                  border: "border-purple-500/20"
                },
                { 
                  title: "Asmeniška ir Jautru", 
                  desc: "Ideali dovana, parodanti dėmesį. Su jūsų dedikacija ir vardiniu viršeliu.", 
                  icon: "❤️",
                  color: "text-pink-400",
                  bg: "bg-pink-500/10",
                  border: "border-pink-500/20"
                }
              ].map((item, i) => (
                <div key={i} className={`p-8 rounded-3xl border ${item.border} ${item.bg} backdrop-blur-xl hover:-translate-y-2 transition-all duration-300 shadow-xl hover:shadow-2xl`}>
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-3xl mb-6 shadow-inner">
                    {item.icon}
                  </div>
                  <h3 className={`text-xl font-heading font-bold ${item.color} mb-3`}>{item.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            
            {/* Papildomas "Call to Action" tekstas apačioje */}
            <div className="text-center mt-16 animate-pulse">
               <p className="text-slate-500 text-sm">✨ Jau paruošta virš 1,200 asmeninių knygų</p>
            </div>
          </div>
        </section>

        <Testimonials />

      </main>

      <Footer />
    </>
  );
}
