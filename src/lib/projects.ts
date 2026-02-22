const GET_PROJECTS_URL =
  'https://eswifictxaqqdvlogbrp.supabase.co/functions/v1/get-projects'

/** Canonical shape for a project (from get-projects API). */
export interface Project {
  id?: string
  slug: string
  name: string
  description: string
  link: { href: string; label: string }
  /** Icon/logo image URL from DB (featured_image). */
  logo_url?: string | null
}

/** Map API response item (snake_case or mixed) to Project. */
function mapRow(raw: Record<string, unknown>): Project {
  const href =
    (raw.link_href as string) ??
    (typeof raw.link === 'object' && raw.link !== null && 'href' in raw
      ? (raw.link as { href?: string }).href
      : undefined)
  const label =
    (raw.link_label as string) ??
    (typeof raw.link === 'object' && raw.link !== null && 'label' in raw
      ? (raw.link as { label?: string }).label
      : raw.name ?? '')
  const featuredImageSnake = (raw.featured_image as string | null) ?? null
  const featuredImageCamel = (raw.featuredImage as string | null) ?? null
  const logoUrl = (raw.logo_url as string | null) ?? null
  const logoUrlFinal = featuredImageSnake ?? featuredImageCamel ?? logoUrl ?? null
  return {
    id: raw.id as string | undefined,
    slug: (raw.slug as string) ?? '',
    name: (raw.name as string) ?? '',
    description: (raw.description as string) ?? '',
    link: { href: href ?? '#', label: label ?? '' },
    logo_url: logoUrlFinal,
  }
}

/** Fetch all projects. Returns empty array on error. */
export async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch(GET_PROJECTS_URL)
    if (!res.ok) return []
    const data = await res.json()
    const list = Array.isArray(data) ? data : data.projects ?? data.items ?? []
    return list.map((row: Record<string, unknown>) => mapRow(row))
  } catch {
    return []
  }
}

/** Fetch a single project by slug. Returns null if not found or on error. */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const url = `${GET_PROJECTS_URL}?slug=${encodeURIComponent(slug)}`
    const res = await fetch(url)
    if (!res.ok) return null
    const raw = await res.json()
    const item = raw?.project ?? raw
    if (!item || typeof item !== 'object') return null
    return mapRow(item as Record<string, unknown>)
  } catch {
    return null
  }
}
