import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { draftMode } from 'next/dist/server/request/draft-mode'
const payload = await getPayload({ config })

export const getTestimonials = cache(async () => {
  return payload.find({
    collection: 'testimonials',
    sort: 'displayOrder',
    depth: 2,
    pagination: false,
  })
})
export const getSkills = cache(async () => {
  return payload.find({
    collection: 'skills',
    sort: 'name',
    depth: 2,
    pagination: false,
  })
})
export const getFeaturedProjects = cache(async () => {
  return payload.find({
    collection: 'projects',
    where: {
      featured: {
        equals: true,
      },
      _status: {
        equals: 'published',
      },
    },
    sort: 'displayOrder',
    depth: 2,
    pagination: false,
  })
})
export const getAllProjects = cache(async () => {
  return payload.find({
    collection: 'projects',
    sort: 'displayOrder',
    depth: 2,
    where: {
      _status: {
        equals: 'published',
      },
    },
    pagination: false,
  })
})
export const getAllBlogs = async (q?: string, page?: number) => {
  return payload.find({
    collection: 'blogs',
    sort: '-updatedAt',
    page: page ?? 1,
    limit: 5,
    depth: 2,
    where: {
      and: [
        ...(q
          ? [
              {
                or: [{ title: { like: q } }, { 'relatedTags.title': { like: q } }],
              },
            ]
          : []),
      ],
    },
  })
}
export const getFeaturedBlogs = cache(async () => {
  return payload.find({
    collection: 'blogs',
    where: {
      featured: {
        equals: true,
      },
    },
    sort: 'displayOrder',
    depth: 2,
    pagination: false,
  })
})
export const getExperiences = cache(async () => {
  return payload.find({
    collection: 'experience',
    sort: 'displayOrder',
    depth: 2,
    pagination: false,
  })
})
export const getHero = cache(async () => {
  return await payload.findGlobal({
    slug: 'hero',
  })
})
export const getAllProjectSlugs = cache(async () => {
  const result = await payload.find({
    collection: 'projects',
    limit: 0,
    select: { slug: true },
  })
  return result.docs.map((doc) => doc.slug)
})

export const getProjectBySlug = cache(async (slug: string) => {
  const result = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return result.docs[0] ?? null
})

export const getAllBlogsSlugs = cache(async () => {
  const result = await payload.find({
    collection: 'blogs',
    limit: 0,
    select: { slug: true },
  })
  return result.docs.map((doc) => doc.slug)
})

export const getBlogBySlug = cache(async (slug: string) => {
  const result = await payload.find({
    collection: 'blogs',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return result.docs[0] ?? null
})
