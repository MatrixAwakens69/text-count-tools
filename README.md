# Text Count Tools

Free, fast, and private text analysis tools that run entirely in your browser. No backend, no database, no tracking.

## Features

### Word Counter (`/tools/word-counter/`)
- **Live statistics**: Words, characters, characters (no spaces), sentences, paragraphs, lines
- **Averages**: Average word length, average sentence length
- **Input methods**: Paste text, type directly, drag & drop files
- **File support**: TXT, Markdown (MD), PDF, DOCX (up to 10MB)
- **Auto-save**: Text persists in localStorage across browser sessions
- **Export**: Copy statistics to clipboard or download as JSON
- **Privacy-first**: All processing happens locally in your browser

### Reading Time Calculator (`/tools/reading-time-calculator/`)
- **Reading time estimation**: Based on words per minute (WPM)
- **Speaking time estimation**: At 130 WPM (average speaking pace)
- **Finish time**: Estimated completion time if you start reading now
- **Speed presets**:
  - Very Slow (100 WPM) — Complex technical content
  - Academic Paper (150 WPM) — Dense academic papers
  - Scientific Journal (180 WPM) — Highly technical material
  - General Reading (200 WPM) — Average adult reading
  - Novel / Fiction (250 WPM) — Enjoyable reading
  - Fast Reader (300 WPM) — Experienced speed readers
  - Custom WPM — Set your own speed (50-1000)
- **File support**: TXT, Markdown (MD), PDF, DOCX (up to 10MB)
- **Privacy-first**: All calculations happen locally in your browser

## Design System

- **Pure black & white theme** — No colors, only shades of gray
- **Typography**: Geist (display/text) & Geist Mono (code/labels)
- **Vercel-inspired design language** — Hairline borders, pill buttons, minimal shadows
- **Dark & Light mode** — System preference detection + manual toggle + localStorage persistence
- **Responsive** — Mobile-first, works on all screen sizes
- **Accessible** — Semantic HTML, ARIA labels, focus states, skip links

## Tech Stack

- **Astro 7** — Static site generator
- **Tailwind CSS v4** — Utility-first CSS with custom design tokens
- **TypeScript** — Type-safe development
- **Geist & Geist Mono fonts** — Via CDN with preload
- **mammoth.js** — DOCX text extraction (CDN)
- **pdfjs-dist** — PDF text extraction (CDN)
- **Service Worker** — Offline support
- **PWA Manifest** — Installable web app

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components (Button, Input, Card, etc.)
│   ├── Navigation.astro
│   └── Footer.astro
├── layouts/
│   └── Layout.astro  # Base layout with SEO, fonts, theme handling
├── pages/
│   ├── index.astro                    # Homepage
│   └── tools/
│       ├── word-counter.astro         # Word Counter tool
│       └── reading-time-calculator.astro  # Reading Time Calculator
├── scripts/
│   ├── theme-toggle.js                # Dark/light mode toggle
│   └── file-reader.js                 # File reading utilities
└── styles/
    └── global.css                     # Design tokens & utilities
```

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Deploy — zero config needed

### Custom Domain (Cloudflare)
1. Add domain in Vercel project settings
2. Configure DNS in Cloudflare:
   - CNAME `www` → `cname.vercel-dns.com`
   - A `@` → `76.76.21.21` (Vercel edge IP)

## Privacy

- **No server-side processing** — Everything runs in the browser
- **No analytics** — No tracking, no cookies, no third-party scripts
- **No data storage** — Text never leaves your device
- **localStorage only** — Used solely for auto-save and preferences

## License

MIT License — Free for personal and commercial use.