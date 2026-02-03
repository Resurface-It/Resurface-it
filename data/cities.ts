export interface City {
  slug: string
  name: string
  headline: string
  blurb: string
  nearby: string[]
  heroImage?: string
  highlightedServices: string[]
  neighborhoods?: string[]
  housingCharacteristics?: string
  climateNotes?: string
  serviceRecommendations?: string[]
}

export const primaryCities: City[] = [
  {
    slug: 'eugene',
    name: 'Eugene',
    headline: 'Siding, Roofing & Painting Services in Eugene, OR',
    blurb: 'Serving Eugene homeowners with premium siding replacement, roofing, and painting services. We understand the unique challenges of Oregon\'s climate and provide solutions that protect and beautify your home.',
    nearby: ['Springfield', 'Creswell', 'Coburg', 'Junction City'],
    highlightedServices: ['siding-replacement', 'exterior-painting', 'interior-painting'],
    neighborhoods: ['River Road', 'South Hills', 'Whiteaker', 'College Hill', 'Friendly', 'Bethel'],
    housingCharacteristics: 'Eugene features a diverse mix of historic homes near the University of Oregon, mid-century builds in established neighborhoods, and modern construction. Many homes require protection from moss growth in treed areas and moisture management in the Willamette Valley climate.',
    climateNotes: 'Eugene experiences heavy winter rains, high humidity, and intense summer sun. North-facing homes in treed areas are particularly susceptible to moss growth, while south-facing homes face UV damage. Proper moisture barriers and UV protection are essential.',
    serviceRecommendations: ['James Hardie siding for moisture resistance', 'Exterior painting with UV-protective paints', 'Rot repair for older homes'],
  },
  {
    slug: 'albany',
    name: 'Albany',
    headline: 'Expert Siding, Roofing & Painting Services in Albany, OR',
    blurb: 'Trusted by Albany residents for professional siding, roofing, and painting services. Our team brings years of experience and attention to detail to every project, ensuring lasting results.',
    nearby: ['Tangent', 'Millersburg', 'Lebanon', 'Corvallis'],
    highlightedServices: ['siding-replacement', 'exterior-painting', 'deck-staining'],
    neighborhoods: ['Historic Downtown', 'Monteith', 'Periwinkle', 'North Albany'],
    housingCharacteristics: 'Albany has extensive historic districts with Victorian and Craftsman homes requiring specialized restoration techniques. Many homes need lead-safe painting practices and materials that maintain historic aesthetics while providing modern protection.',
    climateNotes: 'Albany\'s historic homes face unique challenges from Oregon\'s humidity and rain. Proper moisture management and lead-safe practices are essential for preserving these valuable properties.',
    serviceRecommendations: ['Historic home siding restoration', 'Lead-safe painting practices', 'Rot repair for older structures'],
  },
  {
    slug: 'corvallis',
    name: 'Corvallis',
    headline: 'Premium Siding, Roofing & Painting in Corvallis, OR',
    blurb: 'Enhancing Corvallis homes with quality craftsmanship and premium materials. From siding replacement to interior painting, we deliver results that exceed expectations.',
    nearby: ['Philomath', 'Adair Village', 'Albany', 'Monroe'],
    highlightedServices: ['siding-replacement', 'exterior-painting', 'interior-painting'],
    neighborhoods: ['Near OSU', 'Avery Park', 'Timberhill', 'West Hills'],
    housingCharacteristics: 'Corvallis has a mix of university-area rentals, established family homes, and newer construction. Rental properties benefit from durable, low-maintenance materials, while owner-occupied homes prioritize long-term protection and value.',
    climateNotes: 'Corvallis experiences similar Willamette Valley climate patterns. Rental properties need durable materials that withstand tenant turnover, while owner-occupied homes benefit from premium materials that protect long-term investments.',
    serviceRecommendations: ['Durable siding for rental properties', 'Low-maintenance exterior solutions', 'Interior painting for rental turnover'],
  },
  {
    slug: 'springfield',
    name: 'Springfield',
    headline: 'Professional Siding, Roofing & Painting Services in Springfield, OR',
    blurb: 'Springfield\'s trusted partner for siding replacement, roofing, and painting services. We combine expert installation with premium materials to transform your home\'s exterior.',
    nearby: ['Eugene', 'Creswell', 'Junction City'],
    highlightedServices: ['siding-replacement', 'exterior-painting', 'pressure-washing'],
    neighborhoods: ['Thurston', 'Glenwood', 'Mohawk', 'Gateway'],
    housingCharacteristics: 'Springfield features growing suburban communities with a mix of newer construction and established neighborhoods. Many homes benefit from modernization and weather protection upgrades.',
    climateNotes: 'Springfield\'s proximity to the McKenzie River means homes need excellent moisture protection. Suburban homes often benefit from comprehensive exterior upgrades that enhance curb appeal and protection.',
    serviceRecommendations: ['Complete exterior upgrades', 'Modern siding materials', 'Comprehensive weatherproofing'],
  },
  {
    slug: 'junction-city',
    name: 'Junction City',
    headline: 'Siding, Roofing & Painting Services in Junction City, OR',
    blurb: 'Serving Junction City homeowners with premium siding, roofing, and painting services. We understand the unique needs of this community and provide expert solutions.',
    nearby: ['Eugene', 'Springfield', 'Creswell'],
    highlightedServices: ['siding-replacement', 'exterior-painting'],
    neighborhoods: ['Downtown', 'Residential areas'],
    housingCharacteristics: 'Junction City features a mix of established homes and newer construction. Many homes benefit from exterior upgrades and weather protection.',
    climateNotes: 'Junction City experiences typical Willamette Valley climate with wet winters and sunny summers. Proper moisture protection is essential.',
    serviceRecommendations: ['Exterior painting with moisture-resistant materials', 'Siding replacement for older homes'],
  },
  {
    slug: 'veneta',
    name: 'Veneta',
    headline: 'Siding, Roofing & Painting Services in Veneta, OR',
    blurb: 'Serving Veneta homeowners with professional siding, roofing, and painting services. We provide expert solutions tailored to this community\'s needs.',
    nearby: ['Eugene', 'Elmira'],
    highlightedServices: ['siding-replacement', 'exterior-painting'],
    neighborhoods: ['Residential areas'],
    housingCharacteristics: 'Veneta features primarily residential homes that benefit from exterior protection and modernization.',
    climateNotes: 'Veneta experiences Willamette Valley climate patterns requiring proper weatherproofing and moisture management.',
    serviceRecommendations: ['Complete exterior upgrades', 'Weatherproofing services'],
  },
]

