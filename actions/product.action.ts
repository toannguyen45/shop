"use server";

import { z } from "zod";
import {
  insertProductSchema,
  updateProductSchema,
} from "@/schemaValidations/product.schema";
import prisma from "@/db/prisma";
import { revalidatePath } from "next/cache";
import { convertToPlainObject, formatError } from "@/lib/utils";
import { PAGE_SIZE, PRICE_RANGES } from "@/constants";
import { Prisma } from "@prisma/client";

// Create a product
export async function createProduct(data: z.infer<typeof insertProductSchema>) {
  try {
    const product = insertProductSchema.parse(data);
    await prisma.product.create({ data: product });

    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Product created successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Update a product
export async function updateProduct(data: z.infer<typeof updateProductSchema>) {
  try {
    const product = updateProductSchema.parse(data);
    const productExists = await prisma.product.findFirst({
      where: { id: product.id },
    });

    if (!productExists) throw new Error("Product not found");

    await prisma.product.update({
      where: { id: product.id },
      data: product,
    });

    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Product updated successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Get single product by it's slug
export async function getProductBySlug(slug: string) {
  return await prisma.product.findFirst({
    where: { slug: slug },
  });
}

// Get all products
export async function getAllProducts({
  query,
  limit = PAGE_SIZE,
  page,
  category,
  priceRange,
  sort,
  sortDirection = "desc",
  isFeatured,
}: {
  query: string;
  limit?: number;
  page: number;
  category?: string;
  priceRange?: string;
  sort?: string;
  sortDirection?: "asc" | "desc";
  isFeatured?: boolean;
}) {
  // Query filter
  const queryFilter: Prisma.ProductWhereInput =
    query && query !== "all"
      ? {
          name: {
            contains: query,
            mode: "insensitive",
          } as Prisma.StringFilter,
        }
      : {};

  // Category filter
  const categoryFilter: Prisma.ProductWhereInput =
    category && category !== "all"
      ? {
          category: {
            in: category.split(","),
          },
        }
      : {};

  // Price filter
  const priceFilter: Prisma.ProductWhereInput =
    priceRange && priceRange !== "all" && priceRange in PRICE_RANGES
      ? {
          price: {
            gte: PRICE_RANGES[priceRange as keyof typeof PRICE_RANGES].min,
            lte: PRICE_RANGES[priceRange as keyof typeof PRICE_RANGES].max,
          },
        }
      : {};

  // Featured filter
  const featuredFilter: Prisma.ProductWhereInput =
    isFeatured !== undefined
      ? {
          isFeatured: isFeatured,
        }
      : {};

  // Tính toán phân trang
  const skip = (page - 1) * limit;

  // Lấy tổng số sản phẩm phù hợp với filter
  const totalCount = await prisma.product.count({
    where: {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...featuredFilter,
    },
  });

  // Xử lý sorting
  let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: "desc" }; // default

  if (sort) {
    switch (sort) {
      case "name":
        orderBy = { name: sortDirection };
        break;
      case "createdAt":
        orderBy = { createdAt: sortDirection };
        break;
      // case "updatedAt":
      //   orderBy = { updatedAt: sortDirection };
      //   break;
      case "isFeatured":
        orderBy = { isFeatured: sortDirection };
        break;
      default:
        orderBy = { createdAt: "desc" };
    }
  }

  // Lấy danh sách sản phẩm
  const data = await prisma.product.findMany({
    where: {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...featuredFilter,
    },
    include: {},
    orderBy,
    skip,
    take: limit,
  });

  return {
    data,
    pagination: {
      total: totalCount,
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit),
      hasNextPage: skip + limit < totalCount,
      hasPrevPage: page > 1,
    },
  };
}

// Delete a product
export async function deleteProduct(id: string) {
  try {
    const productExists = await prisma.product.findFirst({
      where: { id },
    });

    if (!productExists) throw new Error("Product not found");

    await prisma.product.delete({ where: { id } });

    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Product deleted successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Get all categories
export async function getAllCategories() {
  const data = await prisma.product.groupBy({
    by: ["category"],
    // _count: true,
  });

  return data;
}

// Get featured products
export async function getFeaturedProducts() {
  const data = await prisma.product.findMany({
    where: { isFeatured: true },
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  return convertToPlainObject(data);
}

export async function getProductById(productId: string) {
  const data = await prisma.product.findFirst({
    where: { id: productId },
  });

  return convertToPlainObject(data);
}
