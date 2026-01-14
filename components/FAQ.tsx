import { FAQAccordion } from './FAQAccordion'
import type { FAQ } from '@/data/faq'

interface FAQProps {
  faqs: FAQ[]
  defaultOpen?: boolean
  className?: string
}

export function FAQ({ faqs, defaultOpen = false, className = '' }: FAQProps) {
  return (
    <div className={className}>
      <FAQAccordion faqs={faqs} defaultOpen={defaultOpen} />
    </div>
  )
}
