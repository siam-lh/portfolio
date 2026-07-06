'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number
  totalPages: number
}) {
  const params = useSearchParams()

  function buildHref(page: number) {
    const current = new URLSearchParams(Array.from(params.entries()))
    current.set('page', String(page))
    return `/Blogs?${current.toString()}`
  }

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-2">
      {/* Previous */}
      <Link
        href={currentPage > 1 ? buildHref(currentPage - 1) : '#'}
        aria-disabled={currentPage === 1}
        className={`rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-300 ${
          currentPage === 1
            ? 'pointer-events-none border-zinc-800 text-zinc-600'
            : 'border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-white hover:text-white'
        }`}
      >
        ← Previous
      </Link>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          const active = page === currentPage

          return (
            <Link
              key={page}
              href={buildHref(page)}
              aria-current={active ? 'page' : undefined}
              className={`flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-medium transition-all duration-300 ${
                active
                  ? 'border-white bg-white text-black'
                  : 'border-zinc-700 bg-zinc-900 text-zinc-300 hover:-translate-y-0.5 hover:border-white hover:text-white'
              }`}
            >
              {page}
            </Link>
          )
        })}
      </div>

      {/* Next */}
      <Link
        href={currentPage < totalPages ? buildHref(currentPage + 1) : '#'}
        aria-disabled={currentPage === totalPages}
        className={`rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-300 ${
          currentPage === totalPages
            ? 'pointer-events-none border-zinc-800 text-zinc-600'
            : 'border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-white hover:text-white'
        }`}
      >
        Next →
      </Link>
    </nav>
  )
}
