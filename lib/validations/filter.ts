import { z } from "zod";

export const filterSchema = z.object({
  categories: z.array(z.string()).default([]),
  priceRange: z.array(z.string()).default([]),
  sizes: z.array(z.string()).default([]),
  colors: z.array(z.string()).default([]),
  sort: z.string().default("featured"),
});

export type FilterValues = z.infer<typeof filterSchema>;

export const defaultFilters: FilterValues = {
  categories: [],
  priceRange: [],
  sizes: [],
  colors: [],
  sort: "featured",
}; 