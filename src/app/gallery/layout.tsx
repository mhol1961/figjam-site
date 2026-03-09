import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gallery | Fig Jam Charcuterie',
  description: 'See our beautiful charcuterie boards, beach picnics, and event setups. Serving Sarasota, Siesta Key & surrounding areas.',
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children
}
