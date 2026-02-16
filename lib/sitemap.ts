import { services } from '@/data/services'
import { primaryCities } from '@/data/cities'
import { blogPosts } from '@/data/blogPosts'
import { resources } from '@/data/resources'
import { getCities, getMicroLocationsByCity } from '@/data/geo'
import { getPublishedCaseStudies } from '@/lib/caseStudies'

export interface SitemapEntry {
  url: string
  lastModified: Date
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://resurface-it.com'

/**
 * Generates a comprehensive sitemap for Google and AI crawlers.
 * Includes all static pages, dynamic routes, and content pages.
 * Excludes pages that should not be indexed (e.g., thank-you pages).
 */
export function generateSitemap(): SitemapEntry[] {
  const entries: SitemapEntry[] = []
  const now = new Date()

  // Static pages - high priority pages that are core to the site
  const staticPages = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/services', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/services/siding', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/services/painting', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/painters-willamette-valley', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/siding-contractor-willamette-valley', priority: 0.9, changeFrequency: 'monthly' as const },
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
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })
  })

  // Service pages - all main service detail pages
  services.forEach((service) => {
    entries.push({
      url: `${siteUrl}/services/${service.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  })

  // Child service pages - specialized service sub-pages
  const childServices = [
    { path: '/services/siding/james-hardie', priority: 0.85 },
    { path: '/services/siding/cedar-wood', priority: 0.85 },
    { path: '/services/siding/rot-repair-weatherproofing', priority: 0.85 },
    { path: '/services/painting/cabinet-refinishing', priority: 0.85 },
  ]
  childServices.forEach((service) => {
    entries.push({
      url: `${siteUrl}${service.path}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: service.priority,
    })
  })

  // Concrete service hub and subpages
  entries.push({
    url: `${siteUrl}/concrete`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.85,
  })

  const concreteSubpages = [
    'coatings',
    'repair',
    'polishing',
    'sealing',
    'resurfacing',
    'pressure-washing',
  ]

  concreteSubpages.forEach((subpage) => {
    entries.push({
      url: `${siteUrl}/concrete/${subpage}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  })

  // Canonical city pages: /locations/[city]-or only. Legacy /eugene-or and /eugene redirect via middleware.
  primaryCities.forEach((city) => {
    entries.push({
      url: `${siteUrl}/locations/${city.slug}-or`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    })
  })

  // Resource articles - educational content with actual publication dates
  resources.forEach((resource) => {
    entries.push({
      url: `${siteUrl}/resources/${resource.slug}`,
      lastModified: new Date(resource.datePublished),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  })

  // Blog posts - content pages with actual publication dates
  blogPosts.forEach((post) => {
    entries.push({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  })

  // Micro-location pages
  const cities = getCities()
  cities.forEach((city) => {
    // City hub
    entries.push({
      url: `${siteUrl}/locations/${city.citySlug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    })

    // Micro-location pages
    const locations = getMicroLocationsByCity(city.citySlug)
    locations.forEach((location) => {
      entries.push({
        url: `${siteUrl}/locations/${city.citySlug}/${location.areaSlug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.75,
      })
    })
  })

  // Spotlights pages
  entries.push({
    url: `${siteUrl}/spotlights`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  })

  cities.forEach((city) => {
    // City spotlights index
    entries.push({
      url: `${siteUrl}/spotlights/${city.citySlug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    })

    // Spotlight detail pages
    const locations = getMicroLocationsByCity(city.citySlug)
    locations.forEach((location) => {
      entries.push({
        url: `${siteUrl}/spotlights/${city.citySlug}/${location.areaSlug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    })
  })

  // Case studies pages
  entries.push({
    url: `${siteUrl}/case-studies`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.65,
  })

  cities.forEach((city) => {
    // City case studies index
    entries.push({
      url: `${siteUrl}/case-studies/${city.citySlug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.65,
    })

    // Area case studies indexes
    const locations = getMicroLocationsByCity(city.citySlug)
    locations.forEach((location) => {
      entries.push({
        url: `${siteUrl}/case-studies/${city.citySlug}/${location.areaSlug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.65,
      })
    })
  })

  // Published case study detail pages only
  try {
    const publishedStudies = getPublishedCaseStudies()
    publishedStudies.forEach((study) => {
      entries.push({
        url: `${siteUrl}/case-studies/${study.frontmatter.citySlug}/${study.frontmatter.areaSlug}/${study.frontmatter.caseSlug}`,
        lastModified: study.frontmatter.endDate
          ? new Date(study.frontmatter.endDate)
          : study.frontmatter.startDate
            ? new Date(study.frontmatter.startDate)
            : now,
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    })
  } catch (error) {
    // If case studies can't be loaded (e.g., during build), skip them
    console.warn('Warning: Could not load case studies for sitemap:', error)
  }

  // Sort entries by priority (highest first) and then by URL for consistent ordering
  entries.sort((a, b) => {
    if (b.priority !== a.priority) {
      return b.priority - a.priority
    }
    return a.url.localeCompare(b.url)
  })

  return entries
}

