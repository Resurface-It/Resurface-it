'use client'

import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { getBrandById, getQualityLevelsForType, type PaintType } from '@/data/paintBrands'

interface QualityLevelSelectorProps {
  brandId: string
  paintType: PaintType
  onQualityLevelSelect: (qualityLevelId: string) => void
  onBack: () => void
}

export function QualityLevelSelector({
  brandId,
  paintType,
  onQualityLevelSelect,
  onBack,
}: QualityLevelSelectorProps) {
  const brand = getBrandById(brandId)
  const qualityLevels = getQualityLevelsForType(brandId, paintType)
  const paintTypeInfo = brand?.paintTypes.find((type) => type.id === paintType)

  if (!brand || !paintTypeInfo) {
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
            quality={90}
          />
        </div>
        <h2 className="mb-2 text-3xl font-bold md:text-4xl">Select a Paint Line</h2>
        <p className="mb-4 text-lg text-slate-600">
          {brand.name} {paintTypeInfo.displayName}
        </p>
        <p className="text-sm text-slate-500">
          Choose from our quality levels
        </p>
      </div>

      <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${
        qualityLevels.length === 3 
          ? 'lg:grid-cols-3 lg:max-w-4xl lg:mx-auto' 
          : 'lg:grid-cols-4'
      }`}>
        {qualityLevels.map((level, index) => (
          <button
            key={level.id}
            onClick={() => onQualityLevelSelect(level.id)}
            className="group flex flex-col items-center rounded-xl border-2 border-slate-200 bg-white p-6 transition-all hover:border-primary hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label={`Select ${level.displayName} quality level`}
          >
            <div className="relative mb-4 aspect-[3/4] w-full overflow-hidden rounded-lg bg-slate-100">
              <Image
                src={level.imagePath}
                alt={`${brand.name} ${level.displayName} paint can`}
                fill
                className="object-contain p-1 transition-transform group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                loading={index < 4 ? undefined : "lazy"}
                priority={index < 4}
                quality={100}
              />
              {/* Placeholder shown if image fails to load */}
              <div className="absolute inset-0 flex items-center justify-center text-slate-400 opacity-0 pointer-events-none">
                <div className="text-center">
                  <svg className="mx-auto h-8 w-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-slate-900">
              {level.displayName}
            </h3>
            {level.description && (
              <p className="text-center text-sm text-slate-600">
                {level.description}
              </p>
            )}
            <div className="mt-4 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
              View colors →
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
