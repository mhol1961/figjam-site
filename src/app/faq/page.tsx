'use client'

import PageHero from '@/components/layout/PageHero'
import CTASection from '@/components/layout/CTASection'
import AnimatedSection from '@/components/ui/AnimatedSection'
import FAQAccordion from '@/components/ui/FAQAccordion'
import { faqItems } from '@/data/site-content'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}

export default function FAQPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about ordering"
      />

      <section className="py-24 px-6 bg-cream">
        <div className="max-w-[800px] mx-auto">
          <AnimatedSection>
            <FAQAccordion items={faqItems} />
          </AnimatedSection>
        </div>
      </section>

      <CTASection
        heading="Still Have Questions?"
        subtext="Give us a call — we're happy to help you plan the perfect charcuterie experience for your event."
      />
    </main>
  )
}
