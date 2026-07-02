import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getAllProjectSlugs, getProjectBySlug } from '@/lib/quires'
import ProjectDetails from '@/components/Projects/ProjectDetails'

export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs()
  return slugs.map((slug) => ({ ProjectId: slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ProjectId: string }>
}): Promise<Metadata> {
  const { ProjectId } = await params
  const project = await getProjectBySlug(ProjectId)

  if (!project) return { title: 'Project not found' }

  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: project.thumbnail?.url ? [project.thumbnail.url] : [],
    },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ ProjectId: string }> }) {
  const { ProjectId } = await params
  const project = await getProjectBySlug(ProjectId)
  console.log('Project: ', project)
  if (!project) notFound()

  return <ProjectDetails project={project} />
}
