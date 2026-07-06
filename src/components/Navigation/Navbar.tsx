import Link from 'next/link'
import Image from 'next/image'
import { getSiteSettings } from '@/lib/queries'
import { isMedia } from '@/lib/helper'

export default async function Navbar() {
  const settings = await getSiteSettings()
  const imageUrl = isMedia(settings?.logo) ? settings?.logo?.url : undefined
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3 font-semibold text-white">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={settings?.siteName || 'Logo'}
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
          ) : (
            <span className="text-xl">{settings?.siteName}</span>
          )}
        </Link>

        <nav>
          <ul className="flex items-center gap-8">
            {settings?.navLinks?.map((link: any) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  target={link.openInNewTab ? '_blank' : undefined}
                  className="transition hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
