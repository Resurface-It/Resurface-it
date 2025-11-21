import { ServiceCard } from './ServiceCard'
import { getFeaturedServices, services } from '@/data/services'

interface ServicesGridProps {
  featuredOnly?: boolean
}

export function ServicesGrid({ featuredOnly = false }: ServicesGridProps) {
  const servicesToShow = featuredOnly ? getFeaturedServices() : services

  // On services page (all services), use equal widths. On home page (featured only), use featured layout
  const useEqualWidths = !featuredOnly

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full max-w-6xl flex-wrap justify-center gap-6">
        {servicesToShow.map((service) => (
          <div
            key={service.slug}
            className={`w-full ${
              useEqualWidths
                ? 'md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]'
                : service.featured
                  ? 'md:w-[calc(50%-0.75rem)] lg:w-[calc(66.666%-0.5rem)]'
                  : 'md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]'
            }`}
          >
            <ServiceCard service={service} featured={service.featured} />
          </div>
        ))}
      </div>
    </div>
  )
}

