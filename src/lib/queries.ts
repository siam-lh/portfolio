import { cache } from 'react'
import { getPayload, type Payload, type PaginatedDocs } from 'payload'
import config from '@payload-config'
import { draftMode } from 'next/headers'
import type {
  Testimonial,
  Skill,
  Project,
  Blog,
  Experience,
  Hero,
  SiteSetting,
} from '@/payload-types'

// ---------------------------------------------------------------------------
// Client
// ---------------------------------------------------------------------------

const getPayloadClient = cache((): Promise<Payload> => {
  return getPayload({ config })
})

// ---------------------------------------------------------------------------
// Error handling
// ---------------------------------------------------------------------------

async function commonQuery<T>(
  label: string,
  fallback: T,
  fn: (payload: Payload) => Promise<T>,
): Promise<T> {
  try {
    const payload = await getPayloadClient()
    return await fn(payload)
  } catch (error) {
    console.error(`[payload] Failed to fetch "${label}":`, error)
    return fallback
  }
}

function emptyResult<T>(): PaginatedDocs<T> {
  return {
    docs: [],
    totalDocs: 0,
    limit: 0,
    totalPages: 0,
    page: 1,
    pagingCounter: 0,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null,
  }
}

// ---------------------------------------------------------------------------
// Collections — simple "get all" queries
// ---------------------------------------------------------------------------

export const getTestimonials = cache((): Promise<PaginatedDocs<Testimonial>> => {
  return commonQuery('testimonials', emptyResult<Testimonial>(), (payload) =>
    payload.find({
      collection: 'testimonials',
      sort: 'displayOrder',
      depth: 1,
      pagination: false,
    }),
  )
})

export const getSkills = cache((): Promise<PaginatedDocs<Skill>> => {
  return commonQuery('skills', emptyResult<Skill>(), (payload) =>
    payload.find({
      collection: 'skills',
      sort: 'name',
      depth: 1,
      pagination: false,
    }),
  )
})

export const getFeaturedProjects = cache((): Promise<PaginatedDocs<Project>> => {
  return commonQuery('featured projects', emptyResult<Project>(), (payload) =>
    payload.find({
      collection: 'projects',
      where: {
        featured: { equals: true },
      },
      sort: 'displayOrder',
      depth: 1,
      pagination: false,
    }),
  )
})

export const getAllProjects = cache((): Promise<PaginatedDocs<Project>> => {
  return commonQuery('all projects', emptyResult<Project>(), (payload) =>
    payload.find({
      collection: 'projects',
      sort: 'displayOrder',
      depth: 1,
      pagination: false,
    }),
  )
})

export const getFeaturedBlogs = cache((): Promise<PaginatedDocs<Blog>> => {
  return commonQuery('featured blogs', emptyResult<Blog>(), (payload) =>
    payload.find({
      collection: 'blogs',
      where: {
        featured: { equals: true },
      },
      sort: 'displayOrder',
      depth: 1,
      pagination: false,
    }),
  )
})

export const getExperiences = cache((): Promise<PaginatedDocs<Experience>> => {
  return commonQuery('experiences', emptyResult<Experience>(), (payload) =>
    payload.find({
      collection: 'experience',
      sort: 'displayOrder',
      depth: 1,
      pagination: false,
    }),
  )
})

// ---------------------------------------------------------------------------
// Blogs — search + pagination
// ---------------------------------------------------------------------------

export const getAllBlogs = cache((q?: string, page?: number): Promise<PaginatedDocs<Blog>> => {
  return commonQuery('blogs (search)', emptyResult<Blog>(), (payload) =>
    payload.find({
      collection: 'blogs',
      sort: '-updatedAt',
      page: page ?? 1,
      limit: 6,
      depth: 1,
      where: q
        ? {
            or: [{ title: { like: q } }, { 'relatedTags.title': { like: q } }],
          }
        : undefined,
    }),
  )
})

// ---------------------------------------------------------------------------
// Slugs + single-doc lookups
// ---------------------------------------------------------------------------

export const getAllProjectSlugs = cache((): Promise<string[]> => {
  return commonQuery('project slugs', [], async (payload) => {
    const result = await payload.find({
      collection: 'projects',
      limit: 0,
      select: { slug: true },
    })
    return result.docs.map((doc) => doc.slug).filter((slug): slug is string => Boolean(slug))
  })
})

export const getProjectBySlug = cache((slug: string): Promise<Project | null> => {
  return commonQuery(`project by slug "${slug}"`, null, async (payload) => {
    const { isEnabled: isDraftMode } = await draftMode()
    const result = await payload.find({
      collection: 'projects',
      depth: 1,
      where: { slug: { equals: slug } },
      draft: isDraftMode,
      limit: 1,
    })
    return result.docs[0] ?? null
  })
})

export const getAllBlogsSlugs = cache((): Promise<string[]> => {
  return commonQuery('blog slugs', [], async (payload) => {
    const result = await payload.find({
      collection: 'blogs',
      limit: 0,
      select: { slug: true },
    })
    return result.docs.map((doc) => doc.slug).filter((slug): slug is string => Boolean(slug))
  })
})

export const getBlogBySlug = cache((slug: string): Promise<Blog | null> => {
  return commonQuery(`blog by slug "${slug}"`, null, async (payload) => {
    const { isEnabled: isDraftMode } = await draftMode()
    const result = await payload.find({
      collection: 'blogs',
      depth: 1,
      where: { slug: { equals: slug } },
      draft: isDraftMode,
      limit: 1,
    })
    return result.docs[0] ?? null
  })
})

// ---------------------------------------------------------------------------
// Globals
// ---------------------------------------------------------------------------

export const getHero = cache((): Promise<Hero | null> => {
  return commonQuery('hero global', null, (payload) =>
    payload.findGlobal({
      slug: 'hero',
      depth: 1,
    }),
  )
})

export const getSiteSettings = cache((): Promise<SiteSetting | null> => {
  return commonQuery('site-settings global', null, (payload) =>
    payload.findGlobal({
      slug: 'site-settings',
      depth: 1,
    }),
  )
})
