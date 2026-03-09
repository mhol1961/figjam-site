'use client'

import { useState } from 'react'
import Image from 'next/image'
import PageHero from '@/components/layout/PageHero'
import CTASection from '@/components/layout/CTASection'
import AnimatedSection from '@/components/ui/AnimatedSection'
import CategoryFilter from '@/components/ui/CategoryFilter'
import { assetPath } from '@/lib/utils'

const galleryCategories = [
  { key: 'all', label: 'All' },
  { key: 'boards', label: 'Boards' },
  { key: 'picnic', label: 'Beach Picnics' },
  { key: 'events', label: 'Events' },
  { key: 'cups', label: 'Cups & Boxes' },
]

const galleryItems = [
  { id: 1, src: assetPath('/images/hero-board-image.png'), category: 'boards', alt: 'Signature charcuterie board with salami roses', span: true },
  { id: 2, src: assetPath('/images/tasteful-option1.png'), category: 'cups', alt: 'Charcuterie cup at golden hour outdoor event', span: false },
  { id: 3, src: assetPath('/images/tasteful-option2.png'), category: 'boards', alt: 'Small board perfect for movie night', span: false },
  { id: 4, src: assetPath('/images/tasteful-option3.png'), category: 'picnic', alt: 'Beach picnic setup with wine and tiered display', span: true },
  { id: 5, src: assetPath('/images/tasteful-option4.png'), category: 'boards', alt: 'Tiered charcuterie display with stuffed peppers', span: false },
  { id: 6, src: assetPath('/images/tasteful-option5.png'), category: 'events', alt: 'Large board at a gathering with friends', span: false },
  { id: 7, src: assetPath('/images/tasteful-option6.png'), category: 'boards', alt: 'Overhead view of artisan board with salami roses', span: false },
  { id: 8, src: assetPath('/images/hannah-testimonial-block-image.png'), category: 'events', alt: '50th birthday celebration with charcuterie', span: true },
  { id: 9, src: assetPath('/images/jared-testimonial-image.png'), category: 'picnic', alt: 'Siesta Key beach picnic with rosé', span: false },
  { id: 10, src: assetPath('/images/tasteful-option-page-customize-your-eperience.png'), category: 'boards', alt: 'Artisanal cheese with berries close-up', span: false },
]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  const filtered =
    activeCategory === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory)

  return (
    <main>
      <PageHero title="Our Work" subtitle="A showcase of our artisanal creations" />

      <section className="py-24 px-6 bg-cream">
        <div className="max-w-[1100px] mx-auto">
          <AnimatedSection>
            <div className="mb-12">
              <CategoryFilter
                categories={galleryCategories}
                activeKey={activeCategory}
                onSelect={setActiveCategory}
              />
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[250px] gap-4">
            {filtered.map((item, i) => (
              <AnimatedSection
                key={item.id}
                delay={i * 0.08}
                className={item.span ? 'row-span-2' : ''}
              >
                <div
                  className="h-full rounded-sm overflow-hidden relative cursor-pointer group"
                  onClick={() => setLightboxImage(item.src)}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-burgundy/0 group-hover:bg-burgundy/30 transition-colors duration-300 flex items-center justify-center">
                    <span className="font-sans text-xs tracking-[3px] uppercase text-cream opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View
                    </span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6 cursor-pointer"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-[900px] max-h-[80vh] w-full h-full">
            <Image
              src={lightboxImage}
              alt="Gallery image enlarged"
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
          <button
            className="absolute top-6 right-6 text-white/80 hover:text-white font-sans text-sm tracking-[2px] uppercase"
            onClick={() => setLightboxImage(null)}
          >
            Close
          </button>
        </div>
      )}

      <CTASection />
    </main>
  )
}
