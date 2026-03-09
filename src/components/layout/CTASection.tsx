import { Phone } from 'lucide-react'
import Link from 'next/link'
import { siteConfig } from '@/data/site-content'
import AnimatedSection from '@/components/ui/AnimatedSection'

interface CTASectionProps {
  heading?: string
  subtext?: string
}

export default function CTASection({
  heading = 'Ready to Order?',
  subtext = 'Call us to discuss your event, customize your board, or book our full-service cart. Free delivery in the Sarasota area!',
}: CTASectionProps) {
  return (
    <section className="relative py-24 px-6 bg-burgundy overflow-hidden">
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #FDF6EC 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-[700px] mx-auto text-center">
        <AnimatedSection>
          <p className="section-label text-gold-light">Get in Touch</p>
          <h2 className="font-display text-section font-normal text-cream mb-6">
            {heading}
          </h2>
          <p className="font-body text-lg leading-relaxed text-white/70 mb-10">
            {subtext}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <a
            href={siteConfig.phoneLink}
            className="inline-block px-12 py-5 bg-gold text-white font-display text-2xl font-medium no-underline rounded-sm mb-8 hover:bg-gold-light transition-all hover:-translate-y-0.5"
          >
            {siteConfig.phone}
          </a>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <div className="flex justify-center gap-10 flex-wrap pt-8 border-t border-white/10">
            <div>
              <p className="font-sans text-[11px] tracking-[2px] uppercase text-white/40 mb-1">
                Service Area
              </p>
              <p className="font-body text-[17px] text-cream">
                {siteConfig.serviceArea}
              </p>
            </div>
            <div>
              <p className="font-sans text-[11px] tracking-[2px] uppercase text-white/40 mb-1">
                Delivery
              </p>
              <p className="font-body text-[17px] text-cream">
                Free · Fresh · Made to Order
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
