"use client";

import { useEffect, useState } from "react";
import { ProductCard, type ProductProps } from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";

interface FilterState {
 
  brand: string[];
  
  
}

interface ProductGridProps {
  products: ProductProps[];
  isLoading?: boolean;
  filters?: Partial<FilterState>;
  sortOption?: string;
}

export function ProductGrid({
  products,
  isLoading = false,
  filters = {},
  sortOption = "featured"
}: ProductGridProps) {
  const [displayProducts, setDisplayProducts] = useState<ProductProps[]>([]);

  // Apply filters and sorting when products, filters, or sortOption change
  useEffect(() => {
    let result = [...products];

    // Filter by brand
    if (filters.brand && filters.brand.length > 0) {
      result = result.filter(product => {
        // ตรวจสอบชื่อผลิตภัณฑ์หรือแบรนด์ว่ามีคำที่ต้องการหรือไม่
        const productName = product.name?.toLowerCase() || '';
        
        
        return (filters.brand ?? []).some(brand => {
          const brandLower = brand.toLowerCase();
          return (
            productName.includes(brandLower) 
          );
        });
      });
    }

    // Apply sorting
    switch (sortOption) {
      case "newest":
        result.sort((a, b) => {
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return Number.parseInt(b.id) - Number.parseInt(a.id);
        });
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "featured":
      default:
        result.sort((a, b) => {
          if (a.isBestSeller && !b.isBestSeller) return -1;
          if (!a.isBestSeller && b.isBestSeller) return 1;
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return 0;
        });
    }

    setDisplayProducts(result);
  }, [products, filters.brand, sortOption]);

  // Render loading skeletons while data is being fetched
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 ">
        {Array.from({ length: 50 }).map((_, index) => (
          <div key={`skeleton-${index}`} className="space-y-3">
            <Skeleton className="aspect-square w-full rounded-none" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // If no products match the filters
  if (displayProducts.length === 0) {
    return (
      <div className="py-10 text-center">
        <h3 className="text-lg font-medium">No products found</h3>
        <p className="mt-2 text-gray-500">Try adjusting your search or filters to find what you&apos;re looking for.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
      {displayProducts.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}