'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Menu } from 'lucide-react'
import { PrimaryButton } from './PrimaryButton'
import { HousecallProButton } from './HousecallProButton'
import { NavDropdown } from './NavDropdown'
import { primaryCities } from '@/data/cities'
import { services } from '@/data/services'

const MobileNav = dynamic(() => import('./MobileNav').then(mod => ({ default: mod.MobileNav })), {
  ssr: false, // Only load when menu is opened
})

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOverLightBackground, setIsOverLightBackground] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const pathname = usePathname()

  // Determine landing page status directly during render
  // This ensures server and client initial renders match without flicker
  // usePathname() works on both server (SSR) and client
  const citySlugs = primaryCities.map(city => city.slug)
  const isHome = pathname === '/'
  const isCity = pathname ? citySlugs.some(slug => pathname === `/${slug}`) : false
  const isLandingPage = isHome || isCity
  const isCityPage = isCity

  // Use native scroll event instead of framer-motion for better performance
  // Also detect background color behind header
  useEffect(() => {
    if (!isLandingPage) {
      setIsOverLightBackground(false)
      return
    }
    
    let ticking = false
    
    // Helper function to determine if a color is white (or very close to white)
    function isWhiteColor(color: string): boolean {
      // Handle transparent/rgba with alpha
      if (!color || color === 'transparent' || color === 'rgba(0, 0, 0, 0)') {
        return false // Default to dark for transparent
      }
      
      // Parse rgb/rgba color
      const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/)
      if (!match) return false
      
      const r = parseInt(match[1])
      const g = parseInt(match[2])
      const b = parseInt(match[3])
      
      // Check if it's white or very close to white
      // All RGB values should be high (>= 240) for white background
      // This ensures we only switch to dark text on actual white backgrounds
      return r >= 240 && g >= 240 && b >= 240
    }
    
    // Helper to get background color from element, walking up the tree
    function getBackgroundColor(element: Element | null): string | null {
      if (!element) return null
      
      let current: Element | null = element
      const maxDepth = 15
      let depth = 0
      
      while (current && depth < maxDepth) {
        const style = window.getComputedStyle(current)
        const bgColor = style.backgroundColor
        
        // Check if this element has a solid background
        if (bgColor && bgColor !== 'transparent' && bgColor !== 'rgba(0, 0, 0, 0)') {
          // Check if it's actually visible (not fully transparent)
          const alphaMatch = bgColor.match(/,\s*([\d.]+)\)$/)
          const alpha = alphaMatch ? parseFloat(alphaMatch[1]) : 1
          if (alpha > 0.1) {
            return bgColor
          }
        }
        
        // Also check for Tailwind white background class specifically
        if (current instanceof HTMLElement) {
          const classList = current.classList
          // Only check for actual white background, not light grays
          if (classList.contains('bg-white')) {
            return 'rgb(255, 255, 255)' // White
          }
        }
        
        current = current.parentElement
        depth++
      }
      return null
    }
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY
          setIsScrolled(scrollY > 50)
          
          // Calculate 10% of page height
          const pageHeight = document.documentElement.scrollHeight
          const top10Percent = pageHeight * 0.1
          
          // If we're in the top 10% of scroll, keep text white
          if (scrollY < top10Percent) {
            setIsOverLightBackground(false) // false = use white text
            ticking = false
            return
          }
          
          // Find which section is currently behind the header
          const headerHeight = window.innerWidth >= 1024 ? 176 : window.innerWidth >= 768 ? 160 : 144
          
          // Find sections or main content areas
          const sections = Array.from(document.querySelectorAll('section, main > div, [class*="bg-"]'))
          let targetElement: Element | null = null
          
          // Find the element that's currently at the top of viewport (behind header)
          for (const section of sections) {
            const rect = section.getBoundingClientRect()
            // Check if this section overlaps with the header area
            if (rect.top <= headerHeight && rect.bottom >= 0) {
              targetElement = section
              break
            }
          }
          
          // Fallback to main or body if no section found
          if (!targetElement) {
            targetElement = document.querySelector('main') || document.body
          }
          
          // Get background color from the target element
          const bgColor = getBackgroundColor(targetElement)
          
          if (bgColor) {
            const isWhite = isWhiteColor(bgColor)
            setIsOverLightBackground(isWhite)
          } else {
            // Default to dark if we can't determine
            setIsOverLightBackground(false)
          }
          
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    
    // Run after page loads and images are ready
    if (document.readyState === 'complete') {
      setTimeout(handleScroll, 100)
    } else {
      window.addEventListener('load', () => setTimeout(handleScroll, 100), { once: true })
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [isLandingPage])
  
  // Determine header styles based on page type and background
  const headerBg = isLandingPage ? 'bg-transparent' : 'bg-white shadow-md'
  
  // Dynamic text color: dark when over light background, white when over dark background
  const shouldUseDarkText = !isLandingPage || (isLandingPage && isOverLightBackground)
  const textColor = shouldUseDarkText ? 'text-slate-900' : 'text-white'
  const hoverColor = shouldUseDarkText ? 'hover:text-primary' : 'hover:text-primary/80'
  
  // Header height based on page type
  const navHeight = isLandingPage 
    ? 'h-36 md:h-40 lg:h-44' 
    : 'h-20 md:h-24 lg:h-28'
  
  // Logo size - use stable default that matches server render, updates after mount
  const logoSize = isLandingPage
    ? 'h-24 w-auto md:h-32 lg:h-36'
    : 'h-14 w-auto md:h-16 lg:h-20'
  
  // Logo source - use white logo on city pages, regular logo elsewhere
  const logoSrc = isCityPage 
    ? '/images/Resurface-it-white-logo.png'
    : '/Resurface-it.png'

  // Services dropdown items
  const servicesDropdownItems = services.map(service => ({
    href: `/services/${service.slug}`,
    label: service.name,
    description: service.shortDescription,
  }))

  // Areas dropdown items - only show main cities
  const mainCities = ['eugene', 'springfield', 'corvallis', 'albany']
  const areasDropdownItems = [
    ...primaryCities
      .filter(city => mainCities.includes(city.slug))
      .sort((a, b) => mainCities.indexOf(a.slug) - mainCities.indexOf(b.slug))
      .map(city => ({
        href: `/${city.slug}-or`,
        label: city.name,
      })),
    {
      href: '/areas-we-serve',
      label: 'View All Areas',
    },
  ]

  // More dropdown items
  const moreDropdownItems = [
    {
      href: '/about',
      label: 'About',
    },
    {
      href: '/case-studies',
      label: 'Case Studies',
    },
    {
      href: '/spotlights',
      label: 'Area Spotlights',
    },
    {
      href: '/warranty',
      label: 'Warranty',
    },
    {
      href: '/blog',
      label: 'Blog',
    },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-30 ${headerBg} transition-all duration-300 overflow-visible`}
      >
        <nav className={`container flex ${navHeight} items-center justify-between overflow-visible`}>
          <Link href="/" className="flex items-center">
            <Image
              src={logoSrc}
              alt="Resurface-it Logo"
              width={400}
              height={130}
              className={logoSize}
              priority
              quality={75}
              fetchPriority="high"
            />
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            <Link
              href="/"
              className={`text-sm font-semibold ${textColor} transition-colors duration-300 ${hoverColor}`}
            >
              Home
            </Link>
            <NavDropdown
              label="Services"
              items={servicesDropdownItems}
              textColor={textColor}
              hoverColor={hoverColor}
              isLandingPage={isLandingPage}
            />
            <NavDropdown
              label="Areas We Serve"
              items={areasDropdownItems}
              textColor={textColor}
              hoverColor={hoverColor}
              isLandingPage={isLandingPage}
            />
            <Link
              href="/gallery"
              className={`text-sm font-semibold ${textColor} transition-colors duration-300 ${hoverColor}`}
            >
              Gallery
            </Link>
            <Link
              href="/paint-studio"
              className={`text-sm font-semibold ${textColor} transition-colors duration-300 ${hoverColor}`}
            >
              Paint Studio
            </Link>
            <NavDropdown
              label="More"
              items={moreDropdownItems}
              textColor={textColor}
              hoverColor={hoverColor}
              isLandingPage={isLandingPage}
            />
            <HousecallProButton className="shadow-lg hover:shadow-xl">Free Estimate</HousecallProButton>
            <button
              data-token="78e82f81455a4447b0f675bb4afc124a"
              data-orgname="Resurface-It"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.open(
                    'https://client.housecallpro.com/customer_portal/request-link?token=78e82f81455a4447b0f675bb4afc124a',
                    '_blank'
                  )
                }
              }}
              suppressHydrationWarning
              className={`rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                shouldUseDarkText
                  ? 'bg-primary text-white hover:bg-primaryDark focus:ring-primary'
                  : 'bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 focus:ring-white/50'
              } shadow-md hover:shadow-lg`}
            >
              Login
            </button>
          </div>

          <button
            onClick={() => setIsMobileNavOpen(true)}
            className="lg:hidden flex items-center justify-center min-w-[44px] min-h-[44px] -mr-2"
            aria-label="Open menu"
          >
            <Menu className={`h-6 w-6 ${textColor} transition-colors duration-300`} />
          </button>
        </nav>
      </header>

      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
    </>
  )
}
