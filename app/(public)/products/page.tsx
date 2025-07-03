import PageBanner from "@/components/client/page-banner";
import FilterBar from "@/components/custom/filter-bar";
import ProductList from "@/components/custom/product-list";
import SortBy from "@/components/custom/sort-by";
import { FilterProvider } from "@/contexts/filter-context";
import React from "react";
import { Suspense } from "react";
import Loading from "./loading";

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
  const breadcrumbs = [{ label: "Sản Phẩm" }];

  return (
    <>
      <PageBanner title="Sản Phẩm" breadcrumbs={breadcrumbs} />

      <FilterProvider>
        <section className="max-w-screen-xl mx-auto py-4 px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter Bar - Left Side */}
            <div className="lg:w-64 flex-shrink-0">
              <FilterBar />
            </div>

            {/* Main Content - Right Side */}
            <div className="flex-1">
              {/* Sort By and Results Count */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-sm font-bold">TẤT CẢ SẢN PHẨM</p>
                <SortBy />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Products Grid */}
                <Suspense fallback={<Loading />}>
                  <ProductList params={formattedParams} />
                </Suspense>
              </div>
            </div>
          </div>
        </section>
      </FilterProvider>
    </>
  );
};

export default Products;
