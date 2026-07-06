'use client'

import { Search, Loader2 } from 'lucide-react'
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
    <div className="relative w-full max-w-lg">
      <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

      <input
        type="search"
        defaultValue={initialQuery}
        onChange={handleSearch}
        placeholder="Search by title and tags..."
        className="w-full rounded-2xl border border-white bg-zinc-900/70 py-3 pl-11 pr-12 text-white placeholder:text-zinc-500 backdrop-blur transition-all duration-300 outline-none focus:ring-2 focus:ring-white/10"
      />

      {isPending && (
        <Loader2
          size={18}
          className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-zinc-400"
        />
      )}
    </div>
  )
}
