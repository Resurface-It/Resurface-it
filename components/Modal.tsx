'use client'

import { ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
}

export function Modal({ isOpen, onClose, children, title }: ModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      // Store current scroll position
      const scrollY = window.scrollY
      // Prevent body scroll while allowing modal content to scroll
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      // Ensure modal container is visible on mobile
      document.body.style.height = '100%'
      document.body.style.maxHeight = '100dvh'
    } else {
      // Restore scroll position
      const savedScrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      document.body.style.height = ''
      document.body.style.maxHeight = ''
      if (savedScrollY) {
        const scrollValue = parseInt(savedScrollY.replace('px', '').replace('-', ''), 10)
        if (!isNaN(scrollValue)) {
          window.scrollTo({ top: scrollValue, behavior: 'instant' })
        }
      }
    }
    return () => {
      // Cleanup: restore scroll position
      const savedScrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      document.body.style.height = ''
      document.body.style.maxHeight = ''
      if (savedScrollY) {
        const scrollValue = parseInt(savedScrollY.replace('px', '').replace('-', ''), 10)
        if (!isNaN(scrollValue)) {
          window.scrollTo({ top: scrollValue, behavior: 'instant' })
        }
      }
    }
  }, [isOpen])

  if (!mounted || !isOpen) {
    return null
  }

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999]"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        maxHeight: '100dvh',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        overflow: 'auto',
      }}
      onClick={(e) => {
        // Close modal if clicking on backdrop
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          minHeight: '-webkit-fill-available',
          zIndex: 9998,
        }}
        aria-hidden="true"
      />

      {/* Modal Panel */}
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl"
        style={{
          zIndex: 10000,
          maxWidth: 'calc(100vw - 2rem)',
          width: '100%',
          maxHeight: 'calc(100dvh - 2rem)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          margin: 'auto',
        }}
        onClick={(e) => {
          // Only stop propagation if not clicking the close button
          if ((e.target as HTMLElement).closest('button[aria-label="Close"]')) {
            return
          }
          e.stopPropagation()
        }}
      >
        {title && (
          <div className="border-b border-slate-200 px-6 py-4">
            <h2 id="modal-title" className="text-2xl font-semibold">
              {title}
            </h2>
          </div>
        )}
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onClose()
          }}
          className="absolute right-4 top-4 z-[10001] rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary touch-manipulation"
          aria-label="Close"
          style={{ 
            touchAction: 'manipulation',
            pointerEvents: 'auto',
            cursor: 'pointer',
          }}
          type="button"
        >
          <X className="h-5 w-5" />
        </button>
        <div
          className="overflow-y-auto p-6"
          style={{
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-y',
            flex: 1,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}

