import Image from 'next/image'
import Link from 'next/link'
import { Project } from '@/payload-types'

type Props = {
  project: Project
}

function ProjectCard({ project }: Props) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-border shadow-lg transition-shadow hover:shadow-xl">
      <Link href={`/Projects/${project.slug}`}>
        <div className="relative h-48 w-full">
          <Image
            src={project.thumbnail.url}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <Link href={`/Projects/${project.slug}`}>
          <h2 className="text-lg font-bold hover:underline">{project.title}</h2>
        </Link>

        <p className="mt-2 text-sm text-text-secondary">{project.shortDescription}</p>

        {/* Bottom Links */}
        <div className="mt-auto flex gap-4 pt-6">
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline transition-transform duration-200 hover:scale-105"
            >
              GitHub
            </Link>
          )}

          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline transition-transform duration-300 hover:scale-105"
            >
              Visit Site
            </Link>
          )}

          {project.demoVideo && (
            <Link
              href={project.demoVideo}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline transition-transform duration-300 hover:scale-105"
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
