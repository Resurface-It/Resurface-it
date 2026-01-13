'use client'

import Image from 'next/image'
import { paintBrands } from '@/data/paintBrands'

interface BrandSelectorProps {
  onBrandSelect: (brandId: string) => void
}

export function BrandSelector({ onBrandSelect }: BrandSelectorProps) {
  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">Select a Paint Brand</h2>
        <p className="text-lg text-slate-600">
          Choose from our premium paint brand partners
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {paintBrands.map((brand) => {
          const isPPG = brand.id === 'ppg'
          return (
            <button
              key={brand.id}
              onClick={() => onBrandSelect(brand.id)}
              className="group relative flex flex-col items-center justify-center rounded-xl border-2 border-slate-200 bg-white p-8 transition-all hover:border-primary hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label={`Select ${brand.name}`}
            >
              <div className={`mb-4 flex w-full items-center justify-center ${isPPG ? 'h-32' : 'h-24'}`}>
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={isPPG ? 250 : 200}
                  height={isPPG ? 100 : 80}
                  className={`h-auto w-auto object-contain transition-transform group-hover:scale-105 ${
                    isPPG ? 'max-h-28 max-w-[220px]' : 'max-h-20 max-w-[180px]'
                  }`}
                  loading="lazy"
                  quality={75}
                />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{brand.name}</h3>
              <div className="mt-2 text-sm text-slate-500 group-hover:text-primary">
                View paint lines →
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
