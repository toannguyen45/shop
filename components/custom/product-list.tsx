import React from "react";
import { getAllProductsCached } from "@/actions/product.actions";
import ProductCard from "../client/product-card";

type TParamsGetProducts = {
  q: string;
  category: string;
  priceRange: string;
  sort: string;
  page: string;
};

const ProductList = async ({ params }: { params: TParamsGetProducts }) => {
  const products = await getAllProductsCached({
    query: params.q,
    limit: 10,
    page: Number(params.page),
    category: params.category,
    priceRange: params.priceRange,
    sort: params.sort,
  });

  return (
    <>
      {products.data.length === 0 && <div>Không có sản phẩm nào</div>}
      {products.data.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </>
  );
};

export default ProductList;
