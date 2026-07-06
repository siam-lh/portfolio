import { getAllBlogs } from '@/lib/quires'
import { SearchBar } from '@/components/common/SearchBar'
import { Pagination } from '@/components/common/Pagination'
import BlogList from '@/components/Blogs/BlogList'
import NoItemsFound from '@/components/common/NoItemsFound'

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>
}) {
  const { q = '', page = '1' } = await searchParams
  const currentPage = Math.max(1, parseInt(page))

  const { docs, totalPages } = await getAllBlogs(q || undefined, currentPage)

  return (
    <section className="container py-6">
      <div className="mb-12 flex flex-col items-center text-center">
        <h1 className="list-title">Blogs</h1>

        <p className="mt-2 max-w-2xl text-gray-400">
          A collection of blogs where I talk about technologies and problem-solving experience in
          software development. I share my thoughts, insights, and experiences on various topics
          related to programming, web development, and the tech industry.
        </p>
      </div>
      <div className="flex flex-col gap-3 justify-center">
        <SearchBar initialQuery={q} />
        {docs.length === 0 ? <NoItemsFound itemName="Blogs" /> : <BlogList projects={docs} />}

        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </section>
  )
}
