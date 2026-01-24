'use client'

import Image from 'next/image'

const message = "Friendly faces. Fresh siding. Better paint."

const colorClasses = [
  "text-blue-900", // dark blue
  "text-black",    // black
  "text-white",    // white
]

export function MarqueeBanner() {
  // Create items: message (color 1), logo, message (color 2), logo, message (color 3), logo, repeat
  const items: Array<{ type: 'message' | 'logo'; colorIndex?: number }> = []
  for (let i = 0; i < 6; i++) {
    items.push({ type: 'message', colorIndex: i % 3 })
    items.push({ type: 'logo' })
  }

  // Duplicate items 2x for seamless infinite scrolling
  // 2x with -50% animation creates perfect seamless loop
  const duplicatedItems = [...items, ...items]

  // For static fallback, show only 3 pairs (message + logo) to avoid wrapping
  const staticItems = items.slice(0, 6)

  return (
    <div 
      className="overflow-hidden border-y-2 border-primary/20 bg-primary/15 py-3 md:py-4 relative"
      aria-label="Company tagline marquee"
      style={{ minHeight: '3.5rem' }} // Explicit height to prevent CLS
    >
      {/* Mobile: Simple horizontal scrolling - more reliable */}
      <div className="md:hidden overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-4 px-4 whitespace-nowrap" style={{ width: 'max-content' }}>
          {items.slice(0, 4).map((item, index) => {
            if (item.type === 'logo') {
              return (
                <div key={`mobile-logo-${index}`} className="flex shrink-0 items-center">
                  <Image
                    src="/Resurface-it.png"
                    alt="Resurface-it Logo"
                    width={180}
                    height={60}
                    className="h-10 w-auto"
                    loading="lazy"
                    quality={75}
                  />
                </div>
              )
            }
            return (
              <div key={`mobile-message-${index}`} className="flex shrink-0 items-center whitespace-nowrap">
                <span className={`text-base font-extrabold ${colorClasses[item.colorIndex!]} whitespace-nowrap`}>
                  {message}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Desktop: Animated marquee - hidden when user prefers reduced motion */}
      <div className="hidden md:flex animate-marquee-slow whitespace-nowrap marquee-animated" style={{ width: 'max-content' }}>
        {duplicatedItems.map((item, index) => {
          const isDuplicate = index >= items.length
          if (item.type === 'logo') {
            return (
              <div 
                key={`logo-${index}`} 
                className="mx-8 flex shrink-0 items-center"
                aria-hidden={isDuplicate}
              >
                <Image
                  src="/Resurface-it.png"
                  alt={isDuplicate ? '' : "Resurface-it Logo"}
                  width={180}
                  height={60}
                  className="h-14 w-auto"
                  loading="lazy"
                  quality={75}
                />
              </div>
            )
          }
          return (
            <div 
              key={`message-${index}`} 
              className="mx-8 flex shrink-0 items-center whitespace-nowrap"
              aria-hidden={isDuplicate}
            >
              <span className={`text-2xl lg:text-3xl font-extrabold ${colorClasses[item.colorIndex!]} whitespace-nowrap`}>
                {message}
              </span>
            </div>
          )
        })}
      </div>
      
      {/* Static fallback for users who prefer reduced motion - mobile only */}
      <div className="flex md:hidden marquee-static overflow-x-auto">
        <div className="flex items-center justify-center gap-4 px-4 whitespace-nowrap">
          {staticItems.slice(0, 4).map((item, index) => {
            if (item.type === 'logo') {
              return (
                <div key={`static-logo-${index}`} className="flex shrink-0 items-center">
                  <Image
                    src="/Resurface-it.png"
                    alt="Resurface-it Logo"
                    width={180}
                    height={60}
                    className="h-14 w-auto"
                    loading="lazy"
                    quality={75}
                  />
                </div>
              )
            }
            return (
              <div key={`static-message-${index}`} className="flex shrink-0 items-center whitespace-nowrap">
                <span className={`text-2xl lg:text-3xl font-extrabold ${colorClasses[item.colorIndex!]} whitespace-nowrap`}>
                  {message}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

