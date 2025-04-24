"use client";


import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export interface ProductProps {
  
  id: string;
  name: string;
  subtitle?: string;
  price: number;
  image: string;
  categoryName?: string;
  colors?: number;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export function ProductCard({
  id,
  name,
  subtitle,
  price,
  image,
  isNew,
  isBestSeller,
}: ProductProps) {
  return (
    <Link
      href={`/products/${id}`}
      className="group block transition-transform duration-300 hover:no-underline"
    >
      <Card className="border-0 shadow-none " >
        <CardContent className="p-0">
          <div className="relative aspect-square overflow-hidden bg-zinc-100">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
            {isNew && (
              <div className="absolute left-2 top-2 bg-black px-2 py-1 text-xs font-medium text-white">
                Newest
              </div>
            )}
            {isBestSeller && (
              <div className="absolute left-2 top-2 bg-black px-2 py-1 text-xs font-medium text-white">
                Best Seller
              </div>
            )}
          </div>
          <div className="mt-3 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium ">{name}</h3>
            </div>
            {subtitle && (
              <p className="text-sm text-gray-500">
                {subtitle}
              </p>
            )}
            <span className="font-medium">฿{price.toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
