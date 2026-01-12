'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

interface DropdownItem {
  href: string
  label: string
  description?: string
}

interface NavDropdownProps {
  label: string
  items: DropdownItem[]
  textColor: string
  hoverColor: string
  isLandingPage?: boolean
}

export function NavDropdown({ label, items, textColor, hoverColor, isLandingPage }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [])

  function handleMouseEnter() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setIsOpen(true)
  }

  function handleMouseLeave() {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 100)
  }

  return (
    <div
      ref={dropdownRef}
      className="relative z-[60]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`flex items-center gap-1 text-sm font-semibold ${textColor} transition-colors ${hoverColor}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {label}
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full pt-2 z-[9999]">
          <div className="min-w-[280px] max-w-[320px] max-h-[calc(100vh-120px)] overflow-y-auto rounded-lg bg-white/75 backdrop-blur-lg shadow-2xl border border-white/30 py-2">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2.5 text-slate-900 hover:bg-white/40 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="font-semibold text-sm text-slate-900">{item.label}</div>
                {item.description && (
                  <div className="text-xs text-slate-600 mt-0.5">{item.description}</div>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
