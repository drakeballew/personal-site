import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { type PoemWithSlug, getAllPoems } from '@/lib/poems'
import { formatDate } from '@/lib/formatDate'

export const metadata: Metadata = {
  title: 'Poems',
  description: 'Original poetry and verse.',
}

function Poem({ poem }: { poem: PoemWithSlug }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/poems/${poem.slug}`}>{poem.title}</Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={poem.date}
          className="md:hidden"
          decorate
        >
          {formatDate(poem.date)}
        </Card.Eyebrow>
        <Card.Description>{poem.description}</Card.Description>
        <Card.Cta>Read poem</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={poem.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(poem.date)}
      </Card.Eyebrow>
    </article>
  )
}

export default async function PoemsIndex() {
  const poems = await getAllPoems()

  return (
    <SimpleLayout
      title="Poems"
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
