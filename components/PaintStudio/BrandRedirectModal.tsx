'use client'

import Image from 'next/image'
import { Modal } from '@/components/Modal'
import { HousecallProButton } from '@/components/HousecallProButton'
import type { PaintBrand } from '@/data/paintBrands'

interface BrandRedirectModalProps {
  isOpen: boolean
  onClose: () => void
  brand: PaintBrand
  onContinue: () => void
}

export function BrandRedirectModal({
  isOpen,
  onClose,
  brand,
  onContinue,
}: BrandRedirectModalProps) {
  const handleBookEstimate = () => {
    // Close this modal immediately
    // The HousecallProButton will handle opening the booking modal
    onClose()
  }

  const handleContinue = () => {
    // Close modal immediately
    onClose()
    // Then redirect to brand website
    onContinue()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="">
      <div className="text-center">
        {/* Brand Logo */}
        <div className="mb-6 flex justify-center">
          <div className="relative h-20 w-48">
            <Image
              src={brand.logo}
              alt={brand.name}
              fill
              className="object-contain"
              sizes="192px"
              loading="eager"
            />
          </div>
        </div>

        {/* Main Message */}
        <h2 className="mb-4 text-2xl font-semibold text-slate-900">
          Before you view colors, {brand.name}
        </h2>
        <p className="mb-8 text-lg text-slate-600">
          Would you like to book your free estimate with us?
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <HousecallProButton
            variant="large"
            className="w-full sm:w-auto min-w-[200px]"
            onClick={handleBookEstimate}
          >
            Book Free Estimate
          </HousecallProButton>
          
          <button
            onClick={handleContinue}
            className="w-full rounded-lg border-2 border-primary bg-white px-6 py-3 text-lg font-semibold text-primary transition-colors hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:w-auto sm:min-w-[200px]"
          >
            Continue to View Colors
          </button>
        </div>

        {/* Note */}
        <p className="mt-6 text-sm text-slate-500">
          You&apos;ll be redirected to {brand.name}&apos;s website to browse their color selection.
        </p>
      </div>
    </Modal>
  )
}
