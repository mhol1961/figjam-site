import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Fig Jam Charcuterie LLC — our story, how it works, and the occasions we serve in Sarasota, FL.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Fig Jam Charcuterie',
    description:
      'Meet Elizabeth Kent, owner of Fig Jam Charcuterie LLC, and learn how we craft custom boards and mobile cart experiences in Sarasota.',
    url: '/about',
    type: 'website',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
