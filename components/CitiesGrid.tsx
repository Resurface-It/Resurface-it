'use client'

import { CityCard } from './CityCard'
import { CityBadge } from './CityBadge'
import type { City } from '@/data/cities'
import { serviceAreasByRegion } from '@/data/cities'

interface CitiesGridProps {
  cities: City[]
  surroundingCities: string[]
  /** When provided, "Also Serving" is rendered grouped by region instead of a single flat list. */
  groupByRegion?: boolean
}

const regionLabels: Record<keyof typeof serviceAreasByRegion, string> = {
  laneCounty: 'Lane County / Eugene–Springfield Area',
  linnCounty: 'Linn County / Albany Area',
  bentonCounty: 'Benton County / Corvallis Area',
  nearby: 'Nearby (Commonly Served / Short Drive)',
}

export function CitiesGrid({
  cities,
  surroundingCities,
  groupByRegion = false,
}: CitiesGridProps) {
  return (
    <>
      <div className="mt-10 md:mt-12 grid grid-cols-1 gap-5 md:gap-6 md:grid-cols-2 lg:grid-cols-4 px-4 md:px-0">
        {cities.map((city) => (
          <CityCard key={city.slug} city={city} />
        ))}
      </div>

      <div className="mt-10 md:mt-12 px-4 md:px-0">
        <h3 className="mb-4 md:mb-6 text-xl md:text-2xl font-semibold">Also Serving</h3>
        {groupByRegion ? (
          <div className="space-y-6">
            {(Object.keys(regionLabels) as (keyof typeof serviceAreasByRegion)[]).map(
              (region) => (
                <div key={region}>
                  <h4 className="mb-2 text-sm font-semibold text-slate-600">
                    {regionLabels[region]}
                  </h4>
                  <div className="flex flex-wrap gap-2.5 md:gap-3">
                    {serviceAreasByRegion[region].map((city) => (
                      <CityBadge key={city} city={city} />
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2.5 md:gap-3">
            {surroundingCities.map((city) => (
              <CityBadge key={city} city={city} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

