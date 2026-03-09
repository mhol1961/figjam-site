import type { Metadata } from 'next'
import '@/styles/globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import StickyMobileCTA from '@/components/layout/StickyMobileCTA'
import PhoneFAB from '@/components/ui/PhoneFAB'

export const metadata: Metadata = {
  title: 'Fig Jam Charcuterie LLC | Sweet & Savory Charcuterie in Sarasota, FL',
  description:
    'Artisanal charcuterie boards, boxes, cups & full-service cart rental in Sarasota, Siesta Key & surrounding areas. Fresh, made to order with free delivery. Call 941-914-0007.',
  keywords:
    'charcuterie, Sarasota, Siesta Key, charcuterie board, grazing table, beach picnic, catering, event food',
  openGraph: {
    title: 'Fig Jam Charcuterie LLC',
    description:
      'Sweet & Savory Charcuterie — Fresh boards, boxes & picnics with free delivery in Sarasota, FL',
    url: 'https://www.figjamcharcuteriellc.com',
    siteName: 'Fig Jam Charcuterie',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="pb-[72px] md:pb-0">
        <Navbar />
        {children}
        <Footer />
        <PhoneFAB />
        <StickyMobileCTA />
      </body>
    </html>
  )
}
