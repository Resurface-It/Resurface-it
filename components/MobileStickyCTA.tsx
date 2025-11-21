'use client'

import { PrimaryButton } from './PrimaryButton'

interface MobileStickyCTAProps {
  onClick: () => void
}

export function MobileStickyCTA({ onClick }: MobileStickyCTAProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white p-4 shadow-lg lg:hidden">
      <PrimaryButton onClick={onClick} className="w-full" variant="large">
        Get My Free Estimate
      </PrimaryButton>
    </div>
  )
}

