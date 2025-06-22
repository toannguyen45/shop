"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface SearchInputProps {
  placeholder?: string;
  searchKey?: string;
  debounceMs?: number;
}

export function SearchInput({
  placeholder = "Tìm kiếm...",
  searchKey = "query",
  debounceMs = 500
}: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentSearch = searchParams.get(searchKey) || "";
  const [searchValue, setSearchValue] = useState(currentSearch);
  const [isSearching, setIsSearching] = useState(false);

  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());

      Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === "") {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      });

      return newSearchParams.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      if (searchValue !== currentSearch) {
        const queryString = createQueryString({
          [searchKey]: searchValue || null,
          page: 1, // Reset to first page when searching
        });
        router.push(`?${queryString}`);
      }
      setIsSearching(false);
    }, debounceMs);

    return () => {
      clearTimeout(timer);
      setIsSearching(false);
    };
  }, [searchValue, currentSearch, createQueryString, router, debounceMs, searchKey]);

  return (
    <div className="relative flex-1 max-w-sm">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        className="pl-8"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {isSearching && (
        <div className="absolute right-2 top-2.5 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      )}
    </div>
  );
}
