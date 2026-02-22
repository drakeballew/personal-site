'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/Card'

const SECTION_ORDER = ['Asia', 'North America', 'Europe', 'South America', 'Africa', 'Oceania', 'Other']

export interface AlbumItem {
  slug: string
  title: string
  description: string
  tripDate?: string
  section: string
}

export function AlbumsBySection({ albums }: { albums: AlbumItem[] }) {
  const [selectedSection, setSelectedSection] = useState<string | null>(null)

  const sections = [
    ...new Set(albums.map((a) => a.section).filter(Boolean)),
  ].sort(
    (a, b) =>
      (SECTION_ORDER.indexOf(a) === -1 ? 999 : SECTION_ORDER.indexOf(a)) -
      (SECTION_ORDER.indexOf(b) === -1 ? 999 : SECTION_ORDER.indexOf(b))
  )

  const sectionAlbums = selectedSection
    ? albums.filter((a) => a.section === selectedSection)
    : []

  return (
    <section className="mb-16">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        Albums
      </h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {sections.map((section) => (
          <button
            key={section}
            type="button"
            onClick={() =>
              setSelectedSection((s) => (s === section ? null : section))
            }
            className={`rounded-md border px-3 py-1.5 text-sm transition ${
              selectedSection === section
                ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900'
                : 'border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-500'
            }`}
          >
            {section}
          </button>
        ))}
      </div>
      {selectedSection && sectionAlbums.length > 0 && (
        <div className="mt-8 space-y-12">
          {sectionAlbums.map((album) => (
            <Card as="article" key={album.slug}>
              {album.tripDate && (
                <Card.Eyebrow decorate>{album.tripDate}</Card.Eyebrow>
              )}
              <Card.Title as="h3" href={`/photos/${album.slug}`}>
                {album.title}
              </Card.Title>
              <Card.Description>{album.description}</Card.Description>
              <Card.Cta>View photos</Card.Cta>
            </Card>
          ))}
        </div>
      )}
    </section>
  )
}
