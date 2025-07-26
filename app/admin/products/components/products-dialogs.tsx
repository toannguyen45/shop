"use client";

import React from "react";
import { useProducts } from "../context/product-context";
import ProductsDeleteDialog from "./products-delete-dialog";
import { deleteProduct } from "@/actions/product.actions";

const ProductsDialogs = () => {
  const { open, setOpen, currentRow, setCurrentRow } = useProducts();
  return (
    <>
      {currentRow && (
        <ProductsDeleteDialog
          open={open === "delete"}
          onOpenChange={(val) => {
            if (!val) {
              setOpen(null);
              setCurrentRow(null);
            }
          }}
          currentRow={currentRow}
          onDelete={async (id) => await deleteProduct(id)}
        />
      )}
    </>
  );
};

export default ProductsDialogs;
