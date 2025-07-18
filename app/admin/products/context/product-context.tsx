'use client'

import useDialogState from "@/hook/use-dialog-state";
import { Product } from "@/types/product";
import React, { useState } from "react";

type ProductsDialogType = "invite" | "add" | "edit" | "delete";

interface ProductsContextType {
  open: ProductsDialogType | null;
  setOpen: (str: ProductsDialogType | null) => void;
  currentRow: Product | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<Product | null>>;
}

const ProductsContext = React.createContext<ProductsContextType | null>(null);

interface Props {
    children: React.ReactNode
  }
  
  export default function ProductsProvider({ children }: Props) {
    const [open, setOpen] = useDialogState<ProductsDialogType>(null)
    const [currentRow, setCurrentRow] = useState<Product | null>(null)
  
    return (
      <ProductsContext value={{ open, setOpen, currentRow, setCurrentRow }}>
        {children}
      </ProductsContext>
    )
  }

export const useProducts = () => {
  const productsContext = React.useContext(ProductsContext);

  if (!productsContext) {
    throw new Error("useProducts has to be used within <ProductsContext>");
  }

  return productsContext;
};
