'use client'

import { CityCard } from './CityCard'
import { CityBadge } from './CityBadge'
import type { City } from '@/data/cities'

interface CitiesGridProps {
  cities: City[]
  surroundingCities: string[]
}

export function CitiesGrid({ cities, surroundingCities }: CitiesGridProps) {
  return (
    <>
      <div className="mt-10 md:mt-12 grid grid-cols-1 gap-5 md:gap-6 md:grid-cols-2 lg:grid-cols-4 px-4 md:px-0">
        {cities.map((city) => (
          <CityCard key={city.slug} city={city} />
        ))}
      </div>

      <div className="mt-10 md:mt-12 px-4 md:px-0">
        <h3 className="mb-4 md:mb-6 text-xl md:text-2xl font-semibold">Also Serving</h3>
        <div className="flex flex-wrap gap-2.5 md:gap-3">
          {surroundingCities.map((city) => (
            <CityBadge key={city} city={city} />
          ))}
        </div>
      </div>
    </>
  )
}

