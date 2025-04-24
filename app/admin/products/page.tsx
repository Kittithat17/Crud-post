'use client';

import React from 'react';
import { products } from "@/lib/products";

export default function AdminProductPage() {
  // Convert products object to array
  const productList = Object.values(products);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <table className="w-full border-collapse border text-left">
        <thead>
          <tr className="border-b">
            <th className="p-2">ID</th>
            <th className="p-2">NAME</th>
            <th className="p-2">PRICE</th>
            <th className="p-2">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product) => (
            <tr key={product.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{product.id}</td>
              <td className="p-2">{product.name}</td>
              <td className="p-2">{product.price}</td>
              
              <td className="p-2 space-x-2">
                <button className="px-3 py-1 bg-white border text-sm rounded">Edit</button>
                <button className="px-3 py-1 bg-red-500 text-white text-sm rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}