'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import Link from 'next/link'

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
    <div className="fixed top-0 left-0 right-0 h-14 bg-gradient-to-r from-primary to-primaryDark text-white py-3 px-4 shadow-lg z-50">
      <div className="container mx-auto flex items-center justify-center gap-4">
        <p className="text-sm md:text-base font-semibold text-center flex-1">
          <span className="text-lg md:text-xl font-bold">10% off</span> Any exterior projects Booked now for spring
        </p>
        <Link
          href="/contact"
          className="hidden sm:inline-flex items-center px-4 py-1.5 bg-white text-primary rounded-full font-semibold text-sm hover:bg-slate-100 transition-colors whitespace-nowrap"
        >
          Book Now
        </Link>
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 p-1 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
