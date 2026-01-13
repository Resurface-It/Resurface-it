import { NextRequest, NextResponse } from 'next/server'
import { getPaginatedColors } from '@/lib/colorCache'

/**
 * API Route for Paint Colors
 * 
 * GET /api/paint-colors?brand={brandId}&type={paintType}&line={qualityLevel}&page={page}&limit={limit}
 * 
 * Returns paginated color data for a specific brand, paint type, and quality level.
 * Implements caching and compression for optimal performance.
 */

// Force dynamic rendering (required for searchParams)
export const dynamic = 'force-dynamic'

// Valid brand IDs
const VALID_BRANDS = ['sherwin-williams', 'benjamin-moore', 'behr', 'ppg']

// Valid paint types
const VALID_PAINT_TYPES = ['interior', 'exterior', 'trim-door']

// Valid quality levels
const VALID_QUALITY_LEVELS = ['good', 'better', 'best', 'premium']

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams

    // Extract and validate query parameters
    const brand = searchParams.get('brand')
    const paintType = searchParams.get('type')
    const qualityLevel = searchParams.get('line')
    const pageParam = searchParams.get('page')
    const limitParam = searchParams.get('limit')

    // Validate required parameters
    if (!brand || !paintType || !qualityLevel) {
      return NextResponse.json(
        {
          error: 'Missing required parameters',
          message: 'brand, type, and line parameters are required',
        },
        { status: 400 }
      )
    }

    // Validate brand
    if (!VALID_BRANDS.includes(brand)) {
      return NextResponse.json(
        {
          error: 'Invalid brand',
          message: `Brand must be one of: ${VALID_BRANDS.join(', ')}`,
        },
        { status: 400 }
      )
    }

    // Validate paint type
    if (!VALID_PAINT_TYPES.includes(paintType)) {
      return NextResponse.json(
        {
          error: 'Invalid paint type',
          message: `Paint type must be one of: ${VALID_PAINT_TYPES.join(', ')}`,
        },
        { status: 400 }
      )
    }

    // Validate quality level
    if (!VALID_QUALITY_LEVELS.includes(qualityLevel)) {
      return NextResponse.json(
        {
          error: 'Invalid quality level',
          message: `Quality level must be one of: ${VALID_QUALITY_LEVELS.join(', ')}`,
        },
        { status: 400 }
      )
    }

    // Parse pagination parameters
    const page = pageParam ? Math.max(1, parseInt(pageParam, 10)) : 1
    const limit = limitParam
      ? Math.min(100, Math.max(1, parseInt(limitParam, 10)))
      : 50

    // Validate pagination
    if (isNaN(page) || isNaN(limit)) {
      return NextResponse.json(
        {
          error: 'Invalid pagination parameters',
          message: 'page and limit must be valid numbers',
        },
        { status: 400 }
      )
    }

    // Get paginated color data
    const result = getPaginatedColors(brand, paintType, qualityLevel, page, limit)

    if (!result) {
      // No data found - return empty result
      return NextResponse.json(
        {
          colors: [],
          pagination: {
            page,
            limit,
            total: 0,
            totalPages: 0,
            hasMore: false,
          },
          message: 'No color data available for this combination',
        },
        {
          status: 200,
          headers: {
            'Cache-Control': 'public, max-age=3600, stale-while-revalidate=7200',
            'Content-Type': 'application/json',
          },
        }
      )
    }

    // Return successful response with caching headers
    return NextResponse.json(
      {
        colors: result.colors,
        pagination: result.pagination,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=3600, stale-while-revalidate=7200',
          'Content-Type': 'application/json',
          // Enable compression (Next.js handles this automatically)
          'Vary': 'Accept-Encoding',
        },
      }
    )
  } catch (error) {
    console.error('Error in paint-colors API route:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'An error occurred while fetching color data',
      },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-cache',
        },
      }
    )
  }
}
