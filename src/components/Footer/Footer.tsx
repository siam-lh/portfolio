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
        <nav aria-label="Social links">
          <ul className="flex flex-wrap items-center justify-center gap-5">
            {settings?.socialLinks?.github && (
              <li>
                <Link
                  href={settings.socialLinks.github}
                  className="link-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Link>
              </li>
            )}

            {settings?.socialLinks?.linkedin && (
              <li>
                <Link
                  href={settings.socialLinks.linkedin}
                  className="link-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </Link>
              </li>
            )}

            {settings?.socialLinks?.twitter && (
              <li>
                <Link
                  href={settings.socialLinks.twitter}
                  className="link-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  X
                </Link>
              </li>
            )}

            {settings?.socialLinks?.email && (
              <li>
                <Link href={`mailto:${settings.socialLinks.email}`} className="link-btn">
                  Email
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
