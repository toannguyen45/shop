"use client";

import { useFilter } from "@/contexts/filter-context";
import React from "react";

interface FilterCheckboxGroupProps {
  title: string;
  options: { label: string; value: string }[];
  filterKey: "categories" | "priceRange" | "sizes" | "colors";
}

const FilterCheckboxGroup = ({
  title,
  options,
  filterKey,
}: FilterCheckboxGroupProps) => {
  const { optimisticFilters, updateFilters } = useFilter();
  const selectedValues = optimisticFilters[filterKey];

  const handleChange = (option: string) => {
    const newValues = selectedValues.includes(option)
      ? selectedValues.filter((value) => value !== option)
      : [...selectedValues, option];

    updateFilters(filterKey, newValues);
  };

  return (
    <div className="space-y-3">
      <h3 className="font-medium text-lg">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={`${filterKey}-${option.value}`}
              checked={selectedValues.includes(option.value)}
              onChange={() => handleChange(option.value)}
              className="rounded border-gray-300"
            />
            <label
              htmlFor={`${filterKey}-${option}`}
              className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterCheckboxGroup;
