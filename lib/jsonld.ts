import { companyInfo } from '@/data/company'
import { getCityNames } from '@/data/cities'

function buildSameAs(): string[] {
  const links: string[] = []
  if (companyInfo.googleBusinessProfileUrl) links.push(companyInfo.googleBusinessProfileUrl)
  if (companyInfo.facebookUrl) links.push(companyInfo.facebookUrl)
  if (companyInfo.yelpUrl) links.push(companyInfo.yelpUrl)
  return links
}

export interface LocalBusiness {
  '@context': string
  '@type': string | string[]
  name: string
  description: string
  telephone: string
  email: string
  address: {
    '@type': string
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  areaServed: string[]
  serviceType: string[]
  priceRange: string
  geo?: {
    '@type': string
    latitude: string
    longitude: string
  }
  aggregateRating?: {
    '@type': string
    ratingValue: string
    reviewCount: string
  }
  openingHoursSpecification?: Array<{
    '@type': string
    dayOfWeek: string | string[]
    opens: string
    closes: string
  }>
  sameAs?: string[]
}

export interface ServiceSchema {
  '@context': string
  '@type': string
  name: string
  description: string
  provider: {
    '@type': string
    name: string
  }
  areaServed: string[]
}

export interface FAQPage {
  '@context': string
  '@type': string
  mainEntity: Array<{
    '@type': string
    name: string
    acceptedAnswer: {
      '@type': string
      text: string
    }
  }>
}

export function generateLocalBusinessSchema(): LocalBusiness {
  return {
    '@context': 'https://schema.org',
    '@type': ['HomeAndConstructionBusiness', 'GeneralContractor', 'HousePainter'],
    name: companyInfo.name,
    description:
      'Professional interior and exterior house painters and siding replacement specialists serving the Willamette Valley, including Eugene, Albany, Corvallis, Springfield, and surrounding Oregon areas. Licensed, insured, locally owned, and backed by a 5-year workmanship warranty.',
    telephone: companyInfo.phone,
    email: companyInfo.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: companyInfo.address.street,
      addressLocality: companyInfo.address.city,
      addressRegion: companyInfo.address.state,
      postalCode: companyInfo.address.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '44.0521',
      longitude: '-123.0868',
    },
    areaServed: [
      ...getCityNames().map((name) => `${name}, OR`),
      'Willamette Valley, OR',
      'Lane County, OR',
      'Linn County, OR',
      'Benton County, OR',
    ],
    serviceType: [
      'Roofing',
      'Siding Replacement',
      'Exterior Painting',
      'Interior Painting',
      'Deck Staining',
      'Pressure Washing',
    ],
    priceRange: '$$',
    aggregateRating: companyInfo.aggregateRating
      ? {
          '@type': 'AggregateRating' as const,
          ratingValue: String(companyInfo.aggregateRating.ratingValue),
          reviewCount: String(companyInfo.aggregateRating.reviewCount),
        }
      : undefined,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '07:00',
        closes: '18:00',
      },
    ],
    sameAs: buildSameAs(),
  }
}

export function generateServiceSchema(serviceName: string, serviceDescription: string): ServiceSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: serviceDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Resurface-It, Inc Siding, Roofing & Painting',
    },
    areaServed: [
      'Willamette Valley, OR',
      'Eugene, OR',
      'Albany, OR',
      'Corvallis, OR',
      'Springfield, OR',
    ],
  }
}

