import { insertProductSchema } from "@/schemaValidations/product.schema";
import { z } from "zod";

export type ProductUpdate = z.infer<typeof insertProductSchema> & {
  id: string;
  createdAt: Date;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  images: string[];
  brand: string;
  description: string;
  stock: number;
  price: number;
  isFeatured: boolean;
  banner: string | null;
  createdAt: Date;
  updatedAt?: Date;
};

export type TParamsGetProducts = {
  q?: string;
  category?: string;
  priceRange?: string;
  sort?: string;
  page?: string;
};

export type ProductFormData = z.infer<typeof insertProductSchema>