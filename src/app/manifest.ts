import type { MetadataRoute } from 'next'

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Fig Jam Charcuterie LLC',
    short_name: 'Fig Jam',
    description:
      'Sweet & Savory Charcuterie — artisan boards, cups, and mobile cart experiences in Sarasota, FL.',
    start_url: `${BASE_PATH}/`,
    scope: `${BASE_PATH}/`,
    display: 'standalone',
    background_color: '#FDF6EC',
    theme_color: '#6B1D2A',
    icons: [],
  }
}
