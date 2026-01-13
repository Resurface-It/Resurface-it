export interface PaintColor {
  id: string
  name: string
  hex: string
  rgb?: { r: number; g: number; b: number }
  code?: string
  family?: string // e.g., 'reds', 'blues', 'neutrals'
}

export interface ColorData {
  brandId: string
  lineId: string
  colors: PaintColor[]
}

/**
 * This is a placeholder structure for color data.
 * Color data will be loaded dynamically per brand/line combination
 * to prevent codebase bloat. Actual color data should be added to
 * separate files in /data/colors/ directory or loaded via API.
 */

// Placeholder data structure - replace with actual color data
export const placeholderColors: Record<string, Record<string, PaintColor[]>> = {
  'sherwin-williams': {
    good: [],
    better: [],
    best: [],
    premium: [],
  },
  'benjamin-moore': {
    good: [],
    better: [],
    best: [],
    premium: [],
  },
  behr: {
    good: [],
    better: [],
    best: [],
    premium: [],
  },
  ppg: {
    good: [],
    better: [],
    best: [],
    premium: [],
  },
}

/**
 * Get colors for a specific brand, paint type, and quality level
 * 
 * DEPRECATED: This function is kept for backward compatibility.
 * New code should use the API route directly: /api/paint-colors
 * 
 * This function will attempt to fetch from the API route first,
 * then fall back to dynamic imports if needed.
 */
export async function getColorsForBrandAndLine(
  brandId: string,
  paintType: string,
  lineId: string
): Promise<PaintColor[]> {
  // Try API route first (client-side only)
  if (typeof window !== 'undefined') {
    try {
      const params = new URLSearchParams({
        brand: brandId,
        type: paintType,
        line: lineId,
        page: '1',
        limit: '1000', // Get all colors for backward compatibility
      })

      const response = await fetch(`/api/paint-colors?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        return data.colors || []
      }
    } catch (error) {
      // Fall through to dynamic import fallback
      console.log('API route not available, using fallback')
    }
  }

  // Fallback: Try dynamic imports (server-side or if API fails)
  try {
    const colorModule = await import(`./colors/${brandId}Colors`)
    const loaderFunction = colorModule[`load${brandId.charAt(0).toUpperCase() + brandId.slice(1).replace(/-/g, '')}Colors`]
    
    if (typeof loaderFunction === 'function') {
      return await loaderFunction(lineId)
    }
    
    // Fallback: try example colors loader
    const exampleModule = await import('./colors/exampleColors')
    if (exampleModule.loadColorsForBrandAndLine) {
      return await exampleModule.loadColorsForBrandAndLine(brandId, paintType, lineId)
    }
  } catch (error) {
    // If dynamic import fails, return empty array
    console.log(`Color data not yet available for ${brandId} ${lineId}`)
  }
  
  // Return empty array if no data is found
  return []
}
