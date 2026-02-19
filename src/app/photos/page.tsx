import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllPhotoJournals } from '@/lib/photo-journals'

function PhotosSection({
  title,
  appearances,
}: {
  title: string
  appearances: Array<{
    href: string
    title: string
    description: string
    tripDate: string
    cta: string
    section: string
    published: boolean
  }>
}) {
  const sectionAppearances = appearances.filter((a) => a.section === title)

  if (sectionAppearances.length === 0) {
    return null
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
        {title}
      </h2>
      <div className="space-y-16">
        {sectionAppearances.map((appearance) => (
          <Card as="article" key={appearance.href}>
            <Card.Title as="h3" href={appearance.href}>
              {appearance.title}
            </Card.Title>
            <Card.Eyebrow decorate>{appearance.tripDate}</Card.Eyebrow>
            <Card.Description>{appearance.description}</Card.Description>
            <Card.Cta>{appearance.cta}</Card.Cta>
          </Card>
        ))}
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Photos',
  description:
    'Visual stories from my travels around the world.',
}

const SECTION_ORDER = ['Asia', 'North America', 'Europe', 'South America', 'Africa', 'Oceania', 'Other']

export default async function Photos() {
  const photoJournals = await getAllPhotoJournals()
  const appearances = photoJournals.map((pj) => ({
    href: `/photos/${pj.slug}`,
    title: pj.title,
    description: pj.description,
    tripDate: pj.tripDate ?? '',
    cta: 'View photos',
    section: pj.section,
    published: pj.published ?? true,
  }))

  const sections = [
    ...new Set(appearances.map((a) => a.section).filter(Boolean)),
  ].sort(
    (a, b) =>
      (SECTION_ORDER.indexOf(a) === -1 ? 999 : SECTION_ORDER.indexOf(a)) -
      (SECTION_ORDER.indexOf(b) === -1 ? 999 : SECTION_ORDER.indexOf(b))
  )

  return (
    <SimpleLayout
      title="Photos"
      intro="Visual stories from my travels around the world. Each album captures the moments, people, and places that made each journey memorable."
    >
      <div className="space-y-20">
        {sections.map((section) => (
          <PhotosSection
            key={section}
            title={section}
            appearances={appearances}
          />
        ))}
      </div>
    </SimpleLayout>
  )
}
