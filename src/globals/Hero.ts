import type { GlobalConfig } from 'payload'

export const Hero: GlobalConfig = {
  slug: 'hero',

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
    drafts: true,
  },

  fields: [
    {
      type: 'group',
      name: 'content',
      label: 'Hero Content',
      fields: [
        {
          name: 'greeting',
          type: 'text',
          defaultValue: "Hi, I'm",
        },
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'designation',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },

    {
      type: 'group',
      name: 'profile',
      label: 'Profile',
      fields: [
        {
          name: 'profileImage',
          type: 'upload',
          label: 'Profile Image',
          relationTo: 'media',
        },
      ],
    },

    {
      type: 'group',
      name: 'primaryButton',
      label: 'Primary Button',
      fields: [
        {
          name: 'text',
          type: 'text',
          defaultValue: 'View Projects',
        },
        {
          name: 'link',
          type: 'text',
        },
      ],
    },

    {
      type: 'group',
      name: 'secondaryButton',
      label: 'Secondary Button',
      fields: [
        {
          name: 'text',
          type: 'text',
          defaultValue: 'Download Resume',
        },
        {
          name: 'resume',
          type: 'upload',
          label: 'Resume / CV (PDF)',
          relationTo: 'media',
          admin: {
            description: 'Optional PDF upload.',
          },
        },
      ],
    },
  ],
}
