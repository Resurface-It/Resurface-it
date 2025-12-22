export interface Resource {
  slug: string
  title: string
  description: string
  datePublished: string
  category: 'cost-guide' | 'material-comparison' | 'maintenance' | 'restoration'
  relatedServices?: string[]
  relatedCities?: string[]
  keywords?: string[]
}

export const resources: Resource[] = [
  {
    slug: 'cost-guide-eugene-siding-painting-2025',
    title: '2025 Cost Guide: Siding and Painting Prices in Eugene/Springfield',
    description: 'Honest pricing ranges for siding replacement and painting projects in Eugene and Springfield, Oregon. Understand what to expect before requesting estimates.',
    datePublished: '2025-01-15',
    category: 'cost-guide',
    relatedServices: ['siding-replacement', 'exterior-painting', 'interior-painting'],
    relatedCities: ['eugene', 'springfield'],
    keywords: ['siding cost', 'painting cost', 'Eugene prices', 'Springfield prices', 'home improvement cost'],
  },
  {
    slug: 'james-hardie-vs-vinyl-willamette-valley',
    title: 'James Hardie vs. Vinyl in the Willamette Valley: Why Fiber Cement Wins in the Rain',
    description: 'Compare James Hardie fiber cement siding and vinyl siding for Oregon homes. Learn why fiber cement performs better in wet climates and high humidity.',
    datePublished: '2025-01-10',
    category: 'material-comparison',
    relatedServices: ['siding-replacement'],
    relatedCities: ['eugene', 'albany', 'corvallis', 'springfield'],
    keywords: ['James Hardie vs vinyl', 'fiber cement siding', 'Oregon siding', 'moisture resistant siding'],
  },
  {
    slug: 'paint-failure-oregon-uv-moisture',
    title: 'The Truth About Paint Failure in Oregon: Battling UV and Moisture',
    description: 'Why paint fails in Oregon and how to prevent it. Learn about moisture-resistant primers, UV-protective paints, and proper surface preparation.',
    datePublished: '2025-01-05',
    category: 'maintenance',
    relatedServices: ['exterior-painting'],
    relatedCities: ['eugene', 'albany', 'corvallis', 'springfield'],
    keywords: ['paint failure', 'Oregon paint', 'moisture resistant paint', 'UV protection'],
  },
  {
    slug: 'historic-home-siding-restoration-lead-safe-painting',
    title: 'Historic Home Siding Restoration & Lead-Safe Painting',
    description: 'Specialized techniques for restoring historic homes in Albany and Eugene. Lead-safe painting practices and materials that maintain historic aesthetics.',
    datePublished: '2025-01-01',
    category: 'restoration',
    relatedServices: ['siding-replacement', 'exterior-painting'],
    relatedCities: ['albany', 'eugene'],
    keywords: ['historic home restoration', 'lead safe painting', 'Albany historic homes', 'Victorian restoration'],
  },
]

export function getResourceBySlug(slug: string): Resource | undefined {
  return resources.find((resource) => resource.slug === slug)
}

export function getResourcesByCategory(category: Resource['category']): Resource[] {
  return resources.filter((resource) => resource.category === category)
}

