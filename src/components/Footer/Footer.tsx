import Link from 'next/link'
import { getSiteSettings } from '@/lib/queries'

export default async function Footer() {
  const settings = await getSiteSettings()

  const year = new Date().getFullYear()

  const footerText = settings?.footerText?.replace('{year}', year.toString())

  return (
    <footer className="border-t border-white/50 py-10">
      <div className="mx-auto flex common container flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <p className="text-center text-sm md:text-left">{footerText}</p>

        <div className="flex flex-wrap items-center justify-center gap-5">
          {settings?.socialLinks?.github && (
            <Link
              href={settings.socialLinks.github}
              className="link-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
          )}

          {settings?.socialLinks?.linkedin && (
            <Link
              href={settings.socialLinks.linkedin}
              className="link-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </Link>
          )}

          {settings?.socialLinks?.twitter && (
            <Link
              href={settings.socialLinks.twitter}
              className="link-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              X
            </Link>
          )}
          {settings?.socialLinks?.email && (
            <Link href={`mailto:${settings.socialLinks.email}`}>Email</Link>
          )}
        </div>
      </div>
    </footer>
  )
}
