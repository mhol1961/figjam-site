'use client'

import Image from 'next/image'

interface ParallaxDividerProps {
  imageSrc: string
  alt?: string
  height?: string
  quote?: string
  overlayOpacity?: string
}

export default function ParallaxDivider({
  imageSrc,
  alt = 'Decorative food image',
  height = 'h-[300px] md:h-[400px]',
  quote,
  overlayOpacity = 'bg-burgundy/40',
}: ParallaxDividerProps) {
  const isExternal = imageSrc.startsWith('http')

  return (
    <section className={`relative ${height} overflow-hidden`}>
      {isExternal ? (
        <Image
          src={imageSrc}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
        />
      ) : (
        <Image
          src={imageSrc}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
        />
      )}

      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayOpacity}`} />

      {/* Optional quote */}
      {quote && (
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <p className="font-display text-2xl md:text-4xl text-cream text-center max-w-[700px] italic leading-relaxed">
            &ldquo;{quote}&rdquo;
          </p>
        </div>
      )}
    </section>
  )
}
