import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import ParticlesBackground from "../components/ui/ParticlesBackground";
import { CalculatorForm } from "../components/features/CalculatorForm";
import { ArrowRight, Info } from "lucide-react";

export default function Home() {
  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-dark-bg-300 text-text-medium font-sans relative overflow-hidden">
        
        {/* HERO SECTION */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden">
          
          {/* 1. Particles Layer */}
          <div className="absolute inset-0 z-10 opacity-60 pointer-events-none">
             <ParticlesBackground />
          </div>

          {/* 2. Background Decor (Orbs & Grid) */}
          <div className="absolute inset-0 z-0">
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-20" 
                 style={{ backgroundImage: 'linear-gradient(to right, rgba(167, 139, 250, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(167, 139, 250, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            {/* Gradient Orbs */}
            <div className="absolute -top-[20%] -left-[10%] w-[700px] h-[700px] rounded-full bg-purple-600/20 blur-[120px] animate-pulse-slow" />
            <div className="absolute bottom-[10%] -right-[10%] w-[600px] h-[600px] rounded-full bg-pink-500/10 blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
            
            {/* Floating Numbers (Legacy Feature) */}
            <div className="absolute top-1/4 left-1/4 text-7xl font-heading font-bold text-white/5 animate-float pointer-events-none">33</div>
            <div className="absolute bottom-1/3 right-1/4 text-8xl font-heading font-bold text-white/5 animate-float pointer-events-none" style={{ animationDelay: '-3s' }}>7</div>
          </div>

          {/* 3. Main Content */}
          <div className="container mx-auto px-4 relative z-20 text-center max-w-5xl mx-auto">
            
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-purple-200 text-sm font-medium mb-8 animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-pink-500 mr-2 animate-pulse shadow-[0_0_10px_rgba(236,72,153,0.5)]"></span>
              Jūsų Asmeninis Kosminis Parašas
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-white mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Atraskite Savo <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 animate-gradient-flow bg-[length:200%_auto]">
                Kosmoso Kodą
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-text-medium mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Sujungėme senovės numerologijos išmintį su moderniu AI, kad sukurtume
              <span className="text-white font-medium"> tobulą dovaną</span> arba gilią įžvalgą Jums.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <button className="group relative px-8 py-4 bg-gradient-to-r from-primary-600 to-pink-600 text-white rounded-xl font-bold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 transition-all duration-200 flex items-center gap-2">
                Sukurti Analizę Dabar
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-xl font-semibold hover:bg-white/5 hover:border-purple-400/50 transition-all flex items-center gap-2">
                Sužinoti Daugiau
                <Info className="w-5 h-5" />
              </button>
            </div>

          </div>
        </section>

        {/* Calculator Form Section */}
        <section className="relative -mt-20 z-30 px-4 pb-20">
          <CalculatorForm />
        </section>

        {/* FEATURES SECTION */}
        <section className="py-20 bg-dark-bg-200 relative z-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">Kodėl verta rinktis mus?</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">Mes nejudame paviršiumi. Mūsų algoritmai sujungia tūkstantmetę išmintį su moderniausiu AI.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                { title: "Mokslinis Tikslumas", desc: "Naudojame NASA duomenis planetų pozicijoms skaičiuoti.", icon: "🌌" },
                { title: "Gili Psichologija", desc: "AI analizuoja ne tik 'ką', bet ir 'kodėl' – jūsų motyvus ir baimes.", icon: "🧠" },
                { title: "Tobula Dovana", desc: "PDF knyga paruošta spausdinimui – idealu gimtadieniams.", icon: "🎁" }
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
