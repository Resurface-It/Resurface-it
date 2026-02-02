'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { X, ChevronDown } from 'lucide-react'
import { HousecallProButton } from './HousecallProButton'
import { services } from '@/data/services'
import { primaryCities } from '@/data/cities'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [servicesOpen, setServicesOpen] = useState(false)
  const [areasOpen, setAreasOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)

  // Keep mounted during close so CSS exit transition can run
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
    } else {
      const t = setTimeout(() => setShouldRender(false), 300)
      return () => clearTimeout(t)
    }
  }, [isOpen])

  useEffect(() => {
    let scrollY = 0
    
    if (isOpen) {
      // Store current scroll position
      scrollY = window.scrollY
      // Prevent body scroll while allowing nav content to scroll
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      // Don't disable touch-action completely - allow scrolling within the nav
      // touch-action: none would prevent all touch interactions
    } else {
      // Restore scroll position
      const savedScrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      if (savedScrollY) {
        const scrollValue = parseInt(savedScrollY.replace('px', '').replace('-', ''), 10)
        if (!isNaN(scrollValue)) {
          window.scrollTo({ top: scrollValue, behavior: 'instant' })
        }
      }
      // Reset dropdown states when menu closes
      setServicesOpen(false)
      setAreasOpen(false)
      setMoreOpen(false)
    }
    return () => {
      // Cleanup: restore scroll position
      const savedScrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      if (savedScrollY) {
        const scrollValue = parseInt(savedScrollY.replace('px', '').replace('-', ''), 10)
        if (!isNaN(scrollValue)) {
          window.scrollTo({ top: scrollValue, behavior: 'instant' })
        }
      }
    }
  }, [isOpen])


  if (!shouldRender) return null

  return (
    <>
      <div
        role="presentation"
        aria-hidden="true"
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <nav
        className={`fixed right-0 top-0 z-50 h-full w-80 bg-white shadow-xl transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
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

            <div className="flex flex-col overflow-y-auto px-6 py-8" style={{ maxHeight: 'calc(100vh - 5rem)', WebkitOverflowScrolling: 'touch' }}>
              <div className="space-y-1">
                {/* Services Dropdown */}
                <div>
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-lg font-semibold text-slate-900 transition-colors hover:bg-slate-100"
                  >
                    Services
                    <ChevronDown className={`h-5 w-5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {servicesOpen && (
                    <div className="ml-4 mt-1 space-y-1 border-l-2 border-slate-200 pl-4">
                      {services.map((service) => (
                        <Link
                          key={service.slug}
                          href={service.slug === 'concrete' ? '/concrete' : `/services/${service.slug}`}
                          onClick={onClose}
                          className="block rounded-lg px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100"
                        >
                          {service.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Areas We Serve Dropdown */}
                <div>
                  <button
                    onClick={() => setAreasOpen(!areasOpen)}
                    className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-lg font-semibold text-slate-900 transition-colors hover:bg-slate-100"
                  >
                    Areas We Serve
                    <ChevronDown className={`h-5 w-5 transition-transform ${areasOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {areasOpen && (
                    <div className="ml-4 mt-1 space-y-1 border-l-2 border-slate-200 pl-4">
                      {primaryCities
                        .filter(city => ['eugene', 'springfield', 'corvallis', 'albany'].includes(city.slug))
                        .sort((a, b) => {
                          const order = ['eugene', 'springfield', 'corvallis', 'albany']
                          return order.indexOf(a.slug) - order.indexOf(b.slug)
                        })
                        .map((city) => (
                          <Link
                            key={city.slug}
                            href={`/${city.slug}-or`}
                            onClick={onClose}
                            className="block rounded-lg px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100"
                          >
                            {city.name}
                          </Link>
                        ))}
                      <Link
                        href="/areas-we-serve"
                        onClick={onClose}
                        className="block rounded-lg px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-slate-100"
                      >
                        View All Areas
                      </Link>
                    </div>
                  )}
                </div>

                {/* Gallery */}
                <Link
                  href="/gallery"
                  onClick={onClose}
                  className="block rounded-lg px-4 py-3 text-lg font-semibold text-slate-900 transition-colors hover:bg-slate-100"
                >
                  Gallery
                </Link>

                {/* Case Studies */}
                <Link
                  href="/case-studies"
                  onClick={onClose}
                  className="block rounded-lg px-4 py-3 text-lg font-semibold text-slate-900 transition-colors hover:bg-slate-100"
                >
                  Case Studies
                </Link>

                {/* Spotlights */}
                <Link
                  href="/spotlights"
                  onClick={onClose}
                  className="block rounded-lg px-4 py-3 text-lg font-semibold text-slate-900 transition-colors hover:bg-slate-100"
                >
                  Area Spotlights
                </Link>

                {/* Paint Studio */}
                <Link
                  href="/paint-studio"
                  onClick={onClose}
                  className="block rounded-lg px-4 py-3 text-lg font-semibold text-slate-900 transition-colors hover:bg-slate-100"
                >
                  Paint Studio
                </Link>

                {/* More Dropdown */}
                <div>
                  <button
                    onClick={() => setMoreOpen(!moreOpen)}
                    className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-lg font-semibold text-slate-900 transition-colors hover:bg-slate-100"
                  >
                    More
                    <ChevronDown className={`h-5 w-5 transition-transform ${moreOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {moreOpen && (
                    <div className="ml-4 mt-1 space-y-1 border-l-2 border-slate-200 pl-4">
                      <Link
                        href="/about"
                        onClick={onClose}
                        className="block rounded-lg px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100"
                      >
                        About
                      </Link>
                      <Link
                        href="/case-studies"
                        onClick={onClose}
                        className="block rounded-lg px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100"
                      >
                        Case Studies
                      </Link>
                      <Link
                        href="/spotlights"
                        onClick={onClose}
                        className="block rounded-lg px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100"
                      >
                        Area Spotlights
                      </Link>
                      <Link
                        href="/warranty"
                        onClick={onClose}
                        className="block rounded-lg px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100"
                      >
                        Warranty
                      </Link>
                      <Link
                        href="/blog"
                        onClick={onClose}
                        className="block rounded-lg px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100"
                      >
                        Blog
                      </Link>
                      <Link
                        href="/careers"
                        onClick={onClose}
                        className="block rounded-lg px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100"
                      >
                        Careers
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8">
                <HousecallProButton className="w-full" onClick={onClose}>Free Estimate</HousecallProButton>
              </div>
            </div>
      </nav>
    </>
  )
}
