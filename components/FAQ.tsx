import { FAQAccordion } from './FAQAccordion'

interface FAQ {
  question: string
  answer: string
  category?: string
}

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
