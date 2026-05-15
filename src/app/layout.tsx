import type { Metadata } from 'next'
import '@/styles/globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import StickyMobileCTA from '@/components/layout/StickyMobileCTA'
import PhoneFAB from '@/components/ui/PhoneFAB'
import { SITE_URL, absoluteUrl } from '@/lib/site-url'
import { siteConfig } from '@/data/site-content'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Fig Jam Charcuterie LLC | Sweet & Savory Charcuterie in Sarasota, FL',
    template: '%s | Fig Jam Charcuterie',
  },
  description:
    'Artisanal charcuterie boards, boxes, cups & full-service cart rental in Sarasota, Siesta Key & surrounding areas. Fresh, made to order with free delivery. Call 941-914-0007.',
  keywords: [
    'charcuterie Sarasota',
    'charcuterie board Sarasota',
    'charcuterie cart Sarasota',
    'Siesta Key charcuterie',
    'grazing table Sarasota',
    'beach picnic catering',
    'wedding charcuterie Sarasota',
    'bridal shower catering Sarasota',
    'corporate event catering Sarasota',
    'mobile charcuterie cart',
    'Lakewood Ranch catering',
  ],
  authors: [{ name: 'Elizabeth Kent' }],
  creator: 'Fig Jam Charcuterie LLC',
  publisher: 'Fig Jam Charcuterie LLC',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Fig Jam Charcuterie LLC | Sarasota, FL',
    description:
      'Sweet & Savory Charcuterie — Fresh boards, boxes, cups & mobile cart experiences with free delivery in Sarasota, FL.',
    url: SITE_URL,
    siteName: 'Fig Jam Charcuterie',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: absoluteUrl('/images/hero-board-image.png'),
        width: 1200,
        height: 630,
        alt: 'Fig Jam Charcuterie artisan board',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fig Jam Charcuterie LLC | Sarasota, FL',
    description:
      'Artisan charcuterie boards and mobile cart experiences in Sarasota, Siesta Key, and Lakewood Ranch.',
    images: [absoluteUrl('/images/hero-board-image.png')],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'food',
}

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Caterer',
      '@id': `${SITE_URL}/#business`,
      name: siteConfig.businessName,
      alternateName: 'Fig Jam Charcuterie',
      description:
        'Sarasota-based artisan charcuterie business offering custom boards and mobile charcuterie cart catering for weddings, showers, corporate events, beach picnics, and parties.',
      url: SITE_URL,
      telephone: siteConfig.phone,
      priceRange: '$$',
      image: absoluteUrl('/images/hero-board-image.png'),
      logo: absoluteUrl('/images/hero-board-image.png'),
      founder: {
        '@type': 'Person',
        name: siteConfig.owner,
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Sarasota',
        addressRegion: 'FL',
        addressCountry: 'US',
      },
      areaServed: [
        { '@type': 'City', name: 'Sarasota' },
        { '@type': 'Place', name: 'Siesta Key' },
        { '@type': 'Place', name: 'Lakewood Ranch' },
        { '@type': 'Place', name: 'Lido Key' },
      ],
      servesCuisine: ['Charcuterie', 'American', 'Mediterranean'],
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '18:00',
        },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Charcuterie Boards & Cart Services',
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'Charcuterie Cups',
            description: 'Individual portions, minimum 10 cups',
            price: '12',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            name: 'Small Charcuterie Board',
            description: 'Feeds 2-3 people',
            price: '50',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            name: 'Medium Charcuterie Board',
            description: 'Feeds 6-8 people',
            price: '125',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            name: 'Large Charcuterie Board',
            description: 'Feeds 8-10 people',
            price: '175',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            name: 'Mobile Charcuterie Cart Experience',
            description:
              '2-hour cart service with elegant setup, custom menu, dedicated server, and custom signage. $15-$25 per guest, 15-guest minimum.',
            price: '300',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
          },
        ],
      },
      sameAs: [siteConfig.socialMedia.instagram, siteConfig.socialMedia.facebook].filter(Boolean),
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: siteConfig.businessName,
      description: 'Sweet & Savory Charcuterie in Sarasota, FL',
      publisher: { '@id': `${SITE_URL}/#business` },
      inLanguage: 'en-US',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
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
