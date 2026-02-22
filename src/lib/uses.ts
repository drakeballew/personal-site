const GET_USES_URL =
  'https://eswifictxaqqdvlogbrp.supabase.co/functions/v1/get-uses'

/** Single tool/item from get-uses API. */
export interface UseItem {
  title: string
  href?: string
  description: string
}

/** Category of tools (from get-uses API). */
export interface UsesCategory {
  title: string
  tools: UseItem[]
}

function mapTool(raw: Record<string, unknown>): UseItem {
  const title =
    (raw.title as string) ??
    (raw.name as string) ??
    ''
  const href =
    (raw.href as string | null) ??
    (raw.url as string | null) ??
    (typeof raw.link === 'string' ? raw.link : undefined) ??
    (typeof raw.link === 'object' && raw.link !== null && 'href' in (raw.link as object)
      ? (raw.link as { href?: string }).href
      : undefined)
  const description =
    (raw.description as string | null) ??
    (raw.body as string | null) ??
    (raw.content as string | null) ??
    ''
  return { title, href: href ?? undefined, description: description ?? '' }
}

/** Fetch all uses (sections with tools). Returns empty array on error.
 * get-uses edge function returns { [sectionName]: [{ title, description, href, displayOrder }] }
 */
export async function getUses(): Promise<UsesCategory[]> {
  try {
    const res = await fetch(GET_USES_URL)
    if (!res.ok) return []
    const data = await res.json()
    // Edge function returns object keyed by section name, value = array of items
    if (data !== null && typeof data === 'object' && !Array.isArray(data)) {
      return Object.entries(data).map(([sectionName, rawItems]) => {
        const items = Array.isArray(rawItems) ? rawItems : []
        return {
          title: sectionName,
          tools: items.map((t: Record<string, unknown>) => mapTool(t)),
        }
      })
    }
    // Fallback: array of categories or data.categories / data.data / data.items
    const list = Array.isArray(data) ? data : data?.categories ?? data?.data ?? data?.items ?? []
    if (!Array.isArray(list)) return []
    return list.map((row: Record<string, unknown>) => {
      const title = (row.title as string) ?? (row.name as string) ?? ''
      const rawTools = row.tools ?? row.items ?? row.uses ?? []
      const tools = Array.isArray(rawTools)
        ? rawTools.map((t: Record<string, unknown>) => mapTool(t))
        : []
      return { title, tools }
    })
  } catch {
    return []
  }
}
