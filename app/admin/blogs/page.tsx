import PageHeader from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatId } from "@/lib/utils";
import Pagination from "@/components/admin/pagination";
import { deleteBlog, getAllBlogs } from "@/actions/blog.action";
import DeleteDialog from "@/components/admin/delete-dialog";
import { Blog } from "@/types/blog";

const BlogList = async (props: {
  searchParams: Promise<{
    page: string;
    query: string;
  }>;
}) => {
  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;
  const searchText = searchParams.query || "";

  const blogs = await getAllBlogs({
    query: searchText,
    page,
  });

  console.log(blogs);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between">
        <PageHeader>Tin Tức</PageHeader>
        <Button asChild variant="default">
          <Link href="/admin/blogs/create">Thêm Tin Tức +</Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Tiêu Đề</TableHead>
            <TableHead>Tóm tắt</TableHead>
            <TableHead>Nội dung</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Nổi bật</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs.data.map((blog: Blog) => (
            <TableRow key={blog.id}>
              <TableCell>{formatId(blog.id)}</TableCell>
              <TableCell>{blog.title}</TableCell>
              <TableCell>{blog.summary}</TableCell>
              <TableCell>
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </TableCell>
              <TableCell>{blog.slug}</TableCell>
              <TableCell>{blog.isFeatured}</TableCell>
              <TableCell className="flex gap-1">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/admin/blogs/${blog.id}`}>Sửa</Link>
                </Button>
                <DeleteDialog id={blog.id} action={deleteBlog} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination
        currentPage={page}
        totalPages={blogs.pagination.totalPages}
        hasNextPage={blogs.pagination.hasNextPage}
        hasPrevPage={blogs.pagination.hasPrevPage}
        baseUrl="/admin/blogs"
        searchParams={{
          ...(searchText && { query: searchText }),
          // ...(category && { category }),
        }}
      />
    </div>
  );
};

export default BlogList;
