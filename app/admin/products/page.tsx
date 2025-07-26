import PageHeader from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { Suspense } from "react";
import { getAllProductsCached } from "@/actions/product.actions";
import { ProductsTable } from "./components/products-table";
import ProductsProvider from "./context/product-context";
import ProductsDialogs from "./components/products-dialogs";

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

  const productsPromise = await getAllProductsCached({
    query: searchText,
    page,
    sort,
    sortDirection,
    isFeatured,
    limit,
  });

  const [products] = await Promise.all([productsPromise]);

  // Filter options for isFeatured
  const filterOptions = [
    { label: "Nổi bật", value: "true" },
    { label: "Không nổi bật", value: "false" },
  ];

  return (
    <ProductsTable
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
    <ProductsProvider>
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

      <ProductsDialogs />
    </ProductsProvider>
  );
};

export default ProductList;
