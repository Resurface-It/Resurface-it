import type { PaintColor } from '@/data/paintColors'
import fs from 'fs'
import path from 'path'

interface CachedColorData {
  colors: PaintColor[]
  total: number
  lastModified: number
}

interface ColorFileMeta {
  brand: string
  paintType: string
  qualityLevel: string
  totalColors: number
  lastUpdated: string
}

interface ColorFileData {
  meta: ColorFileMeta
  colors: PaintColor[]
}

// In-memory cache for parsed JSON files
const colorDataCache = new Map<string, CachedColorData>()

// Cache TTL: 1 hour in milliseconds
const CACHE_TTL = 60 * 60 * 1000

/**
 * Get cache key for a brand/type/level combination
 */
function getCacheKey(brand: string, paintType: string, qualityLevel: string): string {
  return `${brand}:${paintType}:${qualityLevel}`
}

/**
 * Get file path for color data JSON file
 */
function getColorFilePath(brand: string, paintType: string, qualityLevel: string): string {
  // Use path.resolve to ensure correct path resolution in all environments
  return path.resolve(
    process.cwd(),
    'data',
    'colors-json',
    brand,
    paintType,
    `${qualityLevel}.json`
  )
}

/**
 * Load and parse color data from JSON file
 */
function loadColorDataFromFile(
  brand: string,
  paintType: string,
  qualityLevel: string
): CachedColorData | null {
  try {
    const filePath = getColorFilePath(brand, paintType, qualityLevel)
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`Color file not found: ${filePath}`)
      }
      return null
    }

    // Read and parse JSON file
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const data: ColorFileData = JSON.parse(fileContent)

    // Validate data structure
    if (!data.colors || !Array.isArray(data.colors)) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`Invalid color data structure in file: ${filePath}`)
        console.error('Data structure:', { hasColors: !!data.colors, colorsType: typeof data.colors, keys: Object.keys(data) })
      }
      return null
    }

    // Get file modification time
    const stats = fs.statSync(filePath)
    const lastModified = stats.mtimeMs

    return {
      colors: data.colors || [],
      total: data.meta?.totalColors || data.colors?.length || 0,
      lastModified,
    }
  } catch (error) {
    console.error(`Error loading color data from file:`, error)
    if (error instanceof Error) {
      console.error(`Error details: ${error.message}`)
    }
    return null
  }
}

/**
 * Get color data with caching
 */
export function getCachedColorData(
  brand: string,
  paintType: string,
  qualityLevel: string
): CachedColorData | null {
  const cacheKey = getCacheKey(brand, paintType, qualityLevel)
  const cached = colorDataCache.get(cacheKey)

  // Check if cache is valid
  if (cached) {
    const filePath = getColorFilePath(brand, paintType, qualityLevel)
    
    // Check if file still exists and get its modification time
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath)
      const fileModified = stats.mtimeMs

      // If file hasn't changed and cache is not expired, return cached data
      if (fileModified === cached.lastModified && Date.now() - cached.lastModified < CACHE_TTL) {
        return cached
      }
    }
  }

  // Load from file and cache
  const data = loadColorDataFromFile(brand, paintType, qualityLevel)
  if (data) {
    colorDataCache.set(cacheKey, data)
  }

  return data
}

/**
 * Clear cache for a specific brand/type/level combination
 */
export function clearColorCache(brand: string, paintType: string, qualityLevel: string): void {
  const cacheKey = getCacheKey(brand, paintType, qualityLevel)
  colorDataCache.delete(cacheKey)
}

/**
 * Clear all color data cache
 */
export function clearAllColorCache(): void {
  colorDataCache.clear()
}

/**
 * Get paginated colors from cached data
 */
export function getPaginatedColors(
  brand: string,
  paintType: string,
  qualityLevel: string,
  page: number = 1,
  limit: number = 50
): {
  colors: PaintColor[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasMore: boolean
  }
} | null {
  const cachedData = getCachedColorData(brand, paintType, qualityLevel)
  
  if (!cachedData) {
    return null
  }

  const { colors, total } = cachedData
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedColors = colors.slice(startIndex, endIndex)
  const totalPages = Math.ceil(total / limit)

  return {
    colors: paginatedColors,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasMore: page < totalPages,
    },
  }
}
