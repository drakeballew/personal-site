import { loadContentEntries } from '@/lib/content'

interface PhotoJournalArticle {
  title: string
  description: string
  author?: string
  date: string
  tripDate?: string
  section?: string
  published?: boolean
}

export interface PhotoJournalWithSlug {
  slug: string
  title: string
  description: string
  author?: string
  date: string
  tripDate?: string
  section: string
  published?: boolean
}

export async function getAllPhotoJournals() {
  const entries = await loadContentEntries<PhotoJournalWithSlug>({
    cwd: './src/app/photos',
    pattern: '*/page.mdx',
    importEntry: (filename) => import(`../app/photos/${filename}`),
    resolve: (mod, slug) => {
      const { article } = mod as { article: PhotoJournalArticle }
      return {
        slug,
        ...article,
        published: article.published ?? true,
        section: article.section ?? 'Other',
      }
    },
  })
  return entries.sort((a, z) => +new Date(a.date) - +new Date(z.date))
}
