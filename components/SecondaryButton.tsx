'use client'

import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface SecondaryButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>, 'onDrag' | 'onDragEnd' | 'onDragStart' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'> {
  children: ReactNode
  href?: string
  as?: 'button' | 'a'
}

export function SecondaryButton({ 
  children, 
  className = '', 
  href,
  as,
  ...props 
}: SecondaryButtonProps) {
  // Check if className contains border-white to determine if it's a white variant
  const isWhiteVariant = className.includes('border-white')
  // Check if className contains rounded-full to use pill style
  const isPillStyle = className.includes('rounded-full')
  const roundedClass = isPillStyle ? 'rounded-full' : 'rounded-lg'
  const baseClasses = isWhiteVariant
    ? `inline-flex items-center justify-center ${roundedClass} border-2 border-white bg-transparent px-6 py-3 text-base font-semibold text-white transition-all duration-200 hover:bg-white hover:text-primary focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg`
    : `inline-flex items-center justify-center ${roundedClass} border-2 border-primary bg-transparent px-6 py-3 text-base font-semibold text-primary transition-all duration-200 hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md`

  // Determine if we should render as anchor (if href is provided or as='a')
  const renderAsAnchor = as === 'a' || (href !== undefined && as !== 'button')

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    className: `${baseClasses} ${className}`,
    ...(props as any),
  }

  if (renderAsAnchor) {
    return (
      <motion.a
        href={href || '#'}
        {...motionProps}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      {...motionProps}
    >
      {children}
    </motion.button>
  )
}

