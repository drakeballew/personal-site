/** Shape used by ImageGallery and feed (src, alt, type, poster?) */
export interface MediaLike {
  src: string
  alt: string
  type: 'image' | 'video'
  poster?: string
}

export function getVideoType(src: string): string {
  if (isHlsUrl(src)) return 'application/vnd.apple.mpegurl'
  const ext = src.split('.').pop()?.toLowerCase()?.split('?')[0]
  if (ext === 'mov') return 'video/mp4'
  if (ext === 'webm') return 'video/webm'
  if (ext === 'ogg' || ext === 'ogv') return 'video/ogg'
  return 'video/mp4'
}

export function isHlsUrl(src: string): boolean {
  return (
    src.endsWith('.m3u8') ||
    src.includes('cloudflarestream.com') ||
    src.includes('/manifest/')
  )
}

export function buildSlidesFromMedia(media: MediaLike[]) {
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
