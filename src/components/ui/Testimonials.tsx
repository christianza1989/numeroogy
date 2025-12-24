"use client";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  { 
    name: "Gabija V.", 
    city: "Vilnius", 
    text: "Esu priblokšta tikslumo. Skaičiau savo knygą ir verkiau – lyg kažkas būtų užrašęs mano giliausias mintis, kurių pati sau nedrįsau ištarti. Tai daug giliau nei horoskopas, tai lyg terapinis seansas su savo siela.", 
    stars: 5 
  },
  { 
    name: "Eglė L.", 
    city: "Kaunas", 
    text: "Geriausia paskutinės minutės dovana! Nupirkau draugei, o pamačiusi kokybę iškart užsisakiau ir sau. PDF dizainas tiesiog prabangus.", 
    stars: 5 
  },
  { 
    name: "Simona P.", 
    city: "Klaipėda", 
    text: "2026 metų prognozė davė tiek daug ramybės. Dabar tiksliai žinau, kada palankus metas pokyčiams darbe, o kada geriau sulėtinti tempą. Ačiū komandai už tokį kruopštų darbą.", 
    stars: 5 
  },
  { 
    name: "Indrė M.", 
    city: "Londonas", 
    text: "Niekada netikėjau tokiais dalykais, kol negavau šios knygos. Analizė apie santykius atvėrė akis – viskas tiesa 100%. Kaip įmanoma tiek daug sužinoti vien iš gimimo datos?", 
    stars: 5 
  },
  { 
    name: "Rasa J.", 
    city: "Panevėžys", 
    text: "Momentinis pristatymas yra išsigelbėjimas! Labai estetiška ir gilu.", 
    stars: 5 
  },
  { 
    name: "Vaida T.", 
    city: "Šiauliai", 
    text: "Skaitau jau trečią kartą. Kiekviena eilutė atrodo parašyta asmeniškai man. Karmos skyrius privertė stipriai susimąstyti apie tai, ką darau ne taip savo gyvenime. Tai tikras transformacinis gidas.", 
    stars: 5 
  },
  { 
    name: "Justė B.", 
    city: "Vilnius", 
    text: "Padovanojau mamai jubiliejaus proga. Tai buvo pati emocingiausia dovana vakaro metu. Verkė visos šventės moterys, kai pradėjome garsiai skaityti įvadą. Tai ne šiaip PDF, tai kažkas magiško.", 
    stars: 5 
  },
  { 
    name: "Kamilė S.", 
    city: "Druskininkai", 
    text: "Tikras gidas į savęs pažinimą. Rekomenduoju kiekvienai moteriai.", 
    stars: 5 
  },
  { 
    name: "Laura K.", 
    city: "Berlynas", 
    text: "Knyga pranoko lūkesčius. Viskas labai struktūrizuota ir aišku. Nustebino knygos apimtis – galvojau bus pora puslapių, o čia ištisa studija apie mane.", 
    stars: 5 
  },
  { 
    name: "Gintarė R.", 
    city: "Alytus", 
    text: "Mano tapatybės aprašymas sutapo iki smulkmenų. Jaučiuosi įkvėpta naujiems metams!", 
    stars: 5 
  },
  { 
    name: "Monika D.", 
    city: "Dublinas", 
    text: "Ši knyga tapo mano stalo knyga. Kai pasidaro sunku ar pritrūksta pasitikėjimo, atsiverčiu stiprybių skyrių. Tai lyg priminimas, kas aš esu iš tikrųjų.", 
    stars: 5 
  },
  { 
    name: "Aistė V.", 
    city: "Marijampolė", 
    text: "Užsisakiau kaip dovaną, bet negalėjau nustoti skaityti pati. Puikus įrankis gyvenimo kryžkelėse.", 
    stars: 5 
  },
  { 
    name: "Dovilė N.", 
    city: "Vilnius", 
    text: "Greita, patogu ir kokybiška. Rekomenduoju!", 
    stars: 5 
  },
  { 
    name: "Jolanta G.", 
    city: "Utena", 
    text: "Tai ne tik tekstas, tai patirtis. Jaučiuosi lyg gavusi savo gyvenimo instrukciją, kurios man trūko pastaruosius kelerius metus. Labai džiaugiuosi atradusi šį projektą.", 
    stars: 5 
  },
  { 
    name: "Karolina L.", 
    city: "Oslo", 
    text: "Kosminis dizainas ir galingas turinis! Ačiū už galimybę geriau suprasti save.", 
    stars: 5 
  },
  { 
    name: "Rūta M.", 
    city: "Kaunas", 
    text: "Perku antrą kartą - pirmą sau, dabar seseriai gimtadienio proga. Kiekviena knyga unikali ir labai asmeniška.", 
    stars: 5 
  },
  { 
    name: "Lina P.", 
    city: "Vilnius", 
    text: "Psichologas rekomendavo pasižiūrėti į save giliau. Ši knyga atliko dar daugiau - padėjo suprasti savo vidaus pasaulį.", 
    stars: 5 
  },
  { 
    name: "Mantė K.", 
    city: "Klaipėda", 
    text: "Mano vyras skeptikas, bet ir jis buvo sužavėtas, kai aš jam papasakojau apie savo analizę. Dabar nori sau.", 
    stars: 5 
  },
  { 
    name: "Ausra B.", 
    city: "Šiauliai", 
    text: "3 valandos praleistos skaitant. Negalėjau atsitraukti. Kiekvienas žodis atkūrė mano gyvenimo istoriją.", 
    stars: 5 
  },
  { 
    name: "Diana S.", 
    city: "Panevėžys", 
    text: "Karjeros skyrius - tiesa iš pirmo žvilgsnio. Dabar žinau, kada laikas siekti paaukštėjimo.", 
    stars: 5 
  },
  { 
    name: "Kristina J.", 
    city: "Kaunas", 
    text: "Sveikatinimo programų praleidau daug, bet niekas nedavė tokio aiškumo kaip ši knyga.", 
    stars: 5 
  },
  { 
    name: "Evelina V.", 
    city: "Vilnius", 
    text: "Turtingų patirčių moteris - ir man buvo kas nauja. Supratau, kodėl man kažko trūksta.", 
    stars: 5 
  },
  { 
    name: "Greta R.", 
    city: "Kėdainiai", 
    text: "Mama džiaugiasi kaip vaikas. Tai geriausia dovana, kurią galiu jai duoti.", 
    stars: 5 
  },
  { 
    name: "Sandra T.", 
    city: "Marijampolė", 
    text: "Pinigų srauto analizė atvėrė akis. Dabar žinau, kurie mėnesiai man palankūs.", 
    stars: 5 
  },
  { 
    name: "Inga Z.", 
    city: "Tauragė", 
    text: "Vaikų auklėtoja - tai padėjo suprasti ir savo, ir kitų vaikus giliau.", 
    stars: 5 
  },
  { 
    name: "Laima N.", 
    city: "Telšiai", 
    text: "Pagaliau supratau savo nuotaikų svyravimus. Viskas tampa akivaizdu.", 
    stars: 5 
  },
  { 
    name: "Oksana P.", 
    city: "Visaginas", 
    text: "Rusiškai rašau, bet jaučiu lietuvišką sielą. Knyga padėjo susivienyti viduje.", 
    stars: 5 
  },
  { 
    name: "Rasa D.", 
    city: "Plungė", 
    text: "Po skyrybų pagalbausi. Tai padėjo suprasti, kur padariau klaidų.", 
    stars: 5 
  },
  { 
    name: "Viktorija L.", 
    city: "Radviliškis", 
    text: "Studijuojant universitetą - tai tapo mano gyvenimo kelrodžiu.", 
    stars: 5 
  },
  { 
    name: "Jurgita M.", 
    city: "Kretinga", 
    text: "Verslininkė. Knyga padėjo suprasti savo stiprybes ir silpnybes versle.", 
    stars: 5 
  },
  { 
    name: "Agnė S.", 
    city: "Jurbarkas", 
    text: "Menininkė. Dabar žinau, kur kryptimi vystyti savo talentą.", 
    stars: 5 
  },
  { 
    name: "Brigita K.", 
    city: "Šakiai", 
    text: "Mokytoja. Tai padėjo geriau suprasti mokinius ir jų elgesį.", 
    stars: 5 
  },
  { 
    name: "Ieva R.", 
    city: "Prienai", 
    text: "Jauna mama. Supratau, kaip geriau auklėti savo vaiką pagal jo energiją.", 
    stars: 5 
  },
  { 
    name: "Simona V.", 
    city: "Birštonas", 
    text: "Gydytoja. Net medicinos žinios nepaaiškė taip giliau kaip ši analizė.", 
    stars: 5 
  },
  { 
    name: "Edita P.", 
    city: "Zarasai", 
    text: "Retirement age. Perfect timing to understand my life purpose.", 
    stars: 5 
  },
  { 
    name: "Neringa B.", 
    city: "Ignalina", 
    text: "Naturistė. Knyga sutapo su mano filosofija ir gyvenimo būdu.", 
    stars: 5 
  },
  { 
    name: "Daina T.", 
    city: "Varėna", 
    text: "Kelionių gudė. Dabar žinau, kur keliauti ir kada.", 
    stars: 5 
  },
  { 
    name: "Rūtilė S.", 
    city: "Trakai", 
    text: "Restoranų savininkė. Supratau, kaip geriau valdyti verslą ir komandą.", 
    stars: 5 
  },
  { 
    name: "Eglė M.", 
    city: "Elektrėnai", 
    text: "IT specialistė. Net technologijos nepaaiškė taip tiksliai kaip ši knyga.", 
    stars: 5 
  },
  { 
    name: "Loreta K.", 
    city: "Palanga", 
    text: "Vasaros atostogų metu perskaičiau. Dabar žinau, ko laukti rudens metų.", 
    stars: 5 
  },
  { 
    name: "Austėja G.", 
    city: "Neringa", 
    text: "Kurortų gyvenotoja. Knyga padėjo suprasti savo unikalų kelią.", 
    stars: 5 
  },
  { 
    name: "Miglė D.", 
    city: "Druskininkai", 
    text: "Sveikatos turizmo vadovė. Dabar geresnė konsultantė savo klientams.", 
    stars: 5 
  },
  { 
    name: "Viltė J.", 
    city: "Anykščiai", 
    text: "Rašytoja. Knyga įkvėpė naujiems kūriniams ir gyvenimo supratimui.", 
    stars: 5 
  },
  { 
    name: "Toma L.", 
    city: "Ukmergė", 
    text: "Teisininkė. Net teisės normos nepaaiškė taip aiškiai kaip ši analizė.", 
    stars: 5 
  },
  { 
    name: "Ramilė S.", 
    city: "Molėtai", 
    text: "Eko ūkininkė. Supratau, kaip derinti gamtą ir verslą.", 
    stars: 5 
  },
  { 
    name: "Aistė R.", 
    city: "Kupiškis", 
    text: "Bibliotekininkė. Dabar geresnė konsultantė žmonėms ieškantiems atsakymų.", 
    stars: 5 
  },
  { 
    name: "Daiva P.", 
    city: "Rokiškis", 
    text: "Socialinė darbuotoja. Knyga padėjo geriau suprasti savo klientus.", 
    stars: 5 
  },
  { 
    name: "Giedrė V.", 
    city: "Širvintos", 
    text: "Muzikantė. Dabar žinau, kuria kryptimi vystyti savo muzikinę karjerą.", 
    stars: 5 
  },
  { 
    name: "Lina M.", 
    city: "Šalčininkai", 
    text: "Mokytoja. Knyga tapo mano kasdieniniu įkvėpimo šaltiniu.", 
    stars: 5 
  },
  { 
    name: "Viktoryja K.", 
    city: "Švenčionys", 
    text: "Tarptautinė verslininkė. Knyga padėjo suprasti skirtingas kultūras.", 
    stars: 5 
  },
  { 
    name: "Ona Z.", 
    city: "Pakruojis", 
    text: "Senjorė. Niekada ne vėlu suprasti save ir savo gyvenimą.", 
    stars: 5 
  },
  { 
    name: "Birutė T.", 
    city: "Jonava", 
    text: "Chemikė. Net mokslas nepaaiškė taip tiksliai kaip ši analizė.", 
    stars: 5 
  },
  { 
    name: "Gražina D.", 
    city: "Kaišiadorės", 
    text: "Architektė. Dabar projektuosius namus, kurie atitinka žmonių energiją.", 
    stars: 5 
  },
  { 
    name: "Aldona J.", 
    city: "Kėdainiai", 
    text: "Istorikė. Knyga padėjo suprasti ne tik istoriją, bet ir savo vietą joje.", 
    stars: 5 
  },
  { 
    name: "Rūta L.", 
    city: "Panevėžys", 
    text: "Marketingo specialistė. Dabar žinau, kaip geriau pasiekti savo tikslinę auditoriją.", 
    stars: 5 
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-[#0a0a16] relative overflow-hidden">
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-purple-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-amber-500/10 blur-[120px] rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-heading font-bold text-white mb-4"
          >
            Moterų atradimai su <span className="text-amber-400">Likimo Knyga</span>
          </motion.h2>
          <p className="text-slate-400 text-lg">Daugiau nei 1,200 asmeninių analizių paruošta per pastaruosius metus.</p>
        </div>

        {/* Masonry Layout naudojant CSS columns */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="break-inside-avoid bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm hover:border-purple-500/40 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-1">
                  {[...Array(item.stars)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Quote className="text-white/10 group-hover:text-purple-500/30 transition-colors" size={24} />
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
                "{item.text}"
              </p>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs">
                  {item.name[0]}
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">{item.name}</h4>
                  <p className="text-slate-500 text-[10px] uppercase tracking-wider">{item.city}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-slate-400 text-xs">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Šiuo metu svetainėje lankosi 14 moterų
          </div>
        </div>
      </div>
    </section>
  );
}
