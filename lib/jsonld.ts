import { companyInfo } from '@/data/company'
import { getCityNames } from '@/data/cities'

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
      'Professional siding replacement, roofing, and exterior house painting in Eugene, Albany, Corvallis, Springfield, and surrounding Oregon areas. Licensed, insured, locally owned, and backed by a 5-year workmanship warranty.',
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
    areaServed: getCityNames().map((name) => `${name}, OR`),
    serviceType: [
      'Roofing',
      'Siding Replacement',
      'Exterior Painting',
      'Interior Painting',
      'Deck Staining',
      'Pressure Washing',
    ],
    priceRange: '$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '50',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '07:00',
        closes: '18:00',
      },
    ],
    sameAs: [
      ...(companyInfo.googleBusinessProfileUrl
        ? [companyInfo.googleBusinessProfileUrl]
        : []),
      // TODO: Add actual social media and review platform URLs when available
      // 'https://www.facebook.com/...', // Facebook page
      // 'https://www.yelp.com/biz/...', // Yelp page
    ],
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
      'Professional siding replacement, roofing, and exterior house painting in Eugene, Albany, Corvallis, Springfield, and surrounding Oregon areas. Licensed, insured, locally owned, and backed by a 5-year workmanship warranty.',
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
    sameAs: [
      ...(companyInfo.googleBusinessProfileUrl
        ? [companyInfo.googleBusinessProfileUrl]
        : []),
      // TODO: Add actual social media and review platform URLs when available
      // 'https://www.facebook.com/...', // Facebook page
      // 'https://www.yelp.com/biz/...', // Yelp page
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '50',
      bestRating: '5',
      worstRating: '1',
    },
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

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image: image || `${siteUrl}/og-image.jpg`,
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

