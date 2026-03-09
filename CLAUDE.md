# CLAUDE.md — Fig Jam Charcuterie Website Redesign

## Project Overview

This is a spec redesign of [figjamcharcuteriellc.com](https://www.figjamcharcuteriellc.com/) — a Sarasota, FL based artisanal charcuterie business owned by Elizabeth Kent. The current site is a basic Wix build with poor URL structure, no SEO optimization, bloated load times, and a dated design. This NextJS rebuild aims to demonstrate a dramatically better alternative.

**Goal:** Build a stunning, production-ready NextJS site that can be deployed to Vercel and shared via a preview link. This is a portfolio/spec piece to earn the client's business and potentially her boyfriend's heavy equipment business website.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, next/image

## Skills to Use

When building this project, leverage these custom skills for best results:

- **Superpowers** — Use for agentic task execution, planning, and multi-step builds
- **UI UX Pro Max** — Use for all component design decisions, layout patterns, responsive design, and interaction design. Follow its guidelines for visual hierarchy, accessibility, and modern UI patterns
- **frontend-design** — Use for typography, color, animation, and aesthetic decisions. The design direction is "warm luxury editorial" — NOT generic AI aesthetics
- **code-review** — Run after completing each major section to catch issues

## Design System

### Brand Direction: Warm Luxury Editorial

Think high-end food magazine meets artisanal warmth. This is NOT corporate or tech-y. Every design decision should feel handcrafted and inviting.

### Colors (defined in tailwind.config.js)
- **Primary:** Deep Burgundy `#6B1D2A` — headers, nav, accents
- **Secondary:** Gold `#C4953A` — CTAs, labels, decorative elements
- **Background:** Cream `#FDF6EC` / Warm White `#FEFBF4`
- **Text:** Charcoal `#2C2C2C` (headings), Warm Gray `#6B6560` (body)
- **Accents:** Sage `#8B9A7B`, Fig `#4A2040`

### Typography (loaded via Google Fonts in globals.css)
- **Display/Headings:** Playfair Display (serif) — elegant, editorial
- **Body:** Cormorant Garamond (serif) — warm, readable
- **UI/Labels/Nav:** Josefin Sans (sans-serif) — clean, modern contrast

### Component Classes (defined in globals.css)
- `.btn-primary` — Gold background CTA buttons
- `.btn-outline` — Outlined variant for secondary actions
- `.section-label` — Small uppercase tracking label above section titles
- `.section-title` — Large Playfair Display section headings
- `.body-text` — Standard body paragraph styling

### Animation Approach
- Use Framer Motion for scroll-triggered reveals (fade up on intersection)
- Subtle hover states on cards (lift + shadow)
- Smooth page transitions between routes
- NO excessive animation — keep it elegant and purposeful

## Content & Data

ALL site content is centralized in `src/data/site-content.ts`. Import from there — do not hardcode content in components. This makes it easy for the client to update content later.

## Site Architecture

### Shared Components to Build First

Build these in `src/components/layout/` before the pages:

1. **Navbar** (`Navbar.tsx`)
   - Fixed position, transparent on hero → cream background on scroll
   - Logo left, nav links center/right, "Order Now" CTA button
   - Mobile: hamburger menu with full-screen overlay
   - Links: Home, Our Boards, Cart Service, Gallery, About, Testimonials, Contact
   - Phone number visible on desktop

2. **Footer** (`Footer.tsx`)
   - Dark background (charcoal)
   - Business name, tagline, phone, service area
   - Nav links repeated
   - Social media icons (placeholder until we get her handles)
   - Copyright

3. **PageHero** (`PageHero.tsx`)
   - Reusable hero banner for inner pages (not homepage)
   - Takes title, subtitle, optional background
   - Burgundy gradient background with subtle texture
   - Breadcrumb navigation

4. **CTASection** (`CTASection.tsx`)
   - Reusable call-to-action block used at bottom of most pages
   - Phone number prominently displayed
   - "Order Now" and "Call Us" buttons

### Shared UI Components (`src/components/ui/`)

5. **AnimatedSection** — Framer Motion wrapper for scroll-triggered fade-in
6. **BoardCard** — Product card for board sizes (image, name, price, serves, description)
7. **TestimonialCard** — Review card with quote, name, occasion, rating stars
8. **CategoryFilter** — Tab/pill filter buttons (used on menu and gallery pages)
9. **FAQAccordion** — Expandable accordion for FAQ items
10. **ContactForm** — Order inquiry form (can be static for now, wire up later)

### Pages to Build

#### 1. HOME (`src/app/page.tsx`) — BUILD FIRST
The flagship page. This should be the most impressive.

Sections in order:
- **Hero:** Full viewport height. Deep burgundy/fig gradient background with subtle grain texture. Animated headline "Crafted with Passion & Purpose". Subtext about services. Two CTA buttons: "Explore the Menu" + "Call 941-914-0007". Scroll indicator at bottom.
- **About Preview:** Split layout — decorative image placeholder left, story text right. Elizabeth's background story condensed. Gold accent line with her name.
- **Board Highlights:** Grid of 4 BoardCards showing each size option. Each card has colored top accent, hover lift effect. Link to full menu page.
- **Cart Service Teaser:** Dark section (burgundy/charcoal gradient). Brief cart service pitch with starting price. Feature icons. Link to cart service page.
- **Testimonial Preview:** 2-3 testimonial cards from the data. Link to full testimonials page.
- **CTA Section:** Full-width burgundy background. Phone number big and centered. Order buttons.

Reference: The prototype JSX artifact shows the exact design for the home page sections. Replicate that design quality using proper NextJS components and Tailwind.

#### 2. MENU (`src/app/menu/page.tsx`)
- PageHero with "Our Boards & Menu" title
- Board product cards in a responsive grid (use BoardCard component)
- Interactive ingredient category browser with CategoryFilter tabs
  - When a category is selected, show the items in that category
  - Categories: Cheese, Charcuterie, Fruits, Crackers & Bread, Nuts/Sweets/Salty, Spreads, Sweet Additions
- Note about pricing variations and dietary options (vegan, GF, DF)
- "If your favorite isn't listed, please tell us" friendly note
- CTASection at bottom

#### 3. CART SERVICE (`src/app/cart-service/page.tsx`)
- PageHero with "Charcuterie Cart Experience" title
- Split layout: description + CTA on left, feature grid on right
  - 4 feature cards: Cart Setup, Custom Menu, Dedicated Server, Custom Signage
- Pricing info card with gold accent border:
  - Base: $300 for 2 hours
  - Per guest: $15-25 depending on menu
  - Minimum: 15 guests
  - Additional time available
- Signage rental mention with dimensions (4' x 2.5')
- Event inquiry form (variant of ContactForm with event-specific fields)
- CTASection

#### 4. GALLERY (`src/app/gallery/page.tsx`)
- PageHero with "Our Work" title
- CategoryFilter tabs: All, Beach Picnics, Corporate, Showers, Date Night, Holiday
- Masonry-style image grid (use CSS grid with varying row spans)
- Placeholder images with category labels (until real photos are provided)
  - Use colored gradient placeholders with "FJ" watermark, matching the prototype
- Lightbox on click (can use a simple modal)
- Note: "Gallery images coming soon — placeholder display"

#### 5. ABOUT (`src/app/about/page.tsx`)
- PageHero with "Our Story" title
- Elizabeth's story in an editorial layout
  - Photo placeholder on left (with gold corner accent like prototype)
  - Story text on right with pull quotes
- "How It Works" 3-step process:
  1. Choose Your Board (icon + description)
  2. Customize Your Selection (icon + description)
  3. We Deliver Fresh to You (icon + description)
- Occasions grid showing all event types they serve (from aboutContent.occasions)
- Service area section with text listing: Sarasota, Siesta Key & Surrounding Areas
- CTASection

#### 6. TESTIMONIALS (`src/app/testimonials/page.tsx`)
- PageHero with "Kind Words" title
- Testimonial cards in a responsive grid
  - Large decorative quote mark
  - Review text
  - Reviewer name and occasion
  - Star rating display
- "More reviews coming soon" note
- CTASection with "Ready to experience Fig Jam?" messaging

#### 7. CONTACT (`src/app/contact/page.tsx`)
- PageHero with "Let's Connect" title
- Two-column layout:
  - Left: Contact info cards (Phone, Service Area, Delivery info)
  - Right: ContactForm with fields:
    - Name (required)
    - Phone (required)
    - Email (required)
    - Event Date (date picker)
    - Event Type (dropdown: Date Night, Birthday Party, Bridal Shower, Baby Shower, Corporate Event, Beach Picnic, Wedding, Game Day, Other)
    - Estimated Guest Count (number)
    - Board Size Interest (dropdown from board options)
    - Message (textarea)
- Note: Form is static/UI-only for now. Will wire up to email/CRM later.
- Service area text
- CTASection

#### 8. FAQ (`src/app/faq/page.tsx`)
- PageHero with "Frequently Asked Questions" title
- FAQAccordion component with expand/collapse animation
- All questions from faqItems data
- CTASection with "Still have questions? Give us a call" messaging

## SEO Requirements

Each page already has Metadata exports. Additionally:
- Add Schema.org structured data in the root layout (LocalBusiness + FoodEstablishment)
- Ensure all images have descriptive alt text
- Use semantic HTML (main, section, article, nav, footer)
- Add a `sitemap.ts` in the app directory for auto-generated sitemap
- Add `robots.ts` for robots.txt generation

## Image Strategy

For this spec build, use placeholder images:
- Board/food images: Colored gradient boxes with "FJ" monogram (matches prototype)
- Gallery: Same treatment with category labels overlaid
- About photo: Placeholder with gold corner accent frame

When Elizabeth provides real photos, they'll drop into `public/images/` and get served through `next/image` for automatic optimization.

## Deployment

This will be deployed to Vercel for sharing:
1. Push to GitHub repo
2. Connect to Vercel
3. Auto-deploy on push
4. Share preview URL with Elizabeth

## Build Order

Execute in this order for the smoothest build:
1. `npm install`
2. Shared layout components (Navbar, Footer, PageHero, CTASection)
3. Shared UI components (AnimatedSection, BoardCard, TestimonialCard, etc.)
4. Home page (flagship — spend the most time here)
5. Menu page
6. Cart Service page
7. About page
8. Gallery page
9. Testimonials page
10. Contact page
11. FAQ page
12. SEO (structured data, sitemap, robots)
13. Final review and polish

## Quality Checklist

Before considering the build complete:
- [ ] All pages render without errors
- [ ] Responsive on mobile, tablet, desktop
- [ ] Navigation works on all pages (including mobile menu)
- [ ] Animations are smooth and performant
- [ ] All content matches site-content.ts data
- [ ] Metadata/SEO on every page
- [ ] No console errors or warnings
- [ ] Typography hierarchy is consistent
- [ ] Color usage follows the design system
- [ ] CTAs are prominent and functional (phone links work)
- [ ] Forms display correctly (even if not wired up)
- [ ] `next build` completes without errors
