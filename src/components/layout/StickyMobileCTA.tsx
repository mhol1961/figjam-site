'use client'

import { Phone, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { siteConfig } from '@/data/site-content'

export default function StickyMobileCTA() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-cream/95 backdrop-blur-md border-t border-light-gray px-4 py-3 safe-area-bottom">
      <div className="flex gap-3">
        <a
          href={siteConfig.phoneLink}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-burgundy text-cream font-sans text-xs tracking-[2px] uppercase rounded-sm"
        >
          <Phone size={16} />
          Call Now
        </a>
        <Link
          href="/contact"
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-gold text-white font-sans text-xs tracking-[2px] uppercase rounded-sm no-underline"
        >
          <ShoppingBag size={16} />
          Order Now
        </Link>
      </div>
    </div>
  )
}
