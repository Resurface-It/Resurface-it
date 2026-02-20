'use client'

import { Disclosure } from '@headlessui/react'
import { ChevronDown } from 'lucide-react'
import type { FAQ } from '@/data/faq'

interface FAQAccordionProps {
  faqs: FAQ[]
  defaultOpen?: boolean
}

export function FAQAccordion({ faqs, defaultOpen = false }: FAQAccordionProps) {
  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <Disclosure key={index} defaultOpen={defaultOpen && index === 0}>
          {({ open }) => (
            <div className="rounded-lg border border-slate-200 bg-white">
              <Disclosure.Button className="flex w-full items-center justify-between px-6 py-4 text-left">
                <span className="font-semibold text-slate-900">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-6 pb-4 text-slate-600">
                {faq.answer}
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      ))}
    </div>
  )
}

