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
        <style dangerouslySetInnerHTML={{__html: `
          .testimonial-dot {
            width: 5px !important;
            height: 5px !important;
            min-width: 0 !important;
            min-height: 0 !important;
            padding: 0 !important;
            border: none !important;
          }
          .testimonial-dot.active {
            width: 6px !important;
            height: 6px !important;
          }
          @media (min-width: 768px) {
            .testimonial-dot {
              width: 6px !important;
              height: 6px !important;
            }
            .testimonial-dot.active {
              width: 16px !important;
              height: 16px !important;
            }
          }
        `}} />
        <button
          onClick={prev}
          className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-primary"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <div className="flex gap-1 md:gap-2">
          {fiveStarTestimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`testimonial-dot rounded-full transition-all ${
                index === currentIndex ? 'active bg-primary' : 'bg-slate-300'
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

