'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import AnimatedSection from './AnimatedSection'
import { boards, cartService } from '@/data/site-content'

export default function PricingGlance() {
  return (
    <section className="py-20 px-6 bg-cream">
      <div className="max-w-[1100px] mx-auto">
        <AnimatedSection className="text-center mb-12">
          <p className="section-label">At a Glance</p>
          <h2 className="section-title">
            Boards & Carts, <em>Starting At</em>
          </h2>
          <p className="body-text max-w-[600px] mx-auto mt-4">
            Custom options for every event — no guessing on price.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
          {boards.map((b, i) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-warm-white p-6 rounded-sm border-t-[3px] border-gold text-center"
            >
              <p className="font-sans text-[11px] tracking-[2px] uppercase text-warm-gray mb-3">
                {b.name}
              </p>
              <p className="font-display text-4xl text-burgundy mb-2">
                {b.priceLabel}
              </p>
              <p className="font-body text-sm text-warm-gray">{b.serves}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-warm-white p-8 rounded-sm border-l-[4px] border-gold flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10"
        >
          <div>
            <p className="font-sans text-[11px] tracking-[2px] uppercase text-warm-gray mb-2">
              Mobile Charcuterie Cart Experience
            </p>
            <p className="font-display text-3xl text-burgundy">
              From ${cartService.basePrice}
              <span className="font-body text-xl text-warm-gray">
                {' '}
                for {cartService.baseDuration}
              </span>
            </p>
            <p className="font-body text-base text-warm-gray mt-2">
              {cartService.perGuest} per guest · {cartService.minGuests}-guest minimum
            </p>
          </div>
          <Link href="/cart-service" className="btn-outline whitespace-nowrap">
            Cart Details
          </Link>
        </motion.div>

        <AnimatedSection delay={0.5} className="text-center">
          <Link href="/menu" className="btn-primary">
            See All Pricing & Details →
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
