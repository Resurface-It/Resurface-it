'use client'

import Image from 'next/image'

/**
 * Brand Logos Marquee Component
 * 
 * Displays a scrolling marquee of brand logos that Resurface-it works with.
 * Logos scroll horizontally in a continuous loop.
 * 
 * To add new logos:
 * 1. Add logo image to /public/images/brands/
 * 2. Add entry to the brands array below with name, logo, alt, and url
 */

const brands = [
  {
    name: 'BEHR',
    logo: '/images/brands/behr-paint-logo.png',
    alt: 'BEHR Paint',
    url: 'https://www.behr.com',
  },
  {
    name: 'James Hardie',
    logo: '/images/brands/Hardie-logo.png',
    alt: 'James Hardie Siding',
    url: 'https://www.jameshardie.com',
  },
  {
    name: 'TruWood',
    logo: '/images/brands/truwood-logo.jpg',
    alt: 'TruWood Siding & Trim',
    url: 'https://www.truwood.com',
  },
  {
    name: 'Sherwin-Williams',
    logo: '/images/brands/Sherwin-Williams-Logo.webp',
    alt: 'Sherwin-Williams Paint',
    url: 'https://www.sherwin-williams.com',
  },
  {
    name: 'Benjamin Moore',
    logo: '/images/brands/B-M-logo.png',
    alt: 'Benjamin Moore Paint',
    url: 'https://www.benjaminmoore.com',
  },
  {
    name: 'PPG',
    logo: '/images/brands/PPGLogo.png',
    alt: 'PPG Paints',
    url: 'https://www.ppgpaints.com',
  },
]

export function BrandLogosMarquee() {
  // For desktop: duplicate brands array 2x for seamless infinite scrolling (reduced from 4x)
  // 2x is sufficient for seamless loop while reducing DOM nodes by 50%
  const duplicatedBrands = [...brands, ...brands]
  
  // Split brands for mobile grid: 3 on top, rest on bottom
  const topBrands = brands.slice(0, 3)
  const bottomBrands = brands.slice(3)

  return (
    <div 
      className="border-y-2 border-slate-200 bg-white py-6 md:py-8"
      aria-label="Brand partners marquee"
      style={{ minHeight: '7rem' }} // Explicit height to prevent CLS
    >
      {/* Mobile: Grid layout (3 top, 3 bottom) */}
      <div className="md:hidden px-4">
        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-3 md:mb-4">
          {topBrands.map((brand) => {
            const isBehr = brand.name === 'BEHR'
            const isBenjaminMoore = brand.name === 'Benjamin Moore'
            return (
              <a
                key={brand.name}
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
                aria-label={`Visit ${brand.name} website`}
              >
                <Image
                  src={brand.logo}
                  alt={brand.alt}
                  width={isBehr ? 200 : isBenjaminMoore ? 499 : 150}
                  height={isBehr ? 80 : isBenjaminMoore ? 184 : 60}
                  className={`h-9 md:h-10 w-auto ${isBehr ? 'max-w-[100px] md:max-w-[120px]' : isBenjaminMoore ? 'max-w-[100px] md:max-w-[120px]' : 'max-w-[80px] md:max-w-[100px]'} object-contain transition-opacity hover:opacity-90 pointer-events-none`}
                  loading="lazy"
                  quality={75}
                />
              </a>
            )
          })}
        </div>
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {bottomBrands.map((brand) => {
            const isBehr = brand.name === 'BEHR'
            const isBenjaminMoore = brand.name === 'Benjamin Moore'
            return (
              <a
                key={brand.name}
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
                aria-label={`Visit ${brand.name} website`}
              >
                <Image
                  src={brand.logo}
                  alt={brand.alt}
                  width={isBehr ? 200 : isBenjaminMoore ? 499 : 150}
                  height={isBehr ? 80 : isBenjaminMoore ? 184 : 60}
                  className={`h-9 md:h-10 w-auto ${isBehr ? 'max-w-[100px] md:max-w-[120px]' : isBenjaminMoore ? 'max-w-[100px] md:max-w-[120px]' : 'max-w-[80px] md:max-w-[100px]'} object-contain transition-opacity hover:opacity-90 pointer-events-none`}
                  loading="lazy"
                  quality={75}
                />
              </a>
            )
          })}
        </div>
      </div>

      {/* Desktop: Animated marquee - hidden when user prefers reduced motion */}
      <div className="hidden md:flex overflow-hidden marquee-animated">
        <div className="flex animate-marquee-right whitespace-nowrap w-fit py-4">
          {duplicatedBrands.map((brand, index) => {
            const isBehr = brand.name === 'BEHR'
            const isBenjaminMoore = brand.name === 'Benjamin Moore'
            const isDuplicate = index >= brands.length
            return (
              <a
                key={`${brand.name}-${index}`}
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-12 flex shrink-0 items-center justify-center px-4 transition-transform hover:scale-105 cursor-pointer"
                aria-label={isDuplicate ? undefined : `Visit ${brand.name} website`}
                aria-hidden={isDuplicate}
              >
                <Image
                  src={brand.logo}
                  alt={isDuplicate ? '' : brand.alt}
                  width={isBehr ? 200 : isBenjaminMoore ? 499 : 150}
                  height={isBehr ? 80 : isBenjaminMoore ? 184 : 60}
                  className={`${isBehr ? 'h-16 max-w-[200px]' : isBenjaminMoore ? 'h-16 max-w-[200px]' : 'h-16 max-w-[180px]'} w-auto object-contain transition-opacity hover:opacity-90 pointer-events-none`}
                  loading="lazy"
                  quality={75}
                />
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}

