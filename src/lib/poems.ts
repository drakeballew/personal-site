import { loadContentEntries } from '@/lib/content'

interface PoemArticle {
  title: string
  description: string
  author?: string
  date: string
  published?: boolean
  form?: string
}

export interface PoemWithSlug extends PoemArticle {
  slug: string
}

export async function getAllPoems() {
  return loadContentEntries<PoemWithSlug>({
    cwd: './src/app/poems',
    pattern: '*/page.mdx',
    importEntry: (filename) => import(`../app/poems/${filename}`),
    resolve: (mod, slug) => {
      const { article } = mod as { article: PoemArticle }
      return { slug, ...article }
    },
  })
}
