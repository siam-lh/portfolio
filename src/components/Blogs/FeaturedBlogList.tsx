import Link from 'next/link'
import BlogCard from './BlogCard'
import { getFeaturedBlogs } from '@/lib/quires'

export default async function FeaturedBlogList() {
  const { docs: blogs } = await getFeaturedBlogs()
  if (!blogs.length) {
    return null
  }
  return (
    <section className="bg-zinc-900/70">
      <div className="container">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold tracking-tight text-white">Featured Blogs</h2>

            <p className="mt-3 text-gray-400">
              A selection of blogs that highlight my experience in building scalable,
              high-performance, and user-focused applications.
            </p>
          </div>

          <Link
            href="/Blogs"
            className="inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-lg border border-white/80 px-5 py-3 text-sm font-medium text-white transition hover:border-white"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  )
}
