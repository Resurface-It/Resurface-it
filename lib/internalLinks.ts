import { services } from '@/data/services'
import { primaryCities } from '@/data/cities'
import { resources } from '@/data/resources'

export interface InternalLink {
  title: string
  url: string
  description?: string
}

/**
 * Get related services for a given service slug
 */
export function getRelatedServices(serviceSlug: string, limit: number = 3): InternalLink[] {
  const service = services.find(s => s.slug === serviceSlug)
  if (!service) return []

  // Get services in the same category or related categories
  const related = services
    .filter(s => {
      if (s.slug === serviceSlug) return false
      // Same parent category
      if (service.parentCategory && s.parentCategory === service.parentCategory) return true
      // Related services (siding and painting are related)
      if (serviceSlug.includes('siding') && s.slug.includes('painting')) return true
      if (serviceSlug.includes('painting') && s.slug.includes('siding')) return true
      return false
    })
    .slice(0, limit)
    .map(s => ({
      title: s.name,
      url: `/services/${s.slug}`,
      description: s.shortDescription,
    }))

  return related
}

/**
 * Get relevant services for a city
 */
export function getCityServices(citySlug: string, limit: number = 3): InternalLink[] {
  const city = primaryCities.find(c => c.slug === citySlug)
  if (!city) return []

  return city.highlightedServices
    .slice(0, limit)
    .map(slug => {
      const service = services.find(s => s.slug === slug)
      if (!service) return null
      return {
        title: service.name,
        url: `/services/${service.slug}`,
        description: service.shortDescription,
      }
    })
    .filter((link): link is InternalLink => link !== null)
}

/**
 * Get related resources for a service
 */
export function getServiceResources(serviceSlug: string, limit: number = 2): InternalLink[] {
  return resources
    .filter(r => r.relatedServices?.includes(serviceSlug))
    .slice(0, limit)
    .map(r => ({
      title: r.title,
      url: `/resources/${r.slug}`,
      description: r.description,
    }))
}

/**
 * Get related resources for a city
 */
export function getCityResources(citySlug: string, limit: number = 2): InternalLink[] {
  return resources
    .filter(r => r.relatedCities?.includes(citySlug))
    .slice(0, limit)
    .map(r => ({
      title: r.title,
      url: `/resources/${r.slug}`,
      description: r.description,
    }))
}

/**
 * Get top city recommendations for a service
 */
export function getServiceCities(serviceSlug: string, limit: number = 3): InternalLink[] {
  return primaryCities
    .filter(city => city.highlightedServices.includes(serviceSlug))
    .slice(0, limit)
    .map(city => ({
      title: `${city.name}, OR`,
      url: `/locations/${city.slug}-or`,
      description: city.blurb,
    }))
}

/**
 * Get parent hub link for a service
 */
export function getParentHub(serviceSlug: string): InternalLink | null {
  if (serviceSlug.includes('siding') || serviceSlug === 'james-hardie' || serviceSlug === 'cedar-wood' || serviceSlug === 'rot-repair-weatherproofing') {
    return {
      title: 'Siding Services',
      url: '/services/siding',
      description: 'All siding replacement and repair services',
    }
  }
  if (serviceSlug.includes('painting') || serviceSlug === 'cabinet-refinishing') {
    return {
      title: 'Painting Services',
      url: '/services/painting',
      description: 'All painting and refinishing services',
    }
  }
  return null
}

