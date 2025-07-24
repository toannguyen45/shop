import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { EditIcon, TrashIcon } from "lucide-react";
import React from "react";
import { useBlogs } from "../context/blog-context";
import { useRouter } from "next/navigation";
import { Blog } from "@/types/blog";

interface DataTableRowActionsProps {
  row: Row<Blog>;
}

const BlogsActionCell = ({ row }: DataTableRowActionsProps) => {
  const { setOpen, setCurrentRow } = useBlogs();
  const router = useRouter();
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted flex h-8 w-8 p-0"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            onClick={() => {
              router.push(`/admin/blogs/${row.original.id}`);
            }}
          >
            Sửa
            <DropdownMenuShortcut>
              <EditIcon size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(row.original);
              setOpen("delete");
            }}
            className="text-red-500!"
          >
            Xóa
            <DropdownMenuShortcut>
              <TrashIcon size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default BlogsActionCell;
