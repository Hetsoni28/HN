import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'clientName',  title: 'Client name',  type: 'string',  validation: (r) => r.required() }),
    defineField({ name: 'company',     title: 'Company',      type: 'string' }),
    defineField({ name: 'role',        title: 'Role',         type: 'string' }),
    defineField({ name: 'testimonial', title: 'Testimonial',  type: 'text',    rows: 5, validation: (r) => r.required() }),
    defineField({ name: 'photo',       title: 'Photo',        type: 'image' }),
    defineField({ name: 'project',     title: 'Project',      type: 'reference', to: [{ type: 'project' }] }),
    defineField({ name: 'published',   title: 'Published',    type: 'boolean', initialValue: false }),
  ],
});
