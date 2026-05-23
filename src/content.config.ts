import { defineCollection, z } from 'astro:content';

const poems = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.date(),
    location: z.string().optional(),
  }),
});

export const collections = { poems };
