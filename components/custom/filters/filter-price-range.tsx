"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { useFilter } from "@/contexts/filter-context";
import React, { useState, useEffect } from "react";

interface FilterPriceRangeProps {
  title: string;
  filterKey: "priceRange";
}

const MIN_PRICE = 0;
const MAX_PRICE = 10000000; // 10 triệu VND

const FilterPriceRange = ({ title, filterKey }: FilterPriceRangeProps) => {
  const { optimisticFilters, updateFilters } = useFilter();
  const selectedValues = optimisticFilters[filterKey];

  // Lấy giá trị từ filter context hoặc sử dụng giá trị mặc định
  const [value, setValue] = useState({
    from: selectedValues.length > 0 ? parseInt(selectedValues[0]) || MIN_PRICE : MIN_PRICE,
    to: selectedValues.length > 1 ? parseInt(selectedValues[1]) || MAX_PRICE : MAX_PRICE,
  });

  // Cập nhật local state khi filter context thay đổi
  useEffect(() => {
    if (selectedValues.length >= 2) {
      setValue({
        from: parseInt(selectedValues[0]) || MIN_PRICE,
        to: parseInt(selectedValues[1]) || MAX_PRICE,
      });
    }
  }, [selectedValues]);

  const handleChange = (newValue: { from: number; to: number }) => {
    setValue(newValue);
    updateFilters(filterKey, [newValue.from.toString(), newValue.to.toString()]);
  };

  return (
    <>
      <div className="flex flex-col space-y-4">
        <Label className="text-sm font-bold uppercase">{title}</Label>

        <div className="flex justify-between space-x-4">
          <Input
            type="number"
            value={value.from}
            onChange={(e) =>
              handleChange({ from: +e.target.value, to: value.to })
            }
            className="w-20"
            placeholder="Từ"
          />
          <Input
            type="number"
            value={value.to}
            onChange={(e) =>
              handleChange({ from: value.from, to: +e.target.value })
            }
            className="w-20"
            placeholder="Đến"
          />
        </div>
        
        <Slider
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={100000} // 100k VND
          value={[value.from, value.to]}
          onValueChange={([from, to]) => handleChange({ from, to })}
          className="w-full mt-4 mb-3"
        />
      </div>
      <Separator className="my-4" />
    </>
  );
};

export default FilterPriceRange; 