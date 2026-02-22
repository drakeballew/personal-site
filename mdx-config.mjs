import rehypePrism from '@mapbox/rehype-prism'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'

/** Shared remark/rehype plugins for MDX (Articles, Poems, Photos, etc.) */
export const remarkPlugins = [remarkGfm, remarkBreaks]
export const rehypePlugins = [rehypePrism]
