"use client";

import {
  FilterValues,
  defaultFilters,
  filterSchema,
} from "@/schemaValidations/filter.schema";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React, {
  createContext,
  useContext,
  useCallback,
  useOptimistic,
  startTransition,
} from "react";

interface FilterContextType {
  filters: FilterValues;
  optimisticFilters: FilterValues;
  updateFilters: (key: keyof FilterValues, value: string | string[]) => void;
  resetFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Parse current URL params into filter state
  const currentFilters = React.useMemo(() => {
    const params = Object.fromEntries(searchParams.entries());
    const parsed = filterSchema.safeParse({
      categories: params.categories?.split(",") || [],
      priceRange: params.priceRange?.split(",") || [],
      sizes: params.sizes?.split(",") || [],
      colors: params.colors?.split(",") || [],
      sort: params.sort || "featured",
    });

    return parsed.success ? parsed.data : defaultFilters;
  }, [searchParams]);

  const [optimisticFilters, addOptimisticFilter] = useOptimistic(
    currentFilters,
    (state, newValue: Partial<FilterValues>) => ({
      ...state,
      ...newValue,
    })
  );

  const updateFilters = useCallback(
    (key: keyof FilterValues, value: string | string[]) => {
      startTransition(() => {
        // Update optimistic state
        addOptimisticFilter({ [key]: value });

        // Update URL params
        const params = new URLSearchParams(searchParams.toString());

        if (Array.isArray(value)) {
          if (value.length === 0) {
            params.delete(key);
          } else {
            params.set(key, value.join(","));
          }
        } else {
          params.set(key, value);
        }

        // Update URL without full page reload
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [pathname, router, searchParams, addOptimisticFilter]
  );

  const resetFilters = useCallback(() => {
    startTransition(() => {
      // Reset optimistic state
      addOptimisticFilter(defaultFilters);

      // Clear URL params
      router.push(pathname);
    });
  }, [pathname, router, addOptimisticFilter]);

  return (
    <FilterContext.Provider
      value={{
        filters: currentFilters,
        optimisticFilters,
        updateFilters,
        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
