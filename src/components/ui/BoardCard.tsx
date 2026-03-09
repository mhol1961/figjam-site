'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface BoardCardProps {
  name: string
  price: string
  serves: string
  description: string
  accentColor: string
  image?: string
}

const ACCENT_COLORS: Record<string, string> = {
  cups: '#8B9A7B',     // sage
  small: '#8B2E3B',    // wine
  medium: '#C4953A',   // gold
  large: '#6B1D2A',    // burgundy
}

export default function BoardCard({
  name,
  price,
  serves,
  description,
  accentColor,
  image,
}: BoardCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: '0 20px 50px rgba(0,0,0,0.12)' }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-sm border border-light-gray relative overflow-hidden group cursor-pointer"
    >
      {/* Image area */}
      <div className="relative h-[220px] overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${accentColor}30, ${accentColor}15)`,
            }}
          >
            <span
              className="font-display text-5xl opacity-20"
              style={{ color: accentColor }}
            >
              FJ
            </span>
          </div>
        )}

        {/* Price badge */}
        <div
          className="absolute top-4 right-4 px-3 py-1.5 rounded-sm text-white font-display text-lg font-semibold shadow-md"
          style={{ background: accentColor }}
        >
          {price}
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="font-sans text-[11px] tracking-[3px] uppercase text-warm-gray mb-1">
          {serves}
        </p>
        <h3 className="font-display text-[22px] font-medium text-charcoal mb-2">
          {name}
        </h3>
        <p className="font-body text-[15px] leading-relaxed text-warm-gray">
          {description}
        </p>
      </div>

      {/* Bottom accent bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[3px]"
        style={{ background: accentColor }}
      />
    </motion.div>
  )
}

export { ACCENT_COLORS }
