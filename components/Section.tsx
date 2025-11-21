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
  const isInView = useInView(ref, { once: true, amount: 0.2 })

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
    >
      <div className="container">{children}</div>
    </motion.section>
  )
}

