/**
 * Paint Can Image Mapping
 * 
 * Maps quality levels to actual image filenames for each brand/paint type combination.
 * Images are now using simple numbered filenames (X.png format) with high resolution (1080x1350px).
 * Based on the order (Good, Better, Best, Premium).
 */

export interface PaintCanImageMap {
  [brandId: string]: {
    [paintType: string]: {
      good: string
      better: string
      best: string
      premium?: string
    }
  }
}

/**
 * Mapping of actual image filenames to quality levels
 * Updated to use simple numbered filenames (X.png format)
 */
export const paintCanImageMap: PaintCanImageMap = {
  'sherwin-williams': {
    interior: {
      good: '17.png',
      better: '18.png',
      best: '19.png',
      premium: '20.png',
    },
    exterior: {
      good: '1.png',
      better: '2.png',
      best: '3.png',
      premium: '4.png',
    },
    'trim-door': {
      good: '32.png',
      better: '33.png',
      best: '34.png',
      premium: '35.png',
    },
  },
  'benjamin-moore': {
    interior: {
      good: '21.png',
      better: '22.png',
      best: '23.png',
      premium: '24.png',
    },
    exterior: {
      good: '5.png',
      better: '6.png',
      best: '7.png',
      premium: '8.png',
    },
    'trim-door': {
      good: '36.png',
      better: '37.png',
      best: '38.png',
      premium: '39.png',
    },
  },
  behr: {
    interior: {
      good: '25.png',
      better: '26.png',
      best: '27.png',
      premium: '28.png',
    },
    exterior: {
      good: '9.png',
      better: '10.png',
      best: '11.png',
      premium: '12.png',
    },
    'trim-door': {
      good: '40.png',
      better: '41.png',
      best: '42.png',
      // Note: Behr trim-door only has 3 quality levels
    },
  },
  ppg: {
    interior: {
      good: '29.png',
      better: '30.png',
      best: '31.png',
      // Note: PPG interior only has 3 quality levels
    },
    exterior: {
      good: '13.png',
      better: '14.png',
      best: '15.png',
      premium: '16.png',
    },
    'trim-door': {
      good: '43.png',
      better: '44.png',
      best: '45.png',
      // Note: PPG trim-door only has 3 quality levels
    },
  },
}

/**
 * Get the image path for a specific brand, paint type, and quality level
 */
export function getPaintCanImagePath(
  brandId: string,
  paintType: string,
  qualityLevelId: string
): string {
  const imageMap = paintCanImageMap[brandId]?.[paintType]
  if (!imageMap) {
    return ''
  }

  const filename = imageMap[qualityLevelId as keyof typeof imageMap]
  if (!filename) {
    return ''
  }

  return `/images/paint-cans/${brandId}/${paintType}/${filename}`
}
