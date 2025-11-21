import { ReactNode } from 'react'
import Link from 'next/link'

interface PillBadgeProps {
  children: ReactNode
  className?: string
  href?: string
}

export function PillBadge({ children, className = '', href }: PillBadgeProps) {
  const baseClasses = `inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary ${className}`
  
  if (href) {
    return (
      <Link href={href} className={`${baseClasses} transition-opacity hover:opacity-80`}>
        {children}
      </Link>
    )
  }

  return (
    <span className={baseClasses}>
      {children}
    </span>
  )
}

