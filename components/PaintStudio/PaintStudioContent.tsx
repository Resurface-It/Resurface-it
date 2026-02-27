'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { BrandSelector } from './BrandSelector'
import { PaintTypeSelector } from './PaintTypeSelector'
import { QualityLevelSelector } from './QualityLevelSelector'
import { ColorGrid } from './ColorGrid'
import type { PaintType } from '@/data/paintBrands'

type Step = 'brand' | 'type' | 'quality' | 'colors'

export default function PaintStudioContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [step, setStep] = useState<Step>('brand')
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const [selectedPaintType, setSelectedPaintType] = useState<PaintType | null>(null)
  const [selectedQualityLevel, setSelectedQualityLevel] = useState<string | null>(null)

  useEffect(() => {
    const brandParam = searchParams.get('brand')
    const typeParam = searchParams.get('type') as PaintType | null
    const lineParam = searchParams.get('line')

    if (brandParam && typeParam && lineParam) {
      setSelectedBrand(brandParam)
      setSelectedPaintType(typeParam)
      setSelectedQualityLevel(lineParam)
      setStep('colors')
    } else if (brandParam && typeParam) {
      setSelectedBrand(brandParam)
      setSelectedPaintType(typeParam)
      setStep('quality')
    } else if (brandParam) {
      setSelectedBrand(brandParam)
      setStep('type')
    }
  }, [searchParams])

  const handleBrandSelect = (brandId: string) => {
    setSelectedBrand(brandId)
    setStep('type')
    router.push(`/paint-studio?brand=${brandId}`, { scroll: false })
  }

  const handlePaintTypeSelect = (paintType: string) => {
    if (!selectedBrand) return
    setSelectedPaintType(paintType as PaintType)
    setStep('quality')
    router.push(`/paint-studio?brand=${selectedBrand}&type=${paintType}`, {
      scroll: false,
    })
  }

  const handleQualityLevelSelect = (qualityLevelId: string) => {
    if (!selectedBrand || !selectedPaintType) return
    setSelectedQualityLevel(qualityLevelId)
    setStep('colors')
    router.push(
      `/paint-studio?brand=${selectedBrand}&type=${selectedPaintType}&line=${qualityLevelId}`,
      { scroll: false }
    )
  }

  const handleBackToBrands = () => {
    setSelectedBrand(null)
    setSelectedPaintType(null)
    setSelectedQualityLevel(null)
    setStep('brand')
    router.push('/paint-studio', { scroll: false })
  }

  const handleBackToType = () => {
    if (!selectedBrand) return
    setSelectedPaintType(null)
    setSelectedQualityLevel(null)
    setStep('type')
    router.push(`/paint-studio?brand=${selectedBrand}`, { scroll: false })
  }

  const handleBackToQuality = () => {
    if (!selectedBrand || !selectedPaintType) return
    setSelectedQualityLevel(null)
    setStep('quality')
    router.push(`/paint-studio?brand=${selectedBrand}&type=${selectedPaintType}`, {
      scroll: false,
    })
  }

  return (
    <>
      {step === 'brand' && <BrandSelector onBrandSelect={handleBrandSelect} />}

      {step === 'type' && selectedBrand && (
        <PaintTypeSelector
          brandId={selectedBrand}
          onPaintTypeSelect={handlePaintTypeSelect}
          onBack={handleBackToBrands}
        />
      )}

      {step === 'quality' && selectedBrand && selectedPaintType && (
        <QualityLevelSelector
          brandId={selectedBrand}
          paintType={selectedPaintType}
          onQualityLevelSelect={handleQualityLevelSelect}
          onBack={handleBackToType}
        />
      )}

      {step === 'colors' &&
        selectedBrand &&
        selectedPaintType &&
        selectedQualityLevel && (
          <ColorGrid
            brandId={selectedBrand}
            paintType={selectedPaintType}
            qualityLevelId={selectedQualityLevel}
            onBack={handleBackToQuality}
          />
        )}
    </>
  )
}
