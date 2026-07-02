import type { CollectionConfig } from 'payload'

export const Experience: CollectionConfig = {
  slug: 'experience',

  admin: {
    useAsTitle: 'company',
    defaultColumns: ['company', 'position', 'employmentType', 'isCurrent'],
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
              name: 'company',
              type: 'text',
              required: true,
            },
            {
              name: 'position',
              type: 'text',
              required: true,
            },
            {
              name: 'employmentType',
              type: 'select',
              defaultValue: 'full-time',
              options: [
                {
                  label: 'Full Time',
                  value: 'full-time',
                },
                {
                  label: 'Part Time',
                  value: 'part-time',
                },
                {
                  label: 'Internship',
                  value: 'internship',
                },
                {
                  label: 'Freelance',
                  value: 'freelance',
                },
                {
                  label: 'Contract',
                  value: 'contract',
                },
              ],
            },
            {
              name: 'location',
              type: 'text',
            },
            {
              name: 'isCurrent',
              label: 'Currently Working Here',
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
          label: 'Timeline',
          fields: [
            {
              name: 'startDate',
              type: 'date',
              required: true,
            },
            {
              name: 'endDate',
              type: 'date',
              admin: {
                condition: (_, siblingData) => !siblingData.isCurrent,
              },
            },
          ],
        },

        {
          label: 'Media',
          fields: [
            {
              name: 'companyLogo',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },

        {
          label: 'Content',
          fields: [
            {
              name: 'summary',
              type: 'textarea',
            },
          ],
        },

        {
          label: 'Links',
          fields: [
            {
              name: 'companyWebsite',
              label: 'Company Website',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],

  timestamps: true,
}
