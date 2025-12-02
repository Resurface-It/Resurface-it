'use client'

import { HousecallProButton } from './HousecallProButton'
import { PhoneLink } from './PhoneLink'
import { companyInfo } from '@/data/company'

interface MobileStickyCTAProps {
  onClick?: () => void // Keep for backward compatibility but not required
}

export function MobileStickyCTA({ onClick }: MobileStickyCTAProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white p-3 shadow-lg lg:hidden">
      <div className="flex gap-2">
        <PhoneLink
          phone={companyInfo.phone}
          className="flex-1 rounded-lg bg-primary px-4 py-3 text-center text-sm font-semibold text-white hover:bg-primaryDark transition-colors"
        >
          Call Now
        </PhoneLink>
        <HousecallProButton className="flex-1" variant="default">
          Free Estimate
        </HousecallProButton>
      </div>
    </div>
  )
}

