'use client'

import { useState } from 'react'
import { boards } from '@/data/site-content'

const eventTypes = [
  'Date Night',
  'Birthday Party',
  'Bridal Shower',
  'Baby Shower',
  'Corporate Event',
  'Beach Picnic',
  'Wedding',
  'Game Day',
  'Other',
]

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const inputClasses =
    'w-full px-4 py-3 bg-white border border-light-gray rounded-sm font-body text-base text-charcoal placeholder:text-warm-gray/50 focus:outline-none focus:border-gold transition-colors'
  const labelClasses =
    'block font-sans text-[11px] tracking-[2px] uppercase text-warm-gray mb-2'

  if (submitted) {
    return (
      <div className="bg-white rounded-sm border border-light-gray p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-sage/20 flex items-center justify-center mx-auto mb-4">
          <span className="text-sage text-2xl">✓</span>
        </div>
        <h3 className="font-display text-2xl text-charcoal mb-2">Thank You!</h3>
        <p className="font-body text-lg text-warm-gray">
          We&apos;ll be in touch soon to discuss your event.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setSubmitted(true)
      }}
      className="space-y-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClasses}>Name *</label>
          <input type="text" required className={inputClasses} placeholder="Your name" />
        </div>
        <div>
          <label className={labelClasses}>Phone *</label>
          <input type="tel" required className={inputClasses} placeholder="(941) 000-0000" />
        </div>
      </div>

      <div>
        <label className={labelClasses}>Email *</label>
        <input type="email" required className={inputClasses} placeholder="your@email.com" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClasses}>Event Date</label>
          <input type="date" className={inputClasses} />
        </div>
        <div>
          <label className={labelClasses}>Event Type</label>
          <select className={inputClasses}>
            <option value="">Select type...</option>
            {eventTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClasses}>Estimated Guest Count</label>
          <input type="number" min="1" className={inputClasses} placeholder="Number of guests" />
        </div>
        <div>
          <label className={labelClasses}>Board Size Interest</label>
          <select className={inputClasses}>
            <option value="">Select size...</option>
            {boards.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name} — {b.priceLabel}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClasses}>Message</label>
        <textarea
          rows={4}
          className={inputClasses + ' resize-none'}
          placeholder="Tell us about your event or any special requests..."
        />
      </div>

      <button type="submit" className="btn-primary w-full text-center">
        Send Inquiry
      </button>
    </form>
  )
}
