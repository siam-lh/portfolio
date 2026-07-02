import type { CollectionConfig } from 'payload'

export const Skills: CollectionConfig = {
  slug: 'skills',

  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'level'],
  },

  access: {
    read: () => true,
    delete: () => true,
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
              unique: true,
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              index: true,
            },
            {
              name: 'level',
              label: 'Proficiency',
              type: 'number',
              required: true,
              min: 0,
              max: 5,
              admin: {
                description: 'Rate your proficiency from 0 (Beginner) to 5 (Expert).',
              },
            },
          ],
        },

        {
          label: 'Media',
          fields: [
            {
              name: 'icon',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
  ],

  timestamps: true,
}
