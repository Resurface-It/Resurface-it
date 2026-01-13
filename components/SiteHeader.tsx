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
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Determine header styles based on page type
  const headerBg = isLandingPage ? 'bg-transparent' : 'bg-white shadow-md'
  const textColor = isLandingPage ? 'text-white' : 'text-slate-900'
  const hoverColor = isLandingPage ? 'hover:text-primary/80' : 'hover:text-primary'
  
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
              className={`text-sm font-semibold ${textColor} transition-colors ${hoverColor}`}
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
              className={`text-sm font-semibold ${textColor} transition-colors ${hoverColor}`}
            >
              Gallery
            </Link>
            <Link
              href="/paint-studio"
              className={`text-sm font-semibold ${textColor} transition-colors ${hoverColor}`}
            >
              Paint Studio
            </Link>
            <Link
              href="/about"
              className={`text-sm font-semibold ${textColor} transition-colors ${hoverColor}`}
            >
              About
            </Link>
            <Link
              href="/warranty"
              className={`text-sm font-semibold ${textColor} transition-colors ${hoverColor}`}
            >
              Warranty
            </Link>
            <Link
              href="/blog"
              className={`text-sm font-semibold ${textColor} transition-colors ${hoverColor}`}
            >
              Blog
            </Link>
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
              className={`rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isLandingPage
                  ? 'bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 focus:ring-white/50'
                  : 'bg-primary text-white hover:bg-primaryDark focus:ring-primary'
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
            <Menu className={`h-6 w-6 ${textColor}`} />
          </button>
        </nav>
      </header>

      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
    </>
  )
}
