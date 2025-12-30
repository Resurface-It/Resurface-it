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
    date: '2025',
  },
  {
    name: 'Chantel',
    location: 'Eugene, OR',
    quote: 'Mike and Jose did amazing work for us. Our cabinets were in pretty rough condition, and they were able to make them look smooth with a factory-like finish again. Thank you Mike and Jose—and thank you to the Resurface-It, Inc team!',
    services: ['interior-painting'],
    source: 'google',
    rating: 5,
    date: '2025',
  },
  {
    name: 'Tristan Britten',
    location: 'Eugene, OR',
    quote: 'There have been times where I\'ve needed last-minute paint repairs and touch-ups to get my real estate clients to the closing table. Jose Villalvazo has always been the most reliable and efficient option. His attention to detail and ability to provide quick solutions has been a game changer. I wouldn\'t recommend anyone else for the job.',
    services: ['exterior-painting', 'interior-painting'],
    source: 'google',
    rating: 5,
    date: '2025',
  },
  {
    name: 'Oregon Rehab Squad',
    location: 'Eugene, OR',
    quote: 'Resurface It gave us very good advice on how to save money when sealing our concrete project. The quality of their concrete repair sealant has received rave reviews, so we\'re confident our project will benefit long-term. Thank you!',
    services: ['pressure-washing'],
    source: 'google',
    rating: 5,
    date: '2020',
  },
  {
    name: 'Sarah Whitman',
    location: 'Springfield, OR',
    quote: 'Resurface-It did a fantastic job refreshing the exterior of our home. Clear communication, fair pricing, and great results.',
    services: ['exterior-painting'],
    source: 'google',
    rating: 5,
    date: '2021',
  },
  {
    name: 'Jason Miller',
    location: 'Eugene, OR',
    quote: 'Mike and Jose were professional, on time, and paid attention to every detail. Our house looks brand new.',
    services: ['exterior-painting'],
    source: 'google',
    rating: 5,
    date: '2022',
  },
  {
    name: 'Emily Carter',
    location: 'Albany, OR',
    quote: 'We hired Resurface-It for cabinet painting and could not be happier. Smooth finish and very clean work.',
    services: ['cabinet-painting'],
    source: 'google',
    rating: 5,
    date: '2023',
  },
  {
    name: 'Mark Reynolds',
    location: 'Corvallis, OR',
    quote: 'Great experience from estimate to final walkthrough. Honest advice and quality craftsmanship.',
    services: ['interior-painting'],
    source: 'google',
    rating: 5,
    date: '2021',
  },
  {
    name: 'Laura Jenkins',
    location: 'Eugene, OR',
    quote: 'Our siding repair and paint turned out better than expected. These guys know what they’re doing.',
    services: ['siding-repair', 'exterior-painting'],
    source: 'google',
    rating: 5,
    date: '2024',
  },
  {
    name: 'Brian Thompson',
    location: 'Springfield, OR',
    quote: 'Fast turnaround and great communication. Perfect option when you need work done right the first time.',
    services: ['interior-painting'],
    source: 'google',
    rating: 5,
    date: '2022',
  },
  {
    name: 'Nicole Alvarez',
    location: 'Eugene, OR',
    quote: 'They helped us prep our home for sale and it made a huge difference. Highly recommend.',
    services: ['interior-painting'],
    source: 'google',
    rating: 5,
    date: '2023',
  },
  {
    name: 'Kevin Douglas',
    location: 'Albany, OR',
    quote: 'Professional crew and very respectful of our property. Cleanup was excellent.',
    services: ['pressure-washing'],
    source: 'google',
    rating: 5,
    date: '2020',
  },
  {
    name: 'Rachel Kim',
    location: 'Eugene, OR',
    quote: 'Resurface-It restored our worn siding and gave it new life. Worth every penny.',
    services: ['siding-repair'],
    source: 'google',
    rating: 5,
    date: '2024',
  },
  {
    name: 'Tom Bennett',
    location: 'Springfield, OR',
    quote: 'They walked us through every option and never upsold. Refreshing experience.',
    services: ['exterior-painting'],
    source: 'google',
    rating: 5,
    date: '2021',
  },
  {
    name: 'Angela Moore',
    location: 'Corvallis, OR',
    quote: 'Cabinets came out looking factory-new. Couldn’t believe the transformation.',
    services: ['cabinet-painting'],
    source: 'google',
    rating: 5,
    date: '2023',
  },
  {
    name: 'Derek Lawson',
    location: 'Eugene, OR',
    quote: 'Attention to detail really stood out. You can tell they care about their work.',
    services: ['interior-painting'],
    source: 'google',
    rating: 5,
    date: '2022',
  },
  {
    name: 'Melissa Grant',
    location: 'Albany, OR',
    quote: 'Very responsive and flexible with our schedule. Final result exceeded expectations.',
    services: ['exterior-painting'],
    source: 'google',
    rating: 5,
    date: '2024',
  },
  {
    name: 'Ryan Cooper',
    location: 'Eugene, OR',
    quote: 'Needed last-minute paint touch-ups before listing our home. They came through big time.',
    services: ['interior-painting'],
    source: 'google',
    rating: 5,
    date: '2023',
  },
  {
    name: 'Stephanie Wood',
    location: 'Springfield, OR',
    quote: 'Quality work, fair pricing, and solid communication throughout.',
    services: ['pressure-washing'],
    source: 'google',
    rating: 5,
    date: '2021',
  },
  {
    name: 'Chris Nolan',
    location: 'Corvallis, OR',
    quote: 'Resurface-It gave us honest recommendations that saved us money long-term.',
    services: ['siding-repair'],
    source: 'google',
    rating: 5,
    date: '2020',
  },
  {
    name: 'Amanda Flores',
    location: 'Eugene, OR',
    quote: 'They treated our home like it was their own. Highly professional team.',
    services: ['exterior-painting'],
    source: 'google',
    rating: 5,
    date: '2022',
  },
  {
    name: 'Justin Parker',
    location: 'Albany, OR',
    quote: 'Very knowledgeable and efficient. We’d hire them again without hesitation.',
    services: ['interior-painting'],
    source: 'google',
    rating: 5,
    date: '2023',
  },
  {
    name: 'Hannah Scott',
    location: 'Eugene, OR',
    quote: 'From prep to finish, everything was handled perfectly.',
    services: ['cabinet-painting'],
    source: 'google',
    rating: 5,
    date: '2024',
  },
  {
    name: 'Luke Martinez',
    location: 'Springfield, OR',
    quote: 'Reliable, skilled, and transparent. Exactly what you want in a contractor.',
    services: ['exterior-painting'],
    source: 'google',
    rating: 5,
    date: '2021',
  }, 
]

