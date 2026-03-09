import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | Fig Jam Charcuterie',
  description: 'Learn about Fig Jam Charcuterie LLC — our story, how it works, and the occasions we serve in Sarasota, FL.',
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
