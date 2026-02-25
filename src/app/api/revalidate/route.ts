import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

const ALLOWED_PATHS = ['/', '/articles', '/poems', '/projects', '/photos'] as const

function isValidPath(path: string): path is (typeof ALLOWED_PATHS)[number] {
  return (ALLOWED_PATHS as readonly string[]).includes(path)
}

export async function POST(request: Request) {
  const headerSecret =
    request.headers.get('x-revalidate-secret') ??
    request.headers.get('authorization')?.replace(/^Bearer\s+/i, '')
  const body = await request.json().catch(() => ({}))
  const secret = headerSecret ?? (body.secret as string | undefined)

  const expected = process.env.REVALIDATE_SECRET ?? process.env.CRON_SECRET
  if (!expected || secret !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const path = body.path as string | undefined
  const paths = body.paths as string[] | undefined

  const toRevalidate = path ? [path] : Array.isArray(paths) ? paths : []
  if (toRevalidate.length === 0) {
    return NextResponse.json(
      { error: 'Missing path or paths in body' },
      { status: 400 }
    )
  }

  const invalid = toRevalidate.filter((p) => !isValidPath(p))
  if (invalid.length > 0) {
    return NextResponse.json(
      { error: `Invalid path(s): ${invalid.join(', ')}. Allowed: ${ALLOWED_PATHS.join(', ')}` },
      { status: 400 }
    )
  }

  for (const p of toRevalidate) {
    revalidatePath(p)
  }

  return NextResponse.json({ revalidated: toRevalidate })
}
