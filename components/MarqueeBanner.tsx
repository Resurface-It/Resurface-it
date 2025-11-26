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

  // Duplicate items multiple times for seamless infinite scrolling
  const duplicatedItems = [...items, ...items, ...items, ...items]

  return (
    <div className="overflow-hidden border-y-2 border-primary/20 bg-primary/15 py-4">
      <div className="flex animate-marquee-slow whitespace-nowrap w-fit">
        {duplicatedItems.map((item, index) => {
          if (item.type === 'logo') {
            return (
              <div key={`logo-${index}`} className="mx-8 flex shrink-0 items-center">
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
            <div key={`message-${index}`} className="mx-8 flex shrink-0 items-center whitespace-nowrap">
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

