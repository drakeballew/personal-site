const GET_POEMS_URL =
  'https://eswifictxaqqdvlogbrp.supabase.co/functions/v1/get-poems'

export interface PoemWithSlug {
  slug: string
  title: string
  description?: string
  author?: string
  date: string
  published?: boolean
  form?: string
}

export type PoemWithContent = PoemWithSlug & { content: string }

function mapPoem(raw: Record<string, unknown>): PoemWithSlug {
  return {
    slug: (raw.slug as string) ?? '',
    title: (raw.title as string) ?? '',
    description: (raw.description as string) ?? (raw.excerpt as string) ?? '',
    author: raw.author as string | undefined,
    date: (raw.date as string) ?? '',
    published: raw.published as boolean | undefined,
    form: raw.form as string | undefined,
  }
}

/** Fetch all published poems. Returns empty array on error. */
export async function getPoems(): Promise<PoemWithSlug[]> {
  try {
    const res = await fetch(GET_POEMS_URL)
    if (!res.ok) return []
    const data = await res.json()
    const list = Array.isArray(data) ? data : data.poems ?? data.items ?? []
    const result = list
      .map((row: Record<string, unknown>) => mapPoem(row))
      .filter((p: PoemWithSlug) => p.published !== false)
    return result.sort(
      (a: PoemWithSlug, z: PoemWithSlug) =>
        +new Date(z.date) - +new Date(a.date)
    )
  } catch {
    return []
  }
}

/** Fetch a single poem by slug. Returns null if not found or on error. */
export async function getPoemBySlug(
  slug: string
): Promise<PoemWithContent | null> {
  try {
    const url = `${GET_POEMS_URL}?slug=${encodeURIComponent(slug)}`
    const res = await fetch(url)
    if (!res.ok) return null
    const raw = await res.json()
    const item = raw?.poem ?? raw
    if (!item || typeof item !== 'object') return null
    const base = mapPoem(item as Record<string, unknown>)
    const content = (item as Record<string, unknown>).content as string | null
    return { ...base, content: content ?? '' }
  } catch {
    return null
  }
}
