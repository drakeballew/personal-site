import { loadContentEntries } from '@/lib/content'

interface Article {
  title: string
  description: string
  author: string
  date: string
  published?: boolean
}

export interface ArticleWithSlug extends Article {
  slug: string
}

export async function getAllArticles() {
  return loadContentEntries<ArticleWithSlug>({
    cwd: './src/app/articles',
    pattern: '*/page.mdx',
    importEntry: (filename) => import(`../app/articles/${filename}`),
    resolve: (mod, slug) => {
      const { article } = mod as { article: Article }
      return { slug, ...article }
    },
  })
}