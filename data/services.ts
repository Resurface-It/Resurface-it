export interface Service {
  slug: string
  name: string
  shortDescription: string
  longDescription: string
  bullets: string[]
  startingPrice?: string
  featured?: boolean
  icon?: string
}

export const services: Service[] = [
  {
    slug: 'siding-replacement',
    name: 'Siding Replacement',
    shortDescription: 'Complete siding replacement with premium materials and expert installation.',
    longDescription: 'Transform your home\'s exterior with our professional siding replacement services. We specialize in Hardie board, vinyl, and fiber cement siding that stands up to Oregon\'s weather. Our expert team ensures proper installation, weatherproofing, and a finish that enhances your home\'s curb appeal and value.',
    bullets: [
      'Hardie board, vinyl, and fiber cement options',
      'Expert installation with proper weatherproofing',
      'Enhanced curb appeal and home value',
      '5-year workmanship warranty included',
    ],
    startingPrice: '$8,500',
    featured: true,
    icon: 'home',
  },
  {
    slug: 'exterior-painting',
    name: 'Exterior Painting',
    shortDescription: 'Professional exterior painting that protects and beautifies your home.',
    longDescription: 'Protect and beautify your home with our premium exterior painting services. We use high-quality paints designed for Oregon\'s climate, including proper surface preparation, primer application, and multiple coats for lasting protection. Our attention to detail ensures a flawless finish that withstands rain, sun, and time.',
    bullets: [
      'Premium paints for Oregon weather conditions',
      'Thorough surface prep and primer application',
      'Multiple coats for lasting protection',
      'Color consultation included',
    ],
    startingPrice: '$3,500',
    featured: true,
    icon: 'paintbrush',
  },
  {
    slug: 'interior-painting',
    name: 'Interior Painting',
    shortDescription: 'Beautiful interior painting with minimal disruption to your daily life.',
    longDescription: 'Refresh your living spaces with our professional interior painting services. We handle everything from color consultation to furniture protection, ensuring a clean, efficient process with minimal disruption. Our team uses low-VOC paints and proper ventilation for a healthy home environment.',
    bullets: [
      'Low-VOC paint options available',
      'Furniture and floor protection included',
      'Color consultation and design advice',
      'Clean, efficient process with minimal disruption',
    ],
    startingPrice: '$2,500',
    featured: true,
    icon: 'palette',
  },
  {
    slug: 'deck-staining',
    name: 'Deck Staining',
    shortDescription: 'Professional deck staining and sealing to protect your outdoor space.',
    longDescription: 'Extend the life of your deck with professional staining and sealing services. We properly prepare surfaces, apply premium stains, and seal against moisture and UV damage. Our process ensures your deck looks beautiful and stays protected through Oregon\'s wet winters and sunny summers.',
    bullets: [
      'Surface preparation and cleaning',
      'Premium stain and sealant application',
      'Protection against moisture and UV damage',
      'Enhanced appearance and longevity',
    ],
    startingPrice: '$1,200',
    featured: false,
    icon: 'square',
  },
  {
    slug: 'pressure-washing',
    name: 'Pressure Washing',
    shortDescription: 'Professional pressure washing for siding, decks, driveways, and more.',
    longDescription: 'Restore your home\'s exterior with our professional pressure washing services. We safely clean siding, decks, driveways, patios, and walkways using the right pressure and cleaning solutions for each surface. Our service removes dirt, mildew, and stains to reveal a like-new appearance.',
    bullets: [
      'Safe cleaning for all exterior surfaces',
      'Removes dirt, mildew, and stains',
      'Prepares surfaces for painting or staining',
      'Eco-friendly cleaning solutions available',
    ],
    startingPrice: '$350',
    featured: false,
    icon: 'droplet',
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug)
}

export function getFeaturedServices(): Service[] {
  return services.filter((service) => service.featured)
}

