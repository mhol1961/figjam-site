import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Answers to common questions about ordering charcuterie boards and cart service from Fig Jam Charcuterie — lead times, delivery area, dietary options, cart inclusions, and cancellation policy.',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'Frequently Asked Questions | Fig Jam Charcuterie',
    description:
      'Lead times, delivery, dietary options, and everything else you might want to know before ordering.',
    url: '/faq',
    type: 'website',
  },
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children
}
