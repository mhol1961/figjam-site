'use client'

import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'
import { siteConfig } from '@/data/site-content'

export default function PhoneFAB() {
  return (
    <motion.a
      href={siteConfig.phoneLink}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 200 }}
      className="hidden md:flex fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full bg-gold text-white items-center justify-center shadow-lg hover:bg-gold-light hover:scale-110 hover:shadow-xl transition-all group"
      aria-label={`Call ${siteConfig.phone}`}
    >
      <Phone size={24} />
      {/* Tooltip */}
      <span className="absolute right-full mr-3 px-3 py-1.5 bg-charcoal text-cream font-sans text-xs tracking-wider rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {siteConfig.phone}
      </span>
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-gold animate-ping opacity-20" />
    </motion.a>
  )
}
