import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Charcuterie Cart Service | Fig Jam Charcuterie',
  description: 'Full-service charcuterie cart rental for weddings, showers, corporate events & more. Starting at $300. Sarasota, FL.',
}

export default function CartServiceLayout({ children }: { children: React.ReactNode }) {
  return children
}
