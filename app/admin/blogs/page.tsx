import PageHeader from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { Suspense } from "react";
import { getAllBlogsCached } from "@/actions/blog.actions";
import { BlogTable } from "@/app/admin/blogs/components/blog-table";
import BlogsProvider from "./context/blog-context";

interface BlogsPageProps {
  searchParams: Promise<{
    page?: string;
    query?: string;
    sort?: string;
    sortDirection?: string;
    filter?: string;
    limit?: string;
  }>;
}

async function BlogsContent({ searchParams }: BlogsPageProps) {
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

  const blogsPromise = await getAllBlogsCached({
    query: searchText,
    page,
    sort,
    sortDirection,
    isFeatured,
    limit,
  });

  const [blogs] = await Promise.all([blogsPromise]);

  // Filter options for isFeatured
  const filterOptions = [
    { label: "Nổi bật", value: "true" },
    { label: "Không nổi bật", value: "false" },
  ];

  return (
    <BlogTable
      data={blogs.data}
      pagination={blogs.pagination}
      currentSort={sort}
      currentSortDirection={sortDirection}
      filterOptions={filterOptions}
    />
  );
}

const BlogList = (props: BlogsPageProps) => {
  return (
    <BlogsProvider>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between">
          <PageHeader>Tin Tức</PageHeader>
          <Button asChild variant="default">
            <Link href="/admin/blogs/create">Thêm Tin Tức +</Link>
          </Button>
        </div>
        <Suspense fallback={<div>Đang tải...</div>}>
          <BlogsContent searchParams={props.searchParams} />
        </Suspense>
      </div>
    </BlogsProvider>
  );
};

export default BlogList;