/** Canonical list of all communities we serve, by region. */
export const serviceAreasByRegion = {
  laneCounty: [
    'Coburg',
    'Creswell',
    'Junction City',
    'Veneta',
    'Cottage Grove',
    'Lowell',
    'Pleasant Hill',
    'Cheshire',
    'Elmira',
    'Blue River',
    'Oakridge',
  ],
  linnCounty: [
    'Lebanon',
    'Tangent',
    'Jefferson',
    'Shedd',
    'Scio',
    'Halsey',
    'Brownsville',
    'Sodaville',
  ],
  bentonCounty: ['Philomath', 'Monroe', 'Adair Village', 'Peoria'],
  nearby: ['Harrisburg', 'Dallas', 'Sweet Home'],
} as const

function flattenServiceAreas(): string[] {
  const { laneCounty, linnCounty, bentonCounty, nearby } = serviceAreasByRegion
  return [...laneCounty, ...linnCounty, ...bentonCounty, ...nearby]
}

export const surroundingCities: string[] = flattenServiceAreas()

export function getCityBySlug(slug: string): City | undefined {
  return primaryCities.find((city) => city.slug === slug)
}

export function getAllCities(): City[] {
  return primaryCities
}

export function getCityNames(): string[] {
  return [...primaryCities.map((c) => c.name), ...surroundingCities]
}

