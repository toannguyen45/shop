"use client";

import FilterCheckboxGroup from "./filters/filter-checkbox-group";
import { useFilter } from "@/contexts/filter-context";
import React from "react";
import { Button } from "../ui/button";

const FilterBar = () => {
  const { resetFilters } = useFilter();

  const filterCategories = [
    {
      title: "Categories",
      options: ["Men", "Women", "Kids", "Accessories"],
      key: "categories" as const,
    },
    {
      title: "Price Range",
      options: ["Under $50", "$50 - $100", "$100 - $200", "Over $200"],
      key: "priceRange" as const,
    },
    {
      title: "Size",
      options: ["XS", "S", "M", "L", "XL", "XXL"],
      key: "sizes" as const,
    },
    {
      title: "Color",
      options: ["Black", "White", "Red", "Blue", "Green", "Yellow"],
      key: "colors" as const,
    },
  ];

  return (
    <div className="w-64 p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Filters</h2>
      </div>

      {filterCategories.map((category) => (
        <FilterCheckboxGroup
          key={category.key}
          title={category.title}
          options={category.options}
          filterKey={category.key}
        />
      ))}

      <Button onClick={resetFilters}>Reset</Button>
    </div>
  );
};

export default FilterBar;
