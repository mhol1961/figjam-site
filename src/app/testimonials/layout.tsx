import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Testimonials',
  description:
    'Read what real Fig Jam Charcuterie clients say about our boards, cart service, and event experiences. Five-star reviews from Sarasota, Siesta Key, and beyond.',
  alternates: { canonical: '/testimonials' },
  openGraph: {
    title: 'Testimonials | Fig Jam Charcuterie',
    description:
      'Customer reviews from real events served across Sarasota and Siesta Key.',
    url: '/testimonials',
    type: 'website',
  },
}

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return children
}
