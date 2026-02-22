import { getSupabase } from '@/lib/supabase'

/** Shape compatible with ImageGallery/lightbox Media (src, alt, type, poster?) */
export interface FeedPhotoMedia {
  id: string
  src: string
  alt: string
  type: 'image' | 'video'
  poster?: string
  streamId?: string
  /** Date used for feed sorting and placement (defaults to today on the backend). */
  photoDate: string
  created_at: string
  /** Optional location for display above the image. */
  location?: string
  /** Geographic fields from DB (nullable). */
  city?: string | null
  state?: string | null
  country?: string | null
  latitude?: number | null
  longitude?: number | null
}

type SortOrder = 'desc' | 'asc'

const FEED_SELECT =
  'id, src, alt, type, stream_id, thumbnail, created_at, photo_date, location, city, state, country, latitude, longitude'
const FEED_SELECT_FALLBACK = 'id, src, alt, type, stream_id, thumbnail, created_at'

function mapRow(row: Record<string, unknown>): FeedPhotoMedia {
  return {
    id: row.id as string,
    src: row.src as string,
    alt: (row.alt as string) ?? '',
    type: (row.type === 'video' ? 'video' : 'image') as 'image' | 'video',
    poster: (row.thumbnail as string) ?? undefined,
    streamId: (row.stream_id as string) ?? undefined,
    photoDate: (row.photo_date as string) ?? (row.created_at as string),
    created_at: row.created_at as string,
    location: (row.location as string) ?? undefined,
    city: (row.city as string | null) ?? undefined,
    state: (row.state as string | null) ?? undefined,
    country: (row.country as string | null) ?? undefined,
    latitude: (row.latitude as number | null) ?? undefined,
    longitude: (row.longitude as number | null) ?? undefined,
  }
}

export async function getFeedPhotos(order: SortOrder = 'desc'): Promise<FeedPhotoMedia[]> {
  const result = await getFeedPhotosPage(order, 9999, 0)
  return result.data
}

export async function getFeedPhotosPage(
  order: SortOrder = 'desc',
  limit: number,
  offset: number
): Promise<{ data: FeedPhotoMedia[]; hasMore: boolean }> {
  const supabase = getSupabase()
  const ascending = order === 'asc'
  const from = offset
  const to = offset + limit - 1

  let query = supabase
    .from('feed_photos')
    .select(FEED_SELECT)
    .eq('status', 'published')
    .order('photo_date', { ascending, nullsFirst: false })
    .range(from, to)

  const { data, error } = await query

  if (error) {
    const fallback = await supabase
      .from('feed_photos')
      .select(FEED_SELECT_FALLBACK)
      .eq('status', 'published')
      .order('created_at', { ascending })
      .range(from, to)
    if (fallback.error) throw fallback.error
    const list = (fallback.data ?? []).map((row) => mapRow(row as Record<string, unknown>))
    return { data: list, hasMore: list.length === limit }
  }

  const list = (data ?? []).map((row) => mapRow(row as Record<string, unknown>))
  return { data: list, hasMore: list.length === limit }
}
