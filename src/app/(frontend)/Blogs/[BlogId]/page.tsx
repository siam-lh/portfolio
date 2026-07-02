import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getAllBlogsSlugs, getBlogBySlug } from '@/lib/quires'
import BlogDetails from '@/components/Blogs/BlogDetails'

export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = await getAllBlogsSlugs()
  return slugs.map((slug) => ({ BlogId: slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ BlogId: string }>
}): Promise<Metadata> {
  const { BlogId } = await params
  const blog = await getBlogBySlug(BlogId)

  if (!blog) return { title: 'Blog not found' }

  return {
    title: blog.title,
    description: blog.shortDescription,
    openGraph: {
      title: blog.title,
      description: blog.shortDescription,
      images: blog.image?.url ? [blog.image.url] : [],
    },
  }
}

export default async function BlogPage({ params }: { params: Promise<{ BlogId: string }> }) {
  const { BlogId } = await params
  const blog = await getBlogBySlug(BlogId)
  console.log('Blog: ', blog)
  if (!blog) notFound()

  return <BlogDetails blog={blog} />
}
