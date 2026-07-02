import type { CollectionConfig } from 'payload'

export const BlogTags: CollectionConfig = {
  slug: 'blogTags',

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title'],
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
          ],
        },
      ],
    },
  ],

  timestamps: true,
}
