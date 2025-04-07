"use client";

import {  useState } from "react";
import { FilterSidebar, type FilterState } from "@/components/filter-sidebar";
import { ProductGrid } from "@/components/product-grid";
import { SortOptions } from "@/components/sort-options";
import type { ProductProps } from "@/components/product-card";

// Sample product data to mimic what we saw on Nike's site
const mensShoes: ProductProps[] = [
  {
    id: "1",
    name: "Nike Air Jordan 1 Low",
    subtitle: "Air Jordan 1 Low Travis Scott x Fragment",
    price: 5900,
    image: "https://static.nike.com/a/images/w_1280,q_auto,f_auto/15b77901-eb6e-46a8-8c2e-76beb0b5b42a/วันเปิดตัว-air-jordan-1-low-“travis-scott-x-fragment”.jpg",
    colors: 1,
  },
  {
    id: "2",
    name: "Adidas Samba",
    subtitle: "Samba OG Aluminum Gum ",
    price: 6400,
    image: "/images/kkk.jpeg",
    colors: 4,
  },
  {
    id: "3",
    name: "Nike Vomero 18",
    subtitle: "Women's Air Jordan 1 High OG 'Rare Air'",
    price: 5900,
    image: "/images/ff.webp",
    colors: 2,
    isNew: true,
  },
  {
    id: "4",
    name: "Jordan Luka 3 \"Space Navigator\"",
    subtitle: "Women's Air Jordan 1 High OG 'Rare Air'",
    price: 5200,
    image: "/images/ff.webp",
    colors: 1,
  },
  {
    id: "5",
    name: "Air Max DN8",
    subtitle: "Women's Air Jordan 1 High OG 'Rare Air'",
    price: 6400,
    image: "/images/ff.webp",
    colors: 3,
  },
  {
    id: "6",
    name: "Air Max DN8",
    subtitle: "Women's Air Jordan 1 High OG 'Rare Air'",
    price: 6400,
    image: "/images/ff.webp",
    colors: 2,
  },
  {
    id: "7",
    name: "Jordan Luka 3 \"Space Navigator\"",
    subtitle: "Women's Air Jordan 1 High OG 'Rare Air'",
    price: 5200,
    image: "/images/ff.webp",
    colors: 1,
  },
  {
    id: "8",
    name: "Vans",
    subtitle: "Women's Air Jordan 1 High OG 'Rare Air'",
    price: 7500,
    image: "/images/ff.webp",
    colors: 1,
    isBestSeller: true,
  },
  {
    id: "9",
    name: "Air Force 1 '07",
    subtitle: "Women's Air Jordan 1 High OG 'Rare Air'",
    price: 3800,
    image: "/images/ff.webp",
    colors: 2,
  },
  {
    id: "10",
    name: "Vans",
    subtitle: "Women's Air Jordan 1 High OG 'Rare Air'",
    price: 5900,
    image: "/images/ff.webp",
    colors: 1,
  },
  {
    id: "11",
    name: "Converse",
    subtitle: "Women's Air Jordan 1 High OG 'Rare Air'",
    price: 6400,
    image: "/images/ff.webp",
    colors: 1,
  },
  {
    id: "12",
    name: "Converse",
    subtitle: "Women's Air Jordan 1 High OG 'Rare Air'",
    price: 4900,
    image: "/images/ff.webp",
    colors: 3,
  },
  {
    id: "13",
    name: "Adidas Samba",
    subtitle: "Women's Air Jordan 1 High OG 'Rare Air'",
    price: 4900,
    image: "/images/ff.webp",
    colors: 3,
  },
  {
    id: "14",
    name: "Adidas Samba",
    subtitle: "Women's Air Jordan 1 High OG 'Rare Air'",
    price: 4900,
    image: "/images/ff.webp",
    colors: 3,
    isNew: true
  },
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
          <FilterSidebar onFilterChange={handleFilterChange} activeFilters={activeFilters} />
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
