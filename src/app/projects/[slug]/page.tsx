import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ProjectLayout } from '@/components/ProjectLayout'
import { getProjectBySlug } from '@/lib/projects'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return { title: 'Project' }
  return {
    title: project.name,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) notFound()
  return <ProjectLayout project={project} slug={slug} />
}
