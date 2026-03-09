import Image from 'next/image'
import { Star } from 'lucide-react'

interface TestimonialCardProps {
  name: string
  text: string
  occasion: string
  rating: number
  image?: string
}

export default function TestimonialCard({
  name,
  text,
  occasion,
  rating,
  image,
}: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-sm border border-light-gray h-full flex flex-col overflow-hidden group">
      {/* Optional photo */}
      {image && (
        <div className="relative h-[180px] overflow-hidden">
          <Image
            src={image}
            alt={`${name}'s ${occasion} with Fig Jam`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          {/* Occasion badge */}
          <span className="absolute bottom-3 left-4 font-sans text-[10px] tracking-[2px] uppercase text-cream bg-burgundy/80 backdrop-blur-sm px-3 py-1 rounded-sm">
            {occasion}
          </span>
        </div>
      )}

      <div className="p-8 flex flex-col flex-1">
        {/* Decorative quote */}
        <span className="font-display text-[56px] leading-[0.8] text-gold/30 block mb-3">
          &ldquo;
        </span>

        <p className="font-body text-lg leading-relaxed text-charcoal flex-1">
          {text}
        </p>

        <div className="mt-6 pt-4 border-t border-light-gray">
          {/* Stars */}
          <div className="flex gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < rating ? 'text-gold fill-gold' : 'text-light-gray'}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-burgundy ring-2 ring-gold/30 flex items-center justify-center font-display text-sm text-cream">
              {name[0]}
            </div>
            <div>
              <span className="font-sans text-[13px] font-medium tracking-wider text-charcoal block">
                {name}
              </span>
              {!image && (
                <span className="font-body text-sm text-warm-gray">{occasion}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
