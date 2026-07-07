import Image from 'next/image'
import Link from 'next/link'
import { Project, Media, Skill } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'

interface ProjectDetailsProps {
  project: Project
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  const thumbnail = typeof project.thumbnail === 'object' ? (project.thumbnail as Media) : null

  const gallery = project.gallery?.filter((item): item is Media => typeof item === 'object') ?? []

  const technologies =
    project.technologies?.filter((tech): tech is Skill => typeof tech === 'object') ?? []

  return (
    <section>
      <div className="mx-auto container">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold md:text-5xl">{project.title}</h1>
        </div>

        {/* Hero Image */}
        {thumbnail?.url && (
          <div className="overflow-hidden rounded-2xl border">
            <Image
              src={thumbnail.url}
              alt={project.title}
              width={1600}
              height={900}
              priority
              className="h-auto w-full object-cover"
            />
          </div>
        )}

        {/* Links */}
        <div className="mt-8 flex flex-wrap gap-4">
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              className="rounded-lg bg-black px-6 py-3 text-white transition hover:bg-neutral-800"
            >
              Live Demo
            </Link>
          )}

          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              className="rounded-lg border px-6 py-3 transition hover:bg-muted"
            >
              GitHub Repository
            </Link>
          )}

          {project.demoVideo && (
            <Link
              href={project.demoVideo}
              target="_blank"
              className="rounded-lg border px-6 py-3 transition hover:bg-muted"
            >
              Watch Demo
            </Link>
          )}
        </div>

        {/* Technologies */}
        {technologies.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-4 text-2xl font-semibold">Technologies</h2>

            <div className="flex flex-wrap gap-3">
              {technologies.map((tech) => (
                <span key={tech.id} className="rounded-full border px-4 py-2 text-sm">
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        <div className="prose prose-lg mt-16 max-w-none dark:prose-invert">
          <RichText data={project.fullDescription} />
        </div>

        {/* Gallery */}
        {gallery.length > 0 && (
          <div className="mt-20">
            <h2 className="mb-8 text-2xl font-semibold">Gallery</h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((image) => (
                <div key={image.id} className="overflow-hidden rounded-xl border">
                  <Image
                    src={image.url!}
                    alt={image.alt || project.title}
                    width={700}
                    height={500}
                    className="aspect-video w-full object-cover transition duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
