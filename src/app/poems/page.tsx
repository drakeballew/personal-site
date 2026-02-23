import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { type PoemWithSlug, getPoems } from '@/lib/poems'
import { formatDate } from '@/lib/formatDate'

export const metadata: Metadata = {
  title: 'Poems',
  description: 'Original poetry and verse.',
}

function Poem({ poem }: { poem: PoemWithSlug }) {
  const dateFormatted = formatDate(poem.date)
  const hasDate = !!dateFormatted && !!poem.date.trim()

  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/poems/${poem.slug}`}>{poem.title}</Card.Title>
        {hasDate && (
          <Card.Eyebrow
            as="time"
            dateTime={poem.date}
            className="md:hidden"
            decorate
          >
            {dateFormatted}
          </Card.Eyebrow>
        )}
        {poem.description != null && poem.description !== '' && (
          <Card.Description>{poem.description}</Card.Description>
        )}
        <Card.Cta>Read poem</Card.Cta>
      </Card>
      {hasDate && (
        <Card.Eyebrow
          as="time"
          dateTime={poem.date}
          className="mt-1 hidden md:block"
        >
          {dateFormatted}
        </Card.Eyebrow>
      )}
    </article>
  )
}

export default async function PoemsIndex() {
  const poems = await getPoems()

  return (
    <SimpleLayout
      title={
        <>
          <span className="line-through">Uncensored</span> Perception
        </>
      }
      intro="Original poetry and verse. Collected in chronological order."
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {poems.map((poem) => (
            <Poem key={poem.slug} poem={poem} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}
