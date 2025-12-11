# Elana Reborn - Numerology & Astrology Analysis App

A modern Lithuanian numerology and astrology application that combines ancient wisdom with AI-powered analysis to provide personalized cosmic insights.

## Features

- 🌟 **Personal Numerology Analysis**: Calculate life path numbers, expression, soul urge, and personality numbers
- 🔮 **Zodiac Integration**: Full zodiac sign calculations with cosmic interpretations
- 🎁 **Gift Analysis**: Create personalized numerology reports as gifts for others
- 🤖 **AI-Powered**: Uses Google Gemini AI for deep, personalized interpretations
- 🎨 **Modern UI**: Beautiful cosmic-themed design with particle animations
- 📱 **Responsive**: Works seamlessly on desktop and mobile devices
- 🇱🇹 **Lithuanian Localized**: Fully in Lithuanian language

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS with custom cosmic theme
- **Animations**: Framer Motion, React TSParticles
- **AI**: Google Gemini AI
- **Icons**: Lucide React
- **Fonts**: Inter & Playfair Display

## Getting Started

### Prerequisites

- Node.js 18+ 
- Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd elana-reborn
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Configure your Gemini API key in `.env.local`:
```env
# Get your API key from https://makersuite.google.com/app/apikey
GEMINI_API_KEY=your_actual_gemini_api_key_here
GEMINI_MODEL=gemini-flash-latest
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/analyze/       # AI analysis API endpoint
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── features/          # Main feature components
│   │   ├── CalculatorForm.tsx
│   │   └── AnalysisResult.tsx
│   ├── layout/            # Layout components
│   │   └── Navbar.tsx
│   └── ui/                # Reusable UI components
│       ├── Input.tsx
│       └── ParticlesBackground.tsx
└── lib/
    ├── numerology.ts      # Numerology calculations
    └── utils.ts           # Utility functions
```

## Numerology Calculations

The app implements the Pythagorean numerology system with Lithuanian alphabet support:

- **Life Path Number**: Calculated from birth date
- **Expression Number**: Derived from full name
- **Soul Urge Number**: Calculated from vowels in name
- **Personality Number**: Calculated from consonants in name
- **Zodiac Sign**: Traditional Western astrology calculations

## API Endpoints

### POST /api/analyze

Generates personalized numerology analysis using AI.

**Request Body:**
```json
{
  "name": "Vardas",
  "surname": "Pavardė", 
  "birthDate": "1990-05-15",
  "gender": "male|female",
  "type": "self|gift",
  "giver": "Dovanotojo vardas", // optional
  "occasion": "Proga" // optional
}
```

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Environment Variables

- `GEMINI_API_KEY`: Your Google Gemini API key (required)
- `GEMINI_MODEL`: Gemini model to use (default: gemini-flash-latest)

## Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Add your `GEMINI_API_KEY` as an environment variable
3. Deploy automatically

### Other Platforms

```bash
npm run build
npm run start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please open an issue on GitHub.
