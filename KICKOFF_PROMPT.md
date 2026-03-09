# Claude Code Kickoff Prompt for Fig Jam Build
# ================================================
# Copy everything below the line and paste it into Claude Code
# after you've cd'd into the project directory
# ================================================

---

Read the CLAUDE.md file in this project root first — it has the complete build spec, design system, page architecture, and build order for this NextJS site.

This is a Fig Jam Charcuterie website redesign — a spec piece to win a client. The project is scaffolded with:
- All page routes stubbed out in src/app/
- All site content centralized in src/data/site-content.ts
- Tailwind config with custom colors/fonts in tailwind.config.js  
- Global CSS with component classes in src/styles/globals.css
- Package.json ready to go

Use your **Superpowers** skill for planning and execution. Use your **UI UX Pro Max** skill for all component design decisions — this needs to look like a high-end food/lifestyle brand, NOT a generic template. Use the **frontend-design** skill for typography, color, and animation.

Start by:
1. Running `npm install`
2. Building the shared layout components (Navbar, Footer, PageHero, CTASection) in src/components/layout/
3. Building the shared UI components (AnimatedSection, BoardCard, TestimonialCard, CategoryFilter, FAQAccordion, ContactForm) in src/components/ui/
4. Then build each page following the CLAUDE.md spec, starting with the Home page

Design direction is "warm luxury editorial" — Playfair Display headings, Cormorant Garamond body text, deep burgundy/gold/cream palette. Think high-end food magazine. Use Framer Motion for elegant scroll-triggered animations. Every hover state, every transition, every spacing decision should feel intentional and premium.

All content comes from src/data/site-content.ts — import from there, don't hardcode.

Images are placeholders for now — use colored gradient boxes with subtle "FJ" monograms (the client will provide real photos later).

The goal is a site I can deploy to Vercel and send a preview link to the business owner. It needs to look production-ready even with placeholder images.

Go ahead and start building. Follow the build order in CLAUDE.md.
