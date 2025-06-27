import { insertBlogSchema } from "@/schemaValidations/blog.schema";
import { z } from "zod";

export type BlogUpdate = z.infer<typeof insertBlogSchema> & {
  id: string;
  createdAt: Date;
};

export type Blog = {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  content: string;
  image: string | null;
  isFeatured: boolean;
  published: boolean;
  tags: string[];
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  author?: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  };
};
