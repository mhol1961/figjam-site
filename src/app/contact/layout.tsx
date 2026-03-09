import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | Fig Jam Charcuterie',
  description: 'Contact Fig Jam Charcuterie to order boards, cups, or book our cart service. Call 941-914-0007. Sarasota, FL.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
