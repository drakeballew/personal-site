import nextMDX from '@next/mdx'

import { rehypePlugins, remarkPlugins } from './mdx-config.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['next-mdx-remote'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'eswifictxaqqdvlogbrp.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  experimental: {
    outputFileTracingIncludes: {
      '/articles/*': ['./src/app/articles/**/*.mdx'],
    },
  },
}

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins,
    rehypePlugins,
  },
})

export default withMDX(nextConfig)
