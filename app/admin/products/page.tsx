import PageHeader from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { Suspense } from "react";
import { getAllProducts } from "@/actions/product.action";
import { ProductTable } from "./components/product-table";

interface ProductsPageProps {
  searchParams: Promise<{
    page?: string;
    query?: string;
    sort?: string;
    sortDirection?: string;
    filter?: string;
    limit?: string;
  }>;
}

async function ProductsContent({ searchParams }: ProductsPageProps) {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const searchText = params.query || "";
  const sort = params.sort || "";
  const sortDirection = (params.sortDirection as "asc" | "desc") || "desc";
  const filter = params.filter || "";
  const limit = Number(params.limit) || 10;

  // Convert filter to boolean for isFeatured
  const isFeatured =
    filter === "true" ? true : filter === "false" ? false : undefined;

  const products = await getAllProducts({
    query: searchText,
    page,
    sort,
    sortDirection,
    isFeatured,
    limit,
  });

  // Filter options for isFeatured
  const filterOptions = [
    { label: "Nổi bật", value: "true" },
    { label: "Không nổi bật", value: "false" },
  ];

  return (
    <ProductTable
      data={products.data}
      pagination={products.pagination}
      currentSort={sort}
      currentSortDirection={sortDirection}
      filterOptions={filterOptions}
    />
  );
}

const ProductList = (props: ProductsPageProps) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between">
        <PageHeader>Sản Phẩm</PageHeader>
        <Button asChild variant="default">
          <Link href="/admin/products/create">Thêm Sản Phẩm +</Link>
        </Button>
      </div>
      <Suspense fallback={<div>Đang tải...</div>}>
        <ProductsContent searchParams={props.searchParams} />
      </Suspense>
    </div>
  );
};

export default ProductList;
