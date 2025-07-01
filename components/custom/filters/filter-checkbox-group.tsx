"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
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
    <>
      <div className="flex flex-col space-y-4">
        <Label className="text-sm font-bold uppercase">{title}</Label>

        <div className="flex flex-col space-y-2">
          {options.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`${filterKey}-${option.value}`}
                checked={selectedValues.includes(option.value)}
                onCheckedChange={() => handleChange(option.value)}
              />
              <Label
                htmlFor={`${filterKey}-${option.value}`}
                className="text-sm font-normal"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
      <Separator className="my-4" />
    </>
  );
};

export default FilterCheckboxGroup;
