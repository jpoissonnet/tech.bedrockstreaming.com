import { defineCollection, reference, z } from "astro:content";
import { glob } from 'astro/loaders';

const postsCollection = defineCollection({
  loader: glob({pattern: '**/**/*.md', base: "./src/content/posts"}),
  schema: ({ image }) =>
    z.object({
      author: reference("authors").or(z.array(reference("authors"))),
      title: z.string(),
      subtitle: z.string().optional(),
      description: z.string().optional(),
      thumbnail: image().optional(),
      tags: z.union([z.string(), z.number()]).array(),
    }),
});

const authorsCollection = defineCollection({
    loader: glob({pattern: '*.json', base: "./src/content/authors"}),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      avatar: image().optional().or(z.string().url()),
      url: z.string().url().optional(),
    }),
});

const lftsCollection = defineCollection({
    loader: glob({pattern: '**/*.md', base: "./src/content/lfts"}),
    schema: () =>
        z.object({
            title: z.string(),
            description: z.string().optional(),
            tags: z.union([z.string(), z.number()]).array().optional(),
            youtubeId: z.string().optional(),
            eventName: z.string().optional(),
            eventUrl: z.string().url().optional(),
            sponsored: z.boolean().optional(),
            hosted: z.boolean().optional(),
            language: z.string().optional(),
            lang: z.string().optional(),
            author: reference("authors").or(z.array(reference("authors"))),
        }),
    });

const conferencesCollection = defineCollection({
    loader: glob({pattern: '**/**/*.md', base: ("./src/content/conferences")}),
    schema: () =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      tags: z.union([z.string(), z.number()]).array().optional(),
      youtubeId: z.string().optional(),
      eventName: z.string(),
      eventUrl: z.string().url(),
      sponsored: z.boolean().optional(),
      hosted: z.boolean().optional(),
      author: reference("authors").or(z.array(reference("authors"))),
    }),
});

export const collections = {
  posts: postsCollection,
  authors: authorsCollection,
  lfts: lftsCollection,
  conferences: conferencesCollection,
};
