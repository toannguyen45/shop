import FilterBar from "@/components/custom/filter-bar";
import ProductList from "@/components/custom/product-list";
import SortBy from "@/components/custom/sort-by";
import { FilterProvider } from "@/contexts/filter-context";
import React from "react";
import { Suspense } from "react";

const Products = async ({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    categories?: string;
    priceRange?: string;
    sort?: string;
    page?: string;
  }>;
}) => {
  const params = await searchParams;
  
  const formattedParams = {
    q: params.q || "",
    category: params.categories || "all",
    priceRange: params.priceRange || "all",
    sort: params.sort || "lowest",
    page: params.page || "1",
  };

  // const categories = await getAllCategories();

  return (
    <FilterProvider>
      <section className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Bar - Left Side */}
          <div className="lg:w-64 flex-shrink-0">
            <FilterBar />
          </div>

          {/* Main Content - Right Side */}
          <div className="flex-1">
            {/* Sort By and Results Count */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-600">
                {/* Hiển thị {products.pagination.totalPages} kết quả */}
              </p>
              <SortBy />
            </div>

            {/* Products Grid */}
            <Suspense fallback={<p>Đang tải...</p>}>
              <ProductList params={formattedParams} />
            </Suspense>
          </div>
        </div>
      </section>
    </FilterProvider>
  );
};

export default Products;
