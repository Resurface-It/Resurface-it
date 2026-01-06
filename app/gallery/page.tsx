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
  {
    image: '/images/IMG_1574.JPEG',
    location: 'Eugene, OR',
    services: ['Exterior Painting'],
    description: 'Professional exterior painting with premium finishes.',
    category: 'exterior-painting',
  },
  {
    image: '/images/755454225.jpeg',
    location: 'Albany, OR',
    services: ['Siding Replacement'],
    description: 'Quality siding installation and replacement.',
    category: 'siding',
  },
  {
    image: '/images/755454270.jpeg',
    location: 'Corvallis, OR',
    services: ['Exterior Painting'],
    description: 'Beautiful exterior transformation with lasting results.',
    category: 'exterior-painting',
  },
  {
    image: '/images/IMG_3463.jpeg',
    location: 'Springfield, OR',
    services: ['Interior Painting'],
    description: 'Custom interior painting with expert color selection.',
    category: 'interior-painting',
  },
  {
    image: '/images/image000000.jpeg',
    location: 'Eugene, OR',
    services: ['Siding Replacement', 'Exterior Painting'],
    description: 'Complete exterior makeover with new siding and paint.',
    category: 'siding',
  },
  {
    image: '/images/image000000 2.jpeg',
    location: 'Albany, OR',
    services: ['Exterior Painting'],
    description: 'Fresh exterior paint application with weather protection.',
    category: 'exterior-painting',
  },
  {
    image: '/images/image000000 3.jpeg',
    location: 'Corvallis, OR',
    services: ['Interior Painting'],
    description: 'Interior transformation with premium paints.',
    category: 'interior-painting',
  },
  {
    image: '/images/image000000 4.jpeg',
    location: 'Springfield, OR',
    services: ['Siding Replacement'],
    description: 'Durable siding replacement for lasting protection.',
    category: 'siding',
  },
  {
    image: '/images/image000000 5.jpeg',
    location: 'Eugene, OR',
    services: ['Exterior Painting'],
    description: 'Expert exterior painting with attention to detail.',
    category: 'exterior-painting',
  },
  {
    image: '/images/IMG_0027.jpeg',
    location: 'Albany, OR',
    services: ['Interior Painting'],
    description: 'Professional interior painting services.',
    category: 'interior-painting',
  },
  {
    image: '/images/IMG_0028.jpeg',
    location: 'Corvallis, OR',
    services: ['Siding Replacement', 'Exterior Painting'],
    description: 'Complete exterior renovation and refresh.',
    category: 'siding',
  },
  {
    image: '/images/IMG_0029.jpeg',
    location: 'Springfield, OR',
    services: ['Exterior Painting'],
    description: 'High-quality exterior painting project.',
    category: 'exterior-painting',
  },
  {
    image: '/images/IMG_0030.jpeg',
    location: 'Eugene, OR',
    services: ['Interior Painting'],
    description: 'Beautiful interior color transformation.',
    category: 'interior-painting',
  },
  {
    image: '/images/IMG_0176.jpeg',
    location: 'Albany, OR',
    services: ['Siding Replacement'],
    description: 'Premium siding installation with expert craftsmanship.',
    category: 'siding',
  },
  {
    image: '/images/IMG_0225.jpeg',
    location: 'Corvallis, OR',
    services: ['Exterior Painting'],
    description: 'Stunning exterior paint finish.',
    category: 'exterior-painting',
  },
  {
    image: '/images/IMG_0331.jpeg',
    location: 'Springfield, OR',
    services: ['Interior Painting'],
    description: 'Expert interior painting and finishing.',
    category: 'interior-painting',
  },
  {
    image: '/images/64357870283__11875796-115B-4D5D-9C1E-BE8F464CFE23.jpeg',
    location: 'Eugene, OR',
    services: ['Siding Replacement', 'Exterior Painting'],
    description: 'Complete exterior renovation project.',
    category: 'siding',
  },
  {
    image: '/images/69204329673__4B117300-75C8-467F-8944-569C117B8AC2.jpeg',
    location: 'Albany, OR',
    services: ['Exterior Painting'],
    description: 'Professional exterior painting services.',
    category: 'exterior-painting',
  },
  {
    image: '/images/72773912922__B3A78603-5BC6-4A94-B67A-B8BC8DFED171.jpeg',
    location: 'Corvallis, OR',
    services: ['Interior Painting'],
    description: 'Quality interior painting project.',
    category: 'interior-painting',
  },
  {
    image: '/images/72773914394__1080760B-9C8D-456C-A496-5E33812872C4.jpeg',
    location: 'Springfield, OR',
    services: ['Siding Replacement'],
    description: 'Professional siding replacement service.',
    category: 'siding',
  },
  {
    image: '/images/72773920867__411AE334-5EEC-4171-81E3-B533DFA6D85B.jpeg',
    location: 'Eugene, OR',
    services: ['Exterior Painting'],
    description: 'Beautiful exterior transformation.',
    category: 'exterior-painting',
  },
  {
    image: '/images/72773922135__A8EEB9DC-E5E7-4F9C-B4AC-761BEC2E64F4.jpeg',
    location: 'Albany, OR',
    services: ['Interior Painting'],
    description: 'Expert interior color consultation and painting.',
    category: 'interior-painting',
  },
  {
    image: '/images/72773923523__ECD203AB-C84B-441B-A350-0E73B6914F00.jpeg',
    location: 'Corvallis, OR',
    services: ['Siding Replacement', 'Exterior Painting'],
    description: 'Comprehensive exterior upgrade.',
    category: 'siding',
  },
  {
    image: '/images/72773928483__9ED223B7-5EA3-428B-93A8-4CB84E9A4747.jpeg',
    location: 'Springfield, OR',
    services: ['Exterior Painting'],
    description: 'Premium exterior painting with lasting results.',
    category: 'exterior-painting',
  },
  {
    image: '/images/72800852225__6D05EF1D-57D6-4395-9B75-9DE677B90E6C.jpeg',
    location: 'Eugene, OR',
    services: ['Interior Painting'],
    description: 'Modern interior painting project.',
    category: 'interior-painting',
  },
  {
    image: '/images/72800853364__47CEA20B-11E7-4A56-89B9-60DBD8EAFD5B.jpeg',
    location: 'Albany, OR',
    services: ['Siding Replacement'],
    description: 'Quality siding installation project.',
    category: 'siding',
  },
  {
    image: '/images/72800855214__E991E068-0343-4952-B85B-B08833BF0AE6.jpeg',
    location: 'Corvallis, OR',
    services: ['Exterior Painting'],
    description: 'Professional exterior painting service.',
    category: 'exterior-painting',
  },
  {
    image: '/images/72800856705__6DB2A1E7-013B-452E-BD15-0FA8F44CDEEE.jpeg',
    location: 'Springfield, OR',
    services: ['Interior Painting'],
    description: 'Beautiful interior paint transformation.',
    category: 'interior-painting',
  },
  {
    image: '/images/72800857977__2C4F62C0-A496-4968-812A-63C502AF33F0.jpeg',
    location: 'Eugene, OR',
    services: ['Siding Replacement', 'Exterior Painting'],
    description: 'Complete exterior renovation and painting.',
    category: 'siding',
  },
  {
    image: '/images/72800859111__0E59A6FC-4971-4541-B7C3-0C30AA479720.jpeg',
    location: 'Albany, OR',
    services: ['Exterior Painting'],
    description: 'Expert exterior painting craftsmanship.',
    category: 'exterior-painting',
  },
  {
    image: '/images/72800861212__B92497B7-2AC6-4B77-B8E5-7F8516BCBEE0.jpeg',
    location: 'Corvallis, OR',
    services: ['Interior Painting'],
    description: 'Professional interior painting services.',
    category: 'interior-painting',
  },
  {
    image: '/images/72800867558__5D7DD8A1-CCC4-4D0F-9DA3-C7432A02205F.jpeg',
    location: 'Springfield, OR',
    services: ['Siding Replacement'],
    description: 'High-quality siding replacement project.',
    category: 'siding',
  },
  {
    image: '/images/72800869313__BE139F21-A67C-4161-985C-58A20001D051.jpeg',
    location: 'Eugene, OR',
    services: ['Exterior Painting'],
    description: 'Premium exterior painting finish.',
    category: 'exterior-painting',
  },
  {
    image: '/images/72800872418__260E2384-7065-486F-827D-D7D81A9829F4.jpeg',
    location: 'Albany, OR',
    services: ['Interior Painting'],
    description: 'Interior painting with custom color selection.',
    category: 'interior-painting',
  },
  {
    image: '/images/72833396519__D9359A1F-501E-4985-AF02-0D5B292929CD.jpeg',
    location: 'Corvallis, OR',
    services: ['Siding Replacement', 'Exterior Painting'],
    description: 'Complete exterior transformation project.',
    category: 'siding',
  },
  {
    image: '/images/72833397502__7418CBE7-7A08-481E-9AE3-D83E7D6DE368.jpeg',
    location: 'Springfield, OR',
    services: ['Exterior Painting'],
    description: 'Quality exterior painting project.',
    category: 'exterior-painting',
  },
  {
    image: '/images/72833400337__7244AE22-187F-4325-8649-D38009645D38.jpeg',
    location: 'Eugene, OR',
    services: ['Interior Painting'],
    description: 'Expert interior painting and finishing.',
    category: 'interior-painting',
  },
  {
    image: '/images/72833402584__2B92580B-5230-4195-A79A-F3F705BD3E4D.jpeg',
    location: 'Albany, OR',
    services: ['Siding Replacement'],
    description: 'Professional siding installation service.',
    category: 'siding',
  },
  {
    image: '/images/72860616593__08F79D72-1330-437F-A3A1-323FA9D61DD9.jpeg',
    location: 'Corvallis, OR',
    services: ['Exterior Painting'],
    description: 'Beautiful exterior paint application.',
    category: 'exterior-painting',
  },
  {
    image: '/images/72860617794__661BFC28-539C-4D67-B995-FDF6C9A44315.jpeg',
    location: 'Springfield, OR',
    services: ['Interior Painting'],
    description: 'Modern interior painting project.',
    category: 'interior-painting',
  },
  {
    image: '/images/73187067540__90763E2E-8AC3-4933-9AC2-4821CA067BEF.jpeg',
    location: 'Eugene, OR',
    services: ['Siding Replacement', 'Exterior Painting'],
    description: 'Complete exterior renovation and refresh.',
    category: 'siding',
  },
  {
    image: '/images/73187071414__7FBC2264-7A39-4AAC-A494-9CFBC5422FCA.jpeg',
    location: 'Albany, OR',
    services: ['Exterior Painting'],
    description: 'Professional exterior painting with premium finishes.',
    category: 'exterior-painting',
  },
  {
    image: '/images/73187075856__DDD0EBCF-FE81-4217-A812-7C1EA7C905E0.jpeg',
    location: 'Corvallis, OR',
    services: ['Interior Painting'],
    description: 'Quality interior painting and color consultation.',
    category: 'interior-painting',
  },
  {
    image: '/images/73187079851__4E18FA4E-E3E7-4B6A-9FCB-6FBC42F9962F.jpeg',
    location: 'Springfield, OR',
    services: ['Siding Replacement'],
    description: 'Expert siding replacement service.',
    category: 'siding',
  },
  {
    image: '/images/73196759415__DDAE89A6-B451-441A-A121-110D063E96BF.jpeg',
    location: 'Eugene, OR',
    services: ['Exterior Painting'],
    description: 'Stunning exterior transformation.',
    category: 'exterior-painting',
  },
  {
    image: '/images/73196769213__244F55DF-F6F0-423B-A90B-198A3BDC4BED.jpeg',
    location: 'Albany, OR',
    services: ['Interior Painting'],
    description: 'Beautiful interior painting project.',
    category: 'interior-painting',
  },
  {
    image: '/images/73204030561__AE9E5A20-1726-45A5-9B31-C80A302B5297.jpeg',
    location: 'Corvallis, OR',
    services: ['Siding Replacement', 'Exterior Painting'],
    description: 'Comprehensive exterior upgrade project.',
    category: 'siding',
  },
  {
    image: '/images/73204035373__D7DC5052-3275-4DA4-82C5-554860E20614.jpeg',
    location: 'Springfield, OR',
    services: ['Exterior Painting'],
    description: 'Premium exterior painting service.',
    category: 'exterior-painting',
  },
  {
    image: '/images/73204039813__CF6B04C1-CC1E-489A-A710-8C994D67128F.jpeg',
    location: 'Eugene, OR',
    services: ['Interior Painting'],
    description: 'Expert interior painting with lasting results.',
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
    <Section className="pt-24" animate={false}>
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
          <ProjectCard key={index} {...project} priority={index < 6} />
        ))}
      </div>
    </Section>
  )
}

