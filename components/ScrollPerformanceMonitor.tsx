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

    // Prevent background containers from creating scroll contexts when section extends above viewport.
    // Skip hero-style sections (overflow-hidden) so we never apply inline styles that block document scroll.
    const fixBackgroundContainerScrollContext = () => {
      const sections = document.querySelectorAll('section[class*="relative"] > div[class*="absolute"][class*="inset-0"]')
      const parentSections = new Set<Element>()
      sections.forEach((el) => {
        const section = el.closest('section')
        if (section) parentSections.add(section)
      })
      parentSections.forEach((section) => {
        if (section.classList.contains('overflow-hidden')) return // skip hero sections
        const sectionEl = section as HTMLElement
        const sectionRect = sectionEl.getBoundingClientRect()
        // CRITICAL: If section extends above viewport, prevent it from creating scroll context
        if (sectionRect.top < 0) {
          const extendAbove = Math.abs(sectionRect.top)
          // Clip the section visually so content above viewport is not painted; do NOT set
          // overscroll-behavior or touch-action here—that blocks document scroll when the
          // cursor is over the hero and causes "scroll works then stops after a second".
          sectionEl.style.setProperty('clip-path', `inset(${extendAbove}px 0 0 0)`, 'important')
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
