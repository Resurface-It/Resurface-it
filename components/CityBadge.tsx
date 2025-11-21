interface CityBadgeProps {
  city: string
}

export function CityBadge({ city }: CityBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
      {city}
    </span>
  )
}

