import Link from 'next/link'
import { Section } from '@/components/Section'
import { generateMetadata as genMeta } from '@/lib/seo'
import { getCities } from '@/data/geo'
import type { Metadata } from 'next'
import { MapPin } from 'lucide-react'

export const metadata: Metadata = genMeta({
  title: 'Area Service Spotlights | Resurface-It, Inc',
  description: 'Explore our area service spotlights for Eugene, Springfield, Corvallis, and Albany, Oregon. Learn about our approach to exterior services in different neighborhoods.',
  path: '/spotlights',
})

export default function SpotlightsIndexPage() {
  const cities = getCities()

  return (
    <Section className="bg-white py-8 sm:py-12 md:py-16">
      <div className="container">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
            Area Service Spotlights
          </h1>
          <p className="mb-6 sm:mb-8 text-base sm:text-lg text-slate-700">
            Explore our general recommendations and approach to exterior services in different neighborhoods throughout our service areas. These spotlights share insights about what works well for homes in Oregon&apos;s climate.
          </p>
          <p className="mb-6 sm:mb-8 md:mb-12 text-sm sm:text-base text-slate-600">
            <strong>Note:</strong> These pages share general recommendations. For completed projects with real photos and details, see our{' '}
            <Link href="/case-studies" className="font-semibold text-primary hover:underline">
              Case Studies
            </Link>
            .
          </p>

          <div className="grid gap-3 sm:gap-4 md:gap-6 md:grid-cols-2">
            {cities.map((city) => {
              const cityName = city.cityName
              const citySlug = city.citySlug
              return (
                <Link
                  key={citySlug}
                  href={`/spotlights/${citySlug}`}
                  className="group flex flex-col rounded-lg border-2 border-slate-200 bg-white p-3.5 sm:p-5 md:p-6 shadow-sm transition-all hover:border-primary hover:shadow-md"
                >
                  <div className="flex items-start gap-2.5 sm:gap-3 mb-2.5 sm:mb-3">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary flex-shrink-0 mt-0.5" />
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 leading-tight flex-1">
                      {cityName} Spotlights
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm md:text-base text-slate-600 mb-2.5 sm:mb-3 flex-1">
                    Service spotlights for neighborhoods throughout {cityName}, Oregon.
                  </p>
                  <span className="text-xs sm:text-sm md:text-base font-semibold text-primary group-hover:underline mt-auto">
                    View {cityName} Spotlights →
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </Section>
  )
}
