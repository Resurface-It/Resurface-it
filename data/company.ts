export const companyInfo = {
  name: 'Resurface-It, Inc Siding, Roofing & Painting',
  shortName: 'Resurface-It',
  phone: '(541) 913-5940',
  officePhone: '(541) 255-1331',
  email: 'info@resurface-it.com', // TODO: Replace with actual email
  address: {
    street: '2535 Prairie Rd unit c',
    city: 'Eugene',
    state: 'OR',
    zip: '97402',
  },
  ccbLicense: 'CCB #217088',
  hours: {
    weekdays: 'Mon - Sun: 7:00 AM - 6:00 PM',
    saturday: '7:00 AM - 6:00 PM',
    sunday: '7:00 AM - 6:00 PM',
  },
  localKeywords: [
    'siding replacement Eugene OR',
    'exterior painting Eugene Oregon',
    'interior painting Eugene',
    'siding contractors Eugene',
    'house painters Eugene OR',
    'painters near me',
    'Willamette Valley painters',
    'house painters Willamette Valley',
    'painters Eugene OR',
    'painters Albany OR',
    'painters Corvallis',
    'painters Springfield OR',
    'siding contractor',
    'siding contractor Eugene OR',
    'Willamette Valley siding contractor',
    'siding contractors Albany',
    'siding contractors Corvallis',
    'siding contractors Springfield OR',
    'siding replacement Albany OR',
    'exterior painting Corvallis',
    'siding contractors Springfield OR',
    'professional painters Eugene',
    'home exterior services Eugene',
  ],
  // Google Business Profile
  googleBusinessProfileUrl: 'https://maps.app.goo.gl/zrCiSQGYawtB8bSZA',
  googlePlaceId: '', // Optional: Your Google Place ID for API integration

  // Aggregate rating for schema (use real Google review data; set NEXT_PUBLIC_GOOGLE_RATING and NEXT_PUBLIC_GOOGLE_REVIEW_COUNT in .env)
  aggregateRating: (() => {
    const rating = typeof process !== 'undefined' && process.env.NEXT_PUBLIC_GOOGLE_RATING
      ? parseFloat(process.env.NEXT_PUBLIC_GOOGLE_RATING)
      : 5
    const count = typeof process !== 'undefined' && process.env.NEXT_PUBLIC_GOOGLE_REVIEW_COUNT
      ? parseInt(process.env.NEXT_PUBLIC_GOOGLE_REVIEW_COUNT, 10)
      : 50
    return {
      ratingValue: Number.isFinite(rating) ? rating : 5,
      reviewCount: Number.isInteger(count) && count >= 0 ? count : 50,
    }
  })(),

  // Optional: social and review profiles for sameAs in schema (improves brand and local SEO). Set when available.
  facebookUrl: undefined as string | undefined,
  yelpUrl: undefined as string | undefined,
}

