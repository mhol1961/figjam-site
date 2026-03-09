'use client'

import { motion } from 'framer-motion'
import { ChefHat, Leaf, Truck, Star } from 'lucide-react'
import { socialProof } from '@/data/site-content'

const icons = [ChefHat, Leaf, Truck, Star]

export default function SocialProofBar() {
  return (
    <section className="py-16 px-6 bg-white border-y border-light-gray">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {socialProof.map((stat, i) => {
            const Icon = icons[i]
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <Icon size={24} className="text-gold mx-auto mb-3" />
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                  className="font-display text-4xl md:text-5xl font-semibold text-burgundy block mb-1"
                >
                  {stat.value}
                </motion.span>
                <span className="font-sans text-[11px] tracking-[3px] uppercase text-warm-gray">
                  {stat.label}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
