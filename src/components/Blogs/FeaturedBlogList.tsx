import Link from 'next/link'
import BlogCard from './BlogCard'
import { getFeaturedBlogs } from '@/lib/queries'

export default async function FeaturedBlogList() {
  const { docs: blogs } = await getFeaturedBlogs()
  if (!blogs.length) {
    return null
  }
  return (
    <section>
      <div className="container">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="list-title">Featured Blogs</h2>

            <p className="mt-3">
              A selection of blogs that highlight my experience in building scalable,
              high-performance, and user-focused applications.
            </p>
          </div>

          <Link href="/Blogs" className="primary-btn">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  )
}
