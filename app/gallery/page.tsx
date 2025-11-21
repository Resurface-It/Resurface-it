'use client'

import { useState } from 'react'
import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { ProjectCard } from '@/components/ProjectCard'
import { trackGalleryFilter } from '@/lib/analytics'

const allProjects = [
  {
    image: '/images/project-1.jpg',
    location: 'Eugene, OR',
    services: ['Siding Replacement', 'Exterior Painting'],
    description: 'Complete Hardie board siding replacement with modern color scheme.',
    category: 'siding',
  },
  {
    image: '/images/project-2.jpg',
    location: 'Albany, OR',
    services: ['Exterior Painting'],
    description: 'Full exterior paint refresh with premium weather-resistant paint.',
    category: 'exterior-painting',
  },
  {
    image: '/images/project-3.jpg',
    location: 'Corvallis, OR',
    services: ['Interior Painting'],
    description: 'Whole-home interior painting with color consultation.',
    category: 'interior-painting',
  },
  {
    image: '/images/project-4.jpg',
    location: 'Springfield, OR',
    services: ['Siding Replacement'],
    description: 'Vinyl siding replacement with improved insulation.',
    category: 'siding',
  },
  {
    image: '/images/project-5.jpg',
    location: 'Eugene, OR',
    services: ['Exterior Painting'],
    description: 'Historic home exterior restoration and painting.',
    category: 'exterior-painting',
  },
  {
    image: '/images/project-6.jpg',
    location: 'Albany, OR',
    services: ['Interior Painting'],
    description: 'Modern interior paint update with accent walls.',
    category: 'interior-painting',
  },
  {
    image: '/images/project-7.jpg',
    location: 'Corvallis, OR',
    services: ['Siding Replacement', 'Exterior Painting'],
    description: 'Complete exterior transformation with new siding and paint.',
    category: 'siding',
  },
  {
    image: '/images/project-8.jpg',
    location: 'Eugene, OR',
    services: ['Interior Painting'],
    description: 'Open concept living space with cohesive color palette.',
    category: 'interior-painting',
  },
]

const filters = [
  { value: 'all', label: 'All' },
  { value: 'siding', label: 'Siding' },
  { value: 'exterior-painting', label: 'Exterior Painting' },
  { value: 'interior-painting', label: 'Interior Painting' },
]

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredProjects =
    activeFilter === 'all'
      ? allProjects
      : allProjects.filter((project) => project.category === activeFilter)

  return (
    <Section className="pt-24">
      <SectionHeader
        title="Our Work"
        subtitle="See the quality and craftsmanship we bring to every project"
      />

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => {
              setActiveFilter(filter.value)
              trackGalleryFilter(filter.value)
            }}
            className={`rounded-full px-6 py-2 font-semibold transition-colors ${
              activeFilter === filter.value
                ? 'bg-primary text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={index} {...project} priority={index < 3} />
        ))}
      </div>
    </Section>
  )
}

