import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  versions: {
    drafts: true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'featured', 'displayOrder'],
  },

  access: {
    read: () => true,
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
