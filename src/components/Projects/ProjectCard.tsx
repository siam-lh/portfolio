import Image from 'next/image'
import Link from 'next/link'
import { Project } from '@/payload-types'
import { isMedia } from '@/lib/helper'

type Props = {
  project: Project
}

function ProjectCard({ project }: Props) {
  const imageUrl = isMedia(project.thumbnail) ? project.thumbnail.url : undefined
  return (
    <div className="flex h-full flex-col card-border card-hover">
      <Link href={`/Projects/${project.slug}`}>
        <div className="relative h-48 w-full">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={project.title || 'Project Image'}
              fill
              className="object-cover rounded-t-2xl"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <Link href={`/Projects/${project.slug}`}>
          <h2 className="card-title">{project.title}</h2>
        </Link>

        <p className="mt-2 text-sm">{project.shortDescription}</p>

        {/* Bottom Links */}
        <div className="mt-auto flex gap-4 pt-6">
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-"
            >
              GitHub
            </Link>
          )}

          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-btn"
            >
              Visit Site
            </Link>
          )}

          {project.demoVideo && (
            <Link
              href={project.demoVideo}
              target="_blank"
              rel="noopener noreferrer"
              className="link-btn"
            >
              Demo
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
