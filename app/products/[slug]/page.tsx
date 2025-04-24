// page.tsx - This becomes a Server Component
import { notFound } from "next/navigation";
import { products } from "@/lib/products";
import ProductDetails from "./product-client";


export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products[slug as keyof typeof products];

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