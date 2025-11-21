'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { PrimaryButton } from './PrimaryButton'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/areas-we-serve', label: 'Areas We Serve' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/about', label: 'About' },
    { href: '/warranty', label: 'Warranty' },
    { href: '/blog', label: 'Blog' },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={onClose}
          />
          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 z-50 h-full w-80 bg-white shadow-xl"
          >
            <div className="flex h-20 items-center justify-between border-b border-slate-200 px-6">
              <span className="text-xl font-bold text-slate-900">Menu</span>
              <button
                onClick={onClose}
                className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex h-[calc(100vh-5rem)] flex-col overflow-y-auto px-6 py-8">
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className="block rounded-lg px-4 py-3 text-lg font-semibold text-slate-900 transition-colors hover:bg-slate-100"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-8">
                <Link href="/contact" onClick={onClose}>
                  <PrimaryButton className="w-full">Free Estimate</PrimaryButton>
                </Link>
              </div>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  )
}

