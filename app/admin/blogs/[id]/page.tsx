import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { notFound } from "next/navigation";
import PageHeader from "@/components/admin/page-header";
import BlogForm from "../components/blog-form";
import { getBlogById } from "@/actions/blog.action";

const UpdateBlog = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await props.params;

  const blog = await getBlogById(id);

  if (!blog) return notFound();

  return (
    <div className="flex flex-col gap-5">
      <PageHeader>Cập Nhật Tin Tức</PageHeader>

      <Card>
        <CardHeader className="border-b-2">
          <CardTitle className="mb-2">Thông Tin</CardTitle>
        </CardHeader>
        <CardContent>
          <BlogForm type="Update" blog={blog} blogId={blog.id} />
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateBlog;
