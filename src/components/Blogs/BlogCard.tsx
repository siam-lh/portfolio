import Image from 'next/image'
import Link from 'next/link'
import { Calendar } from 'lucide-react'
import { Blog } from '@/payload-types'

type Props = {
  blog: Blog
}

export default function BlogCard({ blog }: Props) {
  return (
    <Link
      href={`/Blogs/${blog.slug}`}
      className="group overflow-hidden rounded-lg border border-border shadow-lg transition-shadow hover:shadow-xl bg-black"
    >
      {blog.image && typeof blog.image !== 'string' && blog.image.url && (
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={blog.image.url}
            alt={blog.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      )}

      <div className="space-y-4 p-6">
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <Calendar size={15} />
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>

        <h3 className="text-2xl font-bold text-white group-hover:underline transition">
          {blog.title}
        </h3>

        <p className="line-clamp-3 text-zinc-400">{blog.shortDescription}</p>

        <div className="flex flex-wrap gap-2 pt-2">
          {blog.relatedTags?.map((tag) => {
            if (typeof tag === 'string') return null

            return (
              <span
                key={tag.id}
                className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300"
              >
                #{tag.title}
              </span>
            )
          })}
        </div>
      </div>
    </Link>
  )
}
