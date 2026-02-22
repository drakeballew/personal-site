export function formatDate(dateString: string): string {
  if (!dateString || !dateString.trim()) return ''
  const s = dateString.trim()
  // If already full ISO (has 'T'), parse as-is; otherwise treat as date-only and use UTC midnight
  const date = new Date(s.includes('T') ? s : `${s}T00:00:00Z`)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
