import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({ name: 'title',          title: 'Title',              type: 'string',  validation: (r) => r.required() }),
    defineField({ name: 'slug',           title: 'Slug',               type: 'slug',    options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'icon',           title: 'Icon (emoji)',        type: 'string' }),
    defineField({ name: 'tagline',        title: 'Tagline',            type: 'string' }),
    defineField({ name: 'shortDescription', title: 'Short description', type: 'text',  rows: 2 }),
    defineField({ name: 'description',    title: 'What it is',         type: 'text',    rows: 4 }),
    defineField({
      name: 'whatWeProvide',
      title: 'What HN Provides',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title',       type: 'string' }),
          defineField({ name: 'description', type: 'text', rows: 2 }),
        ],
      }],
    }),
    defineField({ name: 'technology',     title: 'Technology stack',   type: 'array',   of: [{ type: 'string' }] }),
    defineField({ name: 'order',          title: 'Display order',      type: 'number' }),
    defineField({ name: 'seoTitle',       title: 'SEO title',          type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO description',    type: 'text',    rows: 2 }),
  ],
  orderings: [{ title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'tagline' } },
});
