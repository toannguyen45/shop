"use client"

import { Button } from "@/components/ui/button"
import { ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

interface SortableHeaderProps {
  column: string
  children: React.ReactNode
  currentSort?: string
  currentSortDirection?: "asc" | "desc"
}

export function SortableHeader({ 
  column, 
  children, 
  currentSort, 
  currentSortDirection 
}: SortableHeaderProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString())

      Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === "") {
          newSearchParams.delete(key)
        } else {
          newSearchParams.set(key, String(value))
        }
      })

      return newSearchParams.toString()
    },
    [searchParams]
  )

  const handleSort = () => {
    let newSortDirection: "asc" | "desc" = "asc"
    
    if (currentSort === column) {
      // If already sorting by this column, toggle direction
      newSortDirection = currentSortDirection === "asc" ? "desc" : "asc"
    }

    const queryString = createQueryString({
      sort: column,
      sortDirection: newSortDirection,
      page: 1, // Reset to first page when sorting
    })
    router.push(`?${queryString}`)
  }

  const isSorted = currentSort === column
  const isAsc = currentSortDirection === "asc"

  return (
    <Button variant="ghost" onClick={handleSort} className="h-auto p-0 font-medium">
      {children}
      {isSorted ? (
        isAsc ? (
          <ChevronUp className="ml-2 h-4 w-4" />
        ) : (
          <ChevronDown className="ml-2 h-4 w-4" />
        )
      ) : (
        <ArrowUpDown className="ml-2 h-4 w-4" />
      )}
    </Button>
  )
} 