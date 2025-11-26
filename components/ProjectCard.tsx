'use client'

import Image from 'next/image'

interface ProjectCardProps {
  image: string
  location: string
  services: string[]
  description: string
  priority?: boolean
}

export function ProjectCard({ image, location, services, description, priority = false }: ProjectCardProps) {
  return (
    <div
      className="group relative overflow-hidden rounded-xl transition-transform duration-200 hover:-translate-y-1"
      style={{ willChange: 'transform' }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
        <Image
          src={image}
          alt={`Project in ${location}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading={priority ? 'eager' : 'lazy'}
          priority={priority}
          quality={75}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <p className="mb-1 text-sm font-semibold">{location}</p>
        <p className="mb-2 text-xs text-white/90">{services.join(' • ')}</p>
        <p className="text-sm">{description}</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transition-opacity duration-300 group-hover:opacity-0">
        <p className="font-semibold">{location}</p>
        <p className="text-sm text-white/90">{services.join(' • ')}</p>
      </div>
    </div>
  )
}

