import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProducts } from "@/actions/product.action";
import { formatCurrency } from "@/lib/utils";

// Tạo async component để lấy data
async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="space-y-4">
          <Link
            href={`/products/${product.slug}`}
            className="block aspect-[3/4] relative bg-gray-100"
          >
            <Image
              src={product.images[0] || "/imgs/products/placeholder.jpg"}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover hover:opacity-90 transition-opacity"
            />
          </Link>
          <div className="space-y-2">
            <h3 className="text-sm font-medium line-clamp-2">{product.name}</h3>
            <p className="text-sm font-semibold">
              {formatCurrency(product.price)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

const ReadyToWear = () => {
  return (
    <section className="max-w-screen-xl mx-auto py-20 px-4">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left">
          Sản phẩm nổi bật
        </h2>
        <Link
          href="/collections/ready-to-wear"
          className="flex items-center space-x-2 text-sm hover:text-gray-600"
        >
          <span>Xem thêm</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <React.Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-[3/4] bg-gray-200 animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        }
      >
        <FeaturedProducts />
      </React.Suspense>
    </section>
  );
};

export default ReadyToWear;
