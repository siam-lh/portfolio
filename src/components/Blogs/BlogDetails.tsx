import Image from 'next/image'
import { Blog, Media, BlogTag } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'

interface BlogDetailsProps {
  blog: Blog
}

export default function BlogDetails({ blog }: BlogDetailsProps) {
  const thumbnail = typeof blog.image === 'object' ? (blog.image as Media) : null

  const tags = blog?.relatedTags?.filter((tag): tag is BlogTag => typeof tag === 'object') ?? []

  return (
    <section className="">
      <div className="mx-auto container">
        {/* Header */}
        <div className="mb-12">
          <h1 className="card-title">{blog.title}</h1>
        </div>

        {/* Hero Image */}
        {thumbnail?.url && (
          <div className="overflow-hidden rounded-2xl border">
            <Image
              src={thumbnail.url}
              alt={blog.title}
              width={1600}
              height={900}
              priority
              className="h-auto w-full object-cover"
            />
          </div>
        )}
        {/* Technologies */}
        {tags.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-4 text-2xl font-semibold">Tags</h2>

            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <span key={tag.id} className="rounded-full border px-4 py-2 text-sm">
                  {tag.title}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        <div className="prose prose-lg mt-16 max-w-none dark:prose-invert">
          <RichText data={blog.fullDescription} />
        </div>
      </div>
    </section>
  )
}
