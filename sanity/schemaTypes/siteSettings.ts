import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({ name: 'brandName',      title: 'Brand name',           type: 'string',  initialValue: 'HN' }),
    defineField({ name: 'logo',           title: 'Logo',                 type: 'image' }),
    defineField({ name: 'email',          title: 'Email',                type: 'email' }),
    defineField({ name: 'phone',          title: 'Phone',                type: 'string' }),
    defineField({ name: 'whatsapp',       title: 'WhatsApp',             type: 'string' }),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'url',   title: 'URL',   type: 'url' }),
          ],
        },
      ],
    }),
    defineField({ name: 'footerText',     title: 'Footer text',          type: 'text',   rows: 3 }),
    defineField({ name: 'seoTitle',       title: 'Default SEO title',    type: 'string' }),
    defineField({ name: 'seoDescription', title: 'Default SEO description', type: 'text', rows: 3 }),
  ],
});
