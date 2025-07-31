import { checkoutSchema } from "@/schemaValidations/checkout.schema";
import { CartItem } from "./cart";
import { z } from "zod";

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

export interface BankAccountInfo {
  bankName: string;
  accountNumber: string;
  accountName: string;
  branch?: string;
}

export interface OrderSummary {
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
}

export interface CheckoutData extends CheckoutFormData {
  orderSummary: OrderSummary;
} 