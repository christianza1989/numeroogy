import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair" 
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
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-slate-950 text-slate-200 antialiased`}>
        {children}
      </body>
    </html>
  );
}
