"use client";

import FilterCheckboxGroup from "./filters/filter-checkbox-group";
import FilterPriceRange from "./filters/filter-price-range";
import { useFilter } from "@/contexts/filter-context";
import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Filter } from "lucide-react";

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
  ];

  return (
    <div className="w-64 space-y-6">
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="font-semibold">Lọc Sản Phẩm</span>
          </div>
        </CardHeader>
        <CardContent>
          {filterCategories.map((category) => (
            <FilterCheckboxGroup
              key={category.key}
              title={category.title}
              options={category.options}
              filterKey={category.key}
            />
          ))}
          
          <FilterPriceRange
            title="Khoảng giá"
            filterKey="priceRange"
          />
        </CardContent>
      </Card>

      {/* <Button onClick={resetFilters}>Xoá lọc</Button> */}
    </div>
  );
};

export default FilterBar;
