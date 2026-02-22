import { type Metadata } from 'next'

import { SimpleLayout } from '@/components/SimpleLayout'
import { AlbumsBySection } from '@/components/AlbumsBySection'
import { FeedBlock } from '@/components/FeedBlock'
import { getAllPhotoJournals } from '@/lib/photo-journals'
import { getFeedPhotosPage } from '@/lib/feed'

const FEED_PAGE_SIZE = 24

export const metadata: Metadata = {
  title: 'Photos',
  description:
    'Visual stories from my travels around the world.',
}

export default async function Photos() {
  const [photoJournals, feedPage] = await Promise.all([
    getAllPhotoJournals(),
    getFeedPhotosPage('desc', FEED_PAGE_SIZE, 0).catch(() => ({ data: [], hasMore: false })),
  ])

  const albums: { slug: string; title: string; description: string; tripDate?: string; section: string }[] =
    photoJournals.map((pj) => ({
      slug: pj.slug,
      title: pj.title,
      description: pj.description,
      tripDate: pj.tripDate ?? undefined,
      section: pj.section,
    }))

  return (
    <SimpleLayout
      title="Photos"
      intro="Visual stories from my travels around the world. Choose a section above to see albums; the feed is below."
    >
      <AlbumsBySection albums={albums} />
      <FeedBlock initialPhotos={feedPage.data} initialHasMore={feedPage.hasMore} />
    </SimpleLayout>
  )
}
