import Image from 'next/image'
import Link from 'next/link'
import { getHero } from '@/lib/queries'
import { isMedia } from '@/lib/helper'

export default async function HeroSection() {
  const hero = await getHero()
  const imageUrl = isMedia(hero?.profile?.profileImage) ? hero.profile.profileImage.url : undefined
  const resumeUrl = isMedia(hero?.secondaryButton?.resume)
    ? hero.secondaryButton.resume.url
    : undefined
  return (
    <section>
      <div className="w-full mx-auto flex min-h-[90vh] flex-col-reverse items-center gap-12 px-6 lg:flex-row lg:justify-between container">
        {/* Left Content */}
        <div className="flex-1 max-w-2xl text-center lg:text-left">
          <p className="text-lg">{hero?.content?.greeting}</p>

          <h1 className="mt-2 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            {hero?.content?.name}
          </h1>

          <h2 className="mt-4 text-xl font-semibold sm:text-2xl">{hero?.content?.designation}</h2>

          <p className="mt-6 leading-8">{hero?.content?.description}</p>

          {/* <div className="mt-10 flex flex-col gap-4 sm:flex-row  justify-center lg:justify-start">
            {hero?.primaryButton?.link && hero?.primaryButton?.text && (
              <Link
                aria-label={`Go to ${hero.primaryButton.text}`}
                href={hero.primaryButton?.link}
                className="primary-btn flex-1 text-center"
              >
                {hero.primaryButton?.text}
              </Link>
            )}

            {hero?.secondaryButton?.text && resumeUrl && (
              <Link
                href={resumeUrl}
                className="primary-btn flex-1 text-center"
                download
                aria-label="Download Resume"
              >
                {hero.secondaryButton.text}
              </Link>
            )}
          </div> */}
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            {hero?.primaryButton?.link && hero?.primaryButton?.text && (
              <Link
                href={hero.primaryButton.link}
                aria-label={`Go to ${hero.primaryButton.text}`}
                className="primary-btn flex w-full items-center justify-center sm:w-auto sm:flex-1"
              >
                {hero.primaryButton.text}
              </Link>
            )}

            {hero?.secondaryButton?.text && resumeUrl && (
              <Link
                href={resumeUrl}
                download
                aria-label="Download Resume"
                className="primary-btn flex w-full items-center justify-center sm:w-auto sm:flex-1"
              >
                {hero.secondaryButton.text}
              </Link>
            )}
          </div>
        </div>

        {/* Right Image */}
        <div className="flex shrink-0 justify-center">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={hero?.content.name || 'Profile Image'}
              width={420}
              height={420}
              priority
              className="h-64 w-64 rounded-full border-4 border-white object-cover shadow-2xl sm:h-72 sm:w-72 md:h-80 md:w-80 lg:h-96 lg:w-96 xl:h-105 xl:w-105"
            />
          ) : (
            <div className="flex h-64 w-64 items-center justify-center rounded-full bg-gray-800 text-6xl font-bold sm:h-72 sm:w-72 md:h-80 md:w-80 lg:h-96 lg:w-96 xl:h-105 xl:w-105">
              {hero?.content.name.charAt(0)}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
