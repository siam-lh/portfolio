import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'featured', 'displayOrder'],
    livePreview: {
      url: ({ data }) => {
        return `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/preview/project?secret=${process.env.PAYLOAD_PREVIEW_SECRET}&slug=${data.slug}`
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
              name: 'thumbnail',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'gallery',
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
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
            {
              name: 'technologies',
              type: 'relationship',
              relationTo: 'skills',
              hasMany: true,
              required: true,
            },
          ],
        },

        {
          label: 'Links',
          fields: [
            {
              name: 'githubUrl',
              label: 'GitHub URL',
              type: 'text',
            },
            {
              name: 'liveUrl',
              label: 'Live URL',
              type: 'text',
            },
            {
              name: 'demoVideo',
              label: 'Demo Video URL',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],

  timestamps: true,
}
