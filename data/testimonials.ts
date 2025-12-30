export interface Testimonial {
  name: string
  location: string
  quote: string
  services: string[]
  source?: 'google' | 'manual' // Source of the review
  rating?: number // Star rating (1-5)
  date?: string // Review date (ISO format or readable date)
  googleReviewUrl?: string // Link to the Google review if available
}

/**
 * Filter testimonials to only show 5-star reviews
 * Reviews without a rating are included (assumed to be 5-star)
 */
export function getFiveStarReviews(testimonials: Testimonial[]): Testimonial[] {
  return testimonials.filter((t) => !t.rating || t.rating === 5)
}

export const testimonials: Testimonial[] = [
  // ============================================
  // ADD YOUR GOOGLE REVIEWS HERE
  // ============================================
  // 
  // To add your actual Google reviews:
  // 1. Go to: https://maps.app.goo.gl/zrCiSQGYawtB8bSZA
  // 2. Scroll to the "Reviews" section
  // 3. Copy each 5-star review and add it below using this format:
  //
  // {
  //   name: 'Customer Name',           // First name + last initial (e.g., 'John D.')
  //   location: 'Eugene, OR',          // City and state
  //   quote: 'Exact review text...',   // Copy the exact review text from Google
  //   services: ['exterior-painting'], // Choose relevant service(s)
  //   source: 'google',                // REQUIRED - shows Google badge
  //   rating: 5,                       // REQUIRED - must be 5 to display
  //   date: 'January 2024',            // Review date
  //   googleReviewUrl: '...',          // Optional: Link to the review
  // },
  //
  // IMPORTANT: Only reviews with source: 'google' and rating: 5 will show!
  // ============================================
  
  // Google Reviews from Google Business Profile
  // Source: https://maps.app.goo.gl/zrCiSQGYawtB8bSZA
  {
    name: 'Missy Chambers',
    location: 'Eugene, OR',
    quote: 'Mike and Jose were great to work with on a painting project I had at my house! They were very professional and did an excellent job. Definitely recommend.',
    services: ['exterior-painting', 'interior-painting'],
    source: 'google',
    rating: 5,
    date: '2024',
  },
  {
    name: 'Chantel',
    location: 'Eugene, OR',
    quote: 'Mike and Jose did amazing work for us. Our cabinets were in pretty rough condition, and they were able to make them look smooth with a factory-like finish again. Thank you Mike and Jose—and thank you to the Resurface-It, Inc team!',
    services: ['interior-painting'],
    source: 'google',
    rating: 5,
    date: '2024',
  },
  {
    name: 'Tristan Britten',
    location: 'Eugene, OR',
    quote: 'There have been times where I\'ve needed last-minute paint repairs and touch-ups to get my real estate clients to the closing table. Jose Villalvazo has always been the most reliable and efficient option. His attention to detail and ability to provide quick solutions has been a game changer. I wouldn\'t recommend anyone else for the job.',
    services: ['exterior-painting', 'interior-painting'],
    source: 'google',
    rating: 5,
    date: '2024',
  },
  {
    name: 'Oregon Rehab Squad',
    location: 'Eugene, OR',
    quote: 'Resurface It gave us very good advice on how to save money when sealing our concrete project. The quality of their concrete repair sealant has received rave reviews, so we\'re confident our project will benefit long-term. Thank you!',
    services: ['pressure-washing'],
    source: 'google',
    rating: 5,
    date: '2024',
  },
]

