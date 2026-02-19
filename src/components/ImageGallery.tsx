'use client'

import React, { useState } from 'react'
import clsx from 'clsx'
import Lightbox from 'yet-another-react-lightbox'
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
}

interface ImageGalleryProps {
  media: Media[]
}

function getVideoType(src: string): string {
  const ext = src.split('.').pop()?.toLowerCase()
  if (ext === 'webm') return 'video/webm'
  if (ext === 'ogg' || ext === 'ogv') return 'video/ogg'
  return 'video/mp4'
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ media = [] }) => {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const slides = media.map((item) => {
    if (item.type === 'video') {
      return {
        type: 'video' as const,
        width: 1280,
        height: 720,
        sources: [{ src: item.src, type: getVideoType(item.src) }],
        description: item.alt,
      }
    }
    return {
      src: item.src,
      description: item.alt,
    }
  })

  const rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']
  const ROWS = 3

  // Distribute media round-robin across 3 rows
  const rows = Array.from({ length: ROWS }, () => [] as { item: (typeof media)[0]; originalIndex: number }[])
  media.forEach((item, i) => {
    rows[i % ROWS].push({ item, originalIndex: i })
  })

  return (
    <>
      <div className="scrollbar-minimal -mx-4 mt-8 overflow-x-auto py-4 sm:-mx-6">
        <div className="flex flex-col gap-4 px-4 sm:gap-6 sm:px-6">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex flex-nowrap gap-4 sm:gap-6"
            >
              {row.map(({ item, originalIndex }, indexInRow) => {
                const rotationOffset = rowIndex % 2
                const rotation = rotations[(rotationOffset + indexInRow) % rotations.length]
                return (
                  <div
                    key={originalIndex}
                    className={clsx(
                      'relative aspect-[9/10] w-24 flex-none cursor-pointer overflow-hidden rounded-xl bg-zinc-100 shadow-lg transition hover:opacity-90 sm:w-40 sm:rounded-2xl dark:bg-zinc-800',
                      rotation
                    )}
                    onClick={() => {
                      setIndex(originalIndex)
                      setOpen(true)
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setIndex(originalIndex)
                        setOpen(true)
                      }
                    }}
                    aria-label={`View ${item.alt}`}
                  >
                    {item.type === 'image' ? (
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    ) : item.type === 'video' ? (
                      <video
                        controls
                        className="absolute inset-0 h-full w-full object-cover"
                      >
                        <source src={item.src} type={getVideoType(item.src)} />
                        Your browser does not support the video tag.
                      </video>
                    ) : null}
                  </div>
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
        slides={slides}
        plugins={[Captions, Video, Thumbnails]}
      />
    </>
  )
}

export default ImageGallery
