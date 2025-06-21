import { z } from "zod";

export const insertBlogSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(100, "Slug must be less than 100 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase letters, numbers, and hyphens only"
    ),
  summary: z.string().max(500).nullable().or(z.literal("")),
  content: z.string().min(1, "Content is required"),
  image: z.string().url("Must be a valid URL").nullable().or(z.literal("")),
  isFeatured: z.boolean(),
  published: z.boolean(),
  tags: z.array(z.string()),
  authorId: z.string().min(1, "Author is required"),
});

export type BlogFormValues = z.infer<typeof insertBlogSchema>;

// Schema for updating blogs
export const updateBlogSchema = insertBlogSchema.extend({
  id: z.string().min(1, "Id is required"),
});
