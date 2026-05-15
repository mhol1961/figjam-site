import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Boards & Menu',
  description:
    'Charcuterie cups, small, medium, and large boards from $12 to $175. Customizable cheese, meat, fruit, cracker, and sweet options. Fresh delivery in Sarasota, FL.',
  alternates: { canonical: '/menu' },
  openGraph: {
    title: 'Charcuterie Boards & Menu | Fig Jam Charcuterie',
    description:
      'Real prices, real options. Cups ($12), Small ($50), Medium ($125), Large ($175), plus the mobile cart experience from $300.',
    url: '/menu',
    type: 'website',
  },
}

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return children
}
