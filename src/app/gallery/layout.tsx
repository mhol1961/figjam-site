import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Photos of Fig Jam Charcuterie boards, beach picnics, mobile cart setups, and event installations. Sarasota, Siesta Key, Lakewood Ranch.',
  alternates: { canonical: '/gallery' },
  openGraph: {
    title: 'Fig Jam Charcuterie Gallery',
    description:
      'Real charcuterie boards and event setups crafted for clients across Sarasota and Siesta Key.',
    url: '/gallery',
    type: 'website',
  },
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children
}
