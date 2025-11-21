'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import type { Testimonial } from '@/data/testimonials'

interface TestimonialCardProps {
  testimonial: Testimonial
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="card h-full"
    >
      <Quote className="mb-4 h-8 w-8 text-primary/30" />
      <p className="mb-6 text-slate-700 italic">&quot;{testimonial.quote}&quot;</p>
      <div className="border-t border-slate-200 pt-4">
        <p className="font-semibold text-slate-900">{testimonial.name}</p>
        <p className="text-sm text-slate-600">{testimonial.location}</p>
      </div>
    </motion.div>
  )
}

