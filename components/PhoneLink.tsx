'use client'

/**
 * PhoneLink Component
 * 
 * A reusable component for phone number links that automatically tracks
 * click-to-call events in Google Analytics.
 * 
 * Usage:
 *   <PhoneLink phone="(541) 913-5940" />
 *   <PhoneLink phone="(541) 913-5940" className="custom-class" />
 */

import { trackClickToCall } from '@/lib/analytics'

interface PhoneLinkProps {
  phone: string
  className?: string
  children?: React.ReactNode
}

export function PhoneLink({ phone, className, children }: PhoneLinkProps) {
  const phoneNumber = phone.replace(/\D/g, '')
  const displayText = children || phone

  const handleClick = () => {
    trackClickToCall(phone)
  }

  return (
    <a
      href={`tel:${phoneNumber}`}
      onClick={handleClick}
      className={className}
    >
      {displayText}
    </a>
  )
}

