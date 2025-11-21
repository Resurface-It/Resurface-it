import { ProjectCard } from './ProjectCard'

const featuredProjects = [
  {
    image: '/images/project-1.jpg',
    location: 'Eugene, OR',
    services: ['Siding Replacement', 'Exterior Painting'],
    description: 'Complete Hardie board siding replacement with modern color scheme.',
  },
  {
    image: '/images/project-2.jpg',
    location: 'Albany, OR',
    services: ['Exterior Painting'],
    description: 'Full exterior paint refresh with premium weather-resistant paint.',
  },
  {
    image: '/images/project-3.jpg',
    location: 'Corvallis, OR',
    services: ['Interior Painting'],
    description: 'Whole-home interior painting with color consultation.',
  },
  {
    image: '/images/project-4.jpg',
    location: 'Springfield, OR',
    services: ['Siding Replacement'],
    description: 'Vinyl siding replacement with improved insulation.',
  },
]

export function FeaturedProjects() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {featuredProjects.map((project, index) => (
        <ProjectCard key={index} {...project} priority={index < 2} />
      ))}
    </div>
  )
}

