'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, Paintbrush, Palette, Square, Droplet } from 'lucide-react'
import type { Service } from '@/data/services'

interface ServiceCardProps {
  service: Service
  featured?: boolean
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  home: Home,
  paintbrush: Paintbrush,
  palette: Palette,
  square: Square,
  droplet: Droplet,
}

export function ServiceCard({ service, featured = false }: ServiceCardProps) {
  const Icon = service.icon ? iconMap[service.icon] || Home : Home

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="card h-full w-full"
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-2xl">{service.name}</h3>
      </div>

      <p className="mb-4 text-slate-600">{service.shortDescription}</p>

      {service.bullets.length > 0 && (
        <ul className="mb-6 space-y-2">
          {service.bullets.slice(0, 3).map((bullet, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {bullet}
            </li>
          ))}
        </ul>
      )}

      <Link
        href={`/services/${service.slug}`}
        className="inline-flex items-center text-sm font-semibold text-primary hover:text-primaryDark"
      >
        View Service Details
        <span className="ml-1">→</span>
      </Link>
    </motion.div>
  )
}

