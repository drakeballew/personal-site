'use client'

import React, { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import Hls from 'hls.js'
import Lightbox, { useLightboxProps } from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import Video from 'yet-another-react-lightbox/plugins/video'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/captions.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import '@/styles/lightbox-theme.css'

interface Media {
  src: string
  alt: string
  type: 'image' | 'video'
  poster?: string
}

interface ImageGalleryProps {
  media: Media[]
}

const CARD_CLASS =
  'relative aspect-[9/10] w-24 flex-none cursor-pointer overflow-hidden rounded-xl bg-zinc-100 shadow-lg transition hover:opacity-90 sm:w-40 sm:rounded-2xl dark:bg-zinc-800'

function getVideoType(src: string): string {
  if (isHlsUrl(src)) return 'application/vnd.apple.mpegurl'
  const ext = src.split('.').pop()?.toLowerCase()?.split('?')[0]
  if (ext === 'mov') return 'video/mp4'
  if (ext === 'webm') return 'video/webm'
  if (ext === 'ogg' || ext === 'ogv') return 'video/ogg'
  return 'video/mp4'
}

function isHlsUrl(src: string): boolean {
  return (
    src.endsWith('.m3u8') ||
    src.includes('cloudflarestream.com') ||
    src.includes('/manifest/')
  )
}

/** HLS-only: the Video plugin uses native <video> which doesn't support HLS in most browsers. */
function HlsVideoSlide({
  slide,
  offset,
}: {
  slide: { sources: readonly { src: string }[]; width?: number; height?: number }
  offset: number
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const hlsRef = useRef<Hls | null>(null)
  const { video } = useLightboxProps()
  const src = slide.sources?.[0]?.src

  useEffect(() => {
    if (!src || !videoRef.current) return
    if (Hls.isSupported()) {
      const hls = new Hls()
      hlsRef.current = hls
      hls.attachMedia(videoRef.current)
      hls.loadSource(src)
      return () => {
        hls.destroy()
        hlsRef.current = null
      }
    }
    if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = src
      return () => {
        videoRef.current!.src = ''
      }
    }
  }, [src])

  useEffect(() => {
    if (offset === 0 && video?.autoPlay && videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [offset, video?.autoPlay])

  return (
    <video
      ref={videoRef}
      controls
      playsInline
      className="h-full w-full object-contain"
      style={{ maxWidth: slide.width ?? 1280, maxHeight: slide.height ?? 720 }}
    />
  )
}

function FilmRollCard({
  rotation,
  onSelect,
  onClick,
  'aria-label': ariaLabel,
  children,
}: {
  rotation: string
  onSelect: () => void
  onClick?: React.MouseEventHandler<HTMLDivElement>
  'aria-label': string
  children: React.ReactNode
}) {
  const handleClick = onClick ?? (() => onSelect())
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect()
    }
  }
  return (
    <div
      className={clsx(CARD_CLASS, rotation)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={ariaLabel}
    >
      {children}
    </div>
  )
}

function FilmRollVideoCard({
  item,
  rotation,
  onOpenLightbox,
  playingVideoRef,
}: {
  item: Media & { type: 'video' }
  rotation: string
  onOpenLightbox: () => void
  playingVideoRef: React.MutableRefObject<HTMLVideoElement | null>
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    videoRef.current?.play()
  }

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('video')) return
    onOpenLightbox()
  }

  const handleVideoPlay = () => {
    setIsPlaying(true)
    if (videoRef.current) playingVideoRef.current = videoRef.current
  }

  const handleVideoPause = () => {
    setIsPlaying(false)
    if (playingVideoRef.current === videoRef.current) playingVideoRef.current = null
  }

  // HLS URLs can't play inline; show poster or placeholder
  if (isHlsUrl(item.src)) {
    return (
      <FilmRollCard rotation={rotation} onSelect={onOpenLightbox} aria-label={`View ${item.alt}`}>
        {item.poster ? (
          <img src={item.poster} alt={item.alt} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-200 dark:bg-zinc-700">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/60">
              <svg className="ml-1 h-7 w-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </FilmRollCard>
    )
  }

  return (
    <FilmRollCard
      rotation={rotation}
      onSelect={onOpenLightbox}
      onClick={handleCardClick}
      aria-label={`View ${item.alt}`}
    >
      <video
        ref={videoRef}
        controls={isPlaying}
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        onClick={(e) => e.stopPropagation()}
        onPlay={handleVideoPlay}
        onPause={handleVideoPause}
      >
        <source src={item.src} type={getVideoType(item.src)} />
      </video>
      {!isPlaying && (
        <>
          <div className="absolute inset-0 cursor-pointer" onClick={handleCardClick} aria-hidden />
          <button
            type="button"
            className="absolute left-1/2 top-1/2 z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/60 transition hover:bg-black/70"
            onClick={handlePlay}
            aria-label="Play video"
          >
            <svg className="ml-1 h-7 w-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </>
      )}
      {isPlaying && (
        <button
          type="button"
          className="absolute right-1 top-1 rounded bg-black/50 p-1.5 text-white transition hover:bg-black/70"
          onClick={(e) => {
            e.stopPropagation()
            onOpenLightbox()
          }}
          aria-label="Open in lightbox"
        >
          <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
          </svg>
        </button>
      )}
    </FilmRollCard>
  )
}

function mediaToSlides(media: Media[]) {
  return media.map((item) =>
    item.type === 'video'
      ? {
          type: 'video' as const,
          width: 1280,
          height: 720,
          poster: item.poster,
          thumbnail: item.poster,
          sources: [{ src: item.src, type: getVideoType(item.src) }],
          description: item.alt,
        }
      : { src: item.src, description: item.alt }
  )
}

const ROTATIONS = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']
const ROWS = 3

const ImageGallery: React.FC<ImageGalleryProps> = ({ media = [] }) => {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const playingVideoRef = useRef<HTMLVideoElement | null>(null)

  const openLightbox = (i: number) => {
    playingVideoRef.current?.pause()
    playingVideoRef.current = null
    setIndex(i)
    setOpen(true)
  }

  const slides = mediaToSlides(media)
  const rows = Array.from({ length: ROWS }, () => [] as { item: (typeof media)[0]; originalIndex: number }[])
  media.forEach((item, i) => rows[i % ROWS].push({ item, originalIndex: i }))

  return (
    <>
      <div className="scrollbar-minimal -mx-4 mt-8 overflow-x-auto py-4 sm:-mx-6">
        <div className="flex flex-col gap-4 px-4 sm:gap-6 sm:px-6">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-nowrap gap-4 sm:gap-6">
              {row.map(({ item, originalIndex }, indexInRow) => {
                const rotation = ROTATIONS[(rowIndex % 2 + indexInRow) % ROTATIONS.length]
                return item.type === 'video' ? (
                  <FilmRollVideoCard
                    key={originalIndex}
                    item={item as Media & { type: 'video' }}
                    rotation={rotation}
                    onOpenLightbox={() => openLightbox(originalIndex)}
                    playingVideoRef={playingVideoRef}
                  />
                ) : (
                  <FilmRollCard
                    key={originalIndex}
                    rotation={rotation}
                    onSelect={() => openLightbox(originalIndex)}
                    aria-label={`View ${item.alt}`}
                  >
                    <img src={item.src} alt={item.alt} className="absolute inset-0 h-full w-full object-cover" />
                  </FilmRollCard>
                )
              })}
            </div>
          ))}
        </div>
      </div>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides as React.ComponentProps<typeof Lightbox>['slides']}
        plugins={[Captions, Video, Thumbnails]}
        video={{ autoPlay: true }}
        render={{
          slide: ({ slide, offset }) => {
            const s = slide as { type?: string; sources?: { src: string; type: string }[]; width?: number; height?: number }
            if (s.type !== 'video' || !s.sources?.length || !isHlsUrl(s.sources[0].src)) return undefined
            return <HlsVideoSlide slide={{ ...s, sources: s.sources }} offset={offset} />
          },
        }}
      />
    </>
  )
}

export default ImageGallery
