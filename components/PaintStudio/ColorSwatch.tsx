'use client'

import { memo } from 'react'
import type { PaintColor } from '@/data/paintColors'

interface ColorSwatchProps {
  color: PaintColor
  onClick?: (color: PaintColor) => void
}

export const ColorSwatch = memo(function ColorSwatch({
  color,
  onClick,
}: ColorSwatchProps) {
  return (
    <button
      onClick={() => onClick?.(color)}
      className="group flex flex-col items-center rounded-lg border border-slate-200 bg-white p-4 transition-all hover:border-primary hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      aria-label={`Color: ${color.name}${color.code ? ` (${color.code})` : ''}`}
    >
      <div
        className="mb-3 h-24 w-full rounded-md border border-slate-200 shadow-sm transition-transform group-hover:scale-105"
        style={{ backgroundColor: color.hex }}
        aria-hidden="true"
      />
      <div className="w-full text-center">
        <p className="text-sm font-semibold text-slate-900">{color.name}</p>
        {color.code && (
          <p className="mt-1 text-xs text-slate-500">{color.code}</p>
        )}
        {color.family && (
          <p className="mt-1 text-xs text-slate-400">{color.family}</p>
        )}
      </div>
    </button>
  )
})
