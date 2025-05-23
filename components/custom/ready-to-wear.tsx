// components/custom/ReadyToWear.tsx
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const products = [
  {
    id: 1,
    name: "WOMEN'S SWING TWISTED SHIRT IN WHITE",
    price: 550,
    image: "/imgs/products/product1.jpg",
  },
  {
    id: 2,
    name: "CARGO JACKET IN BLACK",
    price: 1900,
    image: "/imgs/products/product2.webp",
  },
  {
    id: 3,
    name: "WOMEN'S MINIMAL HOURGLASS JACKET IN BLACK",
    price: 2800,
    image: "/imgs/products/product3.jfif",
  },
  {
    id: 4,
    name: "WOMEN'S FITTED DRESS IN BLACK",
    price: 1400,
    image: "/imgs/products/product4.jpg",
  },
];

const ReadyToWear = () => {
  return (
    <section className="container mx-auto px-6 py-16">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-3xl md:text-4xl font-light">READY-TO-WEAR</h2>
        <Link 
          href="/collections/ready-to-wear" 
          className="flex items-center space-x-2 text-sm hover:text-gray-600"
        >
          <span>See more</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="space-y-4">
            <Link href={`/products/${product.id}`} className="block aspect-[3/4] relative bg-gray-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover hover:opacity-90 transition-opacity"
              />
            </Link>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">{product.name}</h3>
              <p className="text-sm">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReadyToWear;