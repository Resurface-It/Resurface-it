'use client'

import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { getBrandById, paintTypes } from '@/data/paintBrands'
import { Home, Building2, DoorOpen } from 'lucide-react'

interface PaintTypeSelectorProps {
  brandId: string
  onPaintTypeSelect: (paintType: string) => void
  onBack: () => void
}

const paintTypeIcons = {
  interior: Home,
  exterior: Building2,
  'trim-door': DoorOpen,
}

export function PaintTypeSelector({
  brandId,
  onPaintTypeSelect,
  onBack,
}: PaintTypeSelectorProps) {
  const brand = getBrandById(brandId)

  if (!brand) {
    return null
  }

  return (
    <div className="w-full">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-slate-600 transition-colors hover:text-primary"
        aria-label="Back to brand selection"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to brands</span>
      </button>

      <div className="mb-8 text-center">
        <div className="mb-4 flex justify-center">
          <Image
            src={brand.logo}
            alt={brand.name}
            width={200}
            height={80}
            className="h-auto w-auto max-h-16 object-contain"
            loading="lazy"
            quality={75}
          />
        </div>
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">Select Paint Type</h2>
        <p className="text-lg text-slate-600">
          Choose the type of paint you need for your project
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {paintTypes.map((paintType) => {
          const Icon = paintTypeIcons[paintType.id]
          return (
            <button
              key={paintType.id}
              onClick={() => onPaintTypeSelect(paintType.id)}
              className="group flex flex-col items-center rounded-xl border-2 border-slate-200 bg-white p-8 transition-all hover:border-primary hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label={`Select ${paintType.displayName}`}
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <Icon className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">
                {paintType.displayName}
              </h3>
              {paintType.description && (
                <p className="mb-4 text-center text-sm text-slate-600">
                  {paintType.description}
                </p>
              )}
              <div className="mt-2 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                View quality levels →
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
