'use client'

import Image from 'next/image'

interface ServiceImageContainerProps {
  src: string
  alt: string
}

export function ServiceImageContainer({ src, alt }: ServiceImageContainerProps) {
  return (
    <div
      className="relative w-full max-w-4xl overflow-hidden bg-white service-image-container flex items-center justify-center"
      style={{
        height: '150px',
        minHeight: '150px',
        maxHeight: '150px',
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain"
        priority
        sizes="(max-width: 768px) 100vw, 896px"
        style={{
          objectFit: 'contain',
          objectPosition: 'center center',
        }}
      />
    </div>
  )
}
