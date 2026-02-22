'use client'

import React from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import Video from 'yet-another-react-lightbox/plugins/video'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/captions.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import '@/styles/lightbox-theme.css'
import { HlsVideoSlide } from '@/components/HlsVideoSlide'
import { isHlsUrl } from '@/lib/media-utils'

export interface MediaLightboxSlide {
  src?: string
  description?: string
  type?: 'video'
  sources?: { src: string; type: string }[]
  width?: number
  height?: number
  poster?: string
  thumbnail?: string
}

export function MediaLightbox({
  open,
  onClose,
  index,
  slides,
}: {
  open: boolean
  onClose: () => void
  index: number
  slides: MediaLightboxSlide[]
}) {
  return (
    <Lightbox
      open={open}
      close={onClose}
      index={index}
      slides={slides as React.ComponentProps<typeof Lightbox>['slides']}
      plugins={[Captions, Video, Thumbnails]}
      video={{ autoPlay: true }}
      render={{
        slide: ({ slide, offset }) => {
          const s = slide as MediaLightboxSlide
          if (s.type !== 'video' || !s.sources?.length || !isHlsUrl(s.sources[0].src))
            return undefined
          return <HlsVideoSlide slide={{ ...s, sources: s.sources }} offset={offset} />
        },
      }}
    />
  )
}
