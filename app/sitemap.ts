import { MetadataRoute } from 'next'
import { generateSitemap } from '@/lib/sitemap'

export default function sitemap(): MetadataRoute.Sitemap {
  const entries = generateSitemap()

  return entries.map((entry) => ({
    url: entry.url,
    lastModified: entry.lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }))
}

