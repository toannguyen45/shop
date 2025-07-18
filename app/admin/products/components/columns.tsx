"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { SortableHeader } from "@/components/admin/data-table/sortable-header";
import { Product } from "@/types/product";
import Image from "next/image";
import ProductsActionCell from "./products-action-cell";

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
}: ColumnsProps): ColumnDef<Product>[] => [
  {
    accessorKey: "images",
    header: "Ảnh",
    cell: ({ row }) => {
      const images = row.original.images as string[];
      const imageUrl = images && images.length > 0 ? images[0] : null;
      return (
        <>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={row.original.name}
              width={48}
              height={48}
              className="object-cover rounded"
              style={{ minWidth: 48, minHeight: 48 }}
            />
          ) : (
            <div className="w-12 h-12 bg-muted flex items-center justify-center rounded text-xs text-muted-foreground">
              No Image
            </div>
          )}
        </>
      );
    },
  },
  {
    accessorKey: "name",
    header: () => (
      <SortableHeader
        column="name"
        currentSort={currentSort}
        currentSortDirection={currentSortDirection}
      >
        Tên
      </SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="max-w-[300px]">
        <div className="font-medium truncate">{row.getValue("name")}</div>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "Danh Mục",
    cell: ({ row }) => (
      <div className="max-w-[300px]">
        <div className="text-sm text-muted-foreground truncate mt-1">
          {row.original.category}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "brand",
    header: "Hãng",
    cell: ({ row }) => (
      <div className="max-w-[300px]">
        <div className="text-sm text-muted-foreground truncate mt-1">
          {row.original.brand}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "slug",
    header: "Slug",
    cell: ({ row }) => {
      const product = row.original;
      return <div className="font-mono text-sm">{product.slug}</div>;
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
    cell: ProductsActionCell,
  },
];
