import Link from 'next/link'
import { getSiteSettings } from '@/lib/queries'
import NavLinks from './NavLinks'

export default async function Navbar() {
  const settings = await getSiteSettings()
  return (
    <header className="fixed w-full z-50 border-b border-white/50 backdrop-blur">
      <div
        className={
          'common container bg-[var(--background-color)] mx-auto flex h-16 items-center justify-between'
        }
      >
        <Link href="/" className="flex items-center gap-3 font-semibold">
          <span className="text-xl">{settings?.siteName}</span>
        </Link>

        <nav>
          <NavLinks links={settings?.navLinks || []} />
        </nav>
      </div>
    </header>
  )
}
