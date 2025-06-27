'use client';

import { Button } from "@/components/ui/button";
import {
  ChevronLeft as FiChevronLeft,
  ChevronRight as FiChevronRight,
  ChevronsLeft as FiChevronsLeft,
  ChevronsRight as FiChevronsRight,
  ChevronUp as FiChevronUp,
  ChevronDown as FiChevronDown,
} from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  baseUrl: string;
  searchParams?: Record<string, string>;
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  selectedRows?: number;
  totalRows?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  baseUrl,
  searchParams = {},
  pageSize = 10,
  onPageSizeChange,
  selectedRows = 0,
  totalRows = 0,
}: PaginationProps) {
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams({
      ...searchParams,
      page: page.toString(),
    });
    return `${baseUrl}?${params.toString()}`;
  };

  // Handler for page size change
  const handlePageSizeUp = () => {
    if (onPageSizeChange && hasNextPage) {
      onPageSizeChange(pageSize + 5);
    }
  };
  const handlePageSizeDown = () => {
    if (onPageSizeChange && pageSize > 5) {
      onPageSizeChange(pageSize - 5);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mt-4">
      <div className="flex-1 text-sm text-muted-foreground">
        {selectedRows} of {totalRows} row(s) selected.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8 text-muted-foreground">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <p>{pageSize}</p>
          <div className="flex flex-col">
            <FiChevronUp
              className={`cursor-pointer ${!hasNextPage ? "opacity-50 pointer-events-none" : ""}`}
              onClick={hasNextPage ? handlePageSizeUp : undefined}
            />
            <FiChevronDown
              className={`cursor-pointer ${pageSize <= 5 ? "opacity-50 pointer-events-none" : ""}`}
              onClick={pageSize > 5 ? handlePageSizeDown : undefined}
            />
          </div>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => window.location.href = createPageUrl(1)}
            disabled={!hasPrevPage}
          >
            <span className="sr-only">Go to first page</span>
            <FiChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => window.location.href = createPageUrl(currentPage - 1)}
            disabled={!hasPrevPage}
          >
            <span className="sr-only">Go to previous page</span>
            <FiChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => window.location.href = createPageUrl(currentPage + 1)}
            disabled={!hasNextPage}
          >
            <span className="sr-only">Go to next page</span>
            <FiChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => window.location.href = createPageUrl(totalPages)}
            disabled={!hasNextPage}
          >
            <span className="sr-only">Go to last page</span>
            <FiChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
