'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import BoardCard from '@/components/ui/BoardCard'
import TestimonialCard from '@/components/ui/TestimonialCard'
import SocialProofBar from '@/components/ui/SocialProofBar'
import ProcessSteps from '@/components/ui/ProcessSteps'
import ParallaxDivider from '@/components/ui/ParallaxDivider'
import CTASection from '@/components/layout/CTASection'
import {
  siteConfig,
  boards,
  testimonials,
  aboutContent,
  cartService,
} from '@/data/site-content'
import { assetPath } from '@/lib/utils'
import { ShoppingCart, UtensilsCrossed, Users, Sparkles } from 'lucide-react'

const boardAccentColors = ['#8B9A7B', '#8B2E3B', '#C4953A', '#6B1D2A']
const boardImages = [
  assetPath('/images/tasteful-option1.png'),
  assetPath('/images/tasteful-option2.png'),
  assetPath('/images/tasteful-option5.png'),
  assetPath('/images/tasteful-option4.png'),
]

export default function HomePage() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setTimeout(() => setLoaded(true), 100)
  }, [])

  return (
    <main>
      {/* ====== HERO WITH REAL FOOD PHOTOGRAPHY ====== */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background image */}
        <Image
          src={assetPath("/images/hero-board-image.png")}
          alt="Artisanal charcuterie board by Fig Jam"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-burgundy/75 via-fig/65 to-charcoal/80" />

        {/* Grain texture */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="text-center px-6 relative z-10 max-w-[800px]">
          {/* Decorative line */}
          <div
            className="h-px bg-gold mx-auto mb-8 transition-all duration-1000 ease-out"
            style={{ width: loaded ? 80 : 0, transitionDelay: '0.3s' }}
          />

          <p
            className="font-sans text-[14px] font-medium tracking-[5px] uppercase text-cream mb-6 transition-all duration-800"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '0.4s',
              textShadow: '0 2px 8px rgba(0,0,0,0.6)',
            }}
          >
            Sweet & Savory Charcuterie · Sarasota, FL
          </p>

          <h1
            className="font-display text-hero font-normal text-cream leading-[1.1] mb-6 transition-all duration-800"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: '0.6s',
            }}
          >
            Crafted with
            <br />
            <em className="italic text-gold-light">Passion</em> & Purpose
          </h1>

          <p
            className="font-body text-[clamp(18px,2.5vw,24px)] text-white/80 leading-relaxed max-w-[550px] mx-auto mb-10 transition-all duration-800"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '0.8s',
            }}
          >
            From corporate grazing tables to sunset beach picnics — artisanal
            boards, boxes & cups made fresh for every occasion.
          </p>

          <div
            className="flex gap-4 justify-center flex-wrap transition-opacity duration-800"
            style={{ opacity: loaded ? 1 : 0, transitionDelay: '1s' }}
          >
            <Link href="/menu" className="btn-primary">
              Explore the Menu
            </Link>
            <a href={siteConfig.phoneLink} className="btn-outline !text-white/90 !border-white/40 hover:!bg-white/10">
              Call {siteConfig.phone}
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-1000"
          style={{ opacity: loaded ? 0.6 : 0, transitionDelay: '1.5s' }}
        >
          <span className="font-sans text-[10px] tracking-[3px] text-cream uppercase">
            Scroll
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-cream to-transparent animate-pulse-slow" />
        </div>
      </section>

      {/* ====== ABOUT PREVIEW ====== */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-[1100px] mx-auto flex gap-16 items-center flex-wrap">
          <AnimatedSection className="flex-1 min-w-[300px]">
            <div className="relative aspect-[3/4] max-w-[420px] rounded-sm overflow-hidden">
              <Image
                src={assetPath("/images/tasteful-option6.png")}
                alt="Fig Jam signature charcuterie board with salami roses"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 420px"
              />
              {/* Gold corner accent */}
              <div className="absolute -top-0.5 -left-0.5 w-[60px] h-[60px] border-t-[3px] border-l-[3px] border-gold" />
              <div className="absolute -bottom-0.5 -right-0.5 w-[60px] h-[60px] border-b-[3px] border-r-[3px] border-gold" />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="flex-1 min-w-[300px]">
            <p className="section-label">Our Story</p>
            <h2 className="section-title mb-6">
              Born from a Love of
              <br />
              <em>Fresh Flavors</em>
            </h2>
            <p className="body-text mb-5">{aboutContent.story}</p>
            <p className="body-text mb-8">{aboutContent.mission}</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-px bg-gold" />
              <span className="font-display text-base italic text-burgundy">
                {siteConfig.owner}, Owner
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ====== SOCIAL PROOF ====== */}
      <SocialProofBar />

      {/* ====== BOARD HIGHLIGHTS ====== */}
      <section className="py-24 px-6 bg-warm-white relative">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #2C2C2C 0, #2C2C2C 1px, transparent 0, transparent 50%)`,
            backgroundSize: '20px 20px',
          }}
        />

        <div className="max-w-[1100px] mx-auto relative">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="section-label">Tasteful Options</p>
              <h2 className="section-title">
                Our <em>Menu</em>
              </h2>
              <p className="font-body text-lg text-warm-gray mt-3">
                Fresh, made to order — free delivery in the Sarasota area
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {boards.map((board, i) => (
              <AnimatedSection key={board.id} delay={i * 0.1}>
                <BoardCard
                  name={board.name}
                  price={board.priceLabel}
                  serves={board.serves}
                  description={board.description}
                  accentColor={boardAccentColors[i]}
                  image={boardImages[i]}
                />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <div className="text-center mt-8">
              <Link href="/menu" className="btn-primary">
                View Full Menu
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ====== PARALLAX DIVIDER ====== */}
      <ParallaxDivider
        imageSrc={assetPath("/images/tasteful-option3.png")}
        alt="Fig Jam beach picnic with wine"
        quote="Fresh. Local. Made with love."
      />

      {/* ====== HOW IT WORKS ====== */}
      <ProcessSteps />

      {/* ====== CART SERVICE TEASER ====== */}
      <section className="py-24 px-6 bg-gradient-to-br from-charcoal to-burgundy relative overflow-hidden">
        {/* Background image with overlay */}
        <Image
          src={assetPath("/images/tasteful-option5.png")}
          alt="Charcuterie board at a gathering"
          fill
          className="object-cover opacity-15"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal/90 to-burgundy/90" />

        <div className="max-w-[1100px] mx-auto relative">
          <div className="flex gap-16 items-center flex-wrap">
            <AnimatedSection className="flex-1 min-w-[300px]">
              <p className="section-label text-gold-light">Premium Service</p>
              <h2 className="font-display text-section font-normal text-cream leading-tight mb-6">
                Charcuterie Cart
                <br />
                <em className="text-gold-light">Experience</em>
              </h2>
              <p className="font-body text-lg leading-relaxed text-white/70 mb-8">
                Elevate your event with our full-service charcuterie cart.
                Perfect for weddings, bridal and baby showers, corporate
                meetings, and special celebrations.
              </p>

              {/* Pricing card */}
              <div className="bg-white/[0.08] backdrop-blur-sm rounded-sm p-7 border-l-[3px] border-gold mb-8">
                <p className="font-display text-xl text-cream mb-2">
                  Starting at{' '}
                  <span className="text-gold-light text-[28px] font-semibold">
                    ${cartService.basePrice}
                  </span>
                </p>
                <p className="font-body text-base text-white/60">
                  Base for {cartService.baseDuration} · {cartService.perGuest}{' '}
                  per guest · Minimum {cartService.minGuests} guests
                </p>
              </div>

              <Link href="/cart-service" className="btn-primary">
                Learn More
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="flex-1 min-w-[300px]">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: ShoppingCart, title: 'Full Service Cart', desc: 'Elegant setup with umbrella and custom display' },
                  { icon: UtensilsCrossed, title: 'Custom Menu', desc: 'Curated or customizable food options' },
                  { icon: Users, title: 'Dedicated Server', desc: 'Professional service throughout your event' },
                  { icon: Sparkles, title: 'Custom Signage', desc: 'Branded signage for your occasion' },
                ].map((f) => (
                  <div
                    key={f.title}
                    className="bg-white/[0.06] backdrop-blur-sm rounded-sm p-6 border border-white/[0.08] hover:bg-white/10 transition-colors cursor-default"
                  >
                    <f.icon size={28} className="text-gold mb-3" />
                    <h4 className="font-sans text-[13px] font-medium tracking-wider text-cream mb-1">
                      {f.title}
                    </h4>
                    <p className="font-body text-[15px] text-white/50 leading-snug">
                      {f.desc}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ====== TESTIMONIALS PREVIEW ====== */}
      <section className="py-24 px-6 bg-warm-white">
        <div className="max-w-[1100px] mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="section-label">What They Say</p>
              <h2 className="section-title">
                Kind <em>Words</em>
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {testimonials.map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 0.15}>
                <TestimonialCard {...t} />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <div className="text-center mt-4">
              <Link href="/testimonials" className="btn-outline !text-gold !border-gold hover:!bg-gold/10">
                Read More Reviews
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ====== CTA ====== */}
      <CTASection />
    </main>
  )
}
