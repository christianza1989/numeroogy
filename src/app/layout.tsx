import type { Metadata } from "next";
import { Inter, Playfair_Display, Roboto } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair" 
});
const roboto = Roboto({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto" 
});

export const metadata: Metadata = {
  title: "AstroNumerology | Jūsų Asmeninis Kosmoso Žemėlapis",
  description: "Profesionalios astrologinės ir numerologinės analizės, sugeneruotos AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="lt" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} ${roboto.variable} font-sans bg-slate-950 text-slate-200 antialiased`}>
        {children}
      </body>
    </html>
  );
}
