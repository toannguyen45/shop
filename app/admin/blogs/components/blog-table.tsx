"use client"

import { Blog } from "@/types/blog"
import { DataTable } from "@/components/admin/data-table/data-table"
import { PaginationControls } from "@/components/admin/data-table/pagination-controls"
import { SearchInput } from "@/components/admin/data-table/search-input"
import { FilterSelect } from "@/components/admin/data-table/filter-select"
import { createColumns } from "@/app/admin/blogs/components/columns"

interface BlogTableProps {
  data: Blog[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
  currentSort?: string
  currentSortDirection?: "asc" | "desc"
  filterOptions: Array<{ label: string; value: string }>
}

export function BlogTable({
  data,
  pagination,
  currentSort,
  currentSortDirection,
  filterOptions,
}: BlogTableProps) {
  // Create columns with current sort state
  const columns = createColumns({
    currentSort,
    currentSortDirection,
  })

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-4 py-4">
        <SearchInput placeholder="Tìm kiếm tin tức..." searchKey="query" />
        <FilterSelect
          filterKey="filter"
          label="Nổi bật"
          options={filterOptions}
          placeholder="Lọc theo nổi bật"
        />
      </div>

      <DataTable
        columns={columns}
        data={data}
        pagination={pagination}
      />

      <PaginationControls pagination={pagination} />
    </div>
  )
} 