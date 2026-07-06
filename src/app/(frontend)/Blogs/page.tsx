import { getAllBlogs } from '@/lib/queries'
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
    <BlogList blogs={docs} query={q} currentPage={currentPage} totalPages={totalPages} /> 
  )
}
