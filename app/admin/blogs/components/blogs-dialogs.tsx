"use client";

import React from "react";
import BlogsDeleteDialog from "./blogs-delete-dialog";
import { deleteBlog } from "@/actions/blog.actions";
import { useBlogs } from "../context/blog-context";

const BlogsDialogs = () => {
  const { open, setOpen, currentRow, setCurrentRow } = useBlogs();
  return (
    <>
      {currentRow && (
        <BlogsDeleteDialog
          open={open === "delete"}
          onOpenChange={(val) => {
            if (!val) {
              setOpen(null);
              setCurrentRow(null);
            }
          }}
          currentRow={currentRow}
          onDelete={async (id) => await deleteBlog(id)}
        />
      )}
    </>
  );
};

export default BlogsDialogs;
