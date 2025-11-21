import { ReactNode } from 'react'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  className?: string
  align?: 'left' | 'center'
}

export function SectionHeader({ title, subtitle, className = '', align = 'center' }: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'
  const maxWidth = align === 'center' ? 'max-w-3xl' : 'max-w-2xl'

  return (
    <div className={`${alignClass} ${maxWidth} ${className}`}>
      <h2 className="mb-4 text-balance">{title}</h2>
      {subtitle && <p className="text-lg text-slate-600 md:text-xl">{subtitle}</p>}
    </div>
  )
}

