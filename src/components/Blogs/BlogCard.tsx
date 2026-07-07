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
      className="flex h-full flex-col card-border card-hover bg-black"
    >
      {blog.image && typeof blog.image !== 'string' && blog.image.url && (
        <div className="relative h-48 w-full">
          <Image
            src={blog.image.url}
            alt={blog.title}
            fill
            className="object-cover rounded-t-2xl"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-2 text-sm text-zinc-200">
          <Calendar size={15} />
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>

        <h2 className="card-title">{blog.title}</h2>

        <p className="mt-2 text-sm text-text-secondary">{blog.shortDescription}</p>

        <div className="mt-auto flex gap-4 pt-6">
          {blog.relatedTags?.map((tag) => {
            if (typeof tag === 'string') return null

            return (
              <span key={tag.id} className="rounded-full card-border px-3 py-1 text-xs">
                #{tag.title}
              </span>
            )
          })}
        </div>
      </div>
    </Link>
  )
}
