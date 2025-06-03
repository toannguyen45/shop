import React from "react";
import ProductForm from "../components/product-form";

const CreateProduct = () => {
  return (
    <>
      <h2 className="h2-bold">Create Product</h2>
      <div className="my-8">
        <ProductForm type="Create" />
      </div>
    </>
  );
};

export default CreateProduct;
