"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export interface FilterOption {
  id: string;
  name: string;
}

const brandOptions: FilterOption[] = [
  { id: "nike", name: "Nike" },
  { id: "converse", name: "Converse" },
  { id: "adidas", name: "Adidas" },
  { id: "vans", name: "Vans" },
];

export interface FilterState {
  brand: string[];
}

export interface FilterSidebarProps {
  onFilterChange: (filters: FilterState) => void;
  activeFilters?: FilterState;
}

export function FilterSidebar({ onFilterChange, activeFilters }: FilterSidebarProps) {
  const [selectedFilters, setSelectedFilters] = useState<FilterState>(
    activeFilters || {
      brand: [],
    }
  );
  const [, setAppliedFilters] = useState<FilterState>(selectedFilters);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Count the total number of active brand filters
  const activeFilterCount = selectedFilters.brand.length;

  const handleFilterChange = (filterId: string) => {
    setSelectedFilters((prev) => {
      const updatedBrands = prev.brand.includes(filterId)
        ? prev.brand.filter((id) => id !== filterId)
        : [...prev.brand, filterId];

      return { brand: updatedBrands };
    });
  };

  const applyFilters = () => {
    setAppliedFilters(selectedFilters);
    onFilterChange(selectedFilters);
    setIsSheetOpen(false);
  };

  const resetFilters = () => {
    const emptyFilters = { brand: [] };
    setSelectedFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const FilterGroup = () => (
    <div className="mb-6">
      <h3 className="mb-3 font-medium text-gray-900">Brands</h3>
      <div className="space-y-2">
        {brandOptions.map((option) => (
          <label key={option.id} className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-black focus:ring-0"
              checked={selectedFilters.brand.includes(option.id)}
              onChange={() => handleFilterChange(option.id)}
            />
            <span className="ml-2 text-sm">{option.name}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const MobileFilterSidebar = () => (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-2 lg:hidden">
          <Filter className="h-4 w-4" />
          <span>ตัวกรอง {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full overflow-y-auto sm:max-w-md">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-medium">Filter</h2>
        </div>
        <FilterGroup />
        <div className="mt-6 flex justify-between">
          <Button
            variant="outline"
            onClick={resetFilters}
            disabled={activeFilterCount === 0}
          >
            Reset
          </Button>
          <Button onClick={applyFilters}>Apply</Button>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <>
      <MobileFilterSidebar />
      <div className="hidden w-[280px] lg:block">
        <div className="sticky top-20 overflow-y-auto pb-10">
          <h2 className="mb-6 text-2xl font-medium">Filter {activeFilterCount > 0 && `(${activeFilterCount})`}</h2>
          <FilterGroup />
          <div className="mt-6">
            <Button
              variant="outline"
              className="mr-2"
              onClick={resetFilters}
              disabled={activeFilterCount === 0}
            >
              Reset
            </Button>
            <Button onClick={applyFilters}>Apply</Button>
          </div>
        </div>
      </div>
    </>
  );
}