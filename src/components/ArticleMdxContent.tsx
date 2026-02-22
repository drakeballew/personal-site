import { MDXRemote } from 'next-mdx-remote/rsc'

import { rehypePlugins, remarkPlugins } from '../../mdx-config.mjs'

const PARAGRAPH_MARGIN_CLASS = 'mb-8'

/** Rehype plugin: add explicit margin class to every <p> so paragraph spacing always applies. */
function rehypeParagraphSpacing() {
  return (tree: unknown) => {
    function visit(node: unknown) {
      if (!node || typeof node !== 'object') return
      const n = node as { type?: string; tagName?: string; children?: unknown[]; properties?: Record<string, unknown> }
      if (n.type === 'element' && n.tagName === 'p') {
        const props = n.properties ?? {}
        const existing = (props.className as string[] | undefined) ?? []
        props.className = Array.isArray(existing)
          ? [...existing, PARAGRAPH_MARGIN_CLASS]
          : [String(existing), PARAGRAPH_MARGIN_CLASS]
        n.properties = props
      }
      if (Array.isArray(n.children)) {
        for (const child of n.children) visit(child)
      }
    }
    visit(tree)
  }
}

/** Normalize line endings and turn single newlines into markdown hard breaks so the parser emits <br>. */
function sourceWithHardBreaks(source: string): string {
  const normalized = source.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  return normalized.replace(/(?<!\n)\n(?!\n)/g, '  \n')
}

/** Shared plugins (includes remark-gfm, remark-breaks) so articles get proper line breaks */
const articleMdxOptions = {
  mdxOptions: {
    remarkPlugins,
    rehypePlugins: [...rehypePlugins, rehypeParagraphSpacing],
  },
}

type Props = {
  source: string
  components?: React.ComponentProps<typeof MDXRemote>['components']
}

export async function ArticleMdxContent({ source, components = {} }: Props) {
  const processedSource = sourceWithHardBreaks(source)
  return (
    <MDXRemote
      source={processedSource}
      options={articleMdxOptions}
      components={components}
    />
  )
}
