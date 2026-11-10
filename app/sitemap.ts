import type { MetadataRoute } from 'next'

// Tells Google which pages exist, so the old WordPress pages drop out of
// search results sooner. Impressum/Datenschutz are left out (noindex).
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://darya-goloborodko.com'
  return ['', '/about', '/contact'].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }))
}
