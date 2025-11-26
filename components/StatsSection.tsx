'use client'

import { motion } from 'framer-motion'
import { MapPin, Home, Star, Award, Clock, Sparkles } from 'lucide-react'

const stats = [
  {
    icon: MapPin,
    label: 'Cities Served',
    value: '4+',
  },
  {
    icon: Home,
    label: 'Projects Completed',
    value: '500+',
  },
  {
    icon: Star,
    label: '5 Star Reviews',
    value: '50+',
  },
  {
    icon: Award,
    label: 'Years in Business',
    value: '5+',
  },
  {
    icon: Clock,
    label: 'Response Time',
    value: '24hrs',
  },
  {
    icon: Sparkles,
    label: 'Satisfaction Rate',
    value: '100%',
  },
]

export function StatsSection() {
  return (
    <section className="bg-white py-16">
      <div className="container">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Our Stats</h2>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div className="mb-2 text-3xl font-bold text-slate-900 md:text-4xl">{stat.value}</div>
                <div className="text-sm font-semibold text-slate-600 md:text-base">{stat.label}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

