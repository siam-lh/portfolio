import type { CollectionConfig } from 'payload'

export const Blogs: CollectionConfig = {
  slug: 'blogs',

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'featured', 'displayOrder', 'tags'],
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
