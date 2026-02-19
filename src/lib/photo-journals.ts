import { loadContentEntries } from '@/lib/content'

interface PhotoJournalArticle {
  title: string
  description: string
  author?: string
  date: string
  tripDate?: string
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

const SLUG_TO_SECTION: Record<string, string> = {
  china: 'Asia',
  'se-asia': 'Asia',
  'homeless-in-america': 'North America',
  india: 'Asia',
  'central-asia': 'Asia',
  nepal: 'Asia',
  italy: 'Europe',
  'london-amsterdam-berlin': 'Europe',
  paris: 'Europe',
  'spain-morocco': 'Europe',
  'panama-city-san-blas': 'North America',
  'us-roadtrip-2009': 'North America',
  'us-roadtrip-2011': 'North America',
  'oahu-hawaii': 'North America',
  'central-america': 'North America',
  'new-orleans': 'North America',
  'mexico-city': 'North America',
  'kauai-hawaii': 'North America',
  saladita: 'North America',
  'mount-whitney': 'North America',
  'costa-rica': 'North America',
  portland: 'North America',
  'san-francisco': 'North America',
  turkey: 'Europe',
}

export async function getAllPhotoJournals() {
  return loadContentEntries<PhotoJournalWithSlug>({
    cwd: './src/app/photos',
    pattern: '*/page.mdx',
    importEntry: (filename) => import(`../app/photos/${filename}`),
    resolve: (mod, slug) => {
      const { article } = mod as { article: PhotoJournalArticle }
      return {
        slug,
        ...article,
        published: article.published ?? true,
        section: SLUG_TO_SECTION[slug] ?? 'Other',
      }
    },
  })
}
