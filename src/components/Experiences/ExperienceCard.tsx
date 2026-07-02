import Link from 'next/link'
import Image from 'next/image'
import { Experience, Media } from '@/payload-types'

interface ExperienceCardProps {
  experience: Experience
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const logo = typeof experience.companyLogo === 'object' ? (experience.companyLogo as Media) : null

  return (
    <div className="rounded-xl border border-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex gap-5">
        {/* Logo */}
        <div className="flex-shrink-0">
          {logo?.url ? (
            <Image
              src={logo.url}
              alt={experience.company}
              width={64}
              height={64}
              className="rounded-lg border object-contain"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-lg border bg-gray-100 text-xl font-bold">
              {experience.company.charAt(0)}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-xl font-semibold">{experience.position}</h3>
              <p className="font-medium">{experience.company}</p>
            </div>

            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
              {experience.employmentType?.toUpperCase()}
            </span>
          </div>

          <div className="mt-2 flex flex-wrap gap-4 text-sm text-white">
            {experience.location && <span>📍 {experience.location}</span>}

            <span>
              🗓️ {formatDate(experience.startDate)} -{' '}
              {experience.isCurrent
                ? 'Present'
                : experience.endDate
                  ? formatDate(experience.endDate)
                  : ''}
            </span>
          </div>

          {experience.companyWebsite && (
            <div className="mt-3">
              <Link
                href={experience.companyWebsite}
                target="_blank"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Visit Company →
              </Link>
            </div>
          )}

          {experience.summary && (
            <div className="mt-4 text-white">
              {/* Replace with RichText renderer if using Payload Lexical */}
              <p>{experience.summary}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
