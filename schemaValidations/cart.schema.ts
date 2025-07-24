import { z } from "zod";

// Cart Schemas
export const cartItemSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  qty: z.number().int().nonnegative("Quantity must be a positive number"),
  stock: z.number().int().nonnegative("Stock must be a positive number"),
  image: z.string().min(1, "Image is required"),
  price: z.coerce.number().min(1, "Price must be greater than 0"),
});

export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: z.coerce.number().min(1, "Price must be greater than 0"),
  totalPrice: z.coerce.number().min(1, "Total price must be greater than 0"),
  shippingPrice: z.coerce
    .number()
    .nonnegative("Shipping price must be greater than or equal to 0"),
  taxPrice: z.coerce.number().nonnegative("Tax price must be greater than or equal to 0"),
  sessionCartId: z.string().min(1, "Session cart id is required"),
  userId: z.string().optional().nullable(),
});
