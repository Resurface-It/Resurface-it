'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { HousecallProButton } from './HousecallProButton'

export function PromotionalBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if banner was dismissed in localStorage
    const dismissed = localStorage.getItem('promo-banner-dismissed')
    if (!dismissed) {
      setIsVisible(true)
    }
    // Update body data attribute for header positioning
    document.body.setAttribute('data-banner-visible', String(!dismissed))
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem('promo-banner-dismissed', 'true')
    document.body.setAttribute('data-banner-visible', 'false')
  }

  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 right-0 min-h-[3.5rem] md:h-14 bg-gradient-to-r from-primary to-primaryDark text-white py-2 px-3 md:py-3 md:px-4 shadow-lg z-50">
      <div className="container mx-auto flex items-center justify-between gap-2 md:gap-4">
        {/* Text content - responsive sizing and wrapping */}
        <p className="text-xs md:text-sm lg:text-base font-semibold text-center flex-1 min-w-0">
          <span className="text-sm md:text-lg lg:text-xl font-bold whitespace-nowrap">10% off</span>{' '}
          <span className="hidden sm:inline">Any exterior projects Booked now for spring</span>
          <span className="sm:hidden">Exterior projects - Book now for spring</span>
        </p>
        
        {/* Button - visible on all screen sizes, smaller on mobile */}
        <div className="flex-shrink-0">
          <HousecallProButton className="!px-3 !py-1.5 md:!px-4 md:!py-1.5 bg-white text-primary rounded-full font-semibold text-xs md:text-sm hover:bg-slate-100 whitespace-nowrap min-h-[32px] md:min-h-[36px]">
            <span className="hidden sm:inline">Book Now</span>
            <span className="sm:hidden">Book</span>
          </HousecallProButton>
        </div>
        
        {/* Dismiss button - larger touch target on mobile */}
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 p-1.5 md:p-1 hover:bg-white/20 rounded-full transition-colors min-w-[44px] min-h-[44px] md:min-w-0 md:min-h-0 flex items-center justify-center"
          aria-label="Dismiss banner"
        >
          <X className="h-4 w-4 md:h-5 md:w-5" />
        </button>
      </div>
    </div>
  )
}
