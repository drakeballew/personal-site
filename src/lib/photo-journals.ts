const GET_PHOTOS_URL =
  'https://eswifictxaqqdvlogbrp.supabase.co/functions/v1/get-photos'

export interface PhotoJournalWithSlug {
  slug: string
  title: string
  description: string
  author?: string
  date: string
  tripDate?: string
  section: string
  published?: boolean
}

export type PhotoJournalWithContent = PhotoJournalWithSlug & { content: string }

function mapPhotoJournal(raw: Record<string, unknown>): PhotoJournalWithSlug {
  return {
    slug: (raw.slug as string) ?? '',
    title: (raw.title as string) ?? '',
    description: (raw.description as string) ?? (raw.excerpt as string) ?? '',
    author: raw.author as string | undefined,
    date: (raw.date as string) ?? (raw.tripDate as string) ?? '',
    tripDate: raw.tripDate as string | undefined,
    section: (raw.section as string) ?? 'Other',
    published: raw.published as boolean | undefined,
  }
}

/** Fetch all published photo journals (albums) from get-photos. Returns empty array on error. */
export async function getPhotoJournals(): Promise<PhotoJournalWithSlug[]> {
  try {
    const res = await fetch(GET_PHOTOS_URL)
    if (!res.ok) return []
    const data = await res.json()
    const list = Array.isArray(data)
      ? data
      : data.photo_journals ?? data.albums ?? data.items ?? []
    const result = list
      .map((row: Record<string, unknown>) => mapPhotoJournal(row))
      .filter((p: PhotoJournalWithSlug) => p.published !== false)
    return result.sort(
      (a: PhotoJournalWithSlug, z: PhotoJournalWithSlug) =>
        +new Date(a.date) - +new Date(z.date)
    )
  } catch {
    return []
  }
}

/** Fetch a single photo journal by slug from get-photos. Returns null if not found or on error. */
export async function getPhotoJournalBySlug(
  slug: string
): Promise<PhotoJournalWithContent | null> {
  try {
    const url = `${GET_PHOTOS_URL}?slug=${encodeURIComponent(slug)}`
    const res = await fetch(url)
    if (!res.ok) return null
    const raw = await res.json()
    const item = raw?.photo_journal ?? raw?.album ?? raw
    if (!item || typeof item !== 'object') return null
    const base = mapPhotoJournal(item as Record<string, unknown>)
    const content = (item as Record<string, unknown>).content as string | null
    return { ...base, content: content ?? '' }
  } catch {
    return null
  }
}
