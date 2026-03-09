import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Testimonials | Fig Jam Charcuterie',
  description: 'Read what our customers say about Fig Jam Charcuterie. Five-star reviews from Sarasota, Siesta Key & beyond.',
}

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return children
}
