'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import type { ButtonHTMLAttributes, ReactNode, MouseEvent } from 'react'

interface HousecallProButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  children?: ReactNode
  variant?: 'default' | 'large'
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

// Declare HCPWidget type for TypeScript
declare global {
  interface Window {
    HCPWidget?: {
      openModal: () => void
    }
  }
}

// Global flag to ensure script only loads once
let scriptLoaded = false

export function HousecallProButton({ 
  children = 'Get Free Estimate', 
  variant = 'default',
  className = '',
  onClick: externalOnClick,
  ...props 
}: HousecallProButtonProps) {
  useEffect(() => {
    // Hide any "Powered by Housecall Pro" text that gets injected
    const hidePoweredBy = () => {
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null
      )
      
      let node
      while (node = walker.nextNode()) {
        if (node.textContent && node.textContent.includes('Powered by Housecall Pro')) {
          const parent = node.parentElement
          if (parent) {
            parent.style.display = 'none'
            parent.style.visibility = 'hidden'
            parent.style.height = '0'
            parent.style.overflow = 'hidden'
          }
        }
      }
    }

    // Ensure Housecall Pro modal has enough height and space
    const ensureModalSpace = () => {
      // Find Housecall Pro modal containers
      const hcpModals = document.querySelectorAll(
        '[id*="hcp"], [class*="hcp-modal"], [class*="hcp-widget"], iframe[src*="housecallpro"], iframe[src*="online-booking"]'
      )
      
      hcpModals.forEach((element) => {
        if (element instanceof HTMLElement) {
          // Ensure modal container has proper dimensions
          if (element.style.position === 'fixed' || element.getAttribute('style')?.includes('position: fixed')) {
            element.style.maxHeight = '100vh'
            element.style.minHeight = '800px'
            element.style.height = 'auto'
            element.style.overflowY = 'auto'
            element.style.zIndex = '9999'
          }
          
          // If it's an iframe, ensure it has proper height
          if (element instanceof HTMLIFrameElement) {
            element.style.minHeight = '800px'
            element.style.height = 'auto'
            element.style.maxHeight = '95vh'
            element.style.width = '100%'
          }
        }
      })
      
      // Also check for dynamically injected modals
      const fixedModals = document.querySelectorAll('div[style*="position: fixed"][style*="z-index"]')
      fixedModals.forEach((modal) => {
        if (modal.querySelector('iframe[src*="housecallpro"], iframe[src*="online-booking"]')) {
          const modalElement = modal as HTMLElement
          modalElement.style.maxHeight = '100vh'
          modalElement.style.minHeight = '800px'
          modalElement.style.height = 'auto'
          modalElement.style.overflowY = 'auto'
          modalElement.style.zIndex = '9999'
        }
      })
    }

    // Run checks periodically
    const hideInterval = setInterval(() => {
      hidePoweredBy()
      ensureModalSpace()
    }, 1000)

    // Also run immediately
    hidePoweredBy()
    ensureModalSpace()

    return () => {
      clearInterval(hideInterval)
    }
  }, [])

  // Base button styles matching PrimaryButton
  // Check if className contains rounded-full to use pill style
  const isPillStyle = className.includes('rounded-full')
  const roundedClass = isPillStyle ? 'rounded-full' : 'rounded-lg'
  const baseClasses = `inline-flex items-center justify-center ${roundedClass} font-semibold text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-primary hover:bg-primaryDark shadow-md hover:shadow-lg`
  const sizeClasses = variant === 'large' ? 'px-8 py-4 text-lg' : 'px-6 py-3 text-base'
  
  // Check if className overrides background
  const hasCustomBg = className.includes('bg-white') || className.includes('bg-slate')
  const bgClasses = hasCustomBg 
    ? '' 
    : 'bg-primary hover:bg-primaryDark'

  // Handle click - call external onClick if provided, then let Housecall Pro handle it
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (externalOnClick) {
      externalOnClick(e)
    }
    // Don't prevent default - let the inline onClick="HCPWidget.openModal()" handle it
  }

  return (
    <>
      {/* Load script only once globally - using Next.js Script component with id to prevent duplicates */}
      <Script
        id="housecallpro-script"
        src="https://online-booking.housecallpro.com/script.js?token=8e0ff8d623db4bd2bd14edc3d764f248&orgName=Resurface-It"
        strategy="lazyOnload"
        onLoad={() => {
          scriptLoaded = true
        }}
      />
      {/* Start of Housecallpro Online booking button */}
      <button
        data-token="8e0ff8d623db4bd2bd14edc3d764f248"
        data-orgname="Resurface-It"
        className={`hcp-button ${baseClasses} ${sizeClasses} ${bgClasses} ${className}`}
        onClick={(e) => {
          handleClick(e)
          // Call HCPWidget.openModal() exactly as in original code
          if (typeof window !== 'undefined' && window.HCPWidget && typeof window.HCPWidget.openModal === 'function') {
            window.HCPWidget.openModal()
          } else {
            // Fallback: try again after a short delay
            setTimeout(() => {
              if (window.HCPWidget && typeof window.HCPWidget.openModal === 'function') {
                window.HCPWidget.openModal()
              }
            }, 500)
          }
        }}
        {...props}
      >
        {children}
      </button>
      {/* End of Housecallpro Online booking button */}
    </>
  )
}
