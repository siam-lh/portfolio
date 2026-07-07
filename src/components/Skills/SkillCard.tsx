import Image from 'next/image'
import { Quote, Star } from 'lucide-react'
import type { Media, Skill } from '@/payload-types'

type Props = {
  skill: Skill
}

export default function TestimonialCard({ skill }: Props) {
  const photo = skill.icon && typeof skill.icon !== 'string' ? (skill.icon as Media) : null

  return (
    <article className=" card-border-padded card-hover">
      <Quote className={'absolute right-6 top-6 h-10 w-10 text-white'} />

      <div className="mb-5 flex gap-1">
        {Array.from({ length: skill.level ?? 5 }).map((_, index) => (
          <Star key={index} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      <div className="flex items-center gap-4">
        {photo?.url ? (
          <Image
            src={photo.url}
            alt={photo.alt || skill.name}
            width={56}
            height={56}
            className="h-14 w-14 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500 text-white font-semibold">
            {skill.name.charAt(0)}
          </div>
        )}

        <div>
          <h3 className="card-subtitle">{skill.name}</h3>
        </div>
      </div>
    </article>
  )
}
