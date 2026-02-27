'use client'

import Image from 'next/image'

const message = "Friendly faces. Fresh siding. Better paint."

const colorClasses = [
  "text-blue-900",
  "text-black",
  "text-white",
]

export function MarqueeBanner() {
  const items: Array<{ type: 'message' | 'logo'; colorIndex?: number }> = []
  for (let i = 0; i < 10; i++) {
    items.push({ type: 'message', colorIndex: i % 3 })
    items.push({ type: 'logo' })
  }

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
                alt=""
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

  return (
    <div 
      className="border-y-2 border-primary/20 bg-primary/15 py-3 md:py-4 relative"
      role="marquee"
      style={{ minHeight: '3.5rem' }}
    >
      {/* Single accessible instance for screen readers / SEO */}
      <p className="sr-only">{message}</p>

      {/* Animated marquee — all visual duplicates hidden from assistive tech */}
      <div className="overflow-hidden marquee-animated w-full" aria-hidden="true">
        <div className="flex animate-marquee-slow whitespace-nowrap" style={{ width: 'max-content', flexShrink: 0 }}>
          {renderContentBlock(0)}
          {renderContentBlock(1)}
        </div>
      </div>
      
      {/* Static fallback for reduced motion — also hidden from assistive tech (sr-only covers it) */}
      <div className="flex marquee-static overflow-x-auto" aria-hidden="true">
        <div className="flex items-center justify-center gap-4 px-4 whitespace-nowrap">
          {items.slice(0, 4).map((item, index) => {
            if (item.type === 'logo') {
              return (
                <div key={`static-logo-${index}`} className="flex shrink-0 items-center">
                  <Image
                    src="/Resurface-it.png"
                    alt=""
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
