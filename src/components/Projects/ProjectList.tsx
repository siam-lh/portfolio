import NoItemsFound from '@/components/common/NoItemsFound'
import ProjectCard from '@/components/Projects/ProjectCard'
import { Project } from '@/payload-types'

type Props = {
  projects: Project[]
  title?: string
  description?: string
}

export default function ProjectsList({
  projects,
  title = 'Projects',
  description = 'A collection of projects showcasing my work, technologies, and problem-solving experience.',
}: Props) {
  return (
    <section className="container py-6">
      <div>
        <div className="mb-12 flex flex-col items-center text-center">
          <h1 className="list-title">{title}</h1>

          <p className="mt-2 max-w-2xl text-gray-400">{description}</p>
        </div>

        {projects.length === 0 ? (
          <NoItemsFound itemName="Projects" />
        ) : (
          <div className="flex flex-wrap justify-center gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]"
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
