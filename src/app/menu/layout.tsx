import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Boards & Menu | Fig Jam Charcuterie',
  description: 'Explore our charcuterie boards, cups, and customizable ingredient options. Fresh, made to order with free delivery in Sarasota, FL.',
}

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return children
}
