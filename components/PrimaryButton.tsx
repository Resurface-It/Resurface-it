'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface PrimaryButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragEnd' | 'onDragStart' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'> {
  children: ReactNode
  variant?: 'default' | 'large'
}

export function PrimaryButton({ children, variant = 'default', className = '', ...props }: PrimaryButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-semibold text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  const sizeClasses = variant === 'large' ? 'px-8 py-4 text-lg' : 'px-6 py-3 text-base'
  
  // Check if className overrides background (e.g., bg-white)
  const hasCustomBg = className.includes('bg-white') || className.includes('bg-slate')
  const bgClasses = hasCustomBg 
    ? '' 
    : 'bg-primary hover:bg-primaryDark'

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${sizeClasses} ${bgClasses} shadow-md hover:shadow-lg ${className}`}
      {...(props as any)}
    >
      {children}
    </motion.button>
  )
}

