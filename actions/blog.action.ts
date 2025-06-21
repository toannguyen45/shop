"use server";

import { z } from "zod";
import {
  insertBlogSchema,
  updateBlogSchema,
} from "@/schemaValidations/blog.schema";
import { Prisma } from "@/lib/generated/prisma";
import prisma from "@/db/prisma";
import { revalidatePath } from "next/cache";
import { convertToPlainObject, formatError } from "@/lib/utils";
import { PAGE_SIZE } from "@/constants";

export async function createBlog(data: z.infer<typeof insertBlogSchema>) {
  try {
    const blog = insertBlogSchema.parse(data);
    await prisma.blog.create({ data: blog });

    revalidatePath("/admin/blogs");

    return {
      success: true,
      message: "Product created successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Update a blog
export async function updateBlog(data: z.infer<typeof updateBlogSchema>) {
  try {
    const blog = updateBlogSchema.parse(data);
    const blogExists = await prisma.blog.findFirst({
      where: { id: blog.id },
    });

    if (!blogExists) throw new Error("Blog not found");

    await prisma.blog.update({
      where: { id: blog.id },
      data: blog,
    });

    revalidatePath("/admin/blogs");

    return {
      success: true,
      message: "Blog updated successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Get all blogs
export async function getAllBlogs({
  query,
  limit = PAGE_SIZE,
  page,
  tags,
  published,
  sort,
}: {
  query: string;
  limit?: number;
  page: number;
  tags?: string;
  published?: boolean;
  sort?: string;
}) {
  // Query filter
  const queryFilter: Prisma.BlogWhereInput =
    query && query !== "all"
      ? {
          OR: [
            {
              title: {
                contains: query,
                mode: "insensitive",
              } as Prisma.StringFilter,
            },
            {
              summary: {
                contains: query,
                mode: "insensitive",
              } as Prisma.StringFilter,
            },
          ],
        }
      : {};

  // Tags filter
  const tagsFilter: Prisma.BlogWhereInput =
    tags && tags !== "all"
      ? {
          tags: {
            hasSome: tags.split(","),
          },
        }
      : {};

  // Published filter
  const publishedFilter: Prisma.BlogWhereInput =
    published !== undefined
      ? {
          published: published,
        }
      : {};

  // Tính toán phân trang
  const skip = (page - 1) * limit;

  // Lấy tổng số blogs phù hợp với filter
  const totalCount = await prisma.blog.count({
    where: {
      ...queryFilter,
      ...tagsFilter,
      ...publishedFilter,
    },
  });

  // Lấy danh sách blogs
  const data = await prisma.blog.findMany({
    where: {
      ...queryFilter,
      ...tagsFilter,
      ...publishedFilter,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy:
      sort === "oldest"
        ? { createdAt: "asc" }
        : sort === "newest"
        ? { createdAt: "desc" }
        : sort === "title"
        ? { title: "asc" }
        : { createdAt: "desc" }, // default sort
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

export async function getBlogById(blogId: string) {
  const data = await prisma.blog.findFirst({
    where: { id: blogId },
  });

  return convertToPlainObject(data);
}

// Delete a blog
export async function deleteBlog(id: string) {
  try {
    const blogExists = await prisma.blog.findFirst({
      where: { id },
    });

    if (!blogExists) throw new Error("Blog not found");

    await prisma.blog.delete({ where: { id } });

    revalidatePath("/admin/blogs");

    return {
      success: true,
      message: "Blog deleted successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
