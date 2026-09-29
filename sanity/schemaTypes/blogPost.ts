import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'blogPost',
  title: 'Insight / Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title',          title: 'Title',           type: 'string',    validation: (r) => r.required() }),
    defineField({ name: 'slug',           title: 'Slug',            type: 'slug',      options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'excerpt',        title: 'Excerpt',         type: 'text',      rows: 3 }),
    defineField({ name: 'coverImage',     title: 'Cover image',     type: 'image',     options: { hotspot: true } }),
    defineField({
      name: 'content',
      title: 'Content (Portable Text)',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
        },
        {
          type: 'object',
          name: 'callout',
          title: 'Callout box',
          fields: [
            defineField({ name: 'type',    title: 'Type',    type: 'string', options: { list: ['info', 'tip', 'warning'] } }),
            defineField({ name: 'content', title: 'Content', type: 'text' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'teamMember' }],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          'AI',
          'Web Development',
          'SaaS',
          'Product Development',
          'Technology',
          'HN Updates',
        ],
      },
    }),
    defineField({ name: 'tags',           title: 'Tags',            type: 'array',     of: [{ type: 'string' }] }),
    defineField({ name: 'readTime',       title: 'Read time (min)', type: 'number' }),
    defineField({ name: 'featured',       title: 'Featured',        type: 'boolean',   initialValue: false }),
    defineField({ name: 'publishedAt',    title: 'Published at',    type: 'datetime' }),
    defineField({ name: 'seoTitle',       title: 'SEO title',       type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO description', type: 'text',      rows: 3 }),
  ],
  orderings: [{ title: 'Published (newest)', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'coverImage' },
  },
});
