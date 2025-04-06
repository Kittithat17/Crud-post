"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const sortOptions = [
  { id: "featured", name: "Recommend" },
  { id: "newest", name: "Newest" },
  { id: "price-asc", name: "Price: Low-High" },
  { id: "price-desc", name: "Price: High-Low" },
];

interface SortOptionsProps {
  onSortChange?: (sortId: string) => void;
}

export function SortOptions({ onSortChange }: SortOptionsProps) {
  const [selectedSort, setSelectedSort] = useState<string>("featured");

  const handleSortChange = (sortId: string) => {
    setSelectedSort(sortId);
    onSortChange?.(sortId);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex min-w-[140px] justify-between">
          <span>{sortOptions.find((option) => option.id === selectedSort)?.name || "Recommend"}</span>
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option.id}
            className="flex cursor-pointer items-center justify-between"
            onClick={() => handleSortChange(option.id)}
          >
            {option.name}
            {selectedSort === option.id && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
