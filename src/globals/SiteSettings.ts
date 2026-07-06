import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',

  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'siteName',
          type: 'text',
          label: 'Site Name',
          required: true,
          defaultValue: 'Sanjatul Hasan Siam',
          admin: {
            description: 'Shown in the browser tab title and as the navbar logo text.',
          },
        },
      ],
    },

    {
      name: 'logo',
      type: 'upload',
      label: 'Logo',
      relationTo: 'media',
      admin: {
        description: 'SVG or PNG. If omitted, the site name text is used instead.',
      },
    },

    // ─── Default SEO / Open Graph ─────────────────────────────────────────────
    {
      name: 'seo',
      type: 'group',
      label: 'Default SEO',
      admin: {
        description: 'These values are used as fallbacks. Individual pages can override them.',
      },
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          label: 'Default Meta Title',
          admin: {
            description: 'Used when a page has no custom title. Keep under 60 chars.',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Default Meta Description',
          admin: {
            description: 'Used as the fallback description. Keep under 160 chars.',
          },
        },
        {
          name: 'ogImage',
          type: 'upload',
          label: 'Default OG Image',
          relationTo: 'media',
          admin: {
            description: '1200×630px recommended for social sharing previews.',
          },
        },
        {
          name: 'twitterHandle',
          type: 'text',
          label: 'Twitter / X Handle',
          admin: {
            description: 'Include the @ — e.g. @yourusername.',
          },
        },
      ],
    },

    // ─── Navigation ───────────────────────────────────────────────────────────
    {
      name: 'navLinks',
      type: 'array',
      label: 'Navigation Links',
      minRows: 1,
      admin: {
        description: 'Ordered list of links shown in the main navbar.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Label',
              required: true,
              admin: { width: '40%' },
            },
            {
              name: 'href',
              type: 'text',
              label: 'Path',
              required: true,
              admin: {
                description: 'e.g. /blog',
                width: '40%',
              },
            },
            {
              name: 'openInNewTab',
              type: 'checkbox',
              label: 'New Tab?',
              defaultValue: false,
              admin: { width: '20%' },
            },
          ],
        },
      ],
    },

    // ─── Social Links ─────────────────────────────────────────────────────────
    {
      name: 'socialLinks',
      type: 'group',
      label: 'Social / Contact Links',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'github',
              type: 'text',
              label: 'GitHub URL',
              admin: { width: '50%' },
            },
            {
              name: 'linkedin',
              type: 'text',
              label: 'LinkedIn URL',
              admin: { width: '50%' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'twitter',
              type: 'text',
              label: 'Twitter / X URL',
              admin: { width: '50%' },
            },
            {
              name: 'email',
              type: 'email',
              label: 'Contact Email',
              admin: { width: '50%' },
            },
          ],
        },
        {
          name: 'resume',
          type: 'upload',
          label: 'Resume / CV (PDF)',
          relationTo: 'media',
          admin: {
            description: 'Uploaded PDF. A download link is generated automatically.',
          },
        },
      ],
    },

    // ─── Footer ───────────────────────────────────────────────────────────────
    {
      name: 'footerText',
      type: 'text',
      label: 'Footer Copyright Text',
      defaultValue: '© {year} — All rights reserved.',
      admin: {
        description: 'Use {year} as a placeholder — it is replaced at render time.',
      },
    },
  ],
}
