'use client'

import React, { useMemo, useState, useCallback, useEffect, useRef } from 'react'
import { buildSlidesFromMedia } from '@/lib/media-utils'
import { MediaLightbox } from '@/components/MediaLightbox'
import type { FeedPhotoMedia } from '@/lib/feed'

const PAGE_SIZE = 24

function displayLocation(item: FeedPhotoMedia): string | null {
  if (item.location?.trim()) return item.location.trim()
  const parts = [item.city, item.state, item.country].filter(Boolean) as string[]
  return parts.length ? parts.join(', ') : null
}

function formatPhotoDate(photoDate: string): string {
  return new Date(photoDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function buildCaption(item: FeedPhotoMedia): string {
  const loc = displayLocation(item)
  const date = formatPhotoDate(item.photoDate)
  const parts = [loc, date, item.alt].filter(Boolean)
  return parts.join(' · ')
}

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
}

function SearchIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  )
}
function SortDescIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden {...props}>
      <path d="M10 3a.75.75 0 0 1 .75.75v10.638L13.443 12.5a.75.75 0 1 1 1.114 1.004l-3.75 4.25a.75.75 0 0 1-1.114 0l-3.75-4.25a.75.75 0 1 1 1.114-1.004L9.25 14.388V3.75A.75.75 0 0 1 10 3Z" />
    </svg>
  )
}
function SortAscIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden {...props}>
      <path d="M10 17a.75.75 0 0 1-.75-.75V5.612L6.557 7.5a.75.75 0 0 1-1.114-1.004l3.75-4.25a.75.75 0 0 1 1.114 0l3.75 4.25a.75.75 0 0 1-1.114 1.004L9.25 5.612v10.638A.75.75 0 0 1 10 17Z" />
    </svg>
  )
}

export function FeedBlock({
  initialPhotos,
  initialHasMore,
}: {
  initialPhotos: FeedPhotoMedia[]
  initialHasMore: boolean
}) {
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [photos, setPhotos] = useState<FeedPhotoMedia[]>(initialPhotos)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const [loading, setLoading] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const sortFetchedRef = useRef(false)

  // When sort order changes (after initial mount), refetch from start
  useEffect(() => {
    if (!sortFetchedRef.current) {
      sortFetchedRef.current = true
      return
    }
    let cancelled = false
    setLoading(true)
    fetch(`/api/feed/photos?order=${sortOrder}&limit=${PAGE_SIZE}&offset=0`)
      .then((res) => res.json())
      .then((body: { data: FeedPhotoMedia[]; hasMore: boolean }) => {
        if (!cancelled) {
          setPhotos(body.data ?? [])
          setHasMore(body.hasMore ?? false)
        }
      })
      .catch(() => {
        if (!cancelled) setPhotos([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [sortOrder])

  // Sync state when server sends new initial data (e.g. after revalidation or navigation)
  useEffect(() => {
    setPhotos(initialPhotos)
    setHasMore(initialHasMore)
  }, [initialPhotos, initialHasMore])

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return
    setLoading(true)
    const offset = photos.length
    fetch(`/api/feed/photos?order=${sortOrder}&limit=${PAGE_SIZE}&offset=${offset}`)
      .then((res) => res.json())
      .then((body: { data: FeedPhotoMedia[]; hasMore: boolean }) => {
        setPhotos((prev) => [...prev, ...(body.data ?? [])])
        setHasMore(body.hasMore ?? false)
      })
      .finally(() => setLoading(false))
  }, [loading, hasMore, photos.length, sortOrder])

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) loadMore()
      },
      { rootMargin: '200px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [loadMore])

  const filtered = useMemo(() => {
    const q = normalize(searchQuery).trim()
    if (!q) return photos
    return photos.filter((p) => normalize(p.alt).includes(q))
  }, [photos, searchQuery])

  const mediaLike = useMemo(
    () =>
      filtered.map((p) => ({
        src: p.src,
        alt: p.alt,
        type: p.type,
        poster: p.poster,
      })),
    [filtered]
  )
  const baseSlides = useMemo(() => buildSlidesFromMedia(mediaLike), [mediaLike])
  const slides = useMemo(
    () =>
      baseSlides.map((slide, i) => ({
        ...slide,
        description: buildCaption(filtered[i]),
      })),
    [baseSlides, filtered]
  )

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <section className="-mt-[50px] w-full max-w-5xl py-6">
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Feed
        </h2>
        <div className="ml-auto flex items-center gap-2">
          {searchOpen && (
            <>
              <label className="sr-only" htmlFor="feed-search">
                Search feed by caption
              </label>
              <input
                id="feed-search"
                type="search"
                placeholder="Search captions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
              />
            </>
          )}
          <button
            type="button"
            onClick={() => setSearchOpen((o) => !o)}
            className="rounded-md p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-200"
            aria-label={searchOpen ? 'Close search' : 'Search captions'}
          >
            <SearchIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setSortOrder((o) => (o === 'desc' ? 'asc' : 'desc'))}
            className="rounded-md p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-200"
            aria-label={sortOrder === 'desc' ? 'Newest first' : 'Oldest first'}
            title={sortOrder === 'desc' ? 'Newest first' : 'Oldest first'}
          >
            {sortOrder === 'desc' ? (
              <SortDescIcon className="h-5 w-5" />
            ) : (
              <SortAscIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {filtered.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => openLightbox(i)}
            className="group relative aspect-square overflow-hidden rounded-lg bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:bg-zinc-800 dark:focus:ring-zinc-500"
            aria-label={item.alt || 'View photo'}
          >
            {item.type === 'video' ? (
              <>
                {item.poster ? (
                  <img
                    src={item.poster}
                    alt=""
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-zinc-200 dark:bg-zinc-700">
                    <svg className="h-10 w-10 text-zinc-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50">
                    <svg className="ml-1 h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </>
            ) : (
              <img
                src={item.src}
                alt={item.alt}
                className="h-full w-full object-cover transition group-hover:scale-105"
              />
            )}
              {(displayLocation(item) || formatPhotoDate(item.photoDate)) && (
                <div
                  className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-1.5 text-left text-[10px] leading-tight text-white/95 sm:text-xs"
                  aria-hidden
                >
                  {displayLocation(item) && (
                    <span className="block truncate font-medium">{displayLocation(item)}</span>
                  )}
                  <span className={displayLocation(item) ? 'opacity-90' : ''}>
                    {formatPhotoDate(item.photoDate)}
                  </span>
                </div>
              )}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-zinc-500 dark:text-zinc-400">
          {searchQuery ? 'No photos match your search.' : 'No feed photos yet.'}
        </p>
      )}

      <div ref={sentinelRef} className="h-4" aria-hidden />
      {loading && (
        <p className="py-4 text-center text-sm text-zinc-500 dark:text-zinc-400">Loading…</p>
      )}

      <MediaLightbox
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={slides}
      />
    </section>
  )
}
