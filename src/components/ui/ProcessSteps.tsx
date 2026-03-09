'use client'

import { ClipboardList, Palette, Truck } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { howItWorks } from '@/data/site-content'

const iconMap = { ClipboardList, Palette, Truck }

export default function ProcessSteps() {
  return (
    <section className="py-24 px-6 bg-cream">
      <div className="max-w-[1100px] mx-auto">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="section-label">How It Works</p>
            <h2 className="section-title">
              Three Simple <em>Steps</em>
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-[52px] left-[16.67%] right-[16.67%] h-px border-t-2 border-dashed border-gold/30" />

          {howItWorks.map((step, i) => {
            const Icon = iconMap[step.icon as keyof typeof iconMap]
            return (
              <AnimatedSection key={step.step} delay={i * 0.2}>
                <div className="text-center relative">
                  {/* Step number circle */}
                  <div className="w-[104px] h-[104px] mx-auto mb-6 relative">
                    <div className="absolute inset-0 rounded-full bg-burgundy/5" />
                    <div className="absolute inset-3 rounded-full bg-burgundy/10 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-burgundy flex items-center justify-center">
                        <Icon size={28} className="text-cream" />
                      </div>
                    </div>
                    {/* Step number badge */}
                    <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-gold flex items-center justify-center">
                      <span className="font-display text-sm font-bold text-white">
                        {step.step}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-display text-xl text-charcoal mb-3">
                    {step.title}
                  </h3>
                  <p className="font-body text-base leading-relaxed text-warm-gray max-w-[280px] mx-auto">
                    {step.description}
                  </p>
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
