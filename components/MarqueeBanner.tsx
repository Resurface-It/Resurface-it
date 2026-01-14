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

  // Duplicate items 2x for seamless infinite scrolling (reduced from 4x for better performance)
  // 2x is sufficient for seamless loop while reducing DOM nodes by 50%
  const duplicatedItems = [...items, ...items]

  return (
    <div 
      className="overflow-hidden border-y-2 border-primary/20 bg-primary/15 py-4"
      aria-label="Company tagline marquee"
      style={{ minHeight: '4rem' }} // Explicit height to prevent CLS
    >
      {/* Animated marquee - hidden when user prefers reduced motion */}
      <div className="flex animate-marquee-slow whitespace-nowrap w-fit marquee-animated">
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
                  className="h-12 w-auto md:h-14"
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
              <span className={`text-xl font-extrabold ${colorClasses[item.colorIndex!]} md:text-2xl lg:text-3xl whitespace-nowrap`}>
                {message}
              </span>
            </div>
          )
        })}
      </div>
      
      {/* Static fallback for users who prefer reduced motion */}
      <div className="hidden marquee-static flex-wrap items-center justify-center gap-4 px-4">
        {items.map((item, index) => {
          if (item.type === 'logo') {
            return (
              <div key={`static-logo-${index}`} className="flex shrink-0 items-center">
                <Image
                  src="/Resurface-it.png"
                  alt="Resurface-it Logo"
                  width={180}
                  height={60}
                  className="h-12 w-auto md:h-14"
                  loading="lazy"
                  quality={75}
                />
              </div>
            )
          }
          return (
            <div key={`static-message-${index}`} className="flex shrink-0 items-center whitespace-nowrap">
              <span className={`text-xl font-extrabold ${colorClasses[item.colorIndex!]} md:text-2xl lg:text-3xl whitespace-nowrap`}>
                {message}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

