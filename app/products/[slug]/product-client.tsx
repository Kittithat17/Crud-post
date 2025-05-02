// Create a new file at: app/products/[id]/product-client.tsx

'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  subtitle?: string;
  price: number;
  main_image: string;
  categoryName?: string;
  colors?: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  description?: string;
}

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);

  const formatPrice = (price: number | string): string => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return numPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <>
      {/* Product Image */}
      <div className="relative w-full lg:w-1/2">
        <div className="aspect-square overflow-hidden rounded-lg bg-zinc-100">
          <Image
            src={product.main_image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
          {product.isNew && (
            <div className="absolute left-2 top-2 bg-black px-2 py-1 text-xs font-medium text-white">
              Newest
            </div>
          )}
          {product.isBestSeller && (
            <div className="absolute left-2 top-2 bg-black px-2 py-1 text-xs font-medium text-white">
              Best Seller
            </div>
          )}
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col w-full lg:w-1/2">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        {product.subtitle && (
          <p className="text-xl text-gray-600 mt-1">{product.subtitle}</p>
        )}
        
        <div className="mt-4 text-2xl font-bold">
          ฿{formatPrice(product.price)}
        </div>
        
        {/* Quantity Selector */}
        <div className="mt-6">
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
            Quantity
          </label>
          <div className="flex items-center">
            <button 
              onClick={decrementQuantity}
              className="p-2 border rounded-l-md hover:bg-gray-100"
            >
              -
            </button>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="p-2 w-16 border-t border-b text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <button 
              onClick={incrementQuantity}
              className="p-2 border rounded-r-md hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>
        
        {/* Add to Cart Button */}
        <div className="mt-6">
          <button className="w-full rounded-full bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800">
            Add to Cart
          </button>
        </div>
        
        {/* Product Details */}
        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-semibold mb-2">Product Details</h3>
          <p className="text-gray-600">
            {product.description || 'Premium quality sneakers designed for both style and comfort. These sneakers feature durable materials and expert craftsmanship.'}
          </p>
        </div>
      </div>
    </>
  );
}