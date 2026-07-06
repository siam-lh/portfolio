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
    {
      name: 'profileImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'primaryButtonText',
      type: 'text',
      defaultValue: 'View Projects',
    },
    {
      name: 'primaryButtonLink',
      type: 'text',
    },
    {
      name: 'secondaryButtonText',
      type: 'text',
      defaultValue: 'Download Resume',
    },
    {
      name: 'secondaryButtonLink',
      type: 'text',
    },
  ],
}
