'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Menu } from 'lucide-react'
import { PrimaryButton } from './PrimaryButton'
import { HousecallProButton } from './HousecallProButton'
import { primaryCities } from '@/data/cities'

const MobileNav = dynamic(() => import('./MobileNav').then(mod => ({ default: mod.MobileNav })), {
  ssr: false, // Only load when menu is opened
})

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const pathname = usePathname()

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

  // Check if we're on a landing page (home or city pages)
  const isHomePage = pathname === '/'
  const citySlugs = primaryCities.map(city => city.slug)
  const isCityPage = pathname && citySlugs.some(slug => pathname === `/${slug}`)
  const isLandingPage = isHomePage || isCityPage
  
  // Determine header styles based on page type
  const headerBg = isLandingPage ? 'bg-transparent' : 'bg-white shadow-md'
  const textColor = isLandingPage ? 'text-white' : 'text-slate-900'
  const hoverColor = isLandingPage ? 'hover:text-primary/80' : 'hover:text-primary'
  
  // Header height based on page type
  const navHeight = isLandingPage 
    ? 'h-36 md:h-40 lg:h-44' 
    : 'h-20 md:h-24 lg:h-28'
  
  // Logo size based on page type
  const logoSize = isLandingPage
    ? 'h-24 w-auto md:h-32 lg:h-36'
    : 'h-14 w-auto md:h-16 lg:h-20'
  
  // Logo source - use white logo on city pages, regular logo elsewhere
  const logoSrc = isCityPage 
    ? '/images/Resurface-it-white-logo.png'
    : '/Resurface-it.png'

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/areas-we-serve', label: 'Areas We Serve' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/about', label: 'About' },
    { href: '/warranty', label: 'Warranty' },
    { href: '/blog', label: 'Blog' },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 ${headerBg} transition-all duration-300`}
      >
        <nav className={`container flex ${navHeight} items-center justify-between`}>
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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold ${textColor} transition-colors ${hoverColor}`}
              >
                {link.label}
              </Link>
            ))}
            <HousecallProButton className="shadow-lg hover:shadow-xl">Free Estimate</HousecallProButton>
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
