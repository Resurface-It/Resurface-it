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
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog open={isOpen} onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 z-[9998]" style={{ zIndex: 9998 }} aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 z-[9999] overflow-y-auto" style={{ zIndex: 9999 }}>
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl transform transition-all" style={{ zIndex: 9999 }}>
                {title && (
                  <div className="border-b border-slate-200 px-6 py-4">
                    <Dialog.Title className="text-2xl font-semibold">{title}</Dialog.Title>
                  </div>
                )}
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 z-10 rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="max-h-[80vh] overflow-y-auto p-6">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

