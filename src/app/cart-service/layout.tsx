import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Charcuterie Cart Service',
  description:
    'Full-service mobile charcuterie cart rental for weddings, showers, corporate events, and beach picnics in Sarasota. Starts at $300 for 2 hours, $15-25 per guest.',
  alternates: { canonical: '/cart-service' },
  openGraph: {
    title: 'Mobile Charcuterie Cart Experience | Fig Jam',
    description:
      'Cart setup, custom menu, dedicated server, and signage. From $300 for 2 hours. Sarasota, Siesta Key, Lakewood Ranch.',
    url: '/cart-service',
    type: 'website',
  },
}

export default function CartServiceLayout({ children }: { children: React.ReactNode }) {
  return children
}
