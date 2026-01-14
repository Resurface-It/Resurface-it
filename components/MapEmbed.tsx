interface MapEmbedProps {
  query: string
  className?: string
  height?: string
}

export function MapEmbed({ query, className = '', height = '450px' }: MapEmbedProps) {
  const encodedQuery = encodeURIComponent(query)
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}&q=${encodedQuery}`

  // Fallback to search URL if no API key
  const fallbackUrl = `https://www.google.com/maps?q=${encodedQuery}&output=embed`

  return (
    <div className={`w-full overflow-hidden rounded-lg ${className}`} style={{ height }}>
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? mapUrl : fallbackUrl}
        title={`Map of ${query}`}
      />
    </div>
  )
}
