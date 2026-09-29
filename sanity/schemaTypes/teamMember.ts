import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({ name: 'name',         title: 'Full Name',      type: 'string',  validation: (r) => r.required() }),
    defineField({ name: 'role',         title: 'Role / Title',   type: 'string' }),
    defineField({ name: 'tagline',      title: 'Tagline',        type: 'string' }),
    defineField({ name: 'bio',          title: 'Bio',            type: 'text',    rows: 5 }),
    defineField({ name: 'photo',        title: 'Photo',          type: 'image',   options: { hotspot: true } }),
    defineField({ name: 'skills',       title: 'Skills',         type: 'array',   of: [{ type: 'string' }] }),
    defineField({ name: 'github',       title: 'GitHub URL',     type: 'url' }),
    defineField({ name: 'linkedin',     title: 'LinkedIn URL',   type: 'url' }),
    defineField({ name: 'twitter',      title: 'Twitter URL',    type: 'url' }),
    defineField({ name: 'displayOrder', title: 'Display order',  type: 'number' }),
  ],
  orderings: [{ title: 'Display order', name: 'orderAsc', by: [{ field: 'displayOrder', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'role' } },
});
