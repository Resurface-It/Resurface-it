'use client'

import { Quote } from 'lucide-react'
import Link from 'next/link'
import type { Testimonial } from '@/data/testimonials'

interface TestimonialCardProps {
  testimonial: Testimonial
}

function StarRating({ rating = 5 }: { rating?: number }) {
  return (
    <div className="mb-3 flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${
            i < (rating || 5)
              ? 'fill-yellow-400 text-yellow-400'
              : 'fill-slate-300 text-slate-300'
          }`}
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  )
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="card h-full">
      <div className="mb-4 flex items-start justify-between">
        <Quote className="h-8 w-8 text-primary/30" />
        {testimonial.source === 'google' && (
          <div className="flex items-center gap-1.5">
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="text-xs font-medium text-slate-600">Google</span>
          </div>
        )}
      </div>
      
      {testimonial.rating && <StarRating rating={testimonial.rating} />}
      
      <p className="mb-6 text-slate-700 italic">&quot;{testimonial.quote}&quot;</p>
      
      <div className="border-t border-slate-200 pt-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-semibold text-slate-900">{testimonial.name}</p>
            <p className="text-sm text-slate-600">{testimonial.location}</p>
            {testimonial.date && (
              <p className="mt-1 text-xs text-slate-500">{testimonial.date}</p>
            )}
          </div>
        </div>
        
        {testimonial.googleReviewUrl && (
          <Link
            href={testimonial.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-xs text-primary hover:text-primaryDark"
          >
            View on Google →
          </Link>
        )}
      </div>
    </div>
  )
}


