'use client'

import { LazyMotion, domAnimation } from 'framer-motion'

/**
 * MotionProvider - Optimized Framer Motion wrapper
 * 
 * Uses LazyMotion with domAnimation to reduce bundle size by ~60%
 * Only loads animation code when needed
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>
}

