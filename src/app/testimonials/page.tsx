'use client'

import PageHero from '@/components/layout/PageHero'
import CTASection from '@/components/layout/CTASection'
import AnimatedSection from '@/components/ui/AnimatedSection'
import TestimonialCard from '@/components/ui/TestimonialCard'
import { testimonials } from '@/data/site-content'

export default function TestimonialsPage() {
  return (
    <main>
      <PageHero
        title="Kind Words"
        subtitle="What our customers are saying"
      />

      <section className="py-24 px-6 bg-cream">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 0.15}>
                <TestimonialCard {...t} />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <p className="text-center mt-12 font-body text-base italic text-warm-gray">
              More reviews coming soon — we&apos;re just getting started!
            </p>
          </AnimatedSection>
        </div>
      </section>

      <CTASection
        heading="Ready to Experience Fig Jam?"
        subtext="Join our growing family of happy customers. Call us today to place your order!"
      />
    </main>
  )
}
