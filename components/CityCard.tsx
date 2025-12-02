'use client'

import Link from 'next/link'
import type { City } from '@/data/cities'

interface CityCardProps {
  city: City
}

export function CityCard({ city }: CityCardProps) {
  return (
    <div
      className="card transition-transform duration-200 hover:-translate-y-1"
      style={{ willChange: 'transform' }}
    >
      <h3 className="mb-2 text-2xl">{city.name}</h3>
      <p className="mb-4 text-slate-600">{city.blurb}</p>

      {city.nearby.length > 0 && (
        <div className="mb-4">
          <p className="mb-2 text-sm font-semibold text-slate-700">Nearby areas:</p>
          <div className="flex flex-wrap gap-2">
            {city.nearby.map((nearbyCity) => (
              <span
                key={nearbyCity}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700"
              >
                {nearbyCity}
              </span>
            ))}
          </div>
        </div>
      )}

      <Link
        href={`/${city.slug}-or`}
        className="inline-flex items-center text-sm font-semibold text-primary hover:text-primaryDark"
      >
        View {city.name} services
        <span className="ml-1">→</span>
      </Link>
    </div>
  )
}

