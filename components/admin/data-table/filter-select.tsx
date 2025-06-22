"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

interface FilterSelectProps {
  filterKey: string
  label: string
  options: Array<{ label: string; value: string }>
  placeholder?: string
}

export function FilterSelect({ 
  filterKey, 
  label, 
  options, 
  placeholder 
}: FilterSelectProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const currentFilter = searchParams.get(filterKey) || "all"

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

  const handleFilter = (value: string) => {
    const queryString = createQueryString({
      [filterKey]: value === "all" ? null : value,
      page: 1, // Reset to first page when filtering
    })
    router.push(`?${queryString}`)
  }

  return (
    <Select value={currentFilter} onValueChange={handleFilter}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder || `Lọc theo ${label}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Tất cả {label}</SelectItem>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
