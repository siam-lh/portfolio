import type { CollectionConfig } from 'payload'

export const Blogs: CollectionConfig = {
  slug: 'blogs',

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'featured', 'displayOrder', 'tags'],
    livePreview: {
      url: ({ data }) => {
        return `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/preview/blog?secret=${process.env.PAYLOAD_PREVIEW_SECRET}&slug=${data.slug}`
      },
      breakpoints: [
        {
          label: 'Mobile (S)',
          name: 'mobile-sm',
          width: 375,
          height: 667,
        },
        {
          label: 'Mobile (L)',
          name: 'mobile-lg',
          width: 430,
          height: 932,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Laptop',
          name: 'laptop',
          width: 1280,
          height: 800,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
        {
          label: 'Large Desktop',
          name: 'desktop-xl',
          width: 1920,
          height: 1080,
        },
      ],
    },
  },

  access: {
    read: ({ req }) => {
      if (req.user) return true
      return {
        or: [
          {
            _status: {
              equals: 'published',
            },
          },
          {
            _status: {
              exists: false,
            },
          },
        ],
      }
    },
  },
  versions: {
    drafts: {
      autosave: {
        interval: 1000,
      },
    },
    maxPerDoc: 25,
  },

  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              index: true,
            },
            {
              name: 'featured',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'displayOrder',
              type: 'number',
              defaultValue: 0,
              admin: {
                description: 'Lower numbers appear first.',
              },
            },
          ],
        },

        {
          label: 'Media',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'Related Tags',
          fields: [
            {
              name: 'relatedTags',
              label: 'Related Tags',
              type: 'relationship',
              relationTo: 'blogTags',
              hasMany: true,
              admin: {
                description: 'Select tags related to the blog.',
              },
            },
          ],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'shortDescription',
              type: 'textarea',
              maxLength: 300,
              required: true,
            },
            {
              name: 'fullDescription',
              type: 'richText',
              required: true,
            },
          ],
        },
      ],
    },
  ],

  timestamps: true,
}
