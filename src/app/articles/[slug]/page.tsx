import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ArticleLayout } from '@/components/ArticleLayout'
import { ArticleMdxContent } from '@/components/ArticleMdxContent'
import { getArticleBySlug } from '@/lib/articles'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return { title: 'Article' }
  return {
    title: article.title,
    description: article.description,
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()
  const content = article.content ?? ''
  return (
    <ArticleLayout article={article}>
      <ArticleMdxContent source={content} />
    </ArticleLayout>
  )
}
