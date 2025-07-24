"use client";

import useDialogState from "@/hook/use-dialog-state";
import { Blog } from "@/types/blog";
import React, { useState } from "react";

type BlogsDialogType = "invite" | "add" | "edit" | "delete";

interface BlogsContextType {
  open: BlogsDialogType | null;
  setOpen: (str: BlogsDialogType | null) => void;
  currentRow: Blog | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<Blog | null>>;
}

const BlogsContext = React.createContext<BlogsContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function BlogsProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<BlogsDialogType>(null);
  const [currentRow, setCurrentRow] = useState<Blog | null>(null);

  return (
    <BlogsContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </BlogsContext>
  );
}

export const useBlogs = () => {
  const blogsContext = React.useContext(BlogsContext);

  if (!blogsContext) {
    throw new Error("useBlogs has to be used within <BlogsContext>");
  }

  return blogsContext;
};
