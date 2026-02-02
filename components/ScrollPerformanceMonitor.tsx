'use client'

import { useEffect } from 'react'

/**
 * Scroll Performance Monitor
 * Prevents background containers and sections from creating scroll contexts
 * when sections extend above the viewport due to negative margins.
 */
export function ScrollPerformanceMonitor() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // CRITICAL FIX: Prevent background containers AND sections from creating scroll contexts when section extends above viewport
    const fixBackgroundContainerScrollContext = () => {
      const heroSections = document.querySelectorAll('section[class*="relative"][class*="overflow-hidden"]')
      heroSections.forEach((section) => {
        const sectionEl = section as HTMLElement
        const sectionRect = sectionEl.getBoundingClientRect()
        // CRITICAL: If section extends above viewport, prevent it from creating scroll context
        if (sectionRect.top < 0) {
          const extendAbove = Math.abs(sectionRect.top)
          
          // Prevent the section itself from creating a scroll context
          // Use clip-path on the section to clip the part that extends above viewport
          // This prevents the browser from trying to scroll within the extended area
          sectionEl.style.setProperty('clip-path', `inset(${extendAbove}px 0 0 0)`, 'important')
          // Ensure section can't be scrolled
          sectionEl.style.setProperty('overscroll-behavior', 'none', 'important')
          sectionEl.style.setProperty('overscroll-behavior-y', 'none', 'important')
          sectionEl.style.setProperty('overscroll-behavior-x', 'none', 'important')
          // Prevent touch scrolling on the section
          sectionEl.style.setProperty('touch-action', 'pan-y pan-x', 'important')
        } else {
          // Reset when section doesn't extend above
          sectionEl.style.removeProperty('clip-path')
        }
        
        // Try multiple selectors to find background containers
        const bgContainers = section.querySelectorAll('div[class*="absolute"][class*="inset-0"], div[class*="absolute"][class*="z-0"], div.absolute.inset-0, div.absolute.z-0')
        
        bgContainers.forEach((container) => {
          const containerEl = container as HTMLElement
          
          // If section extends above viewport, clip the background container at viewport top
          if (sectionRect.top < 0) {
            // Calculate how much the section extends above viewport
            const extendAbove = Math.abs(sectionRect.top)
            // CRITICAL FIX: Use clip-path to clip the container at viewport top
            // This prevents the container from creating a scrollable area above the viewport
            const clipTop = extendAbove
            // Use clip-path: inset() to clip the top portion that extends above viewport
            containerEl.style.setProperty('clip-path', `inset(${clipTop}px 0 0 0)`, 'important')
            // Also ensure overflow is hidden
            containerEl.style.setProperty('overflow', 'hidden', 'important')
            // Prevent any scroll capability
            containerEl.style.setProperty('overscroll-behavior', 'none', 'important')
          } else {
            // Reset to normal when section doesn't extend above
            containerEl.style.removeProperty('clip-path')
            // Keep overflow hidden as it's needed for design
          }
        })
      })
    }
    
    // Fix on scroll and resize - use requestAnimationFrame to batch updates
    let fixRafId: number | null = null
    const handleFix = () => {
      if (fixRafId !== null) return // Already scheduled
      fixRafId = requestAnimationFrame(() => {
        fixBackgroundContainerScrollContext()
        fixRafId = null
      })
    }
    
    window.addEventListener('scroll', handleFix, { passive: true })
    window.addEventListener('resize', handleFix, { passive: true })
    
    // Fix immediately
    fixBackgroundContainerScrollContext()

    return () => {
      window.removeEventListener('scroll', handleFix)
      window.removeEventListener('resize', handleFix)
      if (fixRafId !== null) {
        cancelAnimationFrame(fixRafId)
      }
    }
  }, [])

  return null
}
