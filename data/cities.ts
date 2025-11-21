export interface City {
  slug: string
  name: string
  headline: string
  blurb: string
  nearby: string[]
  heroImage?: string
  highlightedServices: string[]
}

export const primaryCities: City[] = [
  {
    slug: 'eugene',
    name: 'Eugene',
    headline: 'Siding & Painting Services in Eugene, OR',
    blurb: 'Serving Eugene homeowners with premium siding replacement and painting services. We understand the unique challenges of Oregon\'s climate and provide solutions that protect and beautify your home.',
    nearby: ['Springfield', 'Creswell', 'Coburg', 'Junction City'],
    highlightedServices: ['siding-replacement', 'exterior-painting', 'interior-painting'],
  },
  {
    slug: 'albany',
    name: 'Albany',
    headline: 'Expert Home Exterior Services in Albany, OR',
    blurb: 'Trusted by Albany residents for professional siding and painting services. Our team brings years of experience and attention to detail to every project, ensuring lasting results.',
    nearby: ['Tangent', 'Millersburg', 'Lebanon', 'Corvallis'],
    highlightedServices: ['siding-replacement', 'exterior-painting', 'deck-staining'],
  },
  {
    slug: 'corvallis',
    name: 'Corvallis',
    headline: 'Premium Siding & Painting in Corvallis, OR',
    blurb: 'Enhancing Corvallis homes with quality craftsmanship and premium materials. From siding replacement to interior painting, we deliver results that exceed expectations.',
    nearby: ['Philomath', 'Adair Village', 'Albany', 'Monroe'],
    highlightedServices: ['siding-replacement', 'exterior-painting', 'interior-painting'],
  },
  {
    slug: 'springfield',
    name: 'Springfield',
    headline: 'Professional Home Services in Springfield, OR',
    blurb: 'Springfield\'s trusted partner for siding replacement and painting services. We combine expert installation with premium materials to transform your home\'s exterior.',
    nearby: ['Eugene', 'Creswell', 'Junction City'],
    highlightedServices: ['siding-replacement', 'exterior-painting', 'pressure-washing'],
  },
]

export const surroundingCities: string[] = [
  'Lebanon',
  'Philomath',
  'Junction City',
  'Creswell',
  'Tangent',
  'Monroe',
  'Adair Village',
  'Harrisburg',
  'Coburg',
  'Millersburg',
]

export function getCityBySlug(slug: string): City | undefined {
  return primaryCities.find((city) => city.slug === slug)
}

export function getAllCities(): City[] {
  return primaryCities
}

export function getCityNames(): string[] {
  return [...primaryCities.map((c) => c.name), ...surroundingCities]
}

