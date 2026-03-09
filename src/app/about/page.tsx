'use client'

import Image from 'next/image'
import PageHero from '@/components/layout/PageHero'
import CTASection from '@/components/layout/CTASection'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { aboutContent, siteConfig } from '@/data/site-content'
import { assetPath } from '@/lib/utils'
import { ClipboardList, Palette, Truck } from 'lucide-react'

const steps = [
  {
    icon: ClipboardList,
    title: 'Choose Your Board',
    description:
      'Select from our curated sizes — cups, small, medium, or large — to fit your occasion and guest count.',
  },
  {
    icon: Palette,
    title: 'Customize Your Selection',
    description:
      'Pick your favorite cheeses, meats, fruits, and extras. We accommodate vegan, gluten-free, and dairy-free options.',
  },
  {
    icon: Truck,
    title: 'We Deliver Fresh to You',
    description:
      'We prepare everything fresh and deliver right to your door — free delivery throughout the Sarasota area.',
  },
]

export default function AboutPage() {
  return (
    <main>
      <PageHero title="Our Story" subtitle="Passion, freshness, and a love for great food" />

      <section className="py-24 px-6 bg-cream">
        <div className="max-w-[1100px] mx-auto flex gap-16 items-center flex-wrap">
          <AnimatedSection className="flex-1 min-w-[300px]">
            <div className="relative aspect-[3/4] max-w-[420px] rounded-sm overflow-hidden">
              <Image
                src={assetPath("/images/tasteful-option6.png")}
                alt="Fig Jam signature charcuterie board"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 420px"
              />
              <div className="absolute -top-0.5 -left-0.5 w-[60px] h-[60px] border-t-[3px] border-l-[3px] border-gold" />
              <div className="absolute -bottom-0.5 -right-0.5 w-[60px] h-[60px] border-b-[3px] border-r-[3px] border-gold" />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="flex-1 min-w-[300px]">
            <p className="section-label">Our Story</p>
            <h2 className="section-title mb-6">
              Made with <em>Heart</em>
            </h2>
            <p className="body-text mb-5">{aboutContent.story}</p>
            <p className="body-text mb-5">{aboutContent.mission}</p>
            <p className="body-text mb-8">{aboutContent.serving}</p>

            <div className="border-l-[3px] border-gold pl-6 mb-6">
              <p className="font-display text-xl italic text-burgundy leading-relaxed">
                &ldquo;We value freshness, quality, and presentation — treating
                every customer the way we&apos;d want to be treated.&rdquo;
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-px bg-gold" />
              <span className="font-display text-base italic text-burgundy">
                {siteConfig.owner}, Owner
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24 px-6 bg-warm-white">
        <div className="max-w-[1100px] mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="section-label">How It Works</p>
              <h2 className="section-title">
                Three Simple <em>Steps</em>
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <AnimatedSection key={step.title} delay={i * 0.15}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-burgundy/10 flex items-center justify-center mx-auto mb-4">
                    <step.icon size={28} className="text-burgundy" />
                  </div>
                  <span className="font-sans text-xs tracking-[3px] uppercase text-gold block mb-2">
                    Step {i + 1}
                  </span>
                  <h3 className="font-display text-xl text-charcoal mb-3">
                    {step.title}
                  </h3>
                  <p className="font-body text-base leading-relaxed text-warm-gray">
                    {step.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-cream">
        <div className="max-w-[1100px] mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="section-label">Perfect For</p>
              <h2 className="section-title">
                Every <em>Occasion</em>
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {aboutContent.occasions.map((occasion, i) => (
              <AnimatedSection key={occasion} delay={i * 0.05}>
                <div className="bg-white rounded-sm p-5 border border-light-gray text-center hover:shadow-md hover:-translate-y-1 transition-all">
                  <p className="font-body text-base text-charcoal">
                    {occasion}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-warm-white">
        <div className="max-w-[700px] mx-auto text-center">
          <AnimatedSection>
            <p className="section-label">Serving</p>
            <h2 className="font-display text-3xl text-burgundy mb-4">
              {siteConfig.serviceArea}
            </h2>
            <p className="body-text">
              Free delivery on all orders. We bring fresh, artisanal charcuterie
              right to your door.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <CTASection />
    </main>
  )
}
