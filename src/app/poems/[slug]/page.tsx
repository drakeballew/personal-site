import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ArticleLayout } from '@/components/ArticleLayout'
import { ArticleMdxContent } from '@/components/ArticleMdxContent'
import { getPoemBySlug } from '@/lib/poems'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const poem = await getPoemBySlug(slug)
  if (!poem) return { title: 'Poem' }
  return {
    title: poem.title,
    ...(poem.description != null && poem.description !== ''
      ? { description: poem.description }
      : {}),
  }
}

export default async function PoemPage({ params }: Props) {
  const { slug } = await params
  const poem = await getPoemBySlug(slug)
  if (!poem) notFound()
  return (
    <ArticleLayout
      article={{
        ...poem,
        author: poem.author ?? '',
        description: poem.description ?? '',
      }}
    >
      <ArticleMdxContent source={poem.content ?? ''} />
    </ArticleLayout>
  )
}
