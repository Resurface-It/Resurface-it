export function formatDate(dateString: string): string {
  // Create a date object from the string
  // If the string is YYYY-MM-DD, parsing it as 'YYYY-MM-DD' in new Date() usually treats it as UTC
  // But new Date('2023-01-01') is UTC.
  // new Date('2023-01-01T00:00:00') is Local.
  // We assume the blog post date is just a day, e.g. "2023-10-25".
  // We want to display it consistently.
  
  const date = new Date(dateString)
  
  // Use UTC methods to ensure consistency regardless of server/client timezone
  // or use toLocaleDateString with a fixed timezone like UTC if possible.
  // However, usually we want "Month Day, Year".
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC' // Force UTC to avoid timezone shifts
  })
}

