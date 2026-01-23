'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Menu } from 'lucide-react'
import { HousecallProButton } from './HousecallProButton'
import { NavDropdown } from './NavDropdown'
import { trackClickToCall } from '@/lib/analytics'
import { primaryCities } from '@/data/cities'
import { services } from '@/data/services'
import { companyInfo } from '@/data/company'

const MobileNav = dynamic(() => import('./MobileNav').then(mod => ({ default: mod.MobileNav })), {
  ssr: false, // Only load when menu is opened
})

export function SiteHeader() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  // Consistent header styling across all pages
  const headerBg = 'bg-white shadow-md'
  const textColor = 'text-slate-900'
  const hoverColor = 'hover:text-primary'
  
  // Consistent header height and logo size across all pages - reduced height
  const navHeight = 'h-16 md:h-20 lg:h-24'
  const logoSize = 'h-10 w-auto md:h-12 lg:h-14'
  
  // Use regular logo on all pages
  const logoSrc = '/Resurface-it.png'

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
        <nav className={`w-full ${navHeight} overflow-visible relative`}>
          <div className="w-full max-w-7xl mx-auto flex items-center justify-between h-full">
            <Link href="/" className="flex items-center self-start pt-2 md:pt-3 lg:pt-4 pl-2 sm:pl-4 lg:pl-6">
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

            <div className="hidden items-center gap-8 lg:flex flex-shrink-0 pr-2 sm:pr-4 lg:pr-6">
              <NavDropdown
                label="Services"
                items={servicesDropdownItems}
                textColor={textColor}
                hoverColor={hoverColor}
              />
              <NavDropdown
                label="Areas We Serve"
                items={areasDropdownItems}
                textColor={textColor}
                hoverColor={hoverColor}
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
              />
              <HousecallProButton className="shadow-lg hover:shadow-xl">Free Estimate</HousecallProButton>
              <a
                href={`tel:${companyInfo.phone.replace(/\D/g, '')}`}
                onClick={() => trackClickToCall(companyInfo.phone)}
                className="text-base md:text-lg text-slate-900 font-semibold hover:text-primary transition-colors whitespace-nowrap"
              >
                {companyInfo.phone}
              </a>
            </div>

            <div className="flex items-center gap-4 lg:hidden pr-2 sm:pr-4">
              <a
                href={`tel:${companyInfo.phone.replace(/\D/g, '')}`}
                onClick={() => trackClickToCall(companyInfo.phone)}
                className="text-slate-900 font-semibold hover:text-primary transition-colors"
              >
                {companyInfo.phone}
              </a>
            </div>
            
            <button
              onClick={() => setIsMobileNavOpen(true)}
              className="lg:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center min-w-[44px] min-h-[44px]"
              aria-label="Open menu"
            >
              <Menu className={`h-6 w-6 ${textColor} transition-colors duration-300`} />
            </button>
          </div>
        </nav>
      </header>

      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
    </>
  )
}
