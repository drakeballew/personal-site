'use client'

import React, { useState } from 'react'
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

  return (
    <>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {media.map((item, i) => (
          <div
            key={i}
            className="cursor-pointer overflow-hidden rounded-lg shadow-lg transition hover:opacity-90"
            onClick={() => {
              setIndex(i)
              setOpen(true)
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setIndex(i)
                setOpen(true)
              }
            }}
            aria-label={`View ${item.alt}`}
          >
            {item.type === 'image' ? (
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover"
              />
            ) : item.type === 'video' ? (
              <video controls className="w-full h-auto object-cover">
                <source src={item.src} type={getVideoType(item.src)} />
                Your browser does not support the video tag.
              </video>
            ) : null}
          </div>
        ))}
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
