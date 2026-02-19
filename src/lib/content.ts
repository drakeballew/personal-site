import glob from 'fast-glob'

export interface BaseContent {
  title: string
  description: string
  author?: string
  date: string
  published?: boolean
}

export interface BaseContentWithSlug extends BaseContent {
  slug: string
}

export function slugFromFilename(filename: string): string {
  return filename.replace(/(\/page)?\.mdx$/, '')
}

export async function loadContentEntries<T extends BaseContentWithSlug>(options: {
  cwd: string
  pattern: string
  importEntry: (filename: string) => Promise<unknown>
  resolve: (mod: unknown, slug: string) => T
}): Promise<T[]> {
  const filenames = await glob(options.pattern, { cwd: options.cwd })

  const entries = await Promise.all(
    filenames.map(async (filename) => {
      const slug = slugFromFilename(filename)
      const mod = await options.importEntry(filename)
      return options.resolve(mod, slug)
    })
  )

  return entries
    .filter((e) => e.published !== false)
    .sort((a, z) => +new Date(z.date) - +new Date(a.date))
}
