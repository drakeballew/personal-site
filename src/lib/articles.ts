const GET_ARTICLES_URL =
  'https://eswifictxaqqdvlogbrp.supabase.co/functions/v1/get-articles'

export interface ArticleWithSlug {
  slug: string
  title: string
  description: string
  author: string
  date: string
  published?: boolean
}

export type ArticleWithContent = ArticleWithSlug & { content: string }

function mapArticle(raw: Record<string, unknown>): ArticleWithSlug {
  return {
    slug: (raw.slug as string) ?? '',
    title: (raw.title as string) ?? '',
    description: (raw.description as string) ?? (raw.excerpt as string) ?? '',
    author: (raw.author as string) ?? '',
    date: (raw.date as string) ?? '',
    published: raw.published as boolean | undefined,
  }
}

/** Fetch all published articles. Returns empty array on error. */
export async function getArticles(): Promise<ArticleWithSlug[]> {
  try {
    const res = await fetch(GET_ARTICLES_URL)
    if (!res.ok) return []
    const data = await res.json()
    const list = Array.isArray(data) ? data : data.articles ?? data.items ?? []
    const result = list.map((row: Record<string, unknown>) => mapArticle(row))
    return result
  } catch {
    return []
  }
}

/** Fetch a single article by slug. Returns null if not found or on error. */
export async function getArticleBySlug(
  slug: string
): Promise<ArticleWithContent | null> {
  try {
    const url = `${GET_ARTICLES_URL}?slug=${encodeURIComponent(slug)}`
    const res = await fetch(url)
    if (!res.ok) return null
    const raw = await res.json()
    const item = raw?.article ?? raw
    if (!item || typeof item !== 'object') return null
    const base = mapArticle(item as Record<string, unknown>)
    const content = (item as Record<string, unknown>).content as string | null
    return { ...base, content: content ?? '' }
  } catch {
    return null
  }
}
