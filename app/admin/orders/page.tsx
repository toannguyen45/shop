"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/admin/data-table/data-table"
import { formatCurrency, formatId } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

type Order = {
  id: string
  userId: string
  totalPrice: number
  isPaid: boolean
  isDelivered: boolean
  createdAt: Date
  user: {
    name: string
    email: string
  }
}

const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => formatId(row.getValue("id")),
  },
  {
    accessorKey: "user.name",
    header: "Khách hàng",
  },
  {
    accessorKey: "user.email",
    header: "Email",
  },
  {
    accessorKey: "totalPrice",
    header: "Tổng tiền",
    cell: ({ row }) => formatCurrency(row.getValue("totalPrice")),
  },
  {
    accessorKey: "isPaid",
    header: "Trạng thái thanh toán",
    cell: ({ row }) => (
      <Badge variant={row.getValue("isPaid") ? "success" : "destructive"}>
        {row.getValue("isPaid") ? "Đã thanh toán" : "Chưa thanh toán"}
      </Badge>
    ),
  },
  {
    accessorKey: "isDelivered",
    header: "Trạng thái giao hàng",
    cell: ({ row }) => (
      <Badge variant={row.getValue("isDelivered") ? "success" : "destructive"}>
        {row.getValue("isDelivered") ? "Đã giao" : "Chưa giao"}
      </Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Ngày tạo",
    cell: ({ row }) => new Date(row.getValue("createdAt")).toLocaleDateString(),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original

      return (
        <Button asChild variant="outline" size="sm">
          <Link href={`/admin/orders/${order.id}`}>Chi tiết</Link>
        </Button>
      )
    },
  },
]

const filterOptions = [
  { label: "Đã thanh toán", value: "true" },
  { label: "Chưa thanh toán", value: "false" },
]

export default function OrdersPage() {
  // TODO: Fetch orders data
  const orders: Order[] = []

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Đơn hàng</h1>
      </div>
      <DataTable
        columns={columns}
        data={orders}
        filterColumn="isPaid"
        filterOptions={filterOptions}
      />
    </div>
  )
}