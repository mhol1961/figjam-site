'use client'

import { useState } from 'react'
import Image from 'next/image'
import PageHero from '@/components/layout/PageHero'
import CTASection from '@/components/layout/CTASection'
import AnimatedSection from '@/components/ui/AnimatedSection'
import BoardCard from '@/components/ui/BoardCard'
import CategoryFilter from '@/components/ui/CategoryFilter'
import { boards, menuCategories } from '@/data/site-content'
import { assetPath } from '@/lib/utils'

const boardAccentColors = ['#8B9A7B', '#8B2E3B', '#C4953A', '#6B1D2A']
const boardImages = [
  assetPath('/images/tasteful-option1.png'),
  assetPath('/images/tasteful-option2.png'),
  assetPath('/images/tasteful-option5.png'),
  assetPath('/images/tasteful-option4.png'),
]

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].key)
  const activeItems = menuCategories.find((c) => c.key === activeCategory)

  return (
    <main>
      <PageHero
        title="Our Boards & Menu"
        subtitle="Fresh, made to order with free delivery in the Sarasota area"
      />

      {/* Board Sizes */}
      <section className="py-24 px-6 bg-warm-white">
        <div className="max-w-[1100px] mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="font-sans text-sm font-semibold tracking-[4px] uppercase text-burgundy mb-4">Choose Your Size</p>
              <h2 className="section-title">
                Our <em>Boards</em>
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
        </div>
      </section>

      {/* Feature image before ingredient browser */}
      <section className="py-0 bg-cream">
        <div className="max-w-[1100px] mx-auto px-6">
          <AnimatedSection>
            <div className="relative h-[300px] md:h-[400px] rounded-sm overflow-hidden">
              <Image
                src={assetPath("/images/tasteful-option-page-customize-your-eperience.png")}
                alt="Artisanal cheese and berries with rosé wine"
                fill
                className="object-cover"
                sizes="(max-width: 1100px) 100vw, 1100px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-burgundy/50 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8">
                <p className="font-sans text-sm font-semibold tracking-[3px] uppercase text-cream mb-2">
                  Build Your Perfect Board
                </p>
                <p className="font-display text-3xl text-cream">
                  Every Ingredient, <em>Handpicked</em>
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Ingredient Browser */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-[1100px] mx-auto">
          <AnimatedSection>
            <div className="bg-burgundy rounded-sm p-10 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-radial from-gold/10 to-transparent" />

              <h3 className="font-display text-[28px] font-normal text-cream mb-2 relative">
                Customize Your <em>Experience</em>
              </h3>
              <p className="font-body text-[17px] text-white/60 mb-8 relative">
                Select from our curated ingredients to build your perfect board
              </p>

              <div className="relative mb-6">
                <CategoryFilter
                  categories={menuCategories.map((c) => ({
                    key: c.key,
                    label: c.label,
                  }))}
                  activeKey={activeCategory}
                  onSelect={setActiveCategory}
                  variant="dark"
                />
              </div>

              <div className="relative">
                <p className="font-body text-lg leading-[2] text-white/80">
                  {activeItems?.items.join(' · ')}
                </p>
                {activeItems?.note && (
                  <p className="font-body text-sm italic text-white/50 mt-3">
                    {activeItems.note}
                  </p>
                )}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <p className="text-center mt-8 font-body text-base italic text-warm-gray">
              Pricing may vary by menu selection · Vegan, Gluten Free & Dairy
              Free options available
            </p>
            <p className="text-center mt-2 font-body text-base italic text-warm-gray">
              If your favorite isn&apos;t listed, please tell us — we love
              custom requests!
            </p>
          </AnimatedSection>
        </div>
      </section>

      <CTASection />
    </main>
  )
}
