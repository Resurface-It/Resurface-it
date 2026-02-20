'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { TestimonialCard } from './TestimonialCard'
import { testimonials, getFiveStarReviews } from '@/data/testimonials'

export function TestimonialsCarousel() {
  const fiveStarTestimonials = getFiveStarReviews(testimonials)
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % fiveStarTestimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + fiveStarTestimonials.length) % fiveStarTestimonials.length)
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
            <TestimonialCard testimonial={fiveStarTestimonials[currentIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={prev}
          className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-primary"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <div className="flex gap-0">
          {fiveStarTestimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="flex items-center justify-center min-w-[44px] min-h-[44px] p-0 border-none bg-transparent"
              aria-label={`Go to testimonial ${index + 1}`}
            >
              <span
                className={`block h-2 w-2 md:h-2.5 md:w-2.5 rounded-full transition-transform duration-200 ${
                  index === currentIndex
                    ? 'bg-primary scale-150 md:scale-[2]'
                    : 'bg-slate-300 scale-100'
                }`}
              />
            </button>
          ))}
        </div>

        <button
          onClick={next}
          className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-primary"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}

