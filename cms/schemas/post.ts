import { defineType, defineField } from "sanity";

export default defineType({
  title: 'Post',
  name: 'post',
  type: 'document',
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string'
    }),
    defineField({
      title: 'Preview',
      name: 'preview',
      type: 'text'
    }),
    defineField({
      title: 'Text',
      name: 'text',
      type: 'markdown'
    })
  ]
});
