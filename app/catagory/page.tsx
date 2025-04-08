"use client";

import { useState } from "react";
import { FilterSidebar, type FilterState } from "@/components/filter-sidebar";
import { ProductGrid } from "@/components/product-grid";
import { SortOptions } from "@/components/sort-options";
import type { ProductProps } from "@/components/product-card";

// Sample product data to mimic what we saw on Nike's site
const mensShoes: ProductProps[] = [
    {
        id: "air-jordan-1-low-travis-scott",
        name: "Nike Air Jordan 1 Low",
        subtitle: "Travis Scott x Fragment",
        price: 5900,
        image: "https://static.nike.com/a/images/w_1280,q_auto,f_auto/a27a438e-3142-4bd1-b504-bd126bafd87c/วันเปิดตัว-air-jordan-1-low-“travis-scott-x-fragment”.jpg",
      },
      {
        id: "adidas-samba-og",
        name: "Adidas Samba",
        subtitle: "OG Aluminum Gum",
        price: 6400,
        image: "/images/kkk.jpeg",
       
      },
      {
        id: "nike-vomero-18",
        name: "Nike Vomero 18",
        subtitle: "Running Shoes",
        price: 5900,
        image: "/images/ff.webp",
        isNew: true,
      },
      {
        id: "jordan-luka-3-space",
        name: "Jordan Luka 3",
        subtitle: "Space Navigator",
        price: 5200,
        image: "/images/ff.webp",
      },
      {
        id: "nike-air-max-dn8",
        name: "Air Max DN8",
        subtitle: "Latest Air Max Technology",
        price: 6400,
        image: "/images/ff.webp",
        colors: 3,
      },
      {
        id: "vans-classic",
        name: "Vans Classic",
        subtitle: "Original Skate Shoes",
        price: 7500,
        image: "/images/ff.webp",
    
        isBestSeller: true,
      },
      {
        id: "nike-air-force-1-07",
        name: "Air Force 1 '07",
        subtitle: "Classic Basketball Shoes",
        price: 3800,
        image: "/images/ff.webp",
  
      },
      {
        id: "converse-chuck-taylor",
        name: "Converse Chuck Taylor",
        subtitle: "All Star Classic",
        price: 6400,
        image: "/images/ff.webp",
      
      },
      {
        id: "adidas-samba-classic",
        name: "Adidas Samba",
        subtitle: "Classic Edition",
        price: 4900,
        image: "/images/ff.webp",
       
        isNew: true
      }
];

export default function HomePage() {
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    brand: [],
  });
  const [sortOption, setSortOption] = useState<string>("featured");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFilterChange = (filters: FilterState) => {
    setIsLoading(true);
    // Simulate API loading
    setTimeout(() => {
      setActiveFilters(filters);
      setIsLoading(false);
    }, 500);
  };

  const handleSortChange = (sortId: string) => {
    setIsLoading(true);
    // Simulate API loading
    setTimeout(() => {
      setSortOption(sortId);
      setIsLoading(false);
    }, 300);
  };

  return (
    <main className="flex min-h-screen flex-col">
      <div className="container px-4 py-8 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Sneakers</h1>
          <p className="mt-2 text-gray-600">({mensShoes.length} lists)</p>
        </div>

        <div className="flex flex-col lg:flex-row lg:gap-8">
          <FilterSidebar
            onFilterChange={handleFilterChange}
            activeFilters={activeFilters}
          />
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">All Products</h2>
              <SortOptions onSortChange={handleSortChange} />
            </div>
            <ProductGrid
              products={mensShoes}
              isLoading={isLoading}
              filters={activeFilters}
              sortOption={sortOption}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
