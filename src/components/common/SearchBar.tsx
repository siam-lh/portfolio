'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'

export function SearchBar({ initialQuery }: { initialQuery: string }) {
  const router = useRouter()
  const params = useSearchParams()
  const [isPending, startTransition] = useTransition()

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value
    const current = new URLSearchParams(Array.from(params.entries()))
    if (q) {
      current.set('q', q)
    } else {
      current.delete('q')
    }
    current.delete('page')
    startTransition(() => {
      router.push(`/Blogs?${current.toString()}`)
    })
  }

  return (
    <input
      type="search"
      defaultValue={initialQuery}
      onChange={handleSearch}
      placeholder="Search posts..."
    />
  )
}
