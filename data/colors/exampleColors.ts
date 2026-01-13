/**
 * Example color data structure
 * 
 * This file demonstrates the structure for color data.
 * Replace with actual color data from paint brands.
 * 
 * For large datasets (100-500 colors per line), consider:
 * 1. Splitting into separate files per brand/line
 * 2. Using dynamic imports
 * 3. Loading via API route
 */

import type { PaintColor } from '../paintColors'

// Example: Sherwin-Williams colors (Good quality level)
export const sherwinWilliamsGoodColors: PaintColor[] = [
  {
    id: 'sw-good-001',
    name: 'Pure White',
    hex: '#FFFFFF',
    rgb: { r: 255, g: 255, b: 255 },
    code: 'SW 7005',
    family: 'neutrals',
  },
  {
    id: 'sw-good-002',
    name: 'Alabaster',
    hex: '#F2F0E6',
    rgb: { r: 242, g: 240, b: 230 },
    code: 'SW 7008',
    family: 'neutrals',
  },
  {
    id: 'sw-good-003',
    name: 'Repose Gray',
    hex: '#CCC9C0',
    rgb: { r: 204, g: 201, b: 192 },
    code: 'SW 7015',
    family: 'grays',
  },
  // Add more colors as needed
]

// Example: Benjamin Moore colors (Good quality level)
export const benjaminMooreGoodColors: PaintColor[] = [
  {
    id: 'bm-good-001',
    name: 'Chantilly Lace',
    hex: '#F7F7F3',
    rgb: { r: 247, g: 247, b: 243 },
    code: 'OC-65',
    family: 'neutrals',
  },
  {
    id: 'bm-good-002',
    name: 'Simply White',
    hex: '#F1F0E8',
    rgb: { r: 241, g: 240, b: 232 },
    code: 'OC-117',
    family: 'neutrals',
  },
  // Add more colors as needed
]

/**
 * Dynamic color loader function
 * This will be used to load colors on demand
 */
export async function loadColorsForBrandAndLine(
  brandId: string,
  paintType: string,
  lineId: string
): Promise<PaintColor[]> {
  // This is a placeholder - replace with actual data loading logic
  // For now, return empty array or example data
  
  if (brandId === 'sherwin-williams' && lineId === 'good') {
    return sherwinWilliamsGoodColors
  }
  
  if (brandId === 'benjamin-moore' && lineId === 'good') {
    return benjaminMooreGoodColors
  }
  
  // Return empty array for other combinations until data is added
  return []
}
