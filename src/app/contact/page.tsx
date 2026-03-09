'use client'

import PageHero from '@/components/layout/PageHero'
import CTASection from '@/components/layout/CTASection'
import AnimatedSection from '@/components/ui/AnimatedSection'
import ContactForm from '@/components/ui/ContactForm'
import { siteConfig } from '@/data/site-content'
import { Phone, MapPin, Truck } from 'lucide-react'

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: siteConfig.phone,
    href: siteConfig.phoneLink,
  },
  {
    icon: MapPin,
    label: 'Service Area',
    value: siteConfig.serviceArea,
  },
  {
    icon: Truck,
    label: 'Delivery',
    value: 'Free delivery · Fresh · Made to order',
  },
]

export default function ContactPage() {
  return (
    <main>
      <PageHero
        title="Let's Connect"
        subtitle="We'd love to hear about your event"
      />

      <section className="py-24 px-6 bg-cream">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex gap-16 flex-wrap">
            <AnimatedSection className="flex-1 min-w-[280px]">
              <p className="section-label">Get in Touch</p>
              <h2 className="section-title mb-8">
                We&apos;re Here to <em>Help</em>
              </h2>

              <div className="space-y-6 mb-8">
                {contactInfo.map((info) => (
                  <div
                    key={info.label}
                    className="bg-white rounded-sm p-6 border border-light-gray flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center flex-shrink-0">
                      <info.icon size={20} className="text-burgundy" />
                    </div>
                    <div>
                      <p className="font-sans text-[11px] tracking-[2px] uppercase text-warm-gray mb-1">
                        {info.label}
                      </p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="font-display text-xl text-burgundy no-underline hover:text-gold transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="font-body text-lg text-charcoal">
                          {info.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <p className="font-body text-base text-warm-gray italic">
                Serving {siteConfig.serviceArea}. Contact us for locations
                outside our standard delivery range.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="flex-1 min-w-[320px]">
              <ContactForm />
            </AnimatedSection>
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  )
}
