import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ | Fig Jam Charcuterie',
  description: 'Frequently asked questions about ordering, delivery, dietary options, and cart service from Fig Jam Charcuterie.',
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children
}
