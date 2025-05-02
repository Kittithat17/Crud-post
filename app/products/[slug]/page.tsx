// Update your app/products/[id]/page.tsx file

import { notFound } from "next/navigation";
import ProductDetails from "./product-client";

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

async function getProduct(id: string): Promise<Product | null> {
  try {
    const response = await fetch(`http://localhost:1337/getSneaker/${id}`, {
      // Add cache: 'no-store' for always fresh data, or specify a revalidation period
      cache: 'no-store'
      // Or use next.js revalidation:
      // next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      console.log(response.status)
    }
    
    return await response.json();
  } catch (error) {
    // In production, you might want to log this error to an error tracking service
    console.error('Error fetching product:', error);
    return null;
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  
  if (!product) {
    notFound();
  }

  return (
    <div className="font-sans">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <ProductDetails product={product} />
        </div>
      </main>
    </div>
  );
}