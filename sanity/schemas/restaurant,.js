import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Restaurant name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'short_description',
      title: 'Short_description',
      type: 'string',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'image',
      title: 'Image of The Restaurant ',
      type: 'image',
    }),
    defineField({
      name: 'lat',
      title: 'Latitude of The Restaurant',
      type: 'number',
    }),
    defineField({
      name: 'long',
      title: 'Longitude of The Restaurant',
      type: 'number',
    }),
    defineField({
      name: 'address',
      title: 'Restaurant Address ',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Enter a Rating form (1-5 Stars) ',
      type: 'number',
      validation: (Rule) =>
        Rule.required().min(1).max(5).error('Please Enter a Value between 1 to 5'),
    }),
    defineField({
      name: 'type',
      title: 'Category',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}]}],

      validation: (Rule) => Rule.required().unique(),
    }),
    defineField({
      name: 'dishes',
      title: 'Dishes',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'dish'}]}],

      validation: (Rule) => Rule.required(),
    }),
  ],
})
