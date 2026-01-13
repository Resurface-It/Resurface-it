# Paint Studio Setup Guide

## Overview

The Paint Studio page allows users to browse paint colors from premium brands (Sherwin-Williams, Benjamin Moore, Behr, PPG) by selecting a brand, choosing a paint type (Interior, Exterior, or Trim & Door), selecting a quality level, and viewing available colors.

## File Structure

```
app/
  paint-studio/
    layout.tsx          # SEO metadata
    page.tsx            # Main page component

components/
  PaintStudio/
    BrandSelector.tsx           # Step 1: Brand selection
    PaintTypeSelector.tsx       # Step 2: Paint type selection (Interior/Exterior/Trim & Door)
    QualityLevelSelector.tsx    # Step 3: Quality level selection
    ColorGrid.tsx              # Step 4: Color browser
    ColorSwatch.tsx            # Individual color swatch

data/
  paintBrands.ts       # Brand definitions and quality levels
  paintColors.ts       # Color data structure and loader
  colors/              # Color data files (to be added)
    exampleColors.ts   # Example color data structure

public/
  images/
    paint-cans/        # Paint can images (to be added)
      sherwin-williams/
        good.jpg
        better.jpg
        best.jpg
        premium.jpg
      benjamin-moore/
        ...
      behr/
        ...
      ppg/
        ...
```

## Paint Can Images

Paint can images are already set up and mapped in `/data/paintCanImages.ts`. The system automatically maps image filenames to quality levels based on the brand and paint type.

**Current Image Structure**: 
- Images are located in `/public/images/paint-cans/{brand}/{paint-type}/`
- Filenames follow the pattern: `Resurface-It  Good  Better  Best Paint Options (X).png`
- The mapping in `paintCanImages.ts` associates these numbered files with quality levels (Good, Better, Best, Premium)

**Note**: Some brand/type combinations have 3 quality levels (Good, Better, Best) instead of 4. The system automatically filters out missing quality levels.

If you need to add or update images:
1. Add the image file to the appropriate folder
2. Update the mapping in `/data/paintCanImages.ts` to include the new filename

2. Image recommendations:
   - Format: JPG or PNG
   - Aspect ratio: 3:4 (portrait)
   - Size: ~600x800px recommended
   - File size: Optimize to <200KB per image

## Adding Color Data

Color data is loaded dynamically to prevent codebase bloat. To add colors:

### Option 1: Separate Files Per Brand (Recommended for large datasets)

Create files in `/data/colors/`:

- `sherwinWilliamsColors.ts`
- `benjaminMooreColors.ts`
- `behrColors.ts`
- `ppgColors.ts`

Example structure:

```typescript
// data/colors/sherwinWilliamsColors.ts
import type { PaintColor } from '../paintColors'

export async function loadSherwinwilliamsColors(lineId: string): Promise<PaintColor[]> {
  if (lineId === 'good') {
    return [
      {
        id: 'sw-good-001',
        name: 'Pure White',
        hex: '#FFFFFF',
        rgb: { r: 255, g: 255, b: 255 },
        code: 'SW 7005',
        family: 'neutrals',
      },
      // ... more colors
    ]
  }
  // Handle other quality levels
  return []
}
```

### Option 2: API Route (For very large datasets)

Create `/app/api/paint-colors/route.ts` to serve color data:

```typescript
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const brandId = searchParams.get('brand')
  const lineId = searchParams.get('line')
  
  // Load and return color data
  // ...
}
```

Then update `getColorsForBrandAndLine` in `paintColors.ts` to fetch from API.

### Color Data Format

Each color should have:

```typescript
{
  id: string              // Unique identifier
  name: string            // Color name (e.g., "Pure White")
  hex: string             // Hex color code (e.g., "#FFFFFF")
  rgb?: {                 // Optional RGB values
    r: number
    g: number
    b: number
  }
  code?: string           // Brand color code (e.g., "SW 7005")
  family?: string         // Color family (e.g., "neutrals", "reds", "blues")
}
```

**Note**: Color data should be organized by brand, paint type, and quality level. The loader function receives all three parameters: `brandId`, `paintType`, and `lineId`.

## Adding PPG Logo

If PPG logo is not yet available:

1. Add PPG logo to `/public/images/brands/ppg-logo.png`
2. Update the logo path in `data/paintBrands.ts` if needed

## Testing

1. Navigate to `/paint-studio`
2. Select a brand
3. Select a paint type (Interior, Exterior, or Trim & Door)
4. Select a quality level (Good, Better, Best, Premium)
5. View colors (or "coming soon" message if no data)

**URL Structure**: 
- Brand selection: `/paint-studio?brand={brandId}`
- Paint type: `/paint-studio?brand={brandId}&type={paintType}`
- Quality level: `/paint-studio?brand={brandId}&type={paintType}&line={qualityLevel}`

## Performance Considerations

- Color data is loaded only when a quality level is selected
- Uses dynamic imports to prevent bundle bloat
- Images are lazy-loaded with Next.js Image component
- Color swatches are memoized for performance

## Next Steps

1. Add paint can images for all brands/quality levels
2. Add color data for each brand/line combination
3. Consider adding search/filter functionality if needed
4. Add color detail modal/page if desired
5. Link to estimate form with selected colors
