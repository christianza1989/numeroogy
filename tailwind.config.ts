import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-playfair)", "serif"],
      },
      colors: {
        // Cosmic Dark Backgrounds
        'dark-bg': {
          200: '#1a1a2e', // Medium cosmic blue
          300: '#0f0f23', // Deep cosmic blue
        },
        // Brand Colors (Cosmic/Purple theme)
        primary: {
          300: '#a78bfa', // Light purple
          600: '#7c3aed', // Purple
        },
        // Text Colors
        'text-light': '#9ca3af',
        'text-medium': '#d1d5db',
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(circle at 50% 0%, rgba(167, 139, 250, 0.25) 0%, transparent 50%)',
        'card-gradient': 'linear-gradient(145deg, rgba(167, 139, 250, 0.1), rgba(15, 15, 35, 0.8))',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(167, 139, 250, 0.3)',
        'purple-glow': '0 0 20px rgba(167, 139, 250, 0.3)',
      },
      animation: {
        'gradient-flow': 'gradient-flow 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
      },
      keyframes: {
        'gradient-flow': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    typography,
  ],
};
export default config;
