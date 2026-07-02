import Image from 'next/image'
import Link from 'next/link'
import { getHero } from '@/lib/quires'

export default async function HeroSection() {
  const hero = await getHero()
  return (
    <section className="bg-[url('/Animated-Bg.svg')] bg-cover bg-center bg-no-repeat bg-zinc-900/70">
      <div className="w-full mx-auto flex min-h-[90vh] flex-col-reverse items-center gap-12 px-6 lg:flex-row lg:justify-between container">
        {/* Left Content */}
        <div className="text-center lg:text-left">
          <p className="text-lg text-gray-400">{hero.greeting}</p>

          <h1 className="mt-2 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            {hero.name}
          </h1>

          <h2 className="mt-4 text-xl font-semibold text-blue-400 sm:text-2xl">
            {hero.designation}
          </h2>

          <p className="mt-6 leading-8 text-gray-300">{hero.description}</p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
            {hero.primaryButtonLink && (
              <Link
                href={hero.primaryButtonLink}
                className="rounded-lg bg-blue-600 px-6 py-3 font-medium transition hover:bg-blue-700"
              >
                {hero.primaryButtonText}
              </Link>
            )}

            {hero.secondaryButtonLink && (
              <Link
                href={hero.secondaryButtonLink}
                className="rounded-lg border border-white/20 px-6 py-3 font-medium transition hover:bg-white hover:text-black"
              >
                {hero.secondaryButtonText}
              </Link>
            )}
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          {hero.profileImage?.url ? (
            <Image
              src={hero.profileImage.url}
              alt={hero.name}
              width={420}
              height={420}
              priority
              className="aspect-square rounded-full border-4 border-[#f8f9fa] object-cover shadow-2xl"
            />
          ) : (
            <div className="flex h-72 w-72 items-center justify-center rounded-full bg-gray-800 text-6xl font-bold">
              {hero.name.charAt(0)}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
