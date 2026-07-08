import { getAllBlogs } from '@/lib/queries'
import BlogList from '@/components/Blogs/BlogList'

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>
}) {
  const { q = '', page = '1' } = await searchParams
  const currentPage = Math.max(1, parseInt(page))

  const { docs, totalPages } = await getAllBlogs(q || undefined, currentPage)

  return <BlogList blogs={docs} query={q} currentPage={currentPage} totalPages={totalPages} />
}
