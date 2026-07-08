import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getAllProjectSlugs, getProjectBySlug } from '@/lib/queries'
import ProjectDetails from '@/components/Projects/ProjectDetails'
import { isMedia } from '@/lib/helper'
import { draftMode } from 'next/headers'
import { RefreshRouteOnSave } from '@/components/common/RefreshRouteOnSave'

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

  const imageUrl = isMedia(project.thumbnail) ? project.thumbnail.url : undefined

  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: imageUrl ? [imageUrl] : [],
    },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ ProjectId: string }> }) {
  const { ProjectId } = await params
  const project = await getProjectBySlug(ProjectId)
  if (!project) notFound()
  const { isEnabled: isDraftMode } = await draftMode()

  return (
    <>
      <ProjectDetails project={project} />
      {isDraftMode && <RefreshRouteOnSave />}
    </>
  )
}
