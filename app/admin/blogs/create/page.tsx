import PageHeader from "@/components/admin/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import BlogForm from "../components/blog-form";

const CreateBlog = () => {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader>Tạo Tin Tức</PageHeader>

      <Card>
        <CardHeader className="border-b-2">
          <CardTitle className="mb-2">Thông Tin</CardTitle>
        </CardHeader>
        <CardContent>
          <BlogForm type="Create" />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateBlog;
