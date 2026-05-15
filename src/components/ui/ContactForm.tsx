'use client'

import { useState, useRef, FormEvent } from 'react'
import { boards } from '@/data/site-content'

const SUBMIT_TIMEOUT_MS = 15000

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

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

const WEBHOOK_URL = process.env.NEXT_PUBLIC_GHL_WEBHOOK_URL ?? ''

export default function ContactForm() {
  const [status, setStatus] = useState<SubmitState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const isSubmittingRef = useRef(false)
  const [idempotencyId] = useState(() =>
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `fallback-${Date.now()}-${Math.random().toString(36).slice(2)}`
  )

  const today = new Date().toISOString().slice(0, 10)

  const inputClasses =
    'w-full px-4 py-3 bg-white border border-light-gray rounded-sm font-body text-base text-charcoal placeholder:text-warm-gray/50 focus:outline-none focus:border-gold transition-colors'
  const labelClasses =
    'block font-sans text-[11px] tracking-[2px] uppercase text-warm-gray mb-2'

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (isSubmittingRef.current) return
    isSubmittingRef.current = true
    setStatus('submitting')
    setErrorMsg('')

    const formData = new FormData(e.currentTarget)

    if (formData.get('website')) {
      setStatus('success')
      return
    }

    const payload = {
      name: String(formData.get('name') ?? '').trim(),
      phone: String(formData.get('phone') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      event_date: String(formData.get('event_date') ?? ''),
      event_type: String(formData.get('event_type') ?? ''),
      guest_count: Number(formData.get('guest_count')) || 0,
      board_size_interest: String(formData.get('board_size_interest') ?? ''),
      message: String(formData.get('message') ?? '').trim(),
      source: 'figjamcharcuteriellc.com contact form',
      submitted_at: new Date().toISOString(),
      idempotency_id: idempotencyId,
    }

    if (!WEBHOOK_URL) {
      console.error('NEXT_PUBLIC_GHL_WEBHOOK_URL is not configured.')
      setStatus('error')
      setErrorMsg(
        "We're having trouble submitting your inquiry. Please call us directly at 941-914-0007 and we'll get you taken care of right away."
      )
      isSubmittingRef.current = false
      return
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS)

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      })
      clearTimeout(timeoutId)

      if (!res.ok) throw new Error(`Webhook returned ${res.status}`)
      setStatus('success')
    } catch (err) {
      clearTimeout(timeoutId)
      const timedOut = err instanceof Error && err.name === 'AbortError'
      console.error('Form submission failed:', timedOut ? 'timeout' : err)
      setStatus('error')
      setErrorMsg(
        timedOut
          ? "Your submission timed out. Please call us at 941-914-0007 — we'll get you taken care of right away."
          : "Something went wrong sending your inquiry. Please call us at 941-914-0007 or email directly — we'll respond within 24 hours."
      )
      isSubmittingRef.current = false
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-white rounded-sm border border-light-gray p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-sage/20 flex items-center justify-center mx-auto mb-4">
          <span className="text-sage text-2xl">✓</span>
        </div>
        <h3 className="font-display text-2xl text-charcoal mb-2">Thank You!</h3>
        <p className="font-body text-lg text-warm-gray">
          We&apos;ll be in touch within 24 hours to discuss your event.
        </p>
        <p className="font-body text-base text-warm-gray mt-4">
          For urgent (&lt;48hr) events, call{' '}
          <a href="tel:9419140007" className="text-burgundy font-medium underline">
            941-914-0007
          </a>
          .
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClasses}>Name *</label>
          <input
            type="text"
            name="name"
            required
            className={inputClasses}
            placeholder="Your name"
          />
        </div>
        <div>
          <label className={labelClasses}>Phone *</label>
          <input
            type="tel"
            name="phone"
            required
            className={inputClasses}
            placeholder="(941) 000-0000"
          />
        </div>
      </div>

      <div>
        <label className={labelClasses}>Email *</label>
        <input
          type="email"
          name="email"
          required
          className={inputClasses}
          placeholder="your@email.com"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClasses}>Event Date</label>
          <input type="date" name="event_date" min={today} className={inputClasses} />
        </div>
        <div>
          <label className={labelClasses}>Event Type</label>
          <select name="event_type" className={inputClasses} defaultValue="">
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
          <input
            type="number"
            name="guest_count"
            min="1"
            className={inputClasses}
            placeholder="Number of guests"
          />
        </div>
        <div>
          <label className={labelClasses}>Board Size Interest</label>
          <select name="board_size_interest" className={inputClasses} defaultValue="">
            <option value="">Select size...</option>
            {boards.map((b) => (
              <option key={b.id} value={b.name}>
                {b.name} — {b.priceLabel}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClasses}>Message</label>
        <textarea
          name="message"
          rows={4}
          className={inputClasses + ' resize-none'}
          placeholder="Tell us about your event or any special requests..."
        />
      </div>

      {status === 'error' && errorMsg && (
        <div className="bg-burgundy/5 border border-burgundy/20 rounded-sm p-4">
          <p className="font-body text-base text-burgundy">{errorMsg}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-primary w-full text-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'Sending...' : 'Send Inquiry'}
      </button>
    </form>
  )
}
