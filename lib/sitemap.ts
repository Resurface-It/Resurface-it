import { services } from '@/data/services'
import { primaryCities } from '@/data/cities'
import { blogPosts } from '@/data/blogPosts'

export interface SitemapEntry {
  url: string
  lastModified: Date
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://resurface-it.com'

export function generateSitemap(): SitemapEntry[] {
  const entries: SitemapEntry[] = []

  // Static pages
  const staticPages = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/services', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/areas-we-serve', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/gallery', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/warranty', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/blog', priority: 0.8, changeFrequency: 'weekly' as const },
  ]

  staticPages.forEach((page) => {
    entries.push({
      url: `${siteUrl}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })
  })

  // Service pages
  services.forEach((service) => {
    entries.push({
      url: `${siteUrl}/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  })

  // City landing pages (new format: eugene-or, albany-or, etc.)
  primaryCities.forEach((city) => {
    entries.push({
      url: `${siteUrl}/${city.slug}-or`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  })

  // City/Service combination pages
  primaryCities.forEach((city) => {
    city.highlightedServices.forEach((serviceSlug) => {
      entries.push({
        url: `${siteUrl}/${city.slug}/${serviceSlug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    })
  })

  // Blog posts
  blogPosts.forEach((post) => {
    entries.push({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  })

  return entries
}

