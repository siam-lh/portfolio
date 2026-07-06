import SkillCard from './SkillCard'
import { getSkills } from '@/lib/queries'

export default async function SkillList() {
  const { docs: skills } = await getSkills()
  if (!skills.length) {
    return
  }

  return (
    <section className="bg-zinc-900/70">
      <div className="container">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="">
            <h2 className="list-title">Skills</h2>
            <p className="mt-3 text-gray-200">
              A selection of skills that highlight my expertise in building scalable,
              high-performance, and user-focused applications.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  )
}
