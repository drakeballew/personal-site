'use client'

import { useContext, useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

import { AppContext } from '@/app/providers'
import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'
import ImageGallery from '@/components/ImageGallery'
import { formatDate } from '@/lib/formatDate'
import type { MediaLike } from '@/lib/media-utils'

const GET_PHOTOS_URL = 'https://eswifictxaqqdvlogbrp.supabase.co/functions/v1/get-photos'

/** Map edge function response item to MediaLike (src, alt, type, poster?). */
function mapImageToMedia(item: Record<string, unknown>): MediaLike {
  const src = (item.src ?? item.url) as string
  const alt = (item.alt ?? item.caption ?? '') as string
  const type = (item.type === 'video' ? 'video' : 'image') as 'image' | 'video'
  const poster = (item.poster ?? item.thumbnail) as string | undefined
  return { src, alt, type, poster }
}

function ArrowLeftIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

interface PhotoJournalLayoutProps {
  article: {
    title: string
    date: string
    content: React.ReactNode
  }
  slug: string
}

export function PhotoJournalLayout({ article, slug }: PhotoJournalLayoutProps) {
  const router = useRouter()
  const { previousPathname } = useContext(AppContext)
  const [galleryMedia, setGalleryMedia] = useState<MediaLike[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [galleryVisible, setGalleryVisible] = useState(false)
  const galleryJustLoaded = useRef(false)

  useEffect(() => {
    let cancelled = false
    galleryJustLoaded.current = false
    setLoading(true)
    setError(null)
    const url = `${GET_PHOTOS_URL}?slug=${encodeURIComponent(slug)}`
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load gallery: ${res.status}`)
        return res.json()
      })
      .then((body: { images?: unknown[]; media?: unknown[] }) => {
        if (cancelled) return
        const raw = body.images ?? body.media ?? []
        const media = Array.isArray(raw)
          ? raw.map((item) => mapImageToMedia(item as Record<string, unknown>))
          : []
        setGalleryMedia(media)
        galleryJustLoaded.current = true
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load gallery')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [slug])

  // Fade in gallery once it has loaded (run after paint so transition applies)
  useEffect(() => {
    if (!loading && galleryMedia.length > 0 && galleryJustLoaded.current) {
      const t = requestAnimationFrame(() => {
        setGalleryVisible(true)
      })
      return () => cancelAnimationFrame(t)
    }
    if (loading) setGalleryVisible(false)
  }, [loading, galleryMedia.length])

  return (
    <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          {previousPathname && (
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Go back to articles"
              className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20"
            >
              <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
            </button>
          )}
          <article>
            <header className="flex flex-col">
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                {article.title}
              </h1>
              <time
                dateTime={article.date}
                className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
              >
                <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                <span className="ml-3">{formatDate(article.date)}</span>
              </time>
            </header>
            {loading && (
              <p
                className="py-12 text-center text-sm text-zinc-500 dark:text-zinc-400 animate-pulse transition-opacity duration-500"
                role="status"
                aria-live="polite"
              >
                Loading gallery…
              </p>
            )}
            {error && (
              <div className="py-12 text-center">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{error}</p>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="mt-3 text-sm font-medium text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300"
                >
                  Retry
                </button>
              </div>
            )}
            {!loading && !error && galleryMedia.length > 0 && (
              <div
                className={`transition-opacity duration-500 ease-out ${galleryVisible ? 'opacity-100' : 'opacity-0'}`}
              >
                <ImageGallery media={galleryMedia} />
              </div>
            )}
            <Prose className="mt-8" data-mdx-content>
              {article.content}
            </Prose>
          </article>
        </div>
      </div>
    </Container>
  )
}