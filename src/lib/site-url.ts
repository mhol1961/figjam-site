/**
 * Canonical site URL used for sitemap, robots, canonical tags, and absolute
 * OG image URLs.
 *
 * Set NEXT_PUBLIC_SITE_URL in the deploy environment to override.
 * - GitHub Pages default: https://mhol1961.github.io/figjam-site
 * - Custom domain (when live): https://www.figjamcharcuteriellc.com
 */

const RAW_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mhol1961.github.io/figjam-site'

export const SITE_URL = RAW_SITE_URL.replace(/\/$/, '')

export function absoluteUrl(path: string): string {
  if (!path) return SITE_URL
  if (path.startsWith('http')) return path
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalized}`
}
