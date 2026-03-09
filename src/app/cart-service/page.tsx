'use client'

import PageHero from '@/components/layout/PageHero'
import CTASection from '@/components/layout/CTASection'
import AnimatedSection from '@/components/ui/AnimatedSection'
import ContactForm from '@/components/ui/ContactForm'
import { cartService } from '@/data/site-content'
import { ShoppingCart, UtensilsCrossed, User, PenTool } from 'lucide-react'

const iconMap = {
  ShoppingCart,
  UtensilsCrossed,
  User,
  PenTool,
}

export default function CartServicePage() {
  return (
    <main>
      <PageHero
        title="Charcuterie Cart Experience"
        subtitle="Full-service catering that elevates any event"
      />

      <section className="py-24 px-6 bg-warm-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex gap-16 items-start flex-wrap">
            <AnimatedSection className="flex-1 min-w-[300px]">
              <p className="section-label">Premium Service</p>
              <h2 className="section-title mb-6">
                Elevate Your <em>Event</em>
              </h2>
              <p className="body-text mb-6">
                Our full-service charcuterie cart brings an elegant, interactive
                food experience to your event. Perfect for weddings, bridal and
                baby showers, corporate gatherings, and special celebrations.
              </p>
              <p className="body-text mb-8">
                We handle everything — from setup and styling to a dedicated
                server throughout your event, plus custom signage to make it
                uniquely yours.
              </p>

              <div className="bg-white rounded-sm p-8 border-2 border-gold/30 mb-8">
                <h3 className="font-display text-2xl text-burgundy mb-4">
                  Pricing
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-baseline border-b border-light-gray pb-3">
                    <span className="font-body text-lg text-charcoal">
                      Base Rate (2 hours)
                    </span>
                    <span className="font-display text-2xl font-semibold text-gold">
                      ${cartService.basePrice}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-light-gray pb-3">
                    <span className="font-body text-lg text-charcoal">
                      Per Guest
                    </span>
                    <span className="font-display text-xl text-gold">
                      {cartService.perGuest}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-light-gray pb-3">
                    <span className="font-body text-lg text-charcoal">
                      Minimum Guests
                    </span>
                    <span className="font-display text-xl text-gold">
                      {cartService.minGuests}
                    </span>
                  </div>
                  <p className="font-body text-sm text-warm-gray italic pt-1">
                    Additional time available upon request
                  </p>
                </div>
              </div>

              <p className="font-body text-base text-warm-gray">
                Custom signage available (4&apos; x 2.5&apos;) to personalize
                your event display.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="flex-1 min-w-[300px]">
              <div className="grid grid-cols-2 gap-4 mb-8">
                {cartService.includes.map((feature) => {
                  const Icon =
                    iconMap[feature.icon as keyof typeof iconMap] || ShoppingCart
                  return (
                    <div
                      key={feature.title}
                      className="bg-white rounded-sm p-6 border border-light-gray hover:shadow-lg hover:-translate-y-1 transition-all"
                    >
                      <Icon size={28} className="text-gold mb-3" />
                      <h4 className="font-sans text-[13px] font-medium tracking-wider text-charcoal mb-1">
                        {feature.title}
                      </h4>
                      <p className="font-body text-[15px] text-warm-gray leading-snug">
                        {feature.description}
                      </p>
                    </div>
                  )
                })}
              </div>

              <div className="bg-cream rounded-sm p-6 border border-light-gray">
                <p className="font-sans text-[11px] tracking-[2px] uppercase text-warm-gray mb-3">
                  Dietary Options Available
                </p>
                <div className="flex gap-3 flex-wrap">
                  {cartService.dietaryOptions.map((opt) => (
                    <span
                      key={opt}
                      className="px-4 py-1.5 bg-sage/20 text-sage font-sans text-xs tracking-wider rounded-sm"
                    >
                      {opt}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-cream">
        <div className="max-w-[700px] mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12">
              <p className="section-label">Book Your Event</p>
              <h2 className="section-title mb-3">
                Event <em>Inquiry</em>
              </h2>
              <p className="body-text">
                Tell us about your event and we&apos;ll create the perfect
                charcuterie experience.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <ContactForm />
          </AnimatedSection>
        </div>
      </section>

      <CTASection />
    </main>
  )
}
