'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const SECTION_ORDER = ['Asia', 'North America', 'Europe', 'South America', 'Africa', 'Oceania', 'Other']

export interface AlbumAppearance {
  href: string
  title: string
  section: string
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={clsx('h-3.5 w-3.5 flex-shrink-0 transition-transform', open ? 'rotate-0' : '-rotate-90')}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}

export function PhotosSidebar({ appearances }: { appearances: AlbumAppearance[] }) {
  const pathname = usePathname()

  const sections = [
    ...new Set(appearances.map((a) => a.section).filter(Boolean)),
  ].sort(
    (a, b) =>
      (SECTION_ORDER.indexOf(a) === -1 ? 999 : SECTION_ORDER.indexOf(a)) -
      (SECTION_ORDER.indexOf(b) === -1 ? 999 : SECTION_ORDER.indexOf(b))
  )

  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(sections.map((s) => [s, true]))
  )

  const toggle = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  return (
    <aside
      className="sticky top-0 h-screen w-44 flex-shrink-0 overflow-y-auto border-r border-zinc-200 py-4 pl-3 pr-2 dark:border-zinc-800"
      aria-label="Photo albums"
    >
      <nav className="space-y-0.5">
        {sections.map((section) => {
          const sectionAlbums = appearances.filter((a) => a.section === section)
          if (sectionAlbums.length === 0) return null
          const isOpen = openSections[section] ?? true
          return (
            <div key={section}>
              <button
                type="button"
                onClick={() => toggle(section)}
                className="flex w-full items-center gap-1.5 py-1.5 pr-1 text-left text-sm text-zinc-700 dark:text-zinc-300"
              >
                <Chevron open={isOpen} />
                <span>{section}</span>
              </button>
              {isOpen && (
                <ul className="space-y-0.5 pl-4">
                  {sectionAlbums.map((appearance) => {
                    const isActive = pathname === appearance.href
                    return (
                      <li key={appearance.href}>
                        <Link
                          href={appearance.href}
                          className={clsx(
                            'block py-1 text-sm',
                            isActive
                              ? 'font-medium text-zinc-900 dark:text-zinc-100'
                              : 'text-zinc-600 dark:text-zinc-400'
                          )}
                        >
                          {appearance.title}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
