import { cache } from 'react'
import { getPayload, type Payload, type PaginatedDocs } from 'payload'
import config from '@payload-config'
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

/**
 * Lazily instantiates Payload on first use instead of at module top-level.
 * `cache()` memoizes it per request/render-pass in Server Components, and
 * (unlike a bare top-level `await getPayload(...)`) it won't throw at
 * import time or hang the module graph if init fails once.
 */
const getPayloadClient = cache((): Promise<Payload> => {
  return getPayload({ config })
})

// ---------------------------------------------------------------------------
// Error handling
// ---------------------------------------------------------------------------

/**
 * Wraps a Payload query so a single failing collection/global can't take
 * down an entire page render. Logs the error and returns a safe fallback.
 */
async function safeQuery<T>(
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
  return safeQuery('testimonials', emptyResult<Testimonial>(), (payload) =>
    payload.find({
      collection: 'testimonials',
      sort: 'displayOrder',
      depth: 1,
      pagination: false,
    }),
  )
})

export const getSkills = cache((): Promise<PaginatedDocs<Skill>> => {
  return safeQuery('skills', emptyResult<Skill>(), (payload) =>
    payload.find({
      collection: 'skills',
      sort: 'name',
      depth: 1,
      pagination: false,
    }),
  )
})

export const getFeaturedProjects = cache((): Promise<PaginatedDocs<Project>> => {
  return safeQuery('featured projects', emptyResult<Project>(), (payload) =>
    payload.find({
      collection: 'projects',
      where: {
        featured: { equals: true },
        _status: { equals: 'published' },
      },
      sort: 'displayOrder',
      depth: 1,
      pagination: false,
    }),
  )
})

export const getAllProjects = cache((): Promise<PaginatedDocs<Project>> => {
  return safeQuery('all projects', emptyResult<Project>(), (payload) =>
    payload.find({
      collection: 'projects',
      sort: 'displayOrder',
      depth: 1,
      where: {
        _status: { equals: 'published' },
      },
      pagination: false,
    }),
  )
})

export const getFeaturedBlogs = cache((): Promise<PaginatedDocs<Blog>> => {
  return safeQuery('featured blogs', emptyResult<Blog>(), (payload) =>
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
  return safeQuery('experiences', emptyResult<Experience>(), (payload) =>
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

/**
 * `cache()` still dedupes correctly here since `q`/`page` are primitives —
 * React keys the memoization on the serialized argument list.
 */
export const getAllBlogs = cache((q?: string, page?: number): Promise<PaginatedDocs<Blog>> => {
  return safeQuery('blogs (search)', emptyResult<Blog>(), (payload) =>
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
  return safeQuery('project slugs', [], async (payload) => {
    const result = await payload.find({
      collection: 'projects',
      limit: 0,
      select: { slug: true },
    })
    return result.docs.map((doc) => doc.slug).filter((slug): slug is string => Boolean(slug))
  })
})

export const getProjectBySlug = cache((slug: string): Promise<Project | null> => {
  return safeQuery(`project by slug "${slug}"`, null, async (payload) => {
    const result = await payload.find({
      collection: 'projects',
      depth: 1,
      where: { slug: { equals: slug } },
      limit: 1,
    })
    return result.docs[0] ?? null
  })
})

export const getAllBlogsSlugs = cache((): Promise<string[]> => {
  return safeQuery('blog slugs', [], async (payload) => {
    const result = await payload.find({
      collection: 'blogs',
      limit: 0,
      select: { slug: true },
    })
    return result.docs.map((doc) => doc.slug).filter((slug): slug is string => Boolean(slug))
  })
})

export const getBlogBySlug = cache((slug: string): Promise<Blog | null> => {
  return safeQuery(`blog by slug "${slug}"`, null, async (payload) => {
    const result = await payload.find({
      collection: 'blogs',
      depth: 1,
      where: { slug: { equals: slug } },
      limit: 1,
    })
    return result.docs[0] ?? null
  })
})

// ---------------------------------------------------------------------------
// Globals
// ---------------------------------------------------------------------------

export const getHero = cache((): Promise<Hero | null> => {
  return safeQuery('hero global', null, (payload) =>
    payload.findGlobal({
      slug: 'hero',
      depth: 1,
    }),
  )
})

export const getSiteSettings = cache((): Promise<SiteSetting | null> => {
  return safeQuery('site-settings global', null, (payload) =>
    payload.findGlobal({
      slug: 'site-settings',
      depth: 1,
    }),
  )
})
