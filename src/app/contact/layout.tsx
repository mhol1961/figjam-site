import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Fig Jam Charcuterie to order boards, cups, or book the mobile charcuterie cart. Call 941-914-0007 or send an event inquiry. Sarasota, FL.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Fig Jam Charcuterie',
    description:
      'Send an event inquiry or call 941-914-0007. We reply within 24 hours.',
    url: '/contact',
    type: 'website',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
