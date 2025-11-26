'use client'

import { useState, useEffect } from 'react'

export function LazyPagePrefetcher() {
  const [Component, setComponent] = useState<React.ComponentType | null>(null)

  useEffect(() => {
    import('@/components/PagePrefetcher')
      .then((mod) => setComponent(() => mod.PagePrefetcher))
      .catch(() => {
        // Silently fail
      })
  }, [])

  return Component ? <Component /> : null
}

