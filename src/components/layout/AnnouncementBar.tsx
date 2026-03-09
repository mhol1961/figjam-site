'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { announcementMessages } from '@/data/site-content'

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  const text = announcementMessages.join('     ·     ')
  // Duplicate for seamless loop
  const marqueeContent = `${text}     ·     ${text}     ·     `

  return (
    <div className="bg-burgundy text-cream relative z-[60] overflow-hidden">
      <div className="flex items-center">
        <div className="flex-1 overflow-hidden py-2.5">
          <div className="animate-marquee whitespace-nowrap">
            <span className="font-sans text-[11px] tracking-[2px] uppercase">
              {marqueeContent}
            </span>
          </div>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="px-3 py-2 text-cream/60 hover:text-cream transition-colors flex-shrink-0"
          aria-label="Close announcement"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  )
}
