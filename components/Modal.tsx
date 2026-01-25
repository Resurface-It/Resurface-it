'use client'

import { Fragment, ReactNode, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
}

export function Modal({ isOpen, onClose, children, title }: ModalProps) {
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
      // Don't disable touch-action completely - allow scrolling within the modal
      // touch-action: none would prevent all touch interactions
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

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog 
        open={isOpen} 
        onClose={onClose}
        className="relative z-[9999]"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div 
            className="fixed inset-0 bg-black/50 z-[9998] pointer-events-auto" 
            style={{ 
              zIndex: 9998,
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              height: '100%',
              minHeight: '-webkit-fill-available',
            }} 
            onClick={onClose}
            aria-hidden="true" 
          />
        </Transition.Child>

        <div 
          className="fixed inset-0 z-[9999] overflow-y-auto pointer-events-none"
          style={{ 
            zIndex: 9999,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            minHeight: '-webkit-fill-available',
            maxHeight: '100dvh',
            maxWidth: '100vw',
          }}
        >
          <div 
            className="flex min-h-full items-center justify-center p-4 pointer-events-auto"
            style={{
              minHeight: '-webkit-fill-available',
            }}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel 
                className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl transform transition-all pointer-events-auto" 
                style={{ 
                  zIndex: 10000,
                  maxWidth: 'calc(100vw - 2rem)',
                  margin: '1rem',
                }}
              >
                {title && (
                  <div className="border-b border-slate-200 px-6 py-4">
                    <Dialog.Title className="text-2xl font-semibold">{title}</Dialog.Title>
                  </div>
                )}
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 z-10 rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary touch-manipulation"
                  aria-label="Close"
                  style={{ touchAction: 'manipulation' }}
                >
                  <X className="h-5 w-5" />
                </button>
                <div 
                  className="overflow-y-auto p-6" 
                  style={{ 
                    WebkitOverflowScrolling: 'touch',
                    maxHeight: 'calc(100dvh - 8rem)',
                    touchAction: 'pan-y',
                  }}
                >
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

