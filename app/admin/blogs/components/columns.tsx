"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Blog } from "@/types/blog";
import { SortableHeader } from "@/components/admin/data-table/sortable-header";
import BlogsActionCell from "./blogs-action-cell";

interface ColumnsProps {
  currentSort?: string;
  currentSortDirection?: "asc" | "desc";
}
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const createColumns = ({
  currentSort,
  currentSortDirection,
}: ColumnsProps): ColumnDef<Blog>[] => [
  {
    accessorKey: "title",
    header: () => (
      <SortableHeader
        column="title"
        currentSort={currentSort}
        currentSortDirection={currentSortDirection}
      >
        Tiêu Đề
      </SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="max-w-[300px]">
        <div className="font-medium truncate">{row.getValue("title")}</div>
      </div>
    ),
  },
  // {
  //   accessorKey: "summary",
  //   header: "Tóm Tắt",
  //   cell: ({ row }) => (
  //     <div className="max-w-[300px]">
  //       {/* <div className="font-medium truncate">{row.getValue("title")}</div> */}

  //       <div className="text-sm text-muted-foreground truncate mt-1">
  //         {row.original.summary}
  //       </div>
  //     </div>
  //   ),
  // },
  {
    accessorKey: "slug",
    header: "Slug",
    cell: ({ row }) => {
      const blog = row.original;
      return <div className="font-mono text-sm">{blog.slug}</div>;
    },
  },
  {
    accessorKey: "isFeatured",
    header: () => (
      <SortableHeader
        column="isFeatured"
        currentSort={currentSort}
        currentSortDirection={currentSortDirection}
      >
        Nổi Bật
      </SortableHeader>
    ),
    cell: ({ row }) => {
      const isFeatured = row.getValue("isFeatured") as boolean;
      return (
        <Badge variant={isFeatured ? "default" : "outline"}>
          {isFeatured ? "Có" : "Không"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => {
      const tags = row.getValue("tags") as string[];
      return (
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tags.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{tags.length - 2}
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => (
      <SortableHeader
        column="createdAt"
        currentSort={currentSort}
        currentSortDirection={currentSortDirection}
      >
        Ngày Tạo
      </SortableHeader>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-sm">{formatDate(row.getValue("createdAt"))}</div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: BlogsActionCell,
  },
];
