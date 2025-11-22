'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { TestimonialCard } from './TestimonialCard'
import { testimonials } from '@/data/testimonials'

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TestimonialCard testimonial={testimonials[currentIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={prev}
          className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-primary"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <div className="flex gap-1.5 md:gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`flex items-center justify-center rounded-full transition-all ${
                index === currentIndex 
                  ? 'w-2 h-2 md:w-4 md:h-4 bg-primary' 
                  : 'w-0.5 h-0.5 md:w-1.5 md:h-1.5 bg-slate-300'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-primary"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}

