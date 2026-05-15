import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site-url'

const PAGES = [
  { path: '/', priority: 1.0, changeFreq: 'weekly' as const },
  { path: '/menu', priority: 0.9, changeFreq: 'monthly' as const },
  { path: '/cart-service', priority: 0.9, changeFreq: 'monthly' as const },
  { path: '/about', priority: 0.7, changeFreq: 'yearly' as const },
  { path: '/gallery', priority: 0.7, changeFreq: 'monthly' as const },
  { path: '/testimonials', priority: 0.7, changeFreq: 'monthly' as const },
  { path: '/contact', priority: 0.8, changeFreq: 'yearly' as const },
  { path: '/faq', priority: 0.7, changeFreq: 'monthly' as const },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return PAGES.map(({ path, priority, changeFreq }) => ({
    url: `${SITE_URL}${path === '/' ? '' : path}`,
    lastModified: now,
    changeFrequency: changeFreq,
    priority,
  }))
}
