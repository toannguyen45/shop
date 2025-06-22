import PageHeader from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { getAllBlogs } from "@/actions/blog.action";
import { BlogTable } from "@/app/admin/blogs/components/blog-table";

const BlogList = async (props: {
  searchParams: Promise<{
    page: string;
    query: string;
    sort: string;
    sortDirection: string;
    filter: string;
    limit: string;
  }>;
}) => {
  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;
  const searchText = searchParams.query || "";
  const sort = searchParams.sort || "";
  const sortDirection =
    (searchParams.sortDirection as "asc" | "desc") || "desc";
  const filter = searchParams.filter || "";
  const limit = Number(searchParams.limit) || 10;

  // Convert filter to boolean for isFeatured
  const isFeatured =
    filter === "true" ? true : filter === "false" ? false : undefined;

  const blogs = await getAllBlogs({
    query: searchText,
    page,
    sort,
    sortDirection,
    isFeatured,
    limit,
  });

  // Filter options for isFeatured
  const filterOptions = [
    { label: "Nổi bật", value: "true" },
    { label: "Không nổi bật", value: "false" },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between">
        <PageHeader>Tin Tức</PageHeader>
        <Button asChild variant="default">
          <Link href="/admin/blogs/create">Thêm Tin Tức +</Link>
        </Button>
      </div>

      <BlogTable
        data={blogs.data}
        pagination={blogs.pagination}
        currentSort={sort}
        currentSortDirection={sortDirection}
        filterOptions={filterOptions}
      />
    </div>
  );
};

export default BlogList;
