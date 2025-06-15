import React from "react";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { getAllProducts } from "@/actions/product.action";

type TParamsGetProducts = {
  q: string;
  category: string;
  priceRange: string;
  sort: string;
  page: string;
};

const ProductList = async ({ params }: { params: TParamsGetProducts }) => {
  const products = await getAllProducts({
    query: params.q,
    limit: 10,
    page: Number(params.page),
    category: params.category,
    priceRange: params.priceRange,
    sort: params.sort,
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.data.length === 0 && <div>Không có sản phẩm nào</div>}
      {products.data.map((product) => (
        <div key={product.id} className="space-y-4">
          <Link
            href={`/products/${product.id}`}
            className="block aspect-[3/4] relative bg-gray-100"
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover hover:opacity-90 transition-opacity"
            />
          </Link>
          <div className="space-y-2">
            <h3 className="text-sm font-medium">{product.name}</h3>
            <p className="text-lg">{formatCurrency(product.price)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
