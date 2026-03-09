# Fig Jam Charcuterie — Website Redesign

A modern NextJS website for Fig Jam Charcuterie LLC, a Sarasota, FL based artisanal charcuterie business.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Fonts:** Playfair Display, Cormorant Garamond, Josefin Sans
- **Deployment:** Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── layout.tsx        # Root layout with metadata
│   ├── page.tsx          # Home page
│   ├── menu/             # Boards & Menu
│   ├── cart-service/     # Cart rental & events
│   ├── gallery/          # Photo gallery
│   ├── about/            # About Elizabeth
│   ├── testimonials/     # Customer reviews
│   ├── contact/          # Contact & order form
│   └── faq/              # FAQ
├── components/
│   ├── layout/           # Navbar, Footer, PageHero, CTA
│   ├── sections/         # Page-specific sections
│   └── ui/               # Reusable UI components
├── data/
│   └── site-content.ts   # All site content (centralized)
├── lib/                  # Utilities
└── styles/
    └── globals.css       # Tailwind + custom styles
```

## Build Instructions

See `CLAUDE.md` for comprehensive build instructions for Claude Code.

## Deployment

Push to GitHub → Connect to Vercel → Auto-deploy
