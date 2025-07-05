import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Product } from "@/types/product";
import { formatCurrency } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link href={`/products/${product.slug}`} className="block">
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
        <CardContent>
          <div className="relative overflow-hidden">
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              width={400}
              height={256}
              quality={60}
              className="h-60 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {product.isFeatured && (
              <Badge className="absolute top-3 right-3 bg-orange-500 hover:bg-orange-600">
                Nổi bật
              </Badge>
            )}
            {product.stock < 0 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  Out of Stock
                </Badge>
              </div>
            )}
          </div>
          <div className="mt-2 flex flex-col gap-3">
            <div>
              <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-blue-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {product.category}
              </p>
              <p className="text-xs text-gray-500 mt-1">{product.brand}</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">
                {formatCurrency(product.price)}
              </span>
            </div>
            <Button
              size="lg"
              className="w-full"
              // disabled={product.stock < 0}
              tabIndex={-1} // Để tránh nút Add nhận focus khi bấm vào card
              // onClick={(e) => e.preventDefault()}
            >
              <ShoppingCart className="" />
              Thêm vào giỏ hàng
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
