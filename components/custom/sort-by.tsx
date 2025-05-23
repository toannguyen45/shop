"use client";

import { useFilter } from "@/contexts/filter-context";
import React from "react";

const SortBy = () => {
  const { optimisticFilters, updateFilters } = useFilter();
  
  const sortOptions = [
    { label: "Featured", value: "featured" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Newest", value: "newest" },
    { label: "Best Selling", value: "best-selling" },
  ];

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="sort" className="text-sm text-gray-600">
        Sort by:
      </label>
      <select
        id="sort"
        value={optimisticFilters.sort}
        onChange={(e) => updateFilters("sort", e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortBy; 