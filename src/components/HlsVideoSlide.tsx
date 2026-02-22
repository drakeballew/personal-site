'use client'

import { useEffect, useRef } from 'react'
import Hls from 'hls.js'
import { useLightboxProps } from 'yet-another-react-lightbox'

export function HlsVideoSlide({
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
