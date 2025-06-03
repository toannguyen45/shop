import { insertProductSchema } from "@/schemaValidations/product.schema";
import { z } from "zod";

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  createdAt: Date;
};
