import { services } from '@/data/services'
import { primaryCities } from '@/data/cities'
import { blogPosts } from '@/data/blogPosts'
import { resources } from '@/data/resources'

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
    { path: '/services/siding', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/services/painting', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/locations', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/resources', priority: 0.8, changeFrequency: 'monthly' as const },
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

  // Service pages (existing)
  services.forEach((service) => {
    entries.push({
      url: `${siteUrl}/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  })

  // Child service pages
  const childServices = [
    { path: '/services/siding/james-hardie', priority: 0.85 },
    { path: '/services/siding/cedar-wood', priority: 0.85 },
    { path: '/services/siding/rot-repair-weatherproofing', priority: 0.85 },
    { path: '/services/painting/cabinet-refinishing', priority: 0.85 },
  ]
  childServices.forEach((service) => {
    entries.push({
      url: `${siteUrl}${service.path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: service.priority,
    })
  })

  // City landing pages (legacy format: eugene-or, albany-or, etc.)
  primaryCities.forEach((city) => {
    entries.push({
      url: `${siteUrl}/${city.slug}-or`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  })

  // Location pages (new format: /locations/[city])
  primaryCities.forEach((city) => {
    entries.push({
      url: `${siteUrl}/locations/${city.slug}-or`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
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

  // Resource articles
  resources.forEach((resource) => {
    entries.push({
      url: `${siteUrl}/resources/${resource.slug}`,
      lastModified: new Date(resource.datePublished),
      changeFrequency: 'monthly',
      priority: 0.7,
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

