import {
  cartItemSchema,
  insertCartSchema,
} from "@/schemaValidations/cart.schema";
import { z } from "zod";

export type Cart = z.infer<typeof insertCartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
