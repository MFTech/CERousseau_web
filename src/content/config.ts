import { defineCollection, z } from 'astro:content';

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
  }),
});

const atelie = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    youtube_url: z.string().optional(),
    registration_url: z.string().optional(),
  }),
});

export const collections = { pages, atelie };
