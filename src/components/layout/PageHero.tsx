import Link from 'next/link'
import Image from 'next/image'
import { assetPath } from '@/lib/utils'

// Map page titles to background images for visual impact
const heroImages: Record<string, string> = {
  'Our Boards & Menu': '/images/tasteful-option2.png',
  'Charcuterie Cart Experience': '/images/tasteful-option5.png',
  'Our Work': '/images/tasteful-option3.png',
  'Our Story': '/images/tasteful-option6.png',
  'Kind Words': '/images/tasteful-option4.png',
  "Let's Connect": '/images/tasteful-option1.png',
  'Frequently Asked Questions': '/images/hero-board-image.png',
}


interface PageHeroProps {
  title: string
  subtitle?: string
}

export default function PageHero({ title, subtitle }: PageHeroProps) {
  const bgImage = heroImages[title] ? assetPath(heroImages[title]) : undefined

  return (
    <section className="relative min-h-[50vh] flex items-end pb-16 pt-40 px-6 overflow-hidden">
      {/* Background image */}
      {bgImage && (
        <Image
          src={bgImage}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      )}

      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-burgundy/90 via-fig/70 to-charcoal/50" />

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative gold accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-gold/15 to-transparent" />

      <div className="relative max-w-[1100px] mx-auto w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-6">
          <Link
            href="/"
            className="font-sans text-[11px] tracking-[2px] uppercase text-cream/60 no-underline hover:text-cream/90 transition-colors"
          >
            Home
          </Link>
          <span className="text-cream/30">/</span>
          <span className="font-sans text-[11px] tracking-[2px] uppercase text-gold">
            {title}
          </span>
        </nav>

        {/* Decorative gold line */}
        <div className="w-16 h-[3px] bg-gold mb-6" />

        <h1 className="font-display text-hero font-normal text-cream mb-4">
          {title}
        </h1>

        {subtitle && (
          <p className="font-body text-xl text-cream/80 max-w-[550px]">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
