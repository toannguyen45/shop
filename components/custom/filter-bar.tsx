"use client";

import FilterCheckboxGroup from "./filters/filter-checkbox-group";
import { useFilter } from "@/contexts/filter-context";
import React from "react";
import { Button } from "../ui/button";

const FilterBar = () => {
  const { resetFilters } = useFilter();

  const filterCategories = [
    {
      title: "Danh mục",
      options: [
        { label: "Men", value: "men" },
        { label: "Women", value: "women" },
        { label: "Kids", value: "kids" },
        { label: "Accessories", value: "accessories" },
      ],
      key: "categories" as const,
    },
    {
      title: "Khoảng giá",
      options: [
        { label: "Dưới 500.000đ", value: "under-500k" },
        { label: "500.000đ - 1.000.000đ", value: "500k-1m" },
        { label: "1.000.000đ - 2.000.000đ", value: "1m-2m" },
        { label: "Trên 2.000.000đ", value: "over-2m" },
      ],
      key: "priceRange" as const,
    },
  ];

  return (
    <div className="w-64 p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Lọc sản phẩm</h2>
      </div>

      {filterCategories.map((category) => (
        <FilterCheckboxGroup
          key={category.key}
          title={category.title}
          options={category.options}
          filterKey={category.key}
        />
      ))}

      <Button onClick={resetFilters}>Xoá lọc</Button>
    </div>
  );
};

export default FilterBar;
