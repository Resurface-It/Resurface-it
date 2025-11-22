'use client'

import { HousecallProButton } from './HousecallProButton'

interface MobileStickyCTAProps {
  onClick?: () => void // Keep for backward compatibility but not required
}

export function MobileStickyCTA({ onClick }: MobileStickyCTAProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white p-4 shadow-lg lg:hidden">
      <HousecallProButton className="w-full" variant="large">
        Get My Free Estimate
      </HousecallProButton>
    </div>
  )
}

