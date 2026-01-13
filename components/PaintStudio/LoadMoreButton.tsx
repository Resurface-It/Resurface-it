'use client'

import { Loader2 } from 'lucide-react'

interface LoadMoreButtonProps {
  onClick: () => void
  isLoading?: boolean
  hasMore: boolean
  currentCount: number
  totalCount: number
}

export function LoadMoreButton({
  onClick,
  isLoading = false,
  hasMore,
  currentCount,
  totalCount,
}: LoadMoreButtonProps) {
  if (!hasMore) {
    return null
  }

  return (
    <div className="mt-8 flex flex-col items-center gap-4">
      <p className="text-sm text-slate-600">
        Showing {currentCount} of {totalCount} colors
      </p>
      <button
        onClick={onClick}
        disabled={isLoading}
        className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-white transition-colors hover:bg-primaryDark disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label="Load more colors"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Loading...</span>
          </>
        ) : (
          <span>Load More Colors</span>
        )}
      </button>
    </div>
  )
}
