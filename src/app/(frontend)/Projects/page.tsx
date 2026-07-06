import ProjectsList from '@/components/Projects/ProjectList'
import { getAllProjects } from '@/lib/queries'
export const revalidate = 3600

export default async function ProjectsPage() {
  const projects = await getAllProjects()
  const { docs } = projects

  return <ProjectsList projects={docs} />
}
