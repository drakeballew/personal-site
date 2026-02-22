import { NextResponse } from 'next/server'
import { getFeedPhotosPage } from '@/lib/feed'

const DEFAULT_LIMIT = 24
const MAX_LIMIT = 100

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const order = (searchParams.get('order') === 'asc' ? 'asc' : 'desc') as 'asc' | 'desc'
  const limit = Math.min(
    MAX_LIMIT,
    Math.max(1, parseInt(searchParams.get('limit') ?? String(DEFAULT_LIMIT), 10) || DEFAULT_LIMIT)
  )
  const offset = Math.max(0, parseInt(searchParams.get('offset') ?? '0', 10) || 0)

  try {
    const { data, hasMore } = await getFeedPhotosPage(order, limit, offset)
    return NextResponse.json({ data, hasMore })
  } catch (err) {
    console.error('Feed photos API error:', err)
    return NextResponse.json(
      { error: 'Failed to load feed photos' },
      { status: 500 }
    )
  }
}