export function generateFAQPageSchema(faqs: Array<{ question: string; answer: string }>): FAQPage {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export interface BreadcrumbList {
  '@context': string
  '@type': string
  itemListElement: Array<{
    '@type': string
    position: number
    name: string
    item?: string
  }>
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>): BreadcrumbList {
  const siteUrl = typeof process !== 'undefined' && process.env.NEXT_PUBLIC_SITE_URL 
    ? process.env.NEXT_PUBLIC_SITE_URL 
    : 'https://resurface-it.com'

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`,
    })),
  }
}

export interface Organization {
  '@context': string
  '@type': string
  name: string
  url: string
  logo: string
  description: string
  telephone: string
  email: string
  address: {
    '@type': string
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  sameAs?: string[]
  aggregateRating?: {
    '@type': string
    ratingValue: string
    reviewCount: string
    bestRating?: string
    worstRating?: string
  }
  geo?: {
    '@type': string
    latitude: string
    longitude: string
  }
}

export function generateOrganizationSchema(): Organization {
  const siteUrl = typeof process !== 'undefined' && process.env.NEXT_PUBLIC_SITE_URL 
    ? process.env.NEXT_PUBLIC_SITE_URL 
    : 'https://resurface-it.com'

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: companyInfo.name,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description:
      'Professional interior and exterior house painters, siding replacement, and roofing services in the Willamette Valley, including Eugene, Albany, Corvallis, Springfield, and surrounding Oregon communities. Licensed, insured, locally owned, and backed by a 5-year workmanship warranty.',
    telephone: companyInfo.phone,
    email: companyInfo.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: companyInfo.address.street,
      addressLocality: companyInfo.address.city,
      addressRegion: companyInfo.address.state,
      postalCode: companyInfo.address.zip,
      addressCountry: 'US',
    },
    sameAs: buildSameAs().length > 0 ? buildSameAs() : undefined,
    aggregateRating: companyInfo.aggregateRating
      ? {
          '@type': 'AggregateRating' as const,
          ratingValue: String(companyInfo.aggregateRating.ratingValue),
          reviewCount: String(companyInfo.aggregateRating.reviewCount),
          bestRating: '5',
          worstRating: '1',
        }
      : undefined,
  }
}

export interface Review {
  '@context': string
  '@type': string
  itemReviewed: {
    '@type': string
    name: string
  }
  author: {
    '@type': string
    name: string
  }
  reviewRating: {
    '@type': string
    ratingValue: string
    bestRating: string
    worstRating: string
  }
  reviewBody: string
  datePublished?: string
}

export interface AggregateRating {
  '@context': string
  '@type': string
  itemReviewed: {
    '@type': string
    name: string
  }
  ratingValue: string
  reviewCount: string
  bestRating: string
  worstRating: string
}

export function generateReviewSchema(
  businessName: string,
  rating: number,
  reviewCount: number
): AggregateRating {
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    itemReviewed: {
      '@type': 'LocalBusiness',
      name: businessName,
    },
    ratingValue: rating.toString(),
    reviewCount: reviewCount.toString(),
    bestRating: '5',
    worstRating: '1',
  }
}

export interface TestimonialForReview {
  name: string
  quote: string
  rating?: number
  date?: string
}

/** Generates schema.org Review items from testimonials for use in structured data (e.g. homepage). */
export function generateIndividualReviewSchemas(
  testimonials: TestimonialForReview[],
  businessName: string
): Review[] {
  return testimonials
    .filter((t) => t.quote && t.name)
    .slice(0, 10)
    .map((t) => ({
      '@context': 'https://schema.org' as const,
      '@type': 'Review' as const,
      itemReviewed: {
        '@type': 'LocalBusiness' as const,
        name: businessName,
      },
      author: {
        '@type': 'Person' as const,
        name: t.name,
      },
      reviewRating: {
        '@type': 'Rating' as const,
        ratingValue: String(t.rating ?? 5),
        bestRating: '5',
        worstRating: '1',
      },
      reviewBody: t.quote,
      ...(t.date && { datePublished: t.date }),
    }))
}

export interface Article {
  '@context': string
  '@type': string
  headline: string
  description: string
  image?: string
  datePublished: string
  dateModified?: string
  author: {
    '@type': string
    name: string
  }
  publisher: {
    '@type': string
    name: string
    logo: {
      '@type': string
      url: string
    }
  }
}

export function generateArticleSchema(
  headline: string,
  description: string,
  datePublished: string,
  image?: string
): Article {
  const siteUrl = typeof process !== 'undefined' && process.env.NEXT_PUBLIC_SITE_URL 
    ? process.env.NEXT_PUBLIC_SITE_URL 
    : 'https://resurface-it.com'

  const absoluteImage = image
    ? (image.startsWith('http') ? image : `${siteUrl}${image.startsWith('/') ? image : `/${image}`}`)
    : `${siteUrl}/og-image.jpg`
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image: absoluteImage,
    datePublished,
    dateModified: datePublished,
    author: {
      '@type': 'Organization',
      name: companyInfo.name,
    },
    publisher: {
      '@type': 'Organization',
      name: companyInfo.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/Resurface-it.png`,
      },
    },
  }
}

export interface JobPosting {
  '@context': string
  '@type': string
  title: string
  description: string
  employmentType: string
  hiringOrganization: {
    '@type': string
    name: string
    sameAs?: string
  }
  jobLocation: {
    '@type': string
    address: {
      '@type': string
      addressLocality: string
      addressRegion: string
      addressCountry: string
    }
  }
  datePosted?: string
  validThrough?: string
  qualifications?: string
}

export function generateJobPostingSchema(
  title: string,
  description: string,
  location: string,
  employmentType: 'COMMISSION_ONLY' | 'SUBCONTRACTOR',
  requirements?: string[]
): JobPosting {
  const siteUrl = typeof process !== 'undefined' && process.env.NEXT_PUBLIC_SITE_URL 
    ? process.env.NEXT_PUBLIC_SITE_URL 
    : 'https://resurface-it.com'

  // Extract city and state from location string (e.g., "Eugene, OR" or "Eugene, Albany, Corvallis, Springfield, OR")
  const locationParts = location.split(',').map(s => s.trim())
  const state = locationParts[locationParts.length - 1] || 'OR'
  const city = locationParts[0] || 'Eugene'

  // Map employment types to schema.org values
  const employmentTypeMap: Record<string, string> = {
    'COMMISSION_ONLY': 'CONTRACTOR',
    'SUBCONTRACTOR': 'CONTRACTOR',
  }

  // Build qualifications string if requirements exist
  let qualifications: string | undefined
  if (requirements && requirements.length > 0) {
    qualifications = requirements.join('. ')
    if (employmentType === 'SUBCONTRACTOR') {
      qualifications += '. CCB number and active insurance required.'
    }
  } else if (employmentType === 'SUBCONTRACTOR') {
    qualifications = 'CCB number and active insurance required.'
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title,
    description,
    employmentType: employmentTypeMap[employmentType] || 'CONTRACTOR',
    hiringOrganization: {
      '@type': 'Organization',
      name: companyInfo.name,
      sameAs: siteUrl,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: city,
        addressRegion: state,
        addressCountry: 'US',
      },
    },
    datePosted: new Date().toISOString().split('T')[0],
    ...(qualifications && { qualifications }),
  }
}

