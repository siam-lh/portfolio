import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',

  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'company'],
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
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'designation',
              type: 'text',
            },
            {
              name: 'company',
              type: 'text',
            },
            {
              name: 'rating',
              type: 'number',
              min: 1,
              max: 5,
              defaultValue: 5,
              admin: {
                description: 'Rate the testimonial from 1 to 5 stars.',
              },
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
              name: 'photo',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },

        {
          label: 'Content',
          fields: [
            {
              name: 'message',
              type: 'textarea',
              required: true,
            },
          ],
        },
      ],
    },
  ],

  timestamps: true,
}
