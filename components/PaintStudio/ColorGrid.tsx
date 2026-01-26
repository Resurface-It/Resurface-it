'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import { getBrandById, getQualityLevelById, type PaintType } from '@/data/paintBrands'
import { BrandRedirectModal } from './BrandRedirectModal'

interface ColorGridProps {
  brandId: string
  paintType: PaintType
  qualityLevelId: string
  onBack: () => void
}

export function ColorGrid({ brandId, paintType, qualityLevelId, onBack }: ColorGridProps) {
  const [showModal, setShowModal] = useState(false)

  const brand = getBrandById(brandId)
  const qualityLevel = getQualityLevelById(brandId, paintType, qualityLevelId)
  const paintTypeInfo = brand?.paintTypes.find((type) => type.id === paintType)

  // Show modal when component mounts
  useEffect(() => {
    if (brand && qualityLevel) {
      setShowModal(true)
    }
  }, [brand, qualityLevel])

  const handleContinue = () => {
    if (brand?.websiteUrl) {
      // Open brand website in new tab
      window.open(brand.websiteUrl, '_blank', 'noopener,noreferrer')
    }
  }

  const handleModalClose = () => {
    setShowModal(false)
    // Navigate back to previous page when modal is closed
    onBack()
  }

  if (!brand || !qualityLevel) {
    return null
  }

  return (
    <>
      <div className="w-full">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-slate-600 transition-colors hover:text-primary"
          aria-label="Back to quality level selection"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to paint lines</span>
        </button>

        <div className="mb-8">
          <div className="mb-4 flex flex-wrap items-center justify-center gap-3">
            <Image
              src={brand.logo}
              alt={brand.name}
              width={150}
              height={60}
              className="h-auto w-auto max-h-12 object-contain"
              loading="lazy"
              quality={75}
            />
            <span className="text-2xl font-semibold text-slate-400">•</span>
            <span className="text-lg text-slate-600">{paintTypeInfo?.displayName}</span>
            <span className="text-2xl font-semibold text-slate-400">•</span>
            <h2 className="text-2xl font-semibold text-slate-900">
              {qualityLevel.displayName}
            </h2>
          </div>
          <p className="text-center text-lg text-slate-600">
            Click below to view colors from {brand.name}
          </p>
        </div>

        {/* Placeholder content - modal will show on mount */}
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <p className="text-lg text-slate-600">
              Preparing to view {brand.name} colors...
            </p>
          </div>
        </div>
      </div>

      <BrandRedirectModal
        isOpen={showModal}
        onClose={handleModalClose}
        brand={brand}
        onContinue={handleContinue}
      />
    </>
  )
}
