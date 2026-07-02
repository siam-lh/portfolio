'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const navLinks = [
  { name: 'Home', href: '/' },
  // { name: 'About', href: '/about' },
  { name: 'Projects', href: '/Projects' },
  // { name: 'Services', href: '/services' },
  { name: 'Blogs', href: '/Blogs' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg">
      <div className="container">
        <div className="mx-auto flex h-16 items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-tight text-white">
            Siam<span className="text-blue-600">.</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-md font-medium text-white transition-colors hover:underline transform hover:scale-105"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 transition hover:bg-gray-100 md:hidden"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="border-t border-gray-200 bg-white md:hidden">
            <nav className="flex flex-col px-6 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-md px-2 py-3 text-gray-700 transition hover:bg-gray-100 hover:text-blue-600"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
