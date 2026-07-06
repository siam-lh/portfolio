'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavLink={
    label: string;
    href: string;
    openInNewTab?: boolean | null;
    id?: string | null;
}

export default function NavLinks({
  links,
}: {
  links: NavLink[]
}) {
  const pathname = usePathname()

  return (
    <ul className="flex items-center gap-8">
      {links.map((link) => {
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              target={link.openInNewTab ? '_blank' : undefined}
              rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
               className={`transition hover:text-primary text-lg ${
               pathname === link.href
               ? 'border-b-2 border-white text-white'
               : ''
            }`}
            >
            {link.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}