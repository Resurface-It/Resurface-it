'use client'

import { useEffect } from 'react'

export function PromotionalBanner() {
  useEffect(() => {
    // Update body data attribute for header positioning
    document.body.setAttribute('data-banner-visible', 'true')
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 min-h-[3.5rem] md:h-14 bg-black text-white py-2 px-3 md:py-3 md:px-4 shadow-lg z-50">
      <div className="container mx-auto flex items-center justify-center text-center leading-[29px]" style={{ verticalAlign: 'middle' }}>
        {/* Text content - responsive sizing */}
        <p className="text-xs md:text-sm lg:text-base font-semibold text-center">
          Built on Craftsmanship. Driven by Integrity. Focused on Longevity.
        </p>
      </div>
    </div>
  )
}
