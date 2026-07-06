import Link from 'next/link'
import { getFeaturedProjects } from '@/lib/quires'
import ProjectCard from './ProjectCard'

export default async function FeaturedProjectList() {
  const { docs: projects } = await getFeaturedProjects()

  if (projects.length === 0) {
    return null
  }

  return (
    <section>
      <div className="container">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="">
            <h2 className="list-title">Featured Projects</h2>

            <p className="mt-3 text-gray-400">
              A selection of projects that highlight my experience in building scalable,
              high-performance, and user-focused applications.
            </p>
          </div>

          <Link href="/Projects" className="primary-btn">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
