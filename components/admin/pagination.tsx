'use client';

import {
  Pagination as UIPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  baseUrl: string;
  searchParams?: Record<string, string>;
}

export default function Pagination({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  baseUrl,
  searchParams = {},
}: PaginationProps) {
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams({
      ...searchParams,
      page: page.toString(),
    });
    return `${baseUrl}?${params.toString()}`;
  };

  return (
    <UIPagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            href={createPageUrl(currentPage - 1)}
            className={!hasPrevPage ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <PaginationItem key={pageNum}>
            <PaginationLink
              href={createPageUrl(pageNum)}
              isActive={pageNum === currentPage}
            >
              {pageNum}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext 
            href={createPageUrl(currentPage + 1)}
            className={!hasNextPage ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </UIPagination>
  );
}
