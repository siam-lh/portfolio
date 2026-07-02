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
    <nav>
      {currentPage > 1 && <Link href={buildHref(currentPage - 1)}>← prev</Link>}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <Link key={p} href={buildHref(p)} aria-current={p === currentPage ? 'page' : undefined}>
          {p}
        </Link>
      ))}
      {currentPage < totalPages && <Link href={buildHref(currentPage + 1)}>next →</Link>}
    </nav>
  )
}
