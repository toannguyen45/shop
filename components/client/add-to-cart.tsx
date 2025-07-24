"use client";

import React, { useTransition } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { addItemToCart } from "@/actions/cart.actions";
import { Product } from "@/types/product";
import { ShoppingBag } from "lucide-react";

const AddToCart = ({ product }: { product: Product }) => {
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = () => {
    startTransition(async () => {
      const res = await addItemToCart({
        productId: product.id,
        name: product.name,
        slug: product.slug,
        qty: 1,
        image: product.images[0],
        price: product.price,
        stock: product.stock,
      });
      if (res.success) toast.success(res.message);
      else toast.error(res.message);
    });
  };

  return (
    <Button
      variant="outline"
      className="flex-1 !p-6"
      onClick={handleAddToCart}
      disabled={isPending}
    >
      <ShoppingBag />
      THÊM VÀO GIỎ HÀNG
    </Button>
  );
};

export default AddToCart;
