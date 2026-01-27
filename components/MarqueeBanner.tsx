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
  // Increased to 25 iterations to ensure each content block is significantly wider than any viewport
  // This prevents cut-off issues on the right side at all screen sizes
  // Pattern matches That1painter.com - create content block, then duplicate the entire block
  const items: Array<{ type: 'message' | 'logo'; colorIndex?: number }> = []
  for (let i = 0; i < 25; i++) {
    items.push({ type: 'message', colorIndex: i % 3 })
    items.push({ type: 'logo' })
  }

  // Render a single content block
  const renderContentBlock = (blockIndex: number) => (
    <div key={`content-block-${blockIndex}`} className="flex items-center whitespace-nowrap shrink-0" style={{ minWidth: 'max-content' }}>
      {items.map((item, index) => {
        if (item.type === 'logo') {
          return (
            <div 
              key={`logo-${blockIndex}-${index}`} 
              className="mx-4 md:mx-8 flex shrink-0 items-center"
            >
              <Image
                src="/Resurface-it.png"
                alt="Resurface-it Logo"
                width={180}
                height={60}
                className="h-10 md:h-14 w-auto"
                loading="lazy"
                quality={75}
              />
            </div>
          )
        }
        return (
          <div 
            key={`message-${blockIndex}-${index}`} 
            className="mx-4 md:mx-8 flex shrink-0 items-center whitespace-nowrap"
          >
            <span className={`text-base md:text-2xl lg:text-3xl font-extrabold ${colorClasses[item.colorIndex!]} whitespace-nowrap`}>
              {message}
            </span>
          </div>
        )
      })}
    </div>
  )

  // For static fallback, show only 3 pairs (message + logo) to avoid wrapping
  const staticItems = items.slice(0, 6)

  return (
    <div 
      className="border-y-2 border-primary/20 bg-primary/15 py-3 md:py-4 relative"
      aria-label="Company tagline marquee"
      style={{ minHeight: '3.5rem' }} // Explicit height to prevent CLS
    >
      {/* Animated marquee - works on all screen sizes, hidden when user prefers reduced motion */}
      {/* Pattern: 2 identical content blocks, animation moves -50% for seamless loop */}
      {/* Content extends beyond viewport to prevent right-side cut-off */}
      <div className="overflow-hidden marquee-animated w-full">
        <div className="flex animate-marquee-slow whitespace-nowrap" style={{ width: 'max-content', flexShrink: 0 }}>
          {renderContentBlock(0)}
          {renderContentBlock(1)}
        </div>
      </div>
      
      {/* Static fallback for users who prefer reduced motion */}
      <div className="flex marquee-static overflow-x-auto">
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
                    className="h-10 md:h-14 w-auto"
                    loading="lazy"
                    quality={75}
                  />
                </div>
              )
            }
            return (
              <div key={`static-message-${index}`} className="flex shrink-0 items-center whitespace-nowrap">
                <span className={`text-base md:text-2xl lg:text-3xl font-extrabold ${colorClasses[item.colorIndex!]} whitespace-nowrap`}>
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

