"use client";

import { useState, useEffect } from "react";
import { FilterSidebar, type FilterState } from "@/components/filter-sidebar";
import { ProductGrid } from "@/components/product-grid";
import { SortOptions } from "@/components/sort-options";
import type { ProductProps } from "@/components/product-card";


const sampleSneakers: ProductProps[] = [
    {
        id: "air-jordan-1-low-travis-scott",
        name: "Nike Air Jordan 1 Low",
        subtitle: "Travis Scott x Fragment",
        price: 5900,
        main_image: "https://static.nike.com/a/images/w_1280,q_auto,f_auto/a27a438e-3142-4bd1-b504-bd126bafd87c/วันเปิดตัว-air-jordan-1-low-travis-scott-x-fragment.jpg",
    },
    {
        id: "adidas-samba-og",
        name: "Adidas Samba",
        subtitle: "OG Aluminum Gum",
        price: 6400,
        main_image: "https://static.nike.com/a/images/w_1280,q_auto,f_auto/a27a438e-3142-4bd1-b504-bd126bafd87c/วันเปิดตัว-air-jordan-1-low-travis-scott-x-fragment.jpg",
    },
    {
        id: "nike-vomero-18",
        name: "Nike Vomero 18",
        subtitle: "Running Shoes",
        price: 5900,
        main_image: "https://static.nike.com/a/images/w_1280,q_auto,f_auto/a27a438e-3142-4bd1-b504-bd126bafd87c/วันเปิดตัว-air-jordan-1-low-travis-scott-x-fragment.jpg",
        isNew: true,
    }
];

export default function HomePage() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    brand: [],
  });
  const [sortOption, setSortOption] = useState<string>("featured");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchSneakers = async (): Promise<void> => {
      setIsLoading(true);
      console.log('Fetching sneakers from API...');
      try {
        console.log('Making request to: http://localhost:1337/getSneakers');
        const response = await fetch('http://localhost:1337/getSneakers');
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API Response Data:', data);
        
        if (!data || (Array.isArray(data) && data.length === 0)) {
          console.warn('API returned empty data');

          setProducts(sampleSneakers);
          setError('No data received from API. Showing sample data instead.');
        } else {
          
          const formattedData = Array.isArray(data) ? data : [data] as ProductProps[];
          setProducts(formattedData);
          setError(null);
        }
      } catch (err) {
        console.error('Failed to fetch sneakers:', err instanceof Error ? err.message : String(err));
        setError('Failed to load sneakers. Using sample data instead.');
        // Fallback to sample data on error
        setProducts(sampleSneakers);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSneakers();
  }, []);

  const handleFilterChange = (filters: FilterState) => {
    setIsLoading(true);
    // Simulate API loading or implement actual filtering logic
    setTimeout(() => {
      setActiveFilters(filters);
      setIsLoading(false);
    }, 500);
  };

  const handleSortChange = (sortId: string) => {
    setIsLoading(true);
    // Simulate API loading or implement actual sorting logic
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
          {!isLoading && !error && (
            <p className="mt-2 text-gray-600">({products.length} items)</p>
          )}
          {error && <p className="mt-2 text-red-500">{error}</p>}
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
              products={products}
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