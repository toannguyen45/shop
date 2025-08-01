import { getProductBySlug } from "@/actions/product.actions";
import { ImageSlider } from "@/components/client/ImageSlider";
import PageBanner from "@/components/client/page-banner";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { notFound } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import prisma from "@/db/prisma";
import AddToCart from "@/components/client/add-to-cart";

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    select: { slug: true },
  });

  return products.map((product) => ({
    slug: product.slug,
  }));
}

const ProductDetail = async ({ params }: ProductDetailPageProps) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const breadcrumbs = [
    { label: "Sản Phẩm", href: "/products" },
    { label: product.slug },
  ];

  return (
    <>
      <PageBanner title={product.name} breadcrumbs={breadcrumbs} />
      <section className="max-w-screen-xl mx-auto py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start lg:gap-x-24 py-6">
          <ImageSlider images={product.images} />
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {product.name}
            </h1>
            <div>
              <span className="font-medium">Danh mục:</span>
              <span className="ml-1">{product.category}</span>
              <span className="mx-2 text-gray-400">|</span>
              <span className="font-medium">Hãng:</span>
              <span className="ml-1">{product.brand}</span>
            </div>
            <Separator />
            <div>
              <span className="font-medium">Tình trạng:</span>
              <span className="ml-2">
                {product.stock > 0 ? "Còn hàng" : "Hết hàng"}
              </span>
            </div>
            <Separator />
            <p className="text-3xl font-medium text-red-500">
              {formatCurrency(product.price)}
            </p>
            <p className="text-base">{product.description}</p>

            <div className="flex flex-col gap-3 mt-6">
              <Button size="lg" className="w-full text-lg !p-6">
                MUA NGAY
              </Button>
              <div className="flex gap-3">
                <AddToCart product={product} />
                <Button variant="outline" className="flex-1 !p-6">
                  LIÊN HỆ
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">{/* <FeaturedProducts /> */}</div>
      </section>
    </>
  );
};

export default ProductDetail;
