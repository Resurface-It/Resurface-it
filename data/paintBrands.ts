export type PaintType = 'interior' | 'exterior' | 'trim-door'

export interface PaintTypeInfo {
  id: PaintType
  name: string
  displayName: string
  description?: string
}

export interface QualityLevel {
  id: string
  name: string
  displayName: string
  imagePath: string
  description?: string
}

export interface PaintBrand {
  id: string
  name: string
  logo: string
  websiteUrl: string
  paintTypes: PaintTypeInfo[]
  qualityLevels: QualityLevel[]
}

export const paintTypes: PaintTypeInfo[] = [
  {
    id: 'interior',
    name: 'interior',
    displayName: 'Interior Paint',
    description: 'Perfect for indoor walls, ceilings, and surfaces',
  },
  {
    id: 'exterior',
    name: 'exterior',
    displayName: 'Exterior Paint',
    description: 'Designed to withstand weather and protect your home',
  },
  {
    id: 'trim-door',
    name: 'trim-door',
    displayName: 'Trim & Door Paint',
    description: 'Durable finish for doors, trim, and high-traffic areas',
  },
]

export function getPaintTypeById(id: PaintType): PaintTypeInfo | undefined {
  return paintTypes.find((type) => type.id === id)
}

export const paintBrands: PaintBrand[] = [
  {
    id: 'sherwin-williams',
    name: 'Sherwin-Williams',
    logo: '/images/brands/Sherwin-Williams-Logo.webp',
    websiteUrl: 'https://www.sherwin-williams.com/visualizer',
    paintTypes: paintTypes,
    qualityLevels: [
      {
        id: 'good',
        name: 'good',
        displayName: 'Good',
        imagePath: '/images/paint-cans/sherwin-williams/interior/good.jpg',
        description: 'Quality paint for everyday projects',
      },
      {
        id: 'better',
        name: 'better',
        displayName: 'Better',
        imagePath: '/images/paint-cans/sherwin-williams/interior/better.jpg',
        description: 'Enhanced durability and coverage',
      },
      {
        id: 'best',
        name: 'best',
        displayName: 'Best',
        imagePath: '/images/paint-cans/sherwin-williams/interior/best.jpg',
        description: 'Premium performance and finish',
      },
      {
        id: 'premium',
        name: 'premium',
        displayName: 'Premium',
        imagePath: '/images/paint-cans/sherwin-williams/interior/premium.jpg',
        description: 'Top-tier quality and protection',
      },
    ],
  },
  {
    id: 'benjamin-moore',
    name: 'Benjamin Moore',
    logo: '/images/brands/B-M-logo.png',
    websiteUrl: 'https://www.benjaminmoore.com/en-us/color-overview',
    paintTypes: paintTypes,
    qualityLevels: [
      {
        id: 'good',
        name: 'good',
        displayName: 'Good',
        imagePath: '/images/paint-cans/benjamin-moore/interior/good.jpg',
        description: 'Quality paint for everyday projects',
      },
      {
        id: 'better',
        name: 'better',
        displayName: 'Better',
        imagePath: '/images/paint-cans/benjamin-moore/interior/better.jpg',
        description: 'Enhanced durability and coverage',
      },
      {
        id: 'best',
        name: 'best',
        displayName: 'Best',
        imagePath: '/images/paint-cans/benjamin-moore/interior/best.jpg',
        description: 'Premium performance and finish',
      },
      {
        id: 'premium',
        name: 'premium',
        displayName: 'Premium',
        imagePath: '/images/paint-cans/benjamin-moore/interior/premium.jpg',
        description: 'Top-tier quality and protection',
      },
    ],
  },
  {
    id: 'behr',
    name: 'Behr',
    logo: '/images/brands/behr-paint-logo.png',
    websiteUrl: 'https://www.behr.com/consumer/colors/paint-colors',
    paintTypes: paintTypes,
    qualityLevels: [
      {
        id: 'good',
        name: 'good',
        displayName: 'Good',
        imagePath: '/images/paint-cans/behr/interior/good.jpg',
        description: 'Quality paint for everyday projects',
      },
      {
        id: 'better',
        name: 'better',
        displayName: 'Better',
        imagePath: '/images/paint-cans/behr/interior/better.jpg',
        description: 'Enhanced durability and coverage',
      },
      {
        id: 'best',
        name: 'best',
        displayName: 'Best',
        imagePath: '/images/paint-cans/behr/interior/best.jpg',
        description: 'Premium performance and finish',
      },
      {
        id: 'premium',
        name: 'premium',
        displayName: 'Premium',
        imagePath: '/images/paint-cans/behr/interior/premium.jpg',
        description: 'Top-tier quality and protection',
      },
    ],
  },
  {
    id: 'ppg',
    name: 'PPG',
    logo: '/images/brands/PPGLogo.png',
    websiteUrl: 'https://www.ppgpaints.com/color',
    paintTypes: paintTypes,
    qualityLevels: [
      {
        id: 'good',
        name: 'good',
        displayName: 'Good',
        imagePath: '/images/paint-cans/ppg/interior/good.jpg',
        description: 'Quality paint for everyday projects',
      },
      {
        id: 'better',
        name: 'better',
        displayName: 'Better',
        imagePath: '/images/paint-cans/ppg/interior/better.jpg',
        description: 'Enhanced durability and coverage',
      },
      {
        id: 'best',
        name: 'best',
        displayName: 'Best',
        imagePath: '/images/paint-cans/ppg/interior/best.jpg',
        description: 'Premium performance and finish',
      },
      {
        id: 'premium',
        name: 'premium',
        displayName: 'Premium',
        imagePath: '/images/paint-cans/ppg/interior/premium.jpg',
        description: 'Top-tier quality and protection',
      },
    ],
  },
]

export function getBrandById(id: string): PaintBrand | undefined {
  return paintBrands.find((brand) => brand.id === id)
}

import { getPaintCanImagePath } from './paintCanImages'

export function getQualityLevelById(
  brandId: string,
  paintType: PaintType,
  qualityLevelId: string
): QualityLevel | undefined {
  const brand = getBrandById(brandId)
  if (!brand) return undefined
  
  // Get base quality level
  const baseLevel = brand.qualityLevels.find((level) => level.id === qualityLevelId)
  if (!baseLevel) return undefined
  
  // Get actual image path from mapping
  const imagePath = getPaintCanImagePath(brandId, paintType, qualityLevelId)
  
  return {
    ...baseLevel,
    imagePath: imagePath || baseLevel.imagePath,
  }
}

export function getQualityLevelsForType(
  brandId: string,
  paintType: PaintType
): QualityLevel[] {
  const brand = getBrandById(brandId)
  if (!brand) return []
  
  return brand.qualityLevels
    .map((level) => {
      // Get actual image path from mapping
      const imagePath = getPaintCanImagePath(brandId, paintType, level.id)
      
      return {
        ...level,
        imagePath: imagePath || level.imagePath,
      }
    })
    .filter((level) => {
      // Filter out quality levels that don't have images for this paint type
      // (e.g., some brands/types only have 3 levels instead of 4)
      return level.imagePath !== ''
    })
}
