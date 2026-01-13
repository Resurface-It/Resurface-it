/**
 * Paint Can Image Mapping
 * 
 * Maps quality levels to actual image filenames for each brand/paint type combination.
 * Images are named with numbers in parentheses, and we map them to quality levels
 * based on their order (Good, Better, Best, Premium).
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
 * Based on the numbered filenames in the paint-cans directory
 */
export const paintCanImageMap: PaintCanImageMap = {
  'sherwin-williams': {
    interior: {
      good: 'Resurface-It  Good  Better  Best Paint Options (16).png',
      better: 'Resurface-It  Good  Better  Best Paint Options (17).png',
      best: 'Resurface-It  Good  Better  Best Paint Options (18).png',
      premium: 'Resurface-It  Good  Better  Best Paint Options (19).png',
    },
    exterior: {
      good: 'Resurface-It  Good  Better  Best Paint Options.png',
      better: 'Resurface-It  Good  Better  Best Paint Options (1).png',
      best: 'Resurface-It  Good  Better  Best Paint Options (2).png',
      premium: 'Resurface-It  Good  Better  Best Paint Options (3).png',
    },
    'trim-door': {
      good: 'Resurface-It  Good  Better  Best Paint Options (31).png',
      better: 'Resurface-It  Good  Better  Best Paint Options (32).png',
      best: 'Resurface-It  Good  Better  Best Paint Options (33).png',
      premium: 'Resurface-It  Good  Better  Best Paint Options (34).png',
    },
  },
  'benjamin-moore': {
    interior: {
      good: 'Resurface-It  Good  Better  Best Paint Options (20).png',
      better: 'Resurface-It  Good  Better  Best Paint Options (21).png',
      best: 'Resurface-It  Good  Better  Best Paint Options (22).png',
      premium: 'Resurface-It  Good  Better  Best Paint Options (23).png',
    },
    exterior: {
      good: 'Resurface-It  Good  Better  Best Paint Options (4).png',
      better: 'Resurface-It  Good  Better  Best Paint Options (5).png',
      best: 'Resurface-It  Good  Better  Best Paint Options (6).png',
      premium: 'Resurface-It  Good  Better  Best Paint Options (7).png',
    },
    'trim-door': {
      good: 'Resurface-It  Good  Better  Best Paint Options (35).png',
      better: 'Resurface-It  Good  Better  Best Paint Options (36).png',
      best: 'Resurface-It  Good  Better  Best Paint Options (37).png',
      premium: 'Resurface-It  Good  Better  Best Paint Options (38).png',
    },
  },
  behr: {
    interior: {
      good: 'Resurface-It  Good  Better  Best Paint Options (24).png',
      better: 'Resurface-It  Good  Better  Best Paint Options (25).png',
      best: 'Resurface-It  Good  Better  Best Paint Options (26).png',
      premium: 'Resurface-It  Good  Better  Best Paint Options (27).png',
    },
    exterior: {
      good: 'Resurface-It  Good  Better  Best Paint Options (8).png',
      better: 'Resurface-It  Good  Better  Best Paint Options (9).png',
      best: 'Resurface-It  Good  Better  Best Paint Options (10).png',
      premium: 'Resurface-It  Good  Better  Best Paint Options (11).png',
    },
    'trim-door': {
      good: 'Resurface-It  Good  Better  Best Paint Options (39).png',
      better: 'Resurface-It  Good  Better  Best Paint Options (40).png',
      best: 'Resurface-It  Good  Better  Best Paint Options (41).png',
      // Note: Behr trim-door only has 3 quality levels
    },
  },
  ppg: {
    interior: {
      good: 'Resurface-It  Good  Better  Best Paint Options (28).png',
      better: 'Resurface-It  Good  Better  Best Paint Options (29).png',
      best: 'Resurface-It  Good  Better  Best Paint Options (30).png',
      // Note: PPG interior only has 3 quality levels
    },
    exterior: {
      good: 'Resurface-It  Good  Better  Best Paint Options (12).png',
      better: 'Resurface-It  Good  Better  Best Paint Options (13).png',
      best: 'Resurface-It  Good  Better  Best Paint Options (14).png',
      premium: 'Resurface-It  Good  Better  Best Paint Options (15).png',
    },
    'trim-door': {
      good: 'Resurface-It  Good  Better  Best Paint Options (42).png',
      better: 'Resurface-It  Good  Better  Best Paint Options (43).png',
      best: 'Resurface-It  Good  Better  Best Paint Options (44).png',
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
