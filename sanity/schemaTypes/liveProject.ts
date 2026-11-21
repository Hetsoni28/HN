import { defineField, defineType } from 'sanity';

/** A launched client website shown as a thumbnail card on the Work page; the card links to the live site. */
export default defineType({
  name: 'liveProject',
  title: 'Live Website',
  type: 'document',
  fields: [
    defineField({ name: 'name',        title: 'Project name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'url',
      title: 'Website URL',
      type: 'url',
      validation: (r) => r.required().uri({ scheme: ['https', 'http'] }),
    }),
    defineField({ name: 'category',    title: 'Category',     type: 'string', description: 'Short label, e.g. "Jewellery" or "Healthcare"' }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'One or two sentences shown on the card',
      validation: (r) => r.max(200),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      description: 'Screenshot of the homepage, ideally 1440×900 (16:10)',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
      validation: (r) => r.required(),
    }),
    defineField({ name: 'order', title: 'Order', type: 'number', description: 'Lower numbers show first' }),
  ],
  orderings: [{ title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'url', media: 'thumbnail' } },
});
