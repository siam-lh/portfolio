import ExperienceCard from './ExperienceCard'
import { getExperiences } from '@/lib/queries'

export default async function ExperienceList() {
  const { docs: experiences } = await getExperiences()
  if (!experiences.length) {
    return
  }
  return (
    <section>
      <div className="container">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="">
            <h2 className="list-title">Experiences</h2>

            <p className="mt-3 text-gray-200">
              This highlights my professional journey, showcasing the roles I've held, the companies
              I've contributed to, and the skills I've honed along the way. Each experience reflects
              my commitment to delivering impactful solutions and continuous growth in the tech
              industry.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-y-4 md:gap-y-7 lg:gap-y-10">
          {experiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      </div>
    </section>
  )
}
