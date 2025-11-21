export interface Testimonial {
  name: string
  location: string
  quote: string
  services: string[]
}

export const testimonials: Testimonial[] = [
  {
    name: 'Sarah Johnson',
    location: 'Eugene, OR',
    quote: 'Resurface-It completely transformed our home\'s exterior. The Hardie board siding looks incredible and the team was professional from start to finish. We couldn\'t be happier with the results!',
    services: ['siding-replacement', 'exterior-painting'],
  },
  {
    name: 'Michael Chen',
    location: 'Albany, OR',
    quote: 'Outstanding work on our exterior painting project. They took the time to properly prep everything and the paint job has held up beautifully through two Oregon winters. Highly recommend!',
    services: ['exterior-painting'],
  },
  {
    name: 'Jennifer Martinez',
    location: 'Corvallis, OR',
    quote: 'The interior painting service was exceptional. They were clean, efficient, and the color consultation helped us choose the perfect shades. Our home feels completely refreshed.',
    services: ['interior-painting'],
  },
  {
    name: 'David Thompson',
    location: 'Springfield, OR',
    quote: 'We needed siding replacement after storm damage, and Resurface-It made the whole process smooth. Great communication, quality materials, and expert installation. Worth every penny.',
    services: ['siding-replacement'],
  },
  {
    name: 'Lisa Anderson',
    location: 'Eugene, OR',
    quote: 'Professional, punctual, and the results speak for themselves. Our deck looks brand new after their staining service, and the exterior paint job is flawless. Great company!',
    services: ['deck-staining', 'exterior-painting'],
  },
  {
    name: 'Robert Williams',
    location: 'Albany, OR',
    quote: 'The 5-year warranty gives us peace of mind, but honestly, the quality of work is so good I don\'t think we\'ll need it. These folks know what they\'re doing.',
    services: ['siding-replacement'],
  },
  {
    name: 'Amanda Davis',
    location: 'Corvallis, OR',
    quote: 'From the initial estimate to final walk-through, everything was handled professionally. The team was respectful of our property and the finished product exceeded our expectations.',
    services: ['exterior-painting', 'pressure-washing'],
  },
  {
    name: 'James Wilson',
    location: 'Eugene, OR',
    quote: 'We\'ve used Resurface-It for multiple projects over the years. Consistent quality, fair pricing, and they stand behind their work. That\'s why we keep coming back.',
    services: ['siding-replacement', 'exterior-painting', 'interior-painting'],
  },
]

