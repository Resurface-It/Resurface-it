'use client'

import { ReactNode, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface SectionProps {
  children: ReactNode
  className?: string
  animate?: boolean
}

export function Section({ children, className = '', animate = true }: SectionProps) {
  const ref = useRef(null)
  // Optimized intersection observer: larger margin to trigger earlier, once: true to stop observing after trigger
  // Using threshold: 0.1 instead of amount: 0.2 for better performance
  const isInView = useInView(ref, { 
    once: true, 
    margin: '100px', // Larger margin to trigger earlier, reducing calculations during scroll
    threshold: 0.1 // More efficient than amount for performance
  })

  if (!animate) {
    return (
      <section ref={ref} className={`section ${className}`}>
        <div className="container">{children}</div>
      </section>
    )
  }

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`section ${className}`}
      // Removed dynamic willChange - causes reflows. Framer Motion handles optimization internally
    >
      <div className="container">{children}</div>
    </motion.section>
  )
}

