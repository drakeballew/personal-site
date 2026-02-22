import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ArticleMdxContent } from '@/components/ArticleMdxContent'
import { PhotoJournalLayout } from '@/components/PhotoJournalLayout'
import { getPhotoJournalBySlug } from '@/lib/photo-journals'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const album = await getPhotoJournalBySlug(slug)
  if (!album) return { title: 'Photo album' }
  return {
    title: album.title,
    description: album.description,
  }
}

export default async function PhotoAlbumPage({ params }: Props) {
  const { slug } = await params
  const album = await getPhotoJournalBySlug(slug)
  if (!album) notFound()
  const contentNode = await ArticleMdxContent({
    source: album.content ?? '',
  })
  return (
    <PhotoJournalLayout
      article={{
        title: album.title,
        date: album.date,
        content: contentNode,
      }}
      slug={slug}
    />
  )
}
