import { getAllBlogs } from '@/lib/quires'
import { SearchBar } from '@/components/common/SearchBar'
import { Pagination } from '@/components/common/Pagination'
import BlogList from '@/components/Blogs/BlogList'

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>
}) {
  const { q = '', page = '1' } = await searchParams
  const currentPage = Math.max(1, parseInt(page))

  const { docs, totalPages } = await getAllBlogs(q || undefined, currentPage)

  return (
    <section className="bg-zinc-900/70 mx-auto py-8">
      <div className="container d">
        <SearchBar initialQuery={q} />
        <BlogList projects={docs} />
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </section>
  )
}
