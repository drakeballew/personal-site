'use client'

import { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { AppContext } from '@/app/providers'
import { Container } from '@/components/Container'
import type { Project } from '@/lib/projects'

function ArrowLeftIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronRightIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6.75 5.75 9.25 8l-2.5 2.25"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export interface ProjectLayoutProps {
  project: Project
  slug: string
}

export function ProjectLayout({ project, slug }: ProjectLayoutProps) {
  const { previousPathname } = useContext(AppContext)

  return (
    <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          {previousPathname ? (
            <Link
              href="/projects"
              aria-label="Back to projects"
              className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20"
            >
              <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
            </Link>
          ) : (
            <Link
              href="/projects"
              aria-label="Back to projects"
              className="group mb-8 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:hover:border-zinc-700 dark:hover:ring-white/20"
            >
              <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
            </Link>
          )}
          <article>
            <header className="flex flex-col">
              <div className="flex items-center gap-4">
                {project.logo_url && (
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                    <Image
                      src={project.logo_url}
                      alt=""
                      width={48}
                      height={48}
                      className="h-8 w-8 object-contain"
                      unoptimized={project.logo_url.startsWith('/')}
                    />
                  </div>
                )}
                <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                  {project.name}
                </h1>
              </div>
            </header>
            <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
              {project.description}
            </p>
            <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
              <a
                href={project.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-teal-500 dark:hover:text-teal-400"
              >
                {project.link.label}
                <ChevronRightIcon className="ml-1 h-4 w-4 stroke-current" />
              </a>
            </p>
          </article>
        </div>
      </div>
    </Container>
  )
}
