'use client'

import { useState, useEffect } from 'react'

export function LazyCoreWebVitalsTracker() {
  const [Component, setComponent] = useState<React.ComponentType | null>(null)

  useEffect(() => {
    import('@/components/analytics/CoreWebVitalsTracker')
      .then((mod) => setComponent(() => mod.CoreWebVitalsTracker))
      .catch(() => {
        // Silently fail
      })
  }, [])

  return Component ? <Component /> : null
}

